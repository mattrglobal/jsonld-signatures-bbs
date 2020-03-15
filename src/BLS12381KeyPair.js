const zmix = require("./zmix");

class BLS12381KeyPair {
  /**
   * @param {KeyPairOptions} options - The options to use.
   * @param {string} options.id - The key ID.
   * @param {string} options.controller - The key controller.
   * @param {string} options.privateKeyBase64 - The private key base64 encoded.
   * @param {string} options.publicKeyBase64 - The public key base64 encoded.
   */
  constructor(options = {}) {
    this.id = options.id;
    this.type = "BLS12381KeyPair"
    this.controller = options.controller;
    this.privateKeyBuffer = Buffer.from(options.privateKeyBase64, 'base64');
    this.publicKeyBuffer = Buffer.from(options.publicKeyBase64, 'base64');
  }

  /**
   * Generates a KeyPair with an optional deterministic seed.
   * @param {KeyPairOptions} [options={}] - The options to use.
   * @param {string} options.seed - The seed to use to generate the key pair.
   *
   * @returns {Promise<BLS12381KeyPair>} Generates a key pair.
   */
  static async generate(options = {}) {
    const { publicKey, privateKey } = zmix.generateKey();
    return new BLS12381KeyPair({
      ...options,
      privateKeyBase64: privateKey.toString('base64'),
      publicKeyBase64: publicKey.toString('base64')
    });
  }

  /**
   * Returns a signer object for use with jsonld-signatures.
   *
   * @returns {{sign: Function}} A signer for the json-ld block.
   */
  signer() {
    return bbsSignerFactory(this);
  }

  /**
   * Returns a verifier object for use with jsonld-signatures.
   *
   * @returns {{verify: Function}} Used to verify jsonld-signatures.
   */
  verifier() {
    return bbsVerifierFactory(this);
  }
}

/**
 * @ignore
 * Returns an object with an async sign function.
 * The sign function is bound to the KeyPair
 * and then returned by the KeyPair's signer method.
 * @param {BLS12381KeyPair} key - A BLS12381KeyPair.
 *
 * @returns {{sign: Function}} An object with an async function sign
 * using the private key passed in.
 */
function bbsSignerFactory(key) {
  if (!key.privateKeyBuffer) {
    return {
      async sign() {
        throw new Error("No private key to sign with.");
      },
      async signMulti() {
        throw new Error("No private key to sign with.");
      }
    };
  }
  return {
    async sign({ data }) { return zmix.sign(data, key.privateKeyBuffer).toString('base64');},
    async signMulti({ data }) { return zmix.signMulti(data, key.privateKeyBuffer).toString('base64');}
  }
}

/**
 * @ignore
 * Returns an object with an async verify function.
 * The verify function is bound to the KeyPair
 * and then returned by the KeyPair's verifier method.
 * @param {BLS12381KeyPair} key - A BLS12381KeyPair.
 *
 * @returns {{verify: Function}} An async verifier specific
 * to the key passed in.
 */
bbsVerifierFactory = key => {
  if (!key.publicKeyBuffer) {
    return {
      async verify() {
        throw new Error("No public key to verify with.");
      },
      async verifyMulti() {
        throw new Error("No public key to verify with.");
      }
    };
  }

  return {
    async verify({ data, signature }) { return zmix.verify(data, key.publicKeyBuffer, Buffer.from(signature, 'base64'));},
    async verifyMulti({ data, signature }) { return zmix.verifyMulti(data, key.publicKeyBuffer, Buffer.from(signature, 'base64'));}
  }
};

module.exports = BLS12381KeyPair;
