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
import exampleEd25519KeyPair from "./data/did_example_b34ca6cd37bbf23_test.json";
import testDocument from "./data/test_document.json";
import testRevealDocument from "./data/test_reveal_document.json";
import testSignedDocument from "./data/test_signed_document.json";
import testSignedDocumentMultiProofs from "./data/test_signed_document_multi_proofs.json";
import testSignedDocumentMultiDifProofs from "./data/test_signed_document_multi_dif_proofs.json";
import testSignedDocumentEd25519 from "./data/test_signed_document_ed25519.json";
import testBadSignedDocument from "./data/test_bad_signed_document.json";
import testProofDocument from "./data/test_proof_document.json";
import testPartialProofDocument from "./data/test_partial_proof_document.json";
import testBadPartialProofDocument from "./data/test_bad_partial_proof_document.json";
import testVcDocument from "./data/test_vc.json";
import testSignedVcDocument from "./data/test_signed_vc.json";
import testSignedVcDocumentJwk from "./data/test_signed_vc_jwk.json";
import testRevealVcDocument from "./data/test_vc_reveal_document.json";
import testRevealVcDocumentJwk from "./data/test_vc_reveal_document_jwk.json";
import testPartialVcProof from "./data/test_partial_proof_vc_document.json";
import testRevealAllDocument from "./data/test_reveal_all_document.json";
import testNestedRevealDocument from "./data/test_nested_reveal_document.json";
import testNestedRevealFullDocument from "./data/test_nested_reveal_full_document.json";
import testNestedVcDocument from "./data/test_nested_vc_document.json";
import testSignedNestedVcDocument from "./data/test_signed_nested_vc_document.json";
import testProofNestedVcDocument from "./data/test_proof_nested_vc_document.json";
import testPartialProofNestedVcDocument from "./data/test_partial_proof_nested_vc_document.json";
import testAnonymousVcDocument from "./data/test_anonymous_vc.json";
import testRevealAnonymousVcDocument from "./data/test_anonymous_vc_reveal_document.json";
import testNestedAnonymousVcDocument from "./data/test_nested_anonymous_vc_document.json";

export {
  exampleBls12381KeyPair,
  exampleEd25519KeyPair,
  testDocument,
  testRevealDocument,
  testRevealVcDocumentJwk,
  testSignedDocument,
  testSignedDocumentMultiProofs,
  testSignedDocumentMultiDifProofs,
  testSignedDocumentEd25519,
  testProofDocument,
  testVcDocument,
  testRevealAllDocument,
  testPartialVcProof,
  testSignedVcDocument,
  testSignedVcDocumentJwk,
  testRevealVcDocument,
  testPartialProofDocument,
  testBadPartialProofDocument,
  testBadSignedDocument,
  testNestedRevealDocument,
  testNestedRevealFullDocument,
  testNestedVcDocument,
  testSignedNestedVcDocument,
  testProofNestedVcDocument,
  testPartialProofNestedVcDocument,
  customLoader,
  testAnonymousVcDocument,
  testRevealAnonymousVcDocument,
  testNestedAnonymousVcDocument
};
