/**
 * Options for constructing a key pair
 */
export interface KeyPairOptions {
  /**
   * The key id
   */
  readonly id?: string;
  /**
   * The key controller
   */
  readonly controller?: string;
  /**
   * Base58 encoding of the private key
   */
  readonly privateKeyBase58?: string;
  /**
   * Base58 encoding of the public key
   */
  readonly publicKeyBase58: string;
}
