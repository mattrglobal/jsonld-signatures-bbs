/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Options for creating a proof
 */
export interface DeriveProofOptions {
  /**
   * Document outlining what statements to reveal
   */
  readonly revealDocument: any;
  /**
   * The document featuring the proof to derive from
   */
  readonly document: any;
  /**
   * The proof for the document
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
   * Nonce to include in the derived proof
   */
  readonly nonce?: string;
  /**
   * Indicates whether to compact the resulting proof
   */
  readonly compactProof: boolean;
}
