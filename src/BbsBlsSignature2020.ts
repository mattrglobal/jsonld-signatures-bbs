/* eslint-disable @typescript-eslint/no-explicit-any */
import jsonld from "jsonld";
import { suites, SECURITY_CONTEXT_URL } from "jsonld-signatures";
import {
  SignatureSuiteOptions,
  CreateProofOptions,
  CanonizeOptions,
  CreateVerifyDataOptions,
  VerifyProofOptions,
  VerifySignatureOptions,
  SuiteSignOptions
} from "./types";
import { w3cDate } from "./w3cDate";

/**
 * A BBS+ signature suite for use with BLS12-381 key pairs
 */
export class BbsBlsSignature2020 extends suites.LinkedDataProof {
  /**
   * Default constructor
   * @param options {SignatureSuiteOptions} options for constructing the signature suite
   */
  constructor(options: SignatureSuiteOptions) {
    const {
      verificationMethod,
      signer,
      key,
      date,
      useNativeCanonize
    } = options;
    // validate common options
    if (
      verificationMethod !== undefined &&
      typeof verificationMethod !== "string"
    ) {
      throw new TypeError('"verificationMethod" must be a URL string.');
    }
    super({ type: "BbsBlsSignature2020" });

    this.signer = signer;
    this.verificationMethod = verificationMethod;
    this.proofSignatureKey = "signature";
    if (key) {
      if (verificationMethod === undefined) {
        this.verificationMethod = key.id;
      }
      this.key = key;
      if (typeof key.signer === "function") {
        this.signer = key.signer();
      }
      if (typeof key.verifier === "function") {
        this.verifier = key.verifier();
      }
    }
    if (date) {
      this.date = new Date(date);
      if (isNaN(this.date)) {
        throw TypeError(`"date" "${date}" is not a valid date.`);
      }
    }
    this.useNativeCanonize = useNativeCanonize;
  }

  /**
   * @param options {CreateProofOptions} options for creating the proof
   *
   * @returns {Promise<object>} Resolves with the created proof object.
   */
  async createProof(options: CreateProofOptions): Promise<object> {
    const { document, purpose, documentLoader, expansionMap, compactProof } = options;
    
    let proof;
    if (this.proof) {
      // use proof JSON-LD document passed to API
      proof = await jsonld.compact(this.proof, SECURITY_CONTEXT_URL, {
        documentLoader,
        expansionMap,
        compactToRelative: false
      });
    } else {
      // create proof JSON-LD document
      proof = { "@context": SECURITY_CONTEXT_URL };
    }

    // ensure proof type is set
    proof.type = this.type;

    // set default `now` date if not given in `proof` or `options`
    let date = this.date;
    if (proof.created === undefined && date === undefined) {
      date = new Date();
    }

    // ensure date is in string format
    if (date !== undefined && typeof date !== "string") {
      date = w3cDate(date);
    }

    // add API overrides
    if (date !== undefined) {
      proof.created = date;
    }

    if (this.verificationMethod !== undefined) {
      proof.verificationMethod = this.verificationMethod;
    }

    // allow purpose to update the proof; the `proof` is in the
    // SECURITY_CONTEXT_URL `@context` -- therefore the `purpose` must
    // ensure any added fields are also represented in that same `@context`
    proof = await purpose.update(proof, {
      document,
      suite: this,
      documentLoader,
      expansionMap
    });
    
    // create data to sign
    const verifyData = await this.createVerifyData({
      document,
      proof,
      documentLoader,
      expansionMap,
      compactProof
    });

    // sign data
    proof = await this.sign({
      verifyData,
      document,
      proof,
      documentLoader,
      expansionMap
    });

    return proof;
  }

  /**
   * @param options {object} options for verifying the proof.
   *
   * @returns {Promise<{object}>} Resolves with the verification result.
   */
  async verifyProof(options: VerifyProofOptions): Promise<object> {
    const {
      proof,
      document,
      documentLoader,
      expansionMap,
      compactProof,
      purpose
    } = options;

    try {
      // create data to verify
      const verifyData = await this.createVerifyData({
        document,
        proof,
        documentLoader,
        expansionMap,
        compactProof
      });

      // fetch verification method
      const verificationMethod = await this.getVerificationMethod({
        proof,
        document,
        documentLoader,
        expansionMap
      });

      // verify signature on data
      const verified = await this.verifySignature({
        verifyData,
        verificationMethod,
        document,
        proof,
        documentLoader,
        expansionMap
      });
      if (!verified) {
        throw new Error("Invalid signature.");
      }

      // ensure proof was performed for a valid purpose
      const { valid, error } = await purpose.validate(proof, {
        document,
        suite: this,
        verificationMethod,
        documentLoader,
        expansionMap
      });
      if (!valid) {
        throw error;
      }

      return { verified: true };
    } catch (error) {
      return { verified: false, error };
    }
  }

