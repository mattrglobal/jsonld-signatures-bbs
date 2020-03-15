# jsonld-signatures-bbs

The following repository contains the specification and a reference implementation for generating [linked data signatures](https://w3c-ccg.github.io/ld-proofs/) using the [BBS+ Signature Algorithm](https://eprint.iacr.org/2009/095.pdf)
using [BLS12-381](https://tools.ietf.org/id/draft-yonezawa-pairing-friendly-curves-00.html#rfc.section.2.4) key pairs.

Due to the properties of a [BBS+ Signatures](https://eprint.iacr.org/2009/095.pdf) a zero knowledge proof can be derived from the signature, whereby the party generating the proof can elect to selectively disclose statements from the originally signed payload.

## Sample Credential

The following is an example of a signed JSON-LD document featuring a BBS+ linked data signature.

```
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1"
  ],
  "type": ["VerifiableCredential", "PermanentResidentCard"],
  "issuer": "did:example:28394728934792387",
  "issuanceDate": "2019-12-03T12:19:52Z",
  "expirationDate": "2029-12-03T12:19:52Z",
  "credentialSubject": {
    "type": ["PermanentResident", "Person"],
    "givenName": "JOHN",
    "familyName": "SMITH",
    "gender": "Male",
    "image": "data:image/png;base64,iVBORw0KGgo...kJggg==",
    "residentSince": "2015-01-01",
    "lprCategory": "C09",
    "lprNumber": "999-999-999",
    "commuterClassification": "C1",
    "birthCountry": "Bahamas",
    "birthDate": "1958-07-17"
  },
  "proof": {
     "type": "BBSSignature2020",
     "signature": "eyJhbGciOiJFZERTQSIsI...wRG2fNmAx60Vi4Ag",
     "requiredRevealStatements": [ 1, 2, 3, 4, 10],
     "proofPurpose": "assertionMethod",
     "verificationMethod": "did:example:28394728934792387#keys-7f83he7s8",
     "subjectVerificationMethod": "did:example13920596349402396#keys-5920692"
  }
}
```

Whereby the subject is able to generate a zero knowledge proof, from the signed JSON-LD document of the form.

```
{
  "@context": [
    "https://www.w3.org/2018/credentials/v1",
    "https://w3id.org/citizenship/v1"
  ],
  "type": ["VerifiableCredential", "PermanentResidentCard"],
  "issuer": "did:example:28394728934792387",
  "issuanceDate": "2019-12-03T12:19:52Z",
  "expirationDate": "2029-12-03T12:19:52Z",
  "credentialSubject": {
    "type": ["PermanentResident", "Person"],
    "givenName": "JOHN",
    "familyName": "SMITH",
    "commuterClassification": "C1",
    "birthCountry": "Bahamas",
    "birthDate": "1958-07-17"
  },
  "proof": {
     "type": "BBSSignatureProof2020",
     "proof": "eyJhbGciOiJFZERTQSIsI...wRG2fNmAx60Vi4Ag",
     "domain": "did:example:relying-party",
     "subjectDomainProof": "eigqeivIenvIEiHtiW...6ChjkeIchjs"
     "requiredRevealStatements": [ 1, 2, 3, 4, 10],
     "revealedAttributes": [ 1, 2, 3, 4, 5 ],
     "totalAttributes": 10,
     "proofPurpose": "assertionMethod",
     "verificationMethod": "did:example:28394728934792387#keys-7f83he7s8"
  }
}
```

## References

- [BLS12-381 For The Rest Of Us](https://hackmd.io/@benjaminion/bls12-381)
- [Pairing-based cryptography](https://en.wikipedia.org/wiki/Pairing-based_cryptography)
- [Exploring Elliptic Curve Pairings](https://vitalik.ca/general/2017/01/14/exploring_ecp.html)
- [BBS+ Signature Scheme](https://eprint.iacr.org/2009/095.pdf)
- [Anonymous Attestation Using the Strong Diffie Hellman Assumption Revisited](https://www.researchgate.net/publication/306347781_Anonymous_Attestation_Using_the_Strong_Diffie_Hellman_Assumption_Revisited)
- [Pairing Friendly Curves Draft RFC](https://tools.ietf.org/html/draft-irtf-cfrg-pairing-friendly-curves-01)