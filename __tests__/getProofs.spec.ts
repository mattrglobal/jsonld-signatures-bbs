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
  customLoader,
  testSignedDocumentMultiDifProofs,
  testDocument,
  testSignedDocumentEd25519
} from "./__fixtures__";

import { getProofs } from "../src/utilities";
import { BbsBlsSignature2020 } from "../src";

describe("getProofs", () => {
  it("should get all proofs from document", async () => {
    const result = await getProofs({
      document: testSignedDocumentMultiDifProofs,
      documentLoader: customLoader
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
      documentLoader: customLoader
    });
    expect(result).toBeDefined();
    expect(result.proofs).toBeDefined();
    expect(result.proofs.length).toEqual(1);
    expect(result.document).toBeDefined();
  });

  it("should return empty proof array when no proofs found", async () => {
    const result = await getProofs({
      document: testDocument,
      documentLoader: customLoader
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
      documentLoader: customLoader
    });
    expect(result).toBeDefined();
    expect(result.proofs).toBeDefined();
    expect(result.proofs.length).toEqual(0);
    expect(result.document).toBeDefined();
  });
});
