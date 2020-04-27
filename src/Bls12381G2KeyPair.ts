import bs58 from "bs58";
import {
  generateBls12381KeyPair,
  blsVerify,
  blsSign
} from "@mattrglobal/node-bbs-signatures";
import { KeyPairOptions, KeyPairSigner, KeyPairVerifier } from "./types";
import { GenerateKeyPairOptions } from "./types/GenerateKeyPairOptions";

/**
 * @ignore
 * Returns an object with an async sign function.
 * The sign function is bound to the KeyPair
 * and then returned by the KeyPair's signer method.
 * @param {Bls12381G2KeyPair} key - A Bls12381G2KeyPair.
 *
 * @returns {{sign: Function}} An object with an async function sign
 * using the private key passed in.
 */
const bbsSignerFactory = (key: Bls12381G2KeyPair): KeyPairSigner => {
  if (!key.privateKeyBuffer) {
    return {
      async sign(): Promise<string> {
        throw new Error("No private key to sign with.");
      }
    };
  }
  return {
    async sign({ data }): Promise<string> {
      //TODO assert data runtime string | string[]
      if (typeof data === "string") {
        return Buffer.from(
          blsSign({
            messages: [data],
            keyPair: {
              secretKey: new Uint8Array(key.privateKeyBuffer as Uint8Array),
              publicKey: new Uint8Array(key.publicKeyBuffer)
            }
          })
        ).toString("base64");
      }
      return Buffer.from(
        blsSign({
          messages: data,
          keyPair: {
            secretKey: new Uint8Array(key.privateKeyBuffer as Uint8Array),
            publicKey: new Uint8Array(key.publicKeyBuffer)
          }
        })
      ).toString("base64");
    }
  };
};

/**
 * @ignore
 * Returns an object with an async verify function.
 * The verify function is bound to the KeyPair
 * and then returned by the KeyPair's verifier method.
 * @param {Bls12381G2KeyPair} key - A Bls12381G2KeyPair.
 *
 * @returns {{verify: Function}} An async verifier specific
 * to the key passed in.
 */
const bbsVerifierFactory = (key: Bls12381G2KeyPair): KeyPairVerifier => {
  if (!key.publicKeyBuffer) {
    return {
      async verify(): Promise<boolean> {
        throw new Error("No public key to verify with.");
      }
    };
  }

  return {
    async verify({ data, signature }): Promise<boolean> {
      //TODO assert data
      if (typeof data === "string") {
        return blsVerify({
          messages: [data],
          publicKey: new Uint8Array(key.publicKeyBuffer),
          signature: new Uint8Array(Buffer.from(signature, "base64"))
        }).verified;
      }
      return blsVerify({
        messages: data,
        publicKey: new Uint8Array(key.publicKeyBuffer),
        signature: new Uint8Array(Buffer.from(signature, "base64"))
      }).verified;
    }
  };
};

/**
 * A BLS12-381 based key pair
 */
export class Bls12381G2KeyPair {
  /**
   * The key id
   */
  readonly id?: string;
  /**
   * The key controller
   */
  readonly controller?: string;
  /**
   * Buffer containing the raw bytes of the private key
   */
  readonly privateKeyBuffer?: Uint8Array;
  /**
   * Buffer containing the raw bytes of the public key
   */
  readonly publicKeyBuffer: Uint8Array;
  /**
   * Type identifier for the key pair
   */
  readonly type: string = "Bls12381G2Key2020";

  /**
   * Default constructor.
   */
  constructor(options: KeyPairOptions) {
    this.id = options.id;
    this.controller = options.controller;
    this.privateKeyBuffer = options.privateKeyBase58
      ? bs58.decode(options.privateKeyBase58)
      : undefined;
    this.publicKeyBuffer = bs58.decode(options.publicKeyBase58);
  }

  /**
   * Generates a KeyPair.
   *
   * @returns {Promise<Bls12381G2KeyPair>} Generates a key pair.
   */
  static async generate(
    options?: GenerateKeyPairOptions
  ): Promise<Bls12381G2KeyPair> {
    const keyPair = options?.seed
      ? generateBls12381KeyPair(options.seed)
      : generateBls12381KeyPair();
    return new Bls12381G2KeyPair({
      ...options,
      privateKeyBase58: bs58.encode(keyPair.secretKey as Uint8Array),
      publicKeyBase58: bs58.encode(keyPair.publicKey)
    });
  }

  /**
   * Returns a signer object for use with jsonld-signatures.
   *
   * @returns {{sign: Function}} A signer for the json-ld block.
   */
  signer(): KeyPairSigner {
    return bbsSignerFactory(this);
  }

  /**
   * Returns a verifier object for use with jsonld-signatures.
   *
   * @returns {{verify: Function}} Used to verify jsonld-signatures.
   */
  verifier(): KeyPairVerifier {
    return bbsVerifierFactory(this);
  }
}
