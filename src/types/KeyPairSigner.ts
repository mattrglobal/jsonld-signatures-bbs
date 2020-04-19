/**
 * Key pair signer
 */
export interface KeyPairSigner {
  /**
   * Signer function
   */
  readonly sign: (options: KeyPairSignerOptions) => Promise<string>;
}

/**
 * Key pair signer options
 */
export interface KeyPairSignerOptions {
  readonly data: string | string[];
}
