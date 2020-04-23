/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Options for verifying a proof
 */
export interface VerifyProofOptions {
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
   * The proof
   */
  readonly proof: any;
  /**
   * The document
   */
  readonly document: any;
}
