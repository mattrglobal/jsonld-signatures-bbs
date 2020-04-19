/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Options for signing using a signature suite
 */
export interface SuiteSignOptions {
  /**
   * Input document to sign
   */
  readonly document: any;
  /**
   * Optional custom document loader
   */
  documentLoader?(): any;
  /**
   * Optional expansion map
   */
  expansionMap?(): any;
  /**
   * The array of statements to sign
   */
  readonly verifyData: string[];
  /**
   * The proof
   */
  readonly proof: any;
}
