import jsonld from "jsonld";
import { suites, SECURITY_CONTEXT_URL } from "jsonld-signatures";
import { createProof, verifyProof } from "@mattrglobal/node-bbs-signatures";
import { DeriveProofOptions, VerifyProofOptions, CreateVerifyDataOptions } from "./types";
import { BbsBlsSignature2020 } from "./BbsBlsSignature2020";
import { randomBytes } from "@stablelib/random";

export class BbsBlsSignatureProof2020 extends suites.LinkedDataProof {
  constructor({ useNativeCanonize, key }: any) {
    super({ type: "BbsBlsSignatureProof2020" });
    this.proofSignatureKey = "signature";
    this.key = key;
    this.useNativeCanonize = useNativeCanonize;
  }

  /**
   * Derive a proof from a proof and reveal document
   * 
   * @param options {object} options for deriving a proof.
   *
   * @returns {Promise<object>} Resolves with the derived proof object.
   */
  async deriveProof(options: DeriveProofOptions) {
    const { document, proof, revealDocument, documentLoader, expansionMap, compactProof } = options;
    let { nonce } = options;
    
    // Validate that the input proof document has a proof compatible with the suite
    if (proof.type !== "BbsBlsSignature2020") {
      throw new TypeError('proof document proof incompatible, expected proof type of BbsBlsSignature2020');
    }

    //Extract the BBS signature from the input proof
    const signature = Buffer.from(proof.signature);

    //Initialize the BBS signature suite
    const suite = new BbsBlsSignature2020({ key: this.key });

    // Get the input document statements
    let documentStatements = await suite.createVerifyDocumentData(
      document,
    {
      documentLoader,
      expansionMap,
      compactProof
    });

    // Get the proof statements 
    let proofStatements = await suite.createVerifyProofData(
      proof,
    {
      documentLoader,
      expansionMap,
      compactProof
    });

    // Transform any blank node identifiers for the input document statements into actual node identifiers
    const transformedInputDocumentStatements = documentStatements.map(element => {
      const nodeIdentifier = element.split(' ')[0];
      if (nodeIdentifier.startsWith('_:c14n')) {
        return element.replace(nodeIdentifier, `<urn:bnid:${nodeIdentifier}>`);
      }
      return element;
    });
    
    //Fetch the required JSON-LD contexts
    const ctx = jsonld.getValues(document, '@context');

    // Re-render the transformed input statements into compact jsonld to obtain the allocated node identifiers
    const compactInputProofDocument = await jsonld.compact(await jsonld.fromRDF(transformedInputDocumentStatements.join("\n")), ctx, { documentLoader });

    // Render the reveal document into jsonld compact form
    const compactRevealDocument = await jsonld.flatten(revealDocument);

    // TODO this is where we use the objectIntersection function 
    // and we need to mutate the blank node identifiers
    const revealDocumentResult = compactInputProofDocument; // also needs to compacted
    
    // Canonicalize the result reveal document
    const revealDocumentStatements = await suite.createVerifyDocumentData(
      revealDocumentResult,
      {
        documentLoader,
        expansionMap
      }
    );

    //Get the indicies of the revealed statements from the transformed input document offset
    //by the number of proof statements
    const numberOfProofStatements = proofStatements.length;
    
    //Always reveal all the statements associated to the original proof
    //these are always the first statements in the normalized form
    const proofRevealIndicies = Array.from(Array(numberOfProofStatements).keys());

    //Reveal the statements indicated from the reveal document
    const documentRevealIndicies = revealDocumentStatements.map(key =>
      transformedInputDocumentStatements.indexOf(key) + numberOfProofStatements
    );

    const revealIndicies = proofRevealIndicies.concat(documentRevealIndicies);
    
    if (!nonce){
      nonce = Buffer.from(randomBytes(50)).toString('base64');
    }

    //Combine all the input statements that 
    //were originally signed to generate the proof
    const allInputStatements = proofStatements.concat(documentStatements);

    console.log(allInputStatements);

    const outputProof = createProof({
      signature,
      publicKey: this.key.publicKeyBuffer,
      messages: allInputStatements,
      nonce: nonce,
      domainSeparationTag: "BBSSignature2020",
      revealed: revealIndicies 
    });

    const inputProof = { ...proof };

    delete inputProof.signature;
    delete inputProof.type;

    return {
      ...revealDocumentResult,
      proof: {
        type: this.type,
        ...inputProof,
        proof: Buffer.from(outputProof).toString('base64'),
        revealStatements: revealIndicies,
        totalStatements: allInputStatements.length,
        nonce
      }
    };
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

      // Get the proof statements 
      const proofStatements = await this.createVerifyProofData(proof, 
      {
        documentLoader,
        expansionMap,
      });

      // Get the document statements 
      const documentStatements = await this.createVerifyProofData(document, 
      {
        documentLoader,
        expansionMap,
      });

    // Transform the blank node identifier placeholders back into actual blank node identifiers
      const transformedDocumentStatements = documentStatements.map(element => {
        const nodeIdentifier = element.split(' ')[0];
        if (nodeIdentifier.startsWith('<urn:bnid:_:c14n')) {
          return element.replace(nodeIdentifier, nodeIdentifier.substring('<urn:bnid:'.length, nodeIdentifier.length - 1));
        }
        return element;
      });

      const statementsToVerify = proofStatements.concat(transformedDocumentStatements);

      // fetch verification method
      const verificationMethod = await this.getVerificationMethod({
        proof,
        document,
        documentLoader,
        expansionMap
      });
      
      console.log(statementsToVerify);
      console.log(proof.totalStatements);
      console.log(proof.nonce);
      console.log(proof.revealStatements);
      console.log(Buffer.from(proof.proof));

      const verified = verifyProof({
        proof: Buffer.from(proof.proof),
        publicKey: this.key.publicKeyBuffer,
        messageCount: proof.totalStatements,
        messages: statementsToVerify,
        nonce: proof.nonce,
        domainSeparationTag: "BBSSignature2020",
        revealed: proof.revealStatements
      })

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

      return { verified };
    } catch (error) {
      return { verified: false, error };
    }
  }

  async canonize(
    input: any,
    { documentLoader, expansionMap, skipExpansion }: any
  ): Promise<string> {
    return jsonld.canonize(input, {
      algorithm: "URDNA2015",
      format: "application/n-quads",
      documentLoader,
      expansionMap,
      skipExpansion,
      useNative: this.useNativeCanonize
    });
  }

  async canonizeProof(
    proof: any,
    { documentLoader, expansionMap }: any
  ): Promise<string> {
    proof = { ...proof };
    
    delete proof.totalStatements;
    delete proof.revealStatements;
    delete proof.nonce;
    delete proof.proof;

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
  async getVerificationMethod({ proof, documentLoader }: any) {
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
}
