/* eslint-disable @typescript-eslint/no-explicit-any */
/**
 * Options for verifying a signature
 */
export interface VerifySignatureOptions {
  /**
   * Document to verify
   */
  readonly document: any;
  /**
   * Array of statements to verify
   */
  readonly verifyData: string[];
  /**
   * Verification method to verify the signature against
   */
  readonly verificationMethod: string;
  /**
   * Proof to verify
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
}
