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
  testRevealDocument,
  testSignedDocument,
  customLoader,
  testSignedVcDocument,
  testRevealVcDocument,
  testSignedDocumentMultiProofs,
  testSignedDocumentMultiDifProofs,
  testSignedDocumentEd25519,
  testNestedRevealDocument,
  testNestedRevealFullDocument,
  testSignedNestedVcDocument,
  testSignedVcDocumentJwk,
  testRevealVcDocumentJwk
} from "./__fixtures__";

import { BbsBlsSignatureProof2020, deriveProof } from "../src/index";

import jsigs from "jsonld-signatures";

describe("BbsBlsSignatureProof2020", () => {
  it("should derive proof", async () => {
    const result = await deriveProof(testSignedDocument, testRevealDocument, {
      suite: new BbsBlsSignatureProof2020(),
      documentLoader: customLoader
    });
    expect(result).toBeDefined();
  });

  it("should derive proof revealing all statements", async () => {
    const result = await deriveProof(testSignedDocument, testRevealDocument, {
      suite: new BbsBlsSignatureProof2020(),
      documentLoader: customLoader
    });
    expect(result).toBeDefined();
  });

  it("should derive proof from vc", async () => {
    const result = await deriveProof(
      testSignedVcDocument,
      testRevealVcDocument,
      {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      }
    );
    expect(result).toBeDefined();
  });

  it("should derive proofs from a document featuring multiple supporting proofs", async () => {
    const result = await deriveProof(
      testSignedDocumentMultiProofs,
      testRevealDocument,
      {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      }
    );
    expect(result).toBeDefined();
    expect(result.proof.length).toBe(2);
  });

  it("should derive proofs from a document featuring multiple different proofs with at least 1 supporting proof", async () => {
    const result = await deriveProof(
      testSignedDocumentMultiDifProofs,
      testRevealDocument,
      {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      }
    );
    expect(result).toBeDefined();

    // this returns a document with only a single proof so it should be an object rather than an array
    expect(Array.isArray(result.proof)).toBe(false);
  });

  it("should derive proofs from multiple proof documents and be able to verify them using jsonld-signatures library", async () => {
    const result = await deriveProof(
      testSignedDocumentMultiProofs,
      testRevealDocument,
      {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      }
    );

    const derivedProofVerified = await jsigs.verify(result, {
      suite: new BbsBlsSignatureProof2020(),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader
    });

    expect(result).toBeDefined();
    expect(result.proof.length).toBe(2);
    expect(derivedProofVerified.verified).toBeTruthy();
  });

  it("should derive proof from a nested document with a nested frame with all properties revealed", async () => {
    const result = await deriveProof(
      testSignedNestedVcDocument,
      testNestedRevealFullDocument,
      {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      }
    );

    expect(result).toBeDefined();
    expect(result.credentialSubject.degree.type).toBeDefined();
    expect(result.credentialSubject.degree.name).toBeDefined();
  });

  it("should derive proof and verify using jsonld-signatures library", async () => {
    const derivedProof = await deriveProof(
      testSignedVcDocumentJwk,
      testRevealVcDocumentJwk,
      {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      }
    );

    // testing if derive result includes less fields
    expect(
      Object.keys(testSignedVcDocumentJwk.credentialSubject).length
    ).toEqual(12);
    expect(Object.keys(derivedProof.credentialSubject).length).toEqual(5);

    // verifying proof is valid
    const derivedProofVerified = await jsigs.verify(derivedProof, {
      suite: new BbsBlsSignatureProof2020(),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader
    });

    expect(derivedProofVerified.verified).toBeTruthy();
  });

  it("should derive proofs from a nested document with a nested frame with selectively revealed properties", async () => {
    const result = await deriveProof(
      testSignedNestedVcDocument,
      testNestedRevealDocument,
      {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      }
    );

    expect(result).toBeDefined();
    expect(result.credentialSubject.degree.name).toBeDefined();
  });

  it("should throw an error when proofDocument is the wrong type", async () => {
    await expect(
      deriveProof(
        [testSignedDocument, testSignedDocument],
        testRevealDocument,
        {
          suite: new BbsBlsSignatureProof2020(),
          documentLoader: customLoader
        }
      )
    ).rejects.toThrowError("proofDocument should be an object not an array.");
  });

  it("should throw an error when proofDocument doesn't include a BBSBlsSignatureProof2020", async () => {
    await expect(
      deriveProof(testSignedDocumentEd25519, testRevealDocument, {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      })
    ).rejects.toThrowError(
      "There were not any proofs provided that can be used to derive a proof with this suite."
    );
  });
});
