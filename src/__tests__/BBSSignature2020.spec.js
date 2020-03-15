const { exampleBBSLdKey,
        testDocument, 
        testSignedDocument } = require("./__fixtures__");

const jsigs = require("jsonld-signatures");

const { BLS12381KeyPair, BBSSignature2020 } = require("../index");

const key = new BLS12381KeyPair(exampleBBSLdKey);

describe("BBSSignature2020", () => {
    it("should be able to sign with jsigs", async () => {
        const signed = await jsigs.sign(testDocument, {
            suite: new BBSSignature2020({ key }),
            purpose: new jsigs.purposes.AssertionProofPurpose()
          });
        expect(signed).toBeDefined();
    });

    it("should be able to verify with jsigs", async () => {
        const signed = await jsigs.verify(testSignedDocument, {
            suite: new BBSSignature2020({ key }),
            purpose: new jsigs.purposes.AssertionProofPurpose()
          });
        expect(signed).toBeDefined();
    });
});