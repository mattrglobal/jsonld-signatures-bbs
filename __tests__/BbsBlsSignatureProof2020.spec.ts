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
import { Bls12381G2KeyPair, BbsBlsSignatureProof2020 } from "../src/index";
import { customLoader } from "../tooling/documentLoader";
import { getProofs } from "../src/utilities";

const key = new Bls12381G2KeyPair(BbsBlsSignature2020Fixtures.keyPair);

BbsBlsSignature2020Fixtures.derivedProofs.forEach((item: any) => {
  describe("BbsBlsSignatureProof2020", () => {
    it(`should return expected verification result for case "${item.value.caseName}"`, async () => {
      const verificationResult = await jsigs.verify(item.value.derivedProof, {
        suite: new BbsBlsSignatureProof2020(),
        purpose: new jsigs.purposes.AssertionProofPurpose(),
        documentLoader: customLoader,
      });

      expect(verificationResult).toBeDefined();
      expect(verificationResult.verified).toEqual(item.value.result.valid);
    });

    if (item.value.result.valid) {
      it(`should derive and verify proof for case "${item.value.caseName}`, async () => {
        const suite = new BbsBlsSignatureProof2020({
          useNativeCanonize: false,
          key,
        });

        const { proofs, document } = await getProofs({
          document: item.value.signedDocument,
          proofType: BbsBlsSignatureProof2020.supportedDerivedProofType,
          documentLoader: customLoader,
        });

        let result: any = await suite.deriveProof({
          document,
          proof: proofs[0],
          revealDocument: item.value.revealDocument,
          documentLoader: customLoader,
        });

        expect(result).toBeDefined();
      });
    }
  });
});
