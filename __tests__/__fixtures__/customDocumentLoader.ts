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

import jsonld from "jsonld";
import { extendContextLoader } from "jsonld-signatures";
import credentialContext from "./data/credential_vocab.json";
import odrlContext from "./data/odrl.json";
import bbsContext from "./contexts/v3_unstable.json";
import exampleDidKey from "./data/did_example_489398593_test.json";
import exampleDidDoc from "./data/did_example_489398593.json";
import exampleDidb34Key from "./data/did_example_b34ca6cd37bbf23_test.json";
import exampleDidb34Doc from "./data/did_example_b34ca6cd37bbf23.json";
import citizenVocab from "./data/citizen_vocab.json";

export const documents: any = {
  "https://w3id.org/security/v3-unstable": bbsContext,
  "https://www.w3.org/2018/credentials/v1": credentialContext,
  "https://www.w3.org/ns/odrl.jsonld": odrlContext,
  "did:example:489398593#test": exampleDidKey,
  "did:example:489398593": exampleDidDoc,
  "did:example:b34ca6cd37bbf23#test": exampleDidb34Key,
  "did:example:b34ca6cd37bbf23": exampleDidb34Doc,
  "https://w3id.org/citizenship/v1": citizenVocab
};

const customDocLoader = (url: string): any => {
  const context = documents[url];

  if (context) {
    return {
      contextUrl: null, // this is for a context via a link header
      document: context, // this is the actual document that was loaded
      documentUrl: url // this is the actual context URL after redirects
    };
  }

  return jsonld.documentLoaders.node()(url);
};

export const customLoader = extendContextLoader(customDocLoader);
