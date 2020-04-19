/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Options for verifying a proof
 */
export interface VerifyProofOptions {
  /**
   * Input document to sign
   */
  readonly document: any;
  /**
   * The proof purpose to specify for the generated proof
   */
  readonly purpose: any;
  /**
   * Optional custom document loader
   */
  documentLoader?(): any;
  /**
   * Optional expansion map
   */
  expansionMap?(): any;
  /**
   * Indicates whether to compact the resulting proof
   */
  readonly compactProof: boolean;
  /**
   * The array of statements to sign
   */
  readonly verifyData: string[];
  /**
   * The proof
   */
  readonly proof: any;
}
