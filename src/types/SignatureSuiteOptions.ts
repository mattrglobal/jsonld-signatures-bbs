/* eslint-disable @typescript-eslint/no-explicit-any */
import { Bls12381G2KeyPair } from "src/Bls12381G2KeyPair";
import { KeyPairSigner } from "./KeyPairSigner";

/**
 * Options for constructing a signature suite
 */
export interface SignatureSuiteOptions {
  /**
   * An optional signer interface for handling the sign operation
   */
  readonly signer?: KeyPairSigner;
  /**
   * The key pair used to generate the proof
   */
  readonly key?: Bls12381G2KeyPair;
  /**
   * A key id URL to the paired public key used for verifying the proof
   */
  readonly verificationMethod?: string;
  /**
   * The `created` date to report in generated proofs
   */
  readonly date?: string | Date;
  /**
   * Indicates whether to use the native implementation
   * of RDF Dataset Normalization
   */
  readonly useNativeCanonize?: boolean;
  /**
   * Additional proof elements
   */
  readonly proof?: any;
}
