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

import { customLoader } from "./customDocumentLoader";

import exampleBls12381KeyPair from "./data/exampleBls12381KeyPair.json";
import testDocument from "./data/test_document.json";
import testRevealDocument from "./data/test_reveal_document.json";
import testSignedDocument from "./data/test_signed_document.json";
import testBadSignedDocument from "./data/test_bad_signed_document.json";
import testProofDocument from "./data/test_proof_document.json";
import testPartialProofDocument from "./data/test_partial_proof_document.json";
import testBadPartialProofDocument from "./data/test_bad_partial_proof_document.json";
import testVcDocument from "./data/test_vc.json";
import testSignedVcDocument from "./data/test_signed_vc.json";
import testRevealVcDocument from "./data/test_vc_reveal_document.json";
import testPartialVcProof from "./data/test_partial_proof_vc_document.json";
import testRevealAllDocument from "./data/test_reveal_all_document.json";

export {
  exampleBls12381KeyPair,
  testDocument,
  testRevealDocument,
  testSignedDocument,
  testProofDocument,
  testVcDocument,
  testRevealAllDocument,
  testPartialVcProof,
  testSignedVcDocument,
  testRevealVcDocument,
  testPartialProofDocument,
  testBadPartialProofDocument,
  testBadSignedDocument,
  customLoader
};
