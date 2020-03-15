const { exampleBBSLdKey, 
        exampleMultiMessage, 
        exampleMultiMessageSignature, 
        exampleSingleMessage, 
        exampleSingleMessageSignature } = require("./__fixtures__");

const { BLS12381KeyPair } = require("../src/index");

const key = new BLS12381KeyPair(exampleBBSLdKey);
const { sign, signMulti } = key.signer();
const { verify, verifyMulti } = key.verifier();

describe("BBSLinkedDataKeyPair", () => {
    it("should generate new key", async () => {
      let myLdKey = await BLS12381KeyPair.generate(
        {
            id: "test-key-id",
            controller: "test-key-controller"
        }
      );
  
      expect(myLdKey.id).toBe("test-key-id");
      expect(myLdKey.type).toBe("BLS12381KeyPair");
      expect(myLdKey.controller).toBe("test-key-controller");
  
      expect(myLdKey.privateKeyBuffer).toBeDefined();
      expect(myLdKey.publicKeyBuffer).toBeDefined();

      expect(myLdKey.privateKeyBuffer.length).toBe(48);
      expect(myLdKey.publicKeyBuffer.length).toBe(192);
    });

    it("should sign single", async () => {
        expect(typeof sign).toBe("function");
        const signature = await sign({ data: exampleSingleMessage });
        expect(signature).toBeDefined();
    });

    it("should sign multi", async () => {
        expect(typeof signMulti).toBe("function");
        const signature = await signMulti({ data: exampleMultiMessage });
        expect(signature).toBeDefined();
    });

    it("should verify single", async () => {
        expect(typeof verify).toBe("function");
        expect(await verify({ data: exampleSingleMessage, signature: exampleSingleMessageSignature })).toBe(true);
    });

    it("should verify multi", async () => {
        expect(typeof verifyMulti).toBe("function");
        expect(await verifyMulti({ data: exampleMultiMessage, signature: exampleMultiMessageSignature })).toBe(true);
    });
});