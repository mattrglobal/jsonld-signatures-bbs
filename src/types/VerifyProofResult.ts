/**
 * Result of calling verify proof
 */
export interface VerifyProofResult {
  /**
   * A boolean indicating if the verification was successful
   */
  readonly verified: boolean;
  /**
   * A string representing the error if the verification failed
   */
  readonly error?: string;
}
