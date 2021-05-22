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
  customLoader,
  testAnonymousVcDocument,
  testRevealAnonymousVcDocument,
  testNestedRevealDocument,
  testNestedRevealFullDocument,
  testNestedAnonymousVcDocument
} from "./__fixtures__";

import jsigs from "jsonld-signatures";
import {
  Bls12381G2KeyPair,
  BbsBlsSignatureProof2020,
  BbsBlsSignature2020,
  deriveProof
} from "../src/index";
import { getProofs } from "../src/utilities";

const key = new Bls12381G2KeyPair(exampleBls12381KeyPair);

const signDeriveVerify = async (vc: any, reveal: any, subject: any) => {
  // Issuer issues VC
  const signedVc = await jsigs.sign(vc, {
    suite: new BbsBlsSignature2020({ key }),
    purpose: new jsigs.purposes.AssertionProofPurpose(),
    documentLoader: customLoader
  });
  expect(signedVc).toBeDefined();

  // Holder verifies VC
  const verifiedVc = await jsigs.verify(signedVc, {
    suite: new BbsBlsSignature2020(),
    purpose: new jsigs.purposes.AssertionProofPurpose(),
    documentLoader: customLoader
  });
  expect(verifiedVc.verified).toBeTruthy();

  // Holder derives Proof
  const derivedProof = await deriveProof(signedVc, reveal, {
    suite: new BbsBlsSignatureProof2020(),
    documentLoader: customLoader
  });
  expect(derivedProof.credentialSubject).toEqual(subject);

  // Verifier verifies proof
  const { document, proofs } = await getProofs({
    document: derivedProof,
    proofType: BbsBlsSignatureProof2020.proofType,
    documentLoader: customLoader
  });
  const suite = new BbsBlsSignatureProof2020();
  const result = await suite.verifyProof({
    document,
    proof: proofs[0],
    documentLoader: customLoader,
    purpose: new jsigs.purposes.AssertionProofPurpose()
  });
  expect(result.verified).toBeTruthy();
};

describe("anonymous verifiable credentials with blank node identifiers", () => {
  it("should sign, derive proof, and verify proof on anonymous verifiable credential", async () => {
    await signDeriveVerify(
      testAnonymousVcDocument,
      testRevealAnonymousVcDocument,
      {
        id: "urn:bnid:_:c14n1",
        type: ["Person", "PermanentResident"],
        commuterClassification: "C1"
      }
    );
  });

  it("should sign, derive proof, and verify proof on anonymous nested and partially revealed verifiable credential", async () => {
    await signDeriveVerify(
      testNestedAnonymousVcDocument,
      testNestedRevealDocument,
      {
        id: "urn:bnid:_:c14n2",
        degree: {
          id: "urn:bnid:_:c14n1",
          type: "BachelorDegree",
          name: "Bachelor of Science and Arts"
        }
      }
    );
  });

  it("should sign, derive proof, and verify proof on anonymous nested and fully revealed verifiable credential", async () => {
    await signDeriveVerify(
      testNestedAnonymousVcDocument,
      testNestedRevealFullDocument,
      {
        id: "urn:bnid:_:c14n2",
        degree: {
          id: "urn:bnid:_:c14n1",
          type: "BachelorDegree",
          name: "Bachelor of Science and Arts",
          degreeType: "Underwater Basket Weaving"
        },
        college: "Contoso University"
      }
    );
  });
});