  async canonize(input: any, options: CanonizeOptions): Promise<string> {
    const { documentLoader, expansionMap, skipExpansion } = options;
    return jsonld.canonize(input, {
      algorithm: "URDNA2015",
      format: "application/n-quads",
      documentLoader,
      expansionMap,
      skipExpansion,
      useNative: this.useNativeCanonize
    });
  }

  async canonizeProof(proof: any, options: CanonizeOptions): Promise<string> {
    const { documentLoader, expansionMap } = options;
    proof = { ...proof };
    delete proof.signature;
    return this.canonize(proof, {
      documentLoader,
      expansionMap,
      skipExpansion: false
    });
  }

  /**
   * @param document {CreateVerifyDataOptions} options to create verify data
   *
   * @returns {Promise<{string[]>}.
   */
  async createVerifyData(options: CreateVerifyDataOptions): Promise<string[]> {
    const { proof, document, documentLoader, expansionMap } = options;
    
    const proofStatements = await this.createVerifyProofData(proof, { documentLoader, expansionMap });
    const documentStatements = await this.createVerifyDocumentData(document, { documentLoader, expansionMap });

    // concatenate c14n proof options and c14n document
    return proofStatements.concat(documentStatements);
  }

  /**
   * @param proof to canonicalize
   * @param options to create verify data
   *
   * @returns {Promise<{string[]>}.
   */
  async createVerifyProofData(proof: any, { documentLoader, expansionMap }: any): Promise<string[]> {
    const c14nProofOptions = await this.canonizeProof(proof, {
      documentLoader,
      expansionMap
    });

    return c14nProofOptions.split("\n").filter(_ => _.length > 0);
  }

  /**
   * @param document to canonicalize
   * @param options to create verify data
   *
   * @returns {Promise<{string[]>}.
   */
  async createVerifyDocumentData(document: any, { documentLoader, expansionMap }: any): Promise<string[]> {
    const c14nDocument = await this.canonize(document, {
      documentLoader,
      expansionMap
    });

    return c14nDocument.split("\n").filter(_ => _.length > 0);
  }

  /**
   * @param document {object} to be signed.
   * @param proof {object}
   * @param documentLoader {function}
   * @param expansionMap {function}
   */
  async getVerificationMethod({ proof, documentLoader }: any): Promise<any> {
    let { verificationMethod } = proof;

    if (typeof verificationMethod === "object") {
      verificationMethod = verificationMethod.id;
    }

    if (!verificationMethod) {
      throw new Error('No "verificationMethod" found in proof.');
    }

    // Note: `expansionMap` is intentionally not passed; we can safely drop
    // properties here and must allow for it
    const {
      "@graph": [framed]
    } = await jsonld.frame(
      verificationMethod,
      {
        "@context": SECURITY_CONTEXT_URL,
        "@embed": "@always",
        id: verificationMethod
      },
      { documentLoader, compactToRelative: false }
    );
    if (!framed) {
      throw new Error(`Verification method ${verificationMethod} not found.`);
    }

    // ensure verification method has not been revoked
    if (framed.revoked !== undefined) {
      throw new Error("The verification method has been revoked.");
    }

    return framed;
  }

  /**
   * @param options {SuiteSignOptions} Options for signing.
   *
   * @returns {Promise<{object}>} the proof containing the signature value.
   */
  async sign(options: SuiteSignOptions): Promise<object> {
    const { verifyData, proof } = options;

    if (!(this.signer && typeof this.signer.sign === "function")) {
      throw new Error(
        "A signer API with sign function has not been specified."
      );
    }

    proof[this.proofSignatureKey] = await this.signer.sign({
      data: verifyData
    });
    return proof;
  }

  /**
   * @param verifyData {VerifySignatureOptions} Options to verify the signature.
   *
   * @returns {Promise<boolean>}
   */
  async verifySignature(options: VerifySignatureOptions): Promise<boolean> {
    const { verificationMethod, verifyData, proof } = options;
    let { verifier } = this;

    if (!verifier) {
      const key = await this.LDKeyClass.from(verificationMethod);
      verifier = key.verifier(key, this.alg, this.type);
    }
    return await verifier.verify({
      data: verifyData,
      signature: proof[this.proofSignatureKey]
    });
  }
}
