import {
  exampleBls12381KeyPair,
  testRevealDocument,
  testSignedDocument,
  testProofDocument,
  customLoader,
  testPartialProofDocument,
  testBadPartialProofDocument,
  testSignedVcDocument,
  testRevealVcDocument,
  testPartialVcProof,
  testRevealAllDocument
} from "./__fixtures__";

import jsigs from "jsonld-signatures";
import { Bls12381G2KeyPair, BbsBlsSignatureProof2020 } from "../src/index";

const key = new Bls12381G2KeyPair(exampleBls12381KeyPair);

describe("BbsBlsSignatureProof2020", () => {
  it("should derive proof", async () => {
    jest.setTimeout(30000);
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

  it("should derive proof revealing all statements", async () => {
    jest.setTimeout(30000);
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
      revealDocument: testRevealAllDocument,
      documentLoader: customLoader,
      compactProof: false
    });
    expect(result).toBeDefined();
  });

  it("should derive proof from vc", async () => {
    jest.setTimeout(30000);
    const suite = new BbsBlsSignatureProof2020({
      useNativeCanonize: false,
      key
    });
    let document = { ...testSignedVcDocument };
    let proof = {
      "@context": jsigs.SECURITY_CONTEXT_URL,
      ...testSignedVcDocument.proof
    };
    delete document.proof;
    const result = await suite.deriveProof({
      document,
      proof,
      revealDocument: testRevealVcDocument,
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
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result.verified).toBeTruthy();
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
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result.verified).toBeTruthy();
  });

  it("should verify partial derived proof from vc", async () => {
    const suite = new BbsBlsSignatureProof2020({
      useNativeCanonize: false,
      key
    });
    let document = { ...testPartialVcProof };
    let proof = {
      "@context": jsigs.SECURITY_CONTEXT_URL,
      ...testPartialVcProof.proof
    };
    delete document.proof;
    const result = await suite.verifyProof({
      document,
      proof,
      documentLoader: customLoader,
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result.verified).toBeTruthy();
  });

  it("should not verify partial derived proof with bad proof", async () => {
    const suite = new BbsBlsSignatureProof2020({
      useNativeCanonize: false,
      key
    });
    let document = { ...testBadPartialProofDocument };
    let proof = {
      "@context": jsigs.SECURITY_CONTEXT_URL,
      ...testBadPartialProofDocument.proof
    };
    delete document.proof;
    const result = await suite.verifyProof({
      document,
      proof,
      documentLoader: customLoader,
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result.verified).toBeFalsy();
  });
});
