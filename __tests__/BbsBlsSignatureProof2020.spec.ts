/*
 * Copyright 2020 - MATTR Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
  testRevealAllDocument,
  testProofNestedVcDocument,
  testPartialProofNestedVcDocument
} from "./__fixtures__";

import jsigs from "jsonld-signatures";
import {
  Bls12381G2KeyPair,
  BbsBlsSignatureProof2020,
  BbsBlsSignature2020
} from "../src/index";
import { getProofs } from "../src/utilities";

const key = new Bls12381G2KeyPair(exampleBls12381KeyPair);

describe("BbsBlsSignatureProof2020", () => {
  it("should derive proof", async () => {
    const suite = new BbsBlsSignatureProof2020({
      useNativeCanonize: false,
      key
    });

    const { proofs, document } = await getProofs({
      document: testSignedDocument,
      proofType: BbsBlsSignatureProof2020.supportedDerivedProofType,
      documentLoader: customLoader
    });

    let result: any = await suite.deriveProof({
      document,
      proof: proofs[0],
      revealDocument: testRevealDocument,
      documentLoader: customLoader
    });
    expect(result).toBeDefined();
  });

  it("should not verify partial derived proof with bad proof", async () => {
    const suite = new BbsBlsSignatureProof2020();

    const { proofs, document } = await getProofs({
      document: testBadPartialProofDocument,
      proofType: BbsBlsSignatureProof2020.proofType,
      documentLoader: customLoader
    });

    const result = await suite.verifyProof({
      document,
      proof: proofs[0],
      documentLoader: customLoader,
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result.verified).toBeFalsy();
  });

  it("should not derive proof with document featuring unsigned info", async () => {
    const suite = new BbsBlsSignatureProof2020();

    const input = {
      ...testSignedDocument,
      unsignedClaim: true
    };

    const { proofs, document } = await getProofs({
      document: input,
      proofType: BbsBlsSignature2020.proofType,
      documentLoader: customLoader
    });

    await expect(
      suite.deriveProof({
        document,
        proof: proofs[0],
        revealDocument: testRevealAllDocument,
        documentLoader: customLoader
      })
    ).rejects.toThrowError("Failed to create proof");
  });

  it("should not derived proof with document featuring modified info", async () => {
    const suite = new BbsBlsSignatureProof2020();

    const input = {
      ...testSignedDocument,
      email: "bad@example.com"
    };

    const { proofs, document } = await getProofs({
      document: input,
      proofType: BbsBlsSignature2020.proofType,
      documentLoader: customLoader
    });

    await expect(
      suite.deriveProof({
        document,
        proof: proofs[0],
        revealDocument: testRevealAllDocument,
        documentLoader: customLoader
      })
    ).rejects.toThrowError("Failed to create proof");
  });

  it("should not derived proof with document featuring missing info", async () => {
    const suite = new BbsBlsSignatureProof2020();

    const input = {
      ...testSignedDocument
    };

    delete input.email;

    const { proofs, document } = await getProofs({
      document: input,
      proofType: BbsBlsSignature2020.proofType,
      documentLoader: customLoader
    });

    await expect(
      suite.deriveProof({
        document,
        proof: proofs[0],
        revealDocument: testRevealAllDocument,
        documentLoader: customLoader
      })
    ).rejects.toThrowError("Failed to create proof");
  });

  it("should derive proof revealing all statements", async () => {
    const suite = new BbsBlsSignatureProof2020({
      useNativeCanonize: false,
      key
    });

    const { proofs, document } = await getProofs({
      document: testSignedDocument,
      proofType: BbsBlsSignatureProof2020.supportedDerivedProofType,
      documentLoader: customLoader
    });

    const result = await suite.deriveProof({
      document,
      proof: proofs[0],
      revealDocument: testRevealAllDocument,
      documentLoader: customLoader
    });
    expect(result).toBeDefined();
  });

  it("should derive proof from vc", async () => {
    const suite = new BbsBlsSignatureProof2020({
      useNativeCanonize: false,
      key
    });

    const { proofs, document } = await getProofs({
      document: testSignedVcDocument,
      proofType: BbsBlsSignatureProof2020.supportedDerivedProofType,
      documentLoader: customLoader
    });

    const result = await suite.deriveProof({
      document,
      proof: proofs[0],
      revealDocument: testRevealVcDocument,
      documentLoader: customLoader
    });
    expect(result).toBeDefined();
  });

  it("should verify derived proof", async () => {
    const suite = new BbsBlsSignatureProof2020();

    const { proofs, document } = await getProofs({
      document: testProofDocument,
      proofType: BbsBlsSignatureProof2020.proofType,
      documentLoader: customLoader
    });

    const result = await suite.verifyProof({
      document,
      proof: proofs[0],
      documentLoader: customLoader,
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result.verified).toBeTruthy();
  });

  it("should verify partial derived proof", async () => {
    const suite = new BbsBlsSignatureProof2020();

    const { proofs, document } = await getProofs({
      document: testPartialProofDocument,
      proofType: BbsBlsSignatureProof2020.proofType,
      documentLoader: customLoader
    });

    const result = await suite.verifyProof({
      document,
      proof: proofs[0],
      documentLoader: customLoader,
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result.verified).toBeTruthy();
  });

  it("should verify a fully revealed derived proof that uses nesting from a vc", async () => {
    const suite = new BbsBlsSignatureProof2020();

    const { proofs, document } = await getProofs({
      document: testProofNestedVcDocument,
      proofType: BbsBlsSignatureProof2020.proofType,
      documentLoader: customLoader
    });

    const result = await suite.verifyProof({
      document,
      proof: proofs[0],
      documentLoader: customLoader,
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result.verified).toBeTruthy();
  });

  it("should verify a partially revealed derived proof that uses nesting from a vc", async () => {
    const suite = new BbsBlsSignatureProof2020();

    const { proofs, document } = await getProofs({
      document: testPartialProofNestedVcDocument,
      proofType: BbsBlsSignatureProof2020.proofType,
      documentLoader: customLoader
    });

    const result = await suite.verifyProof({
      document,
      proof: proofs[0],
      documentLoader: customLoader,
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result.verified).toBeTruthy();
  });

  it("should verify partial derived proof from vc", async () => {
    const suite = new BbsBlsSignatureProof2020();

    const { proofs, document } = await getProofs({
      document: testPartialVcProof,
      proofType: BbsBlsSignatureProof2020.proofType,
      documentLoader: customLoader
    });

    const result = await suite.verifyProof({
      document,
      proof: proofs[0],
      documentLoader: customLoader,
      purpose: new jsigs.purposes.AssertionProofPurpose()
    });
    expect(result.verified).toBeTruthy();
  });
});
