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
  testVcDocument,
  testSignedVcDocument,
  exampleBls12381KeyPair,
  exampleEd25519KeyPair,
  testRevealVcDocument
} from "./__fixtures__";

import vc from "vc-js";
import { Ed25519KeyPair } from "crypto-ld";
import jsigs from "jsonld-signatures";
import {
  BbsBlsSignature2020,
  Bls12381G2KeyPair,
  deriveProof,
  BbsBlsSignatureProof2020
} from "../src";

const key = new Bls12381G2KeyPair(exampleBls12381KeyPair);
const ed25519Key = new Ed25519KeyPair(exampleEd25519KeyPair);

/**
 * Tests integration with vc-js
 * @see https://github.com/digitalbazaar/vc-js
 */
describe("vc-js integration", () => {
  it("should issue verifiable credential", async () => {
    const verifiableCredential = await vc.issue({
      credential: testVcDocument,
      documentLoader: customLoader,
      suite: new BbsBlsSignature2020({ key })
    });

    expect(verifiableCredential.proof).toBeDefined();
  });

  it("should verify verifiable credential", async () => {
    const result = await vc.verifyCredential({
      credential: testSignedVcDocument,
      documentLoader: customLoader,
      suite: new BbsBlsSignature2020()
    });

    expect(result.verified).toBe(true);
  });

  it("should derive and verify proof", async () => {
    const derivedProof = await deriveProof(
      testSignedVcDocument,
      testRevealVcDocument,
      {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      }
    );

    const result = await vc.verifyCredential({
      credential: derivedProof,
      documentLoader: customLoader,
      suite: new BbsBlsSignatureProof2020()
    });

    expect(result.verified).toBe(true);
  });

  it("should derive proof, create & sign presentation", async () => {
    const holder = "did:example:b34ca6cd37bbf23";
    const derivedProof = await deriveProof(
      testSignedVcDocument,
      testRevealVcDocument,
      {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      }
    );

    const presentation = vc.createPresentation({
      verifiableCredential: derivedProof,
      holder
    });

    const verifiablePresentation = await vc.signPresentation({
      presentation,
      suite: new jsigs.suites.Ed25519Signature2018({ key: ed25519Key }),
      challenge: "123",
      documentLoader: customLoader
    });

    expect(verifiablePresentation.proof).toBeDefined();
  });

  it("should derive proof, create, sign and verify presentation", async () => {
    const holder = "did:example:b34ca6cd37bbf23";
    const id = "urn:uuid:1234";
    const derivedProof = await deriveProof(
      testSignedVcDocument,
      testRevealVcDocument,
      {
        suite: new BbsBlsSignatureProof2020(),
        documentLoader: customLoader
      }
    );

    const presentation = vc.createPresentation({
      verifiableCredential: derivedProof,
      holder,
      id
    });

    const verifiablePresentation = await vc.signPresentation({
      presentation,
      suite: new jsigs.suites.Ed25519Signature2018({ key: ed25519Key }),
      challenge: "123",
      documentLoader: customLoader
    });

    const result = await vc.verify({
      presentation: verifiablePresentation,
      suite: [
        new jsigs.suites.Ed25519Signature2018(),
        new BbsBlsSignatureProof2020()
      ],
      challenge: "123",
      documentLoader: customLoader
    });

    expect(result.verified).toBe(true);
  });
});
