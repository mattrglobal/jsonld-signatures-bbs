[![MATTR](./docs/assets/mattr-logo-square.svg)](https://github.com/mattrglobal)

# jsonld-signatures-bbs

![npm-version](https://badgen.net/npm/v/@mattrglobal/jsonld-signatures-bbs)
![npm-unstable-version](https://badgen.net/npm/v/@mattrglobal/jsonld-signatures-bbs/unstable)
![push-master](https://github.com/mattrglobal/jsonld-signatures-bbs/workflows/push-master/badge.svg)
![push-release](https://github.com/mattrglobal/jsonld-signatures-bbs/workflows/push-release/badge.svg)
![codecov](https://codecov.io/gh/mattrglobal/jsonld-signatures-bbs/branch/master/graph/badge.svg)

The following repository contains a [linked data proof](https://w3c-ccg.github.io/ld-proofs/) implementation for creating [BBS+ Signatures](https://github.com/mattrglobal/bbs-signatures-spec)
using [BLS12-381](https://tools.ietf.org/id/draft-yonezawa-pairing-friendly-curves-00.html#rfc.section.2.4) key pairs.

Due to the properties of a [BBS+ Signatures](https://github.com/mattrglobal/bbs-signatures-spec), [zero knowledge proof](https://en.wikipedia.org/wiki/Zero-knowledge_proof) can be derived from the signature, where-by the party generating the proof can elect to selectively disclose statements from the originally signed payload.

This library is runnable in browser and Node.js through the [WASM](https://webassembly.org/) based crypto implementation provided by [bbs-signatures](https://github.com/mattrglobal/bbs-signatures). Note [bbs-signatures](https://github.com/mattrglobal/bbs-signatures) also has an optional dependency on [node-bbs-signatures](https://github.com/mattrglobal/node-bbs-signatures) which can be used when running in [Node.JS](https://nodejs.org/en/) environments to obtain better performance. For environments that do not feature [WASM](https://webassembly.org/) support such as [react native](https://reactnative.dev/), [bbs-signatures](https://github.com/mattrglobal/bbs-signatures) includes an automatic roll back to an [asm.js](http://asmjs.org/) version but note however the performance difference between [asm.js](http://asmjs.org/) and [WASM](https://webassembly.org/) is significant, for those inclined there are runnable benchmarks in [bbs-signatures](https://github.com/mattrglobal/bbs-signatures).

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

The following is an example of a signed JSON-LD document featuring a `BbsBlsSignature2020` type signature.

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1",
    "https://w3id.org/security/bbs/v1"
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
    "proofValue": "jx2VhjyZqUT91e2OhzweJA7G2u2UvmiDtIfmr+wUWNHWno+UOAh0FaNpM8Br+5j2JBkH981/nO1I7/9PFaRrng6NXu7vzDroKtuyj6nHGkMmGq4OMmBzIqRnG3ybin/Sxmu5YwqOxPMRsWH3H+2wSA=="
  }
}
```

Whereby a zero knowledge proof disclosing only `givenName`, `familyName` and `gender` can be derived, from the above assertion using the following as the reveal document
which is a [JSON-LD frame](https://www.w3.org/TR/json-ld11-framing/).

```json
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1",
    "https://w3id.org/security/bbs/v1"
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
    "https://w3id.org/citizenship/v1",
    "https://w3id.org/security/bbs/v1"
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
    "created": "2020-05-25T23:07:10Z",
    "verificationMethod": "did:example:489398593#test",
    "proofPurpose": "assertionMethod",
    "proofValue": "ABgA/4N3qygQRJlX3gmQOlJRGbO1KTXKQUmaN02xl+FiNZUDmGfa5OoKtg0RJ4wxxA08t3Vut61G/pq4yN0bygaFk5EJF6j7zFXmz9Vc7EdlDAvUkXqPaKA8inSBNv97HiZ1o5hIpoRnepW89p4JXPVrFi8XbDARSZpCg18GUuUMaPQLHKU82M/9l8tqqG1lKBOs+sRAAAAAdKRrRPj6zAz5LPZgDZJ0J2rNJjQI+JNYbV4AYEVwW37sxQ99aGGvmBk3DL0sod1V/gAAAAJMLYjmrb92zV087wO8UtFLwMj7qJuqV9VkMDghdrrc3BGtJuQgKx2GTrOb4CQxI1bf+iG0USjTktcjTlKv3X5spg3+ihOnyve0HnMWWggAW22j8b78jbl7lkYGJvzIXTzrVJ5KdYp3tXMDTAX7CLEXAAAACVY8oocA9Bz1w42F8Yv7UAPHv4pSvunXqndFOet3kWtzYHYEbO5gc42wPQtLmTtmqP6kUbQv6ruxzRmANulB8fUfy2jah/QeHKvsp907YDnSfo2wofRxa/vzsZnVriw0UmZnP0sYjbhmCkhoQZkxhqel3IkOF+H80wzvCKCl6eq5biEFMYA4bXpDX6Ap5/6WS5SSFaJRWxW+hpR/9EuQE11sGtk2W2Wn4eBrQUgVqYgPLI+U/ONaUJrh+GVJ/XXx7xxbAUf/NeQ/13AkTnYNn1fUdiOJ2oKl1lGr59udFq2tBBsyC3msTtQPYJS084355GRBur5jnzPNJ2W6Gu3ZqqQeRrVyw1gzdhVDNOE8KUm9OQ3AvCuxo8PHNrqzNvc6VA==",
    "nonce": "37pdwue1a8FWLqgwCd0QJ0IJTFhp609KtxeCTWZGnfAVE+sOBDffYez+TY/bmVy+6z4="
  }
}
```

## Getting started as a contributor

The following describes how to get started as a contributor to this project

### Prerequisites

The following is a list of dependencies you must install to build and contribute to this project

- [Yarn](https://yarnpkg.com/)

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

## Security Policy

Please see our [security policy](./SECURITY.md) for additional details about responsible disclosure of security related issues.

---

<p align="center"><a href="https://mattr.global" target="_blank"><img height="40px" src ="./docs/assets/mattr-logo-tm.svg"></a></p><p align="center">Copyright © MATTR Limited. <a href="./LICENSE">Some rights reserved.</a><br/>“MATTR” is a trademark of MATTR Limited, registered in New Zealand and other countries.</p>
