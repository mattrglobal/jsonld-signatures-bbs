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
import { getProofs, getTypeInfo } from "./utilities";
import jsonld from "jsonld";
import { SECURITY_PROOF_URL } from "jsonld-signatures";

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
  { suite, documentLoader, expansionMap, skipProofCompaction }: any
): Promise<any> => {
  if (!suite) {
    throw new TypeError('"options.suite" is required.');
  }

  const { proofs, document } = await getProofs({
    document: proofDocument,
    proofType: suite.supportedDeriveProofType,
    documentLoader,
    expansionMap
  });

  const result = await suite.deriveProof({
    document,
    proof: proofs[0],
    revealDocument,
    documentLoader,
    expansionMap
  });

  if (!skipProofCompaction) {
    let expandedProof: any = {
      [SECURITY_PROOF_URL]: { "@graph": result.proof }
    };

    // account for type-scoped `proof` definition by getting document types
    const { types, alias } = await getTypeInfo(result.document, {
      documentLoader,
      expansionMap
    });

    expandedProof["@type"] = types;

    const ctx = jsonld.getValues(result.document, "@context");

    const compactProof = await jsonld.compact(expandedProof, ctx, {
      documentLoader,
      expansionMap,
      compactToRelative: false
    });

    delete compactProof[alias];
    delete compactProof["@context"];

    // add proof to document
    const key = Object.keys(compactProof)[0];
    jsonld.addValue(result.document, key, compactProof[key]);
  } else {
    delete result.proof["@context"];
    jsonld.addValue(result.document, "proof", result.proof);
  }

  return result.document;
};
