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

/* eslint-disable @typescript-eslint/no-explicit-any */
import { SECURITY_CONTEXT_URL } from "jsonld-signatures";

/**
 * Derives a proof from a document featuring a supported linked data proof
 *
 * NOTE - This is a temporary API extending JSON-LD signatures
 *
 * @param proofDocument A document featuring a linked data proof capable of proof derivation
 * @param revealDocument A document of the form of a JSON-LD frame describing the terms to selectively derive from the proof document
 * @param options Options for proof derivation
 */
export const deriveProof = async (
  proofDocument: any,
  revealDocument: any,
  { suite, documentLoader, expansionMap, compactProof }: any
): Promise<any> => {
  if (!suite) {
    throw new TypeError('"options.suite" is required.');
  }

  // shallow copy
  const document = { ...proofDocument };

  if (!document.proof) {
    throw new TypeError('"proofDocument" must contain a proof');
  }

  const proof = {
    "@context": SECURITY_CONTEXT_URL,
    ...proofDocument.proof
  };
  delete document.proof;

  return await suite.deriveProof({
    document,
    proof,
    revealDocument,
    documentLoader,
    compactProof,
    expansionMap
  });
};
