![Mattr logo](./docs/assets/mattr-black.svg)

# jsonld-signatures-bbs

![push-master](https://github.com/mattrglobal/jsonld-signatures-bbs/workflows/push-master/badge.svg)
![push-release](https://github.com/mattrglobal/jsonld-signatures-bbs/workflows/push-release/badge.svg)
![codecov](https://codecov.io/gh/mattrglobal/jsonld-signatures-bbs/branch/master/graph/badge.svg)

The following repository contains a [linked data proof](https://w3c-ccg.github.io/ld-proofs/) implementation for creating [BBS+ Signatures](https://eprint.iacr.org/2009/095.pdf)
using [BLS12-381](https://tools.ietf.org/id/draft-yonezawa-pairing-friendly-curves-00.html#rfc.section.2.4) key pairs.

Due to the properties of a [BBS+ Signatures](https://eprint.iacr.org/2009/095.pdf), [zero knowledge proof](https://en.wikipedia.org/wiki/Zero-knowledge_proof) can be derived from the signature, where-by the party generating the proof can elect to selectively disclose statements from the originally signed payload.

**Note** At this time this project is limited to working in [node](nodejs.org) environments because the underlying cryptographic implementation is supplied by [node-bbs-signatures](https://github.com/mattrglobal/node-bbs-signatures), however we are targeting support for other parts of the JS/TS ecosystem in the near future.

## Getting started

To use this package within your project simply run

```
npm install @mattrglobal/jsonld-signatures-bbs
```

Or with [Yarn](https://yarnpkg.com/)

```
yarn add @mattrglobal/jsonld-signatures-bbs
```

## Sample

See the [sample](./sample) directory for a runnable demo.

## Examples

The following is an example of a signed JSON-LD document featuring a `BBSSignature2020` type signature.

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1"
  ],
  "id": "https://issuer.oidp.uscis.gov/credentials/83627465",
  "type": ["VerifiableCredential", "PermanentResidentCard"],
  "issuer": "did:example:489398593",
  "identifier": "83627465",
  "name": "Permanent Resident Card",
  "description": "Government of Example Permanent Resident Card.",
  "issuanceDate": "2019-12-03T12:19:52Z",
  "expirationDate": "2029-12-03T12:19:52Z",
  "credentialSubject": {
    "id": "did:example:b34ca6cd37bbf23",
    "type": ["PermanentResident", "Person"],
    "givenName": "JOHN",
    "familyName": "SMITH",
    "gender": "Male",
    "image": "data:image/png;base64,iVBORw0KGgokJggg==",
    "residentSince": "2015-01-01",
    "lprCategory": "C09",
    "lprNumber": "999-999-999",
    "commuterClassification": "C1",
    "birthCountry": "Bahamas",
    "birthDate": "1958-07-17"
  },
  "proof": {
    "type": "BbsBlsSignature2020",
    "created": "2020-04-26T04:21:07Z",
    "verificationMethod": "did:example:489398593#test",
    "proofPurpose": "assertionMethod",
    "signature": "jx2VhjyZqUT91e2OhzweJA7G2u2UvmiDtIfmr+wUWNHWno+UOAh0FaNpM8Br+5j2JBkH981/nO1I7/9PFaRrng6NXu7vzDroKtuyj6nHGkMmGq4OMmBzIqRnG3ybin/Sxmu5YwqOxPMRsWH3H+2wSA=="
  }
}
```

Whereby a zero knowledge proof disclosing only `givenName`, `familyName` and `gender` can be derived, from the above assertion using the following as the reveal document
which is a [JSON-LD frame](https://www.w3.org/TR/json-ld11-framing/).

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1"
  ],
  "type": ["VerifiableCredential", "PermanentResidentCard"],
  "credentialSubject": {
    "type": ["PermanentResident", "Person"],
    "@explicit": true,
    "givenName": {},
    "familyName": {},
    "gender": {}
  }
}
```

That gives rise to the output zero knowledge proof

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1"
  ],
  "id": "https://issuer.oidp.uscis.gov/credentials/83627465",
  "type": ["PermanentResidentCard", "VerifiableCredential"],
  "description": "Government of Example Permanent Resident Card.",
  "identifier": "83627465",
  "name": "Permanent Resident Card",
  "credentialSubject": {
    "id": "did:example:b34ca6cd37bbf23",
    "type": ["Person", "PermanentResident"],
    "familyName": "SMITH",
    "gender": "Male",
    "givenName": "JOHN"
  },
  "expirationDate": "2029-12-03T12:19:52Z",
  "issuanceDate": "2019-12-03T12:19:52Z",
  "issuer": "did:example:489398593",
  "proof": {
    "type": "BbsBlsSignatureProof2020",
    "created": "2020-04-26T04:21:07Z",
    "verificationMethod": "did:example:489398593#test",
    "proofPurpose": "assertionMethod",
    "proof": "GO/i24loDTTgUtMCGM/jivlD260k93d9ek2FxB/L2NQmZANjKd13r+8yDIrRqD5hB1HjIc1gY3Y/lwexZNUa+BAlaXBQZa8iXhYr6M9lMauZxlYuaJkyGlUiu/QwcHwDD9hpB2LK8kUvQHdYZmkBwL3Whyqptl2hkgNIdCnpqoBH+L9DmIZH9iGwrzYJ6rx/AAAAdIu4GCCrIhQ1Vb/BOlHYaer1eTC+Sukw3ypVmNNoP5pa4nDD+/UQin2HjmS8YtZNqwAAAAIMTkAU/oDTR4EcEsFcUbiM9ThFKytMZ/uGC28463I/9Bb1JAL3F23JgUHe5eJzScg7Nu2hDHpkskO4/NaExd0cA/Sle9qeoObCi6trWtR8+ZuAI5tpkiOojsKBGoU55Diy8rMyOA+ruP2+F6tptRavAAAACUiVcbDWpO7LE8hMFmAfrO+DrWd7S0T2opAk6QheOTdnUfZIO5gpCDEvXGnZ2pmnGYqcLnAjth/gwhAEfTSTrntnAJQomBJStgVS73wZgVTgchhOFO2Qbg0nFGHyhzkZJD0NSjihxQDOx45pYSaIqiF0uM4iGLh79G5xU2Av+PBqbG4ASU1kzXa8N2cE6F7osl5LYKvm+yeGl2gDktCRwrcansuuZ4RQpPFE2ZCNYlsPKrjBQ+QTgWjpHQmhtfLpVFJcFpIy4x2GUD3tkZFGKYpEm2Sc00bNzfYozLdKj4erTr17SjoHwYyHwiofPmb2PRcrknpYVJaxyrVYM9sn9gwEoI4dLJRbT66k4lgEXRJJ3Kb430WHyWuWABmJ2dd0iQ==",
    "revealStatements": [
      0,
      1,
      2,
      4,
      5,
      6,
      8,
      9,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23
    ],
    "totalStatements": 24,
    "nonce": "M/e44JTNSsfhnykE0yoD8eaYIdJARbpDIWFhu+TWwc70J5iwPHa8Q6bYQd1YjjxpV4c="
  }
}
```

## Getting started as a contributor

The following describes how to get started as a contributor to this project

### Prerequisites

The following is a list of dependencies you must install to build and contribute to this project

- [Yarn](https://yarnpkg.com/)
- [Rust](https://www.rust-lang.org/)

For more details see our [contribution guidelines](./docs/CONTRIBUTING.md)

#### Install

To install the package dependencies run:

```
yarn install --frozen-lockfile
```

#### Build

To build the project run:

```
yarn build
```

#### Test

To run the test in the project run:

```
yarn test
```

## Relevant References

- [BLS12-381 For The Rest Of Us](https://hackmd.io/@benjaminion/bls12-381)
- [Pairing-based cryptography](https://en.wikipedia.org/wiki/Pairing-based_cryptography)
- [Exploring Elliptic Curve Pairings](https://vitalik.ca/general/2017/01/14/exploring_ecp.html)
- [BBS+ Signature Scheme](https://eprint.iacr.org/2009/095.pdf)
- [Anonymous Attestation Using the Strong Diffie Hellman Assumption Revisited](https://www.researchgate.net/publication/306347781_Anonymous_Attestation_Using_the_Strong_Diffie_Hellman_Assumption_Revisited)
- [Pairing Friendly Curves Draft RFC](https://tools.ietf.org/html/draft-irtf-cfrg-pairing-friendly-curves-01)
