import { customLoader } from "./customDocumentLoader";

import exampleBls12381KeyPair from "./data/exampleBls12381KeyPair.json";
import testDocument from "./data/test_document.json";
import testRevealDocument from "./data/test_reveal_document.json";
import testSignedDocument from "./data/test_signed_document.json";
import testBadSignedDocument from "./data/test_bad_signed_document.json";

const exampleSingleMessage = "someData";
const exampleSingleMessageSignature =
  "BACD71aTJws8uTbvsSehjOVyhIVSFBHqCbRqbiuPFUO+XC2H9pp8jEVS1HSQxJsdvwhSMr5WuMbgfFc6CG4VtGvrtQWBgMr0lrCvlyAfRB7eyK1fZT19RjpWH7o0f6eh6wAAAAAAAAAAAAAAAAAAAABg52W6/s5jJ8/0CG9QmY1BQl+m/csYSYNWkaytDJ3VHQAAAAAAAAAAAAAAAAAAAAALcczoyyAKR7Wof+v43lnp/x/MfxLNjkkPBtZKo1De3Q==";

const exampleMultiMessage = ["test", "value"];
const exampleMultiMessageSignature =
  "BAjpgRKXFa6RSIctsogOh0yXm3yJeAIouMMc/fi3HcRWaBf+AhnFhkAyx154dha/nAcmdYTUlphl6VoN/0DuqdQFiCBgiNmV7md4bTtNhCmJxWOmcgzuq/a5LvtZwgnSbQAAAAAAAAAAAAAAAAAAAAAg+Drbv3nNS2NY/zc0XAVGI2aLxlitdKT47B7PNGs5rAAAAAAAAAAAAAAAAAAAAABTGqgzzZTd9j0Qx19xj5QB/MJEPOjUr9UXmW8gpDkpIg==";

const badSignature =
  "cBUWXMwCBT5EGB1rAMhcpiGFNKXrRFqa7WnRunaN+SJbw94wmfeQaqYErhtGcbzmlxnyPhtR+18OozMut+Av3sfcv2Po8MOD2nro4HsRIa/KpbarmuPq1NrcGeZVckyCawAAAAAAAAAAAAAAAAAAAAAVIspGvLyk0zE4m1Xk+83neYkyycpC1StEUQFL5nKpoAAAAAAAAAAAAAAAAAAAAAA221H8eXipf5ZBAjRjrDYoK074aTBJlckbJzvJmLMxbA==";
const badSignatureBadLength =
  "ro4HsRIa/KpbarmuPq1NrcGeZVckyCawAAAAAAAAAAAAAAAAAAAAAVIspGvLyk0zE4m1Xk+83neYkyycpC1StEUQFL5nKpoAAAAAAAAAAAAAAAAAAAAAA221H8eXipf5ZBAjRjrDYoK074aTBJlckbJzvJmLMxbA==";

export {
  exampleSingleMessage,
  exampleSingleMessageSignature,
  exampleMultiMessage,
  exampleMultiMessageSignature,
  exampleBls12381KeyPair,
  testDocument,
  testRevealDocument,
  testSignedDocument,
  testBadSignedDocument,
  badSignature,
  badSignatureBadLength,
  customLoader
};
