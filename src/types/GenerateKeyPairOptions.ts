/**
 * Options for generating a new key pair
 */
export interface GenerateKeyPairOptions {
  /**
   * The key id
   */
  readonly id?: string;
  /**
   * The key controller
   */
  readonly controller?: string;
  /**
   * An optional seed to derive the key pair from
   */
  readonly seed?: Uint8Array;
}
