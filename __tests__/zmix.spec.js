const { examplePrivateKey,
        examplePublicKey,
        exampleSingleMessage,
        exampleMultiMessage,
        exampleSingleMessageSignature,
        exampleMultiMessageSignature } = require("./__fixtures__");

const zmix = require("../src/zmix");

describe("zmix", () => {
    it("should generate key", async () => {
      const { publicKey, privateKey } = zmix.generateKey();
      expect(publicKey.length).toBe(192);
      expect(privateKey.length).toBe(48);
    });

    it("should create different signature from same privateKey and messages", async () => {
        const signature = zmix.signMulti(exampleMultiMessage, examplePrivateKey);
        expect(signature).not.toBe(exampleMultiMessageSignature);
    });

    it("should sign and verify messages", async () => {
        const signature = zmix.signMulti(exampleMultiMessage, examplePrivateKey);
        expect(zmix.verifyMulti(exampleMultiMessage, examplePublicKey, exampleMultiMessageSignature)).toBe(true);
    });

    it("should verify messages", async () => {
        expect(zmix.verifyMulti(exampleMultiMessage, examplePublicKey, exampleMultiMessageSignature)).toBe(true);
    });

    it("should verify message", async () => {
        expect(zmix.verify(exampleSingleMessage, examplePublicKey, exampleSingleMessageSignature)).toBe(true);
    });
});