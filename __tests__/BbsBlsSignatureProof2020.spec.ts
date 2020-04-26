import {
  exampleBls12381KeyPair,
  testRevealDocument,
  testSignedDocument,
  testProofDocument,
  customLoader,
  testPartialProofDocument
} from "./__fixtures__";

import jsigs from "jsonld-signatures";
import { Bls12381G2KeyPair, BbsBlsSignatureProof2020 } from "../src/index";

const key = new Bls12381G2KeyPair(exampleBls12381KeyPair);

describe("BbsBlsSignatureProof2020", () => {
  it("should derive proof", async () => {
    const suite = new BbsBlsSignatureProof2020({
      useNativeCanonize: false,
      key
    });
    let document = { ...testSignedDocument };
    let proof = {
      "@context": jsigs.SECURITY_CONTEXT_URL,
      ...testSignedDocument.proof
    };
    delete document.proof;
    const result = await suite.deriveProof({
      document,
      proof,
      revealDocument: testRevealDocument,
      documentLoader: customLoader,
      compactProof: false
    });
    expect(result).toBeDefined();
  });

  it("should verify derived proof", async () => {
    const suite = new BbsBlsSignatureProof2020({
      useNativeCanonize: false,
      key
    });
    let document = { ...testProofDocument };
    let proof = {
      "@context": jsigs.SECURITY_CONTEXT_URL,
      ...testProofDocument.proof
    };
    delete document.proof;
    const result = await suite.verifyProof({
      document,
      proof,
      documentLoader: customLoader,
      compactProof: false,
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result).toBeDefined();
  });

  it("should verify partial derived proof", async () => {
    const suite = new BbsBlsSignatureProof2020({
      useNativeCanonize: false,
      key
    });
    let document = { ...testPartialProofDocument };
    let proof = {
      "@context": jsigs.SECURITY_CONTEXT_URL,
      ...testPartialProofDocument.proof
    };
    delete document.proof;
    const result = await suite.verifyProof({
      document,
      proof,
      documentLoader: customLoader,
      compactProof: false,
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result).toBeDefined();
  });
});
