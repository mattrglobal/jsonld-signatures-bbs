/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Options for canonizing a document
 */
export interface CanonizeOptions {
  /**
   * Optional custom document loader
   */
  documentLoader?(): any;
  /**
   * Optional expansion map
   */
  expansionMap?(): any;
  /**
   * Indicates whether to skip expansion during canonization
   */
  readonly skipExpansion?: boolean;
}
