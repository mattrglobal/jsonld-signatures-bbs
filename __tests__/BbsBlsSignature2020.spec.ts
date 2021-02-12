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
      documentLoader: customLoader
    });
    expect(signed).toBeDefined();
  });

  it("should verify with jsigs", async () => {
    const verificationResult = await jsigs.verify(testSignedDocument, {
      suite: new BbsBlsSignature2020(),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader
    });

    expect(verificationResult).toBeDefined();
    expect(verificationResult.verified).toBeTruthy();
  });

  it("should not verify bad sig with jsigs", async () => {
    const verificationResult = await jsigs.verify(testBadSignedDocument, {
      suite: new BbsBlsSignature2020(),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader
    });
    expect(verificationResult).toBeDefined();
    expect(verificationResult.verified).toBeFalsy();
  });

  it("should not verify with additional unsigned information with jsigs", async () => {
    const modfiedDocument = {
      ...testSignedDocument,
      unsignedClaim: "oops"
    };

    const verificationResult = await jsigs.verify(modfiedDocument, {
      suite: new BbsBlsSignature2020(),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader
    });
    expect(verificationResult).toBeDefined();
    expect(verificationResult.verified).toBeFalsy();
  });

  it("should not verify with modified statement", async () => {
    const modfiedDocument = {
      ...testSignedDocument,
      email: "someOtherEmail@example.com"
    };

    const verificationResult = await jsigs.verify(modfiedDocument, {
      suite: new BbsBlsSignature2020(),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader
    });
    expect(verificationResult).toBeDefined();
    expect(verificationResult.verified).toBeFalsy();
  });

  it("should sign verifiable credential with jsigs", async () => {
    const signed = await jsigs.sign(testVcDocument, {
      suite: new BbsBlsSignature2020({ key }),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader
    });
    expect(signed).toBeDefined();
  });

  it("should verify verifiable credential with jsigs", async () => {
    const verificationResult = await jsigs.verify(testSignedVcDocument, {
      suite: new BbsBlsSignature2020(),
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader
    });
    expect(verificationResult).toBeDefined();
    expect(verificationResult.verified).toBeTruthy();
  });
});
