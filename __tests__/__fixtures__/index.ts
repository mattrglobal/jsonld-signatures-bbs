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

const exampleSingleMessage = "someData";
const exampleSingleMessageSignature =
  "BB941wFBFAR0VBaD/Skk3gx5PbxMc4y1IYN0KiAnLH542Orc1gTuxNnAbh0VU3umboXUv/PZgN95UiYg9SJsp8u+IpnCiPKsKnuK3mpSsBMABoc6TBEwQutvUwdHtaSBPFg7VpF8tBdpk1c9AEiXMw==";

const exampleMultiMessage = ["test", "value"];
const exampleMultiMessageSignature =
  "CWcLcdMzvXU6pNiQHv/9/Y5QzEQpLMAfducfqOTdt/Jc6alMUGHn972ZK9aAhJTxLYGRtnvBnsQPBPgZbW+COymHfuR9jcZhoQlnfXXminowFrWHez1H0Jp4iGkHU+OlXeePg93jQW737gJs3cv8Cg==";

const badSignature =
  "AdcLcdMzvXU6pNiQHv/9/Y5QzEQpLMAfducfqOTdt/Jc6alMUGHn972ZK9aAhJTxLYGRtnvBnsQPBPgZbW+COymHfuR9jcZhoQlnfXXminowFrWHez1H0Jp4iGkHU+OlXeePg93jQW737gJs3cv8Cg==";
const badSignatureBadLength =
  "aaaaAdcLcdMzvXU6pNiQHv/9/Y5QzEQpLMAfducfqOTdt/Jc6alMUGHn972ZK9aAhJTxLYGRtnvBnsQPBPgZbW+COymHfuR9jcZhoQlnfXXminowFrWHez1H0Jp4iGkHU+OlXeePg93jQW737gJs3cv8Cg==";

export {
  exampleSingleMessage,
  exampleSingleMessageSignature,
  exampleMultiMessage,
  exampleMultiMessageSignature,
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
  badSignature,
  badSignatureBadLength,
  customLoader
};
