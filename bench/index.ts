import { benchmark, report } from "@stablelib/benchmark";
//import { testDocument, exampleBls12381KeyPair, customLoader } from "../__tests__/__fixtures__";
import { Bls12381G2KeyPair } from "../src/Bls12381G2KeyPair";
//import { BbsBlsSignature2020 } from "../src/BbsBlsSignature2020";
//import jsigs from "jsonld-signatures";

const key = new Bls12381G2KeyPair({
    "id": "did:example:489398593#test",
    "controller": "did:example:489398593",
    "privateKeyBase58": "11111111111111114zZJPj2ePiQTLadRXMwsrDbhxjJvWh6aPQ4BCxUtQiPX",
    "publicKeyBase58": "5ctMjosGpHc3GTpB5mGUx7dNzm4W7NUf9FNnCXJxLL2xx98vEPgoSFxYzf8cypm3Bvtk7VhX7GEZJ2B65kchGiezqdTvrScc8hfwNnpX9mE21rGMo9XcJ4rHmbKPPUPT3Ghcd1rFnCFCDaFQ7oZ3Y64hFpwXGVmFz4BCxXqvf36eXUBnUFG64mV1keRsttSHNfZU66dGhVx3JMa1N3sn66nqGCujRKBtYqKb29kA4HnfsXj9aSXCJsxa795h6Kcb5un4be"
});

const document = {
    "@context": [{
                    "schema": "http://schema.org/",
                    "firstName": "schema:firstName",
                    "lastName": "schema:lastName",
                    "jobTitle": "schema:jobTitle",
                    "telephone": "schema:telephone",
                    "email": "schema:email"
                 },
                  "https://w3id.org/security/v2",
                  "https://w3c-ccg.github.io/lds-bbsbls2020/contexts" ],
    "@type": "Person",
    "firstName": "Jane",
    "lastName": "Does",
    "jobTitle": "Professor",
    "telephone": "(425) 123-4567",
    "email": "jane.doe@example.com"
};

// const sigSuite = new BbsBlsSignature2020({
//     verificationMethod: "did:example:489398593#test",
//     key,
//     useNativeCanonize: false
// });

report(
    "BLS 12-381 Key Pair Generation",
    benchmark(async () => await Bls12381G2KeyPair.generate())
);

// report(
//     "BBS Signature Generation",
//     benchmark(async () => await sigSuite.createProof({ document, compactProof: false, purpose: {} }))
// );