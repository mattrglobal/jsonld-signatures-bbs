import jsonld from "jsonld";
import bbsContext from "./contexts/lds-bbsbls2020-v0.0.json";
import schemaOrg from "./contexts/schema_org.json";
import exampleDidKey from "./data/did_example_489398593_test.json";
import exampleDidDoc from "./data/did_example_489398593.json";

export const documents: any = {
  "https://w3c-ccg.github.io/lds-bbsbls2020/contexts": bbsContext,
  "https://schema.org": schemaOrg,
  "did:example:489398593#test": exampleDidKey,
  "did:example:489398593": exampleDidDoc
};

export const customLoader = (url: string): any => {
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
