/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Options for creating a proof
 */
export interface CreateVerifyDataOptions {
  /**
   * Document to create the proof for
   */
  readonly document: any;
  /**
   * The proof
   */
  readonly proof: any;
  /**
   * Optional custom document loader
   */
  documentLoader?(): any;
  /**
   * Optional expansion map
   */
  expansionMap?(): any;
  /**
   * Indicates whether to compact the proof
   */
  readonly compactProof: boolean;
}
