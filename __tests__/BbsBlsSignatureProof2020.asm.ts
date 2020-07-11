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

// @ts-ignore
global.WebAssembly = null;

console.log("Running asm.js fallback tests");

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

// @ts-ignore
import jsigs from "jsonld-signatures";
import { Bls12381G2KeyPair, BbsBlsSignatureProof2020 } from "../lib/index";

const key = new Bls12381G2KeyPair(exampleBls12381KeyPair);

function isFunction(value: any) {
  return typeof value === "function";
}

function assert(condition: any, message: any) {
  if (!condition) {
    throw new Error(isFunction(message) ? message() : message);
  }
}

async function shouldDeriveProof() {
  console.time("shouldDeriveProof");
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
  assert(result !== undefined, "Result should be defined");
  console.timeEnd("shouldDeriveProof");
}

shouldDeriveProof();
