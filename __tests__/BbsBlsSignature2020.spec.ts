import {
  exampleBls12381KeyPair,
  testDocument,
  testSignedDocument,
  testBadSignedDocument,
  customLoader,
  testVcDocument,
  testSignedVcDocument
} from "./__fixtures__";

import jsigs from "jsonld-signatures";

import { Bls12381G2KeyPair, BbsBlsSignature2020 } from "../src/index";

const key = new Bls12381G2KeyPair(exampleBls12381KeyPair);

describe("BbsBlsSignature2020", () => {
  it("should sign with jsigs", async () => {
    const signed = await jsigs.sign(testDocument, {
      suite: new BbsBlsSignature2020({ key }),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader,
      compactProof: false,
      expansionMap: undefined
    });
    console.log(JSON.stringify(signed, null, 2));
    expect(signed).toBeDefined();
  });

  it("should sign verifiable credential with jsigs", async () => {
    const signed = await jsigs.sign(testVcDocument, {
      suite: new BbsBlsSignature2020({ key }),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader,
      compactProof: false,
      expansionMap: undefined
    });
    expect(signed).toBeDefined();
  });

  it("should verify with jsigs", async () => {
    const verificationResult = await jsigs.verify(testSignedDocument, {
      suite: new BbsBlsSignature2020({ key }),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader,
      compactProof: false,
      expansionMap: undefined
    });
    expect(verificationResult).toBeDefined();
    console.log(verificationResult);
    expect(verificationResult.verified).toBeTruthy();
  });

  it("should verify verifiable credential with jsigs", async () => {
    const verificationResult = await jsigs.verify(testSignedVcDocument, {
      suite: new BbsBlsSignature2020({ key }),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader,
      compactProof: false,
      expansionMap: undefined
    });
    expect(verificationResult).toBeDefined();
    expect(verificationResult.verified).toBeTruthy();
  });

  it("should not verify bad sig with jsigs", async () => {
    const verificationResult = await jsigs.verify(testBadSignedDocument, {
      suite: new BbsBlsSignature2020({ key }),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader,
      compactProof: false,
      expansionMap: undefined
    });
    expect(verificationResult).toBeDefined();
    expect(verificationResult.verified).toBeFalsy();
  });
});
