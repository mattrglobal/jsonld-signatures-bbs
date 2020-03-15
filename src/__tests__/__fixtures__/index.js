const { SECURITY_CONTEXT_URL } = require('jsonld-signatures');

const examplePublicKey = Buffer.from("BnGlrpYpsCa32iNV69kqZb2W7MaVxSYmylpF/GEm8qdQfmmBWlcAh6mL4wgO6UOgB5LUyof/ogg0tj5+1LmAIX8Y0cWAVqDeXDJyq1Fze/Lr/4ftaUY6opOYf2VIsZ+/Bu+5w/PNuENtVcX6BipfodoUWR/jrdVTw+6pvJCoySY5i5mtQDRuXbtBDZZdK7AxEop1Hb9OMcPo6TxdWn3dzRj4rYzzHy64AOJDv9tUNQpyvTEYu5weaCsUrOjPugSo", 'base64');
const examplePrivateKey = Buffer.from("AAAAAAAAAAAAAAAAAAAAACVYoaJRp13lL6FQubtQXqbg4WXEy/Ls1B0U2Cz2jazV", 'base64');

const exampleSingleMessage = "someData";
const exampleSingleMessageSignature = Buffer.from ("BA+tR/t+y/obzDZIPIYIo7dgOMRKwQe1WWE6EZsMkkMgxiT0oynsFXA/iGHJF0nERRfhwGhYXACvdswjQ3H8W7sbokBwY6Ik8qiC84eXBZPachLOwNTC4dMjazQRNHNd5wAAAAAAAAAAAAAAAAAAAABoV9W8BXoObXtQWezeQmNFc+A0IMHbFIiZtqVHQxozPgAAAAAAAAAAAAAAAAAAAAAWhaRXcITA4imXTrVP0WiboOilL8LBKENJObD02ok0Rw==", 'base64');

const exampleMultiMessage = [ "test", "value"];
const exampleMultiMessageSignature = Buffer.from("BA/PMUI7kYwuUfPHiBN20BM+jDGpqguXXnE5PisQVKQpiN41Tfp8NNbtYK9yN84ttA4AvWYutc5UfkWzlFQm+ccMfkxFHcPHn6Ym8rgggRM9wl4NP4a5jauioGqoDT+p5gAAAAAAAAAAAAAAAAAAAABZU/fOFtwB9MON2EdF8P+CRtMv7MUzNl1Fh2lAnz1BSQAAAAAAAAAAAAAAAAAAAAAC6T60Hc3hMnv+28zRHEq7FGR4Cm/80Ppv0USa4USTvQ==", 'base64');

const exampleBBSLdKey = {
    id: "did:example:489398593#test",
    controller: "did:example:489398593",
    privateKeyBase64: "AAAAAAAAAAAAAAAAAAAAACVYoaJRp13lL6FQubtQXqbg4WXEy/Ls1B0U2Cz2jazV",
    publicKeyBase64: "BnGlrpYpsCa32iNV69kqZb2W7MaVxSYmylpF/GEm8qdQfmmBWlcAh6mL4wgO6UOgB5LUyof/ogg0tj5+1LmAIX8Y0cWAVqDeXDJyq1Fze/Lr/4ftaUY6opOYf2VIsZ+/Bu+5w/PNuENtVcX6BipfodoUWR/jrdVTw+6pvJCoySY5i5mtQDRuXbtBDZZdK7AxEop1Hb9OMcPo6TxdWn3dzRj4rYzzHy64AOJDv9tUNQpyvTEYu5weaCsUrOjPugSo"
};

const exampleControllerDocument = {
  '@context': SECURITY_CONTEXT_URL,
  id: 'did:example:489398593#test',
  type: 'BLSVerificationKey2020',
  controller: 'did:example:489398593',
  publicKeyBase64: "BnGlrpYpsCa32iNV69kqZb2W7MaVxSYmylpF/GEm8qdQfmmBWlcAh6mL4wgO6UOgB5LUyof/ogg0tj5+1LmAIX8Y0cWAVqDeXDJyq1Fze/Lr/4ftaUY6opOYf2VIsZ+/Bu+5w/PNuENtVcX6BipfodoUWR/jrdVTw+6pvJCoySY5i5mtQDRuXbtBDZZdK7AxEop1Hb9OMcPo6TxdWn3dzRj4rYzzHy64AOJDv9tUNQpyvTEYu5weaCsUrOjPugSo"
}

const testDocument = {
    '@context': [{
      schema: 'http://schema.org/',
      name: 'schema:name',
      homepage: 'schema:url',
      image: 'schema:image'
    },
    SECURITY_CONTEXT_URL],
    name: 'John Doe',
    homepage: 'https://domain.com/profile'
  };

const testSignedDocument = {
  '@context': [
    {
      schema: 'http://schema.org/',
      name: 'schema:name',
      homepage: 'schema:url',
      image: 'schema:image'
    },
    SECURITY_CONTEXT_URL],
  name: 'John Doe',
  homepage: 'https://domain.com/profile',
  proof: {
    type: 'BBSSignature2020',
    created: '2020-02-20T20:14:11Z',
    proofPurpose: 'assertionMethod',
    signature: 'BBG1CAlM/92JZYMqbC2uYOdQPsGRcBKtqSWpZDrO5z+MrAPPsbMDkjsntvDQ9z+XHRj55+ge5d8j+f/gwJWjr6IWQqZNNrfziusBbjh9hqH6uxWytPar3ZFAOwbUFufbIgAAAAAAAAAAAAAAAAAAAABdE3STIrWXNQxnX8xcnymkuV0srgiRcU6peZilC4rV8gAAAAAAAAAAAAAAAAAAAAAKDfkZASeq2qEqxePIT/sCC04/oj9oyhyJ//OLOydAoA=='
  }
};

module.exports = {
    examplePublicKey,
    examplePrivateKey,
    exampleSingleMessage,
    exampleSingleMessageSignature,
    exampleMultiMessage,
    exampleMultiMessageSignature,
    exampleBBSLdKey,
    testDocument,
    testSignedDocument
};