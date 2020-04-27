/*
 * Copyright 2020 - MATTR Limited
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *     http://www.apache.org/licenses/LICENSE-2.0
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
import base58 from "bs58";

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

  it.skip("should generate new key from seed", async () => {
    const myLdKey = await Bls12381G2KeyPair.generate({
      id: "test-key-id",
      controller: "test-key-controller",
      seed: base58.decode(
        "2Dk1kmfJaZT2wbWd81piFyKBkd2ip29B3rfEpLud4bCBK3MwUXfk2z3YSLFeNojENkJzW"
      )
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

    //TODO fix me seed generation not working
    expect(myLdKey.privateKeyBuffer).toEqual(
      base58.decode("7aW6k9Wh3HuQDbUUP6NLCPt7JuWdzdwDuYEiWVb8UMdb")
    );
    expect(myLdKey.publicKeyBuffer).toEqual(
      base58.decode(
        "mwJYFHhSfyxE8EGonneXde9cSMVxHrikD8TkLWRWgeoagSBH2UNhckGg2prBTD4f7LiSzj8L5WmR4KNfGP2tunLCVNX3uUGAL3oo2mXg69Sgwxeq5z5B3RPyKRvRxJcib4B"
      )
    );
  });

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

  it("should not verify bad signature of incorrect length", async () => {
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
