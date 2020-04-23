export interface CreateProofOptions {
    readonly suite: any;
    readonly purpose: any;
    readonly documentLoader: any;
    readonly expansionMap: any;
    readonly compactProof: boolean;
  }
  
  export const createProof = (
    inputProofDocument: any,
    revealDocument: any,
    options: CreateProofOptions
  ): any => {};
  
  export * from "jsonld-signatures";