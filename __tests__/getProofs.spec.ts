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

import { getProofs } from "../src/utilities";
import { BbsBlsSignature2020 } from "../src";
import { customLoader } from "../tooling/documentLoader";

const testSignedDocumentMultiDifProofs = {
  "@context": ["https://schema.org", "https://w3id.org/security/v3-unstable"],
  "@type": "Person",
  firstName: "Jane",
  lastName: "Does",
  jobTitle: "Professor",
  telephone: "(425) 123-4567",
  email: "jane.doe@example.com",
  proof: [
    {
      type: "BbsBlsSignature2020",
      created: "2020-10-30T04:34:10Z",
      proofPurpose: "assertionMethod",
      proofValue:
        "t+lSsiNnCYrVUzVsT1DoWMfZP5vHcXnrwo8kxSdsROv9+kTUjZWi5yEju4PZrHWwVPDP0AY2VYjDE5Y9QKYkxJ7PPg3CId2e/Wrk17Tjp31hEll7tBeMszRkTEUUb+gHSulYnYdN/Nvp/BWCekbuIg==",
      verificationMethod: "did:example:489398593#test",
    },
    {
      type: "BbsBlsSignatureProof2020",
      created: "2020-10-30T04:34:10Z",
      proofPurpose: "assertionMethod",
      proofValue:
        "t+lSsiNnCYrVUzVsT1DoWMfZP5vHcXnrwo8kxSdsROv9+kTUjZWi5yEju4PZrHWwVPDP0AY2VYjDE5Y9QKYkxJ7PPg3CId2e/Wrk17Tjp31hEll7tBeMszRkTEUUb+gHSulYnYdN/Nvp/BWCekbuIg==",
      verificationMethod: "did:example:489398593#test",
    },
  ],
};

const testDocument = {
  "@context": ["https://schema.org", "https://w3id.org/security/v3-unstable"],
  "@type": "Person",
  firstName: "Jane",
  lastName: "Does",
  jobTitle: "Professor",
  telephone: "(425) 123-4567",
  email: "jane.doe@example.com",
};

const testSignedDocumentEd25519 = {
  "@context": ["https://schema.org", "https://w3id.org/security/v3-unstable"],
  "@type": "Person",
  firstName: "Jane",
  lastName: "Does",
  jobTitle: "Professor",
  telephone: "(425) 123-4567",
  email: "jane.doe@example.com",
  proof: [
    {
      type: "Ed25519Signature2018",
      created: "2020-01-30T03:32:15Z",
      jws: "eyJhbGciOiJFZERTQSIsI...wRG2fNmAx60Vi4Ag",
      proofPurpose: "assertionMethod",
      verificationMethod: "did:example:28394728934792387#keys-7f83he7s8",
    },
  ],
};

describe("getProofs", () => {
  it("should get all proofs from document", async () => {
    const result = await getProofs({
      document: testSignedDocumentMultiDifProofs,
      documentLoader: customLoader,
    });
    expect(result).toBeDefined();
    expect(result.proofs).toBeDefined();
    expect(result.proofs.length).toEqual(2);
    expect(result.document).toBeDefined();
  });

  it("should get proofs from document filtered by type", async () => {
    const result = await getProofs({
      document: testSignedDocumentMultiDifProofs,
      proofType: BbsBlsSignature2020.proofType,
      documentLoader: customLoader,
    });
    expect(result).toBeDefined();
    expect(result.proofs).toBeDefined();
    expect(result.proofs.length).toEqual(1);
    expect(result.document).toBeDefined();
  });

  it("should return empty proof array when no proofs found", async () => {
    const result = await getProofs({
      document: testDocument,
      documentLoader: customLoader,
    });
    expect(result).toBeDefined();
    expect(result.proofs).toBeDefined();
    expect(result.proofs.length).toEqual(0);
    expect(result.document).toBeDefined();
  });

  it("should return empty proof array when no proofs found for type", async () => {
    const result = await getProofs({
      document: testSignedDocumentEd25519,
      proofType:
        "https://w3c-ccg.github.io/ldp-bbs2020/context/v1#BbsBlsSignature2020",
      documentLoader: customLoader,
    });
    expect(result).toBeDefined();
    expect(result.proofs).toBeDefined();
    expect(result.proofs.length).toEqual(0);
    expect(result.document).toBeDefined();
  });
});
