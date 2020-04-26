import {
  exampleBls12381KeyPair,
  exampleMultiMessage,
  exampleMultiMessageSignature,
  exampleSingleMessage,
  exampleSingleMessageSignature,
  badSignature,
  badSignatureBadLength
} from "./__fixtures__";
import { Bls12381G2KeyPair } from "../src";
import {
  DEFAULT_BLS12381_PRIVATE_KEY_LENGTH,
  DEFAULT_BLS12381_PUBLIC_KEY_LENGTH
} from "@mattrglobal/node-bbs-signatures";

const key = new Bls12381G2KeyPair(exampleBls12381KeyPair);
const { sign } = key.signer();
const { verify } = key.verifier();

describe("Bls12381G2KeyPair", () => {
  it("should generate new key", async () => {
    const myLdKey = await Bls12381G2KeyPair.generate({
      id: "test-key-id",
      controller: "test-key-controller"
    });

    expect(myLdKey.id).toBe("test-key-id");
    expect(myLdKey.type).toBe("Bls12381G2Key2020");
    expect(myLdKey.controller).toBe("test-key-controller");

    expect(myLdKey.privateKeyBuffer).toBeDefined();
    expect(myLdKey.publicKeyBuffer).toBeDefined();

    expect(myLdKey.privateKeyBuffer?.length).toBe(
      DEFAULT_BLS12381_PRIVATE_KEY_LENGTH
    );
    expect(myLdKey.publicKeyBuffer.length).toBe(
      DEFAULT_BLS12381_PUBLIC_KEY_LENGTH
    );
  });

  it.todo("should generate new key from seed");

  it("should sign single message", async () => {
    expect(typeof sign).toBe("function");
    const signature = await sign({ data: exampleSingleMessage });
    expect(signature).toBeDefined();
  });

  it("should sign multiple messages", async () => {
    expect(typeof sign).toBe("function");
    const signature = await sign({ data: exampleMultiMessage });
    expect(signature).toBeDefined();
  });

  it("should verify single message", async () => {
    expect(typeof verify).toBe("function");
    expect(
      await verify({
        data: exampleSingleMessage,
        signature: exampleSingleMessageSignature
      })
    ).toBe(true);
  });

  it("should verify multiple messages", async () => {
    expect(typeof verify).toBe("function");
    expect(
      await verify({
        data: exampleMultiMessage,
        signature: exampleMultiMessageSignature
      })
    ).toBe(true);
  });

  it("should not verify bad signature of correct length", async () => {
    expect(typeof verify).toBe("function");
    expect(
      await verify({ data: exampleSingleMessage, signature: badSignature })
    ).toBe(false);
  });

  it.skip("should not verify bad signature of incorrect length", async () => {
    expect(typeof verify).toBe("function");
    expect(
      await verify({
        data: exampleSingleMessage,
        signature: badSignatureBadLength
      })
    ).toBe(false);
  });

  it("should sign and verify multiple messages", async () => {
    expect(typeof sign).toBe("function");
    const signature = await sign({ data: exampleMultiMessage });
    expect(signature).toBeDefined();
    expect(typeof verify).toBe("function");
    expect(await verify({ data: exampleMultiMessage, signature })).toBe(true);
  });
});
