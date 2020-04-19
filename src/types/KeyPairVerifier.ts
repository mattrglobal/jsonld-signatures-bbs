/**
 * Key pair verifier
 */
export interface KeyPairVerifier {
  /**
   * Key pair verify function
   */
  readonly verify: (options: KeyPairVerifierOptions) => Promise<boolean>;
}

/**
 * Key pair verifier options
 */
export interface KeyPairVerifierOptions {
  readonly data: string | string[];
  readonly signature: string;
}
