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
    const suite = new BbsBlsSignatureProof2020();
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
    const suite = new BbsBlsSignatureProof2020();
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
    const suite = new BbsBlsSignatureProof2020();
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
    const suite = new BbsBlsSignatureProof2020();
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
