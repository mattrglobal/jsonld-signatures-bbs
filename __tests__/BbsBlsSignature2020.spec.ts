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

import { BbsBlsSignature2020Fixtures } from "../__fixtures__";

import jsigs from "jsonld-signatures";

import { Bls12381G2KeyPair, BbsBlsSignature2020 } from "../src";
import { customLoader } from "../tooling/documentLoader";

const key = new Bls12381G2KeyPair(BbsBlsSignature2020Fixtures.keyPair);

BbsBlsSignature2020Fixtures.documents.forEach((item: any) => {
  describe("BbsBlsSignature2020", () => {
    it(`should sign ${item.value.caseName}`, async () => {
      const signed = await jsigs.sign(item.value.document, {
        suite: new BbsBlsSignature2020({ key }),
        purpose: new jsigs.purposes.AssertionProofPurpose(),
        documentLoader: customLoader,
      });
      expect(signed).toBeDefined();
    });
  });
});

BbsBlsSignature2020Fixtures.proofs.forEach((item: any) => {
  describe("BbsBlsSignature2020", () => {
    it(`should return expected verification result for case "${item.value.caseName}"`, async () => {
      const verificationResult = await jsigs.verify(item.value.signedDocument, {
        suite: new BbsBlsSignature2020(),
        purpose: new jsigs.purposes.AssertionProofPurpose(),
        documentLoader: customLoader,
      });

      expect(verificationResult).toBeDefined();
      expect(verificationResult.verified).toEqual(item.value.result.valid);
    });
  });
});
