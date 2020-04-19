/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Options for creating a proof
 */
export interface CreateProofOptions {
  /**
   * Document to create the proof for
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
}
