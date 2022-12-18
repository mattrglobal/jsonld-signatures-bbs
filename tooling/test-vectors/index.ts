/* eslint-disable */
import { proofInputs, documentInputs } from "./fetchInputs";
import * as assets from "./inputs/testAssets.json";

import jsigs from "jsonld-signatures";
import {
  BbsBlsSignature2020,
  BbsBlsSignatureProof2020,
  Bls12381G2KeyPair,
  deriveProof,
} from "../../src";
import { customLoader } from "../documentLoader";
import { writeJsonToFile } from "./utilities";

const OUTPUT_DIRECTORY = "__fixtures__";
const PROOFS_SUB_DIRECTORY = "proofs";
const DOCUMENTS_SUB_DIRECTORY = "documents";
const DERIVED_PROOFS_SUB_DIRECTORY = "derivedProofs";

const key = new Bls12381G2KeyPair(assets.keyPair);

const generateProofCases = async (
  inputs: { [key: string]: any },
  suite: any,
  suiteName: string
) => {
  for (let i = 0; i < Object.entries(inputs).length; i++) {
    const input = Object.entries(inputs)[i];

    const data = input[1];

    let unsignedDocument = { ...data.document };

    const signed = await jsigs.sign(unsignedDocument, {
      suite,
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader,
    });

    await writeJsonToFile(
      `${OUTPUT_DIRECTORY}/${suiteName}/${PROOFS_SUB_DIRECTORY}/${input[0]}.json`,
      {
        caseName: data.caseName,
        signedDocument: signed,
        result: {
          valid: true,
        },
      }
    );

    await writeJsonToFile(
      `${OUTPUT_DIRECTORY}/${suiteName}/${DOCUMENTS_SUB_DIRECTORY}/${input[0]}.json`,
      {
        caseName: data.caseName,
        document: { ...data.document },
      }
    );
  }

  let fixtureName = Object.entries(inputs).length + 1;

  // Generate the bad (modified) signature case
  generateBadSignatureProofCase(
    `${fixtureName}`,
    Object.entries(inputs)[0],
    suite,
    suiteName
  );

  fixtureName++;

  // Generate the extra unsigned information signature case
  generateExtraUnsignedInformationProofCase(
    `${fixtureName}`,
    Object.entries(inputs)[0],
    suite,
    suiteName
  );

  fixtureName++;

  // Generate the modified information signature case
  generateModifiedInformationProofCase(
    `${fixtureName}`,
    Object.entries(inputs)[0],
    suite,
    suiteName
  );
};

const generateBadSignatureProofCase = async (
  fixtureName: string,
  input: [string, any],
  suite: string,
  suiteName: string
) => {
  let unsignedDocument = { ...input[1].document };

  let signed = await jsigs.sign(unsignedDocument, {
    suite,
    purpose: new jsigs.purposes.AssertionProofPurpose(),
    documentLoader: customLoader,
  });

  let signedDocument = { ...signed };

  signedDocument.proof.proofValue = "aaa" + signed.proof.proofValue;

  await writeJsonToFile(
    `${OUTPUT_DIRECTORY}/${suiteName}/${PROOFS_SUB_DIRECTORY}/${fixtureName}.json`,
    {
      caseName: "Person document with modified signature",
      signedDocument,
      result: {
        valid: false,
        reason: "modified signature",
      },
    }
  );
};

const generateExtraUnsignedInformationProofCase = async (
  fixtureName: string,
  input: [string, any],
  suite: string,
  suiteName: string
) => {
  let unsignedDocument = { ...input[1].document };

  let signed = await jsigs.sign(unsignedDocument, {
    suite,
    purpose: new jsigs.purposes.AssertionProofPurpose(),
    documentLoader: customLoader,
  });

  let signedDocument = { ...signed };

  signedDocument.unsignedValue = true;

  await writeJsonToFile(
    `${OUTPUT_DIRECTORY}/${suiteName}/${PROOFS_SUB_DIRECTORY}/${fixtureName}.json`,
    {
      caseName: "Person document with extra unsigned information",
      signedDocument,
      result: {
        valid: false,
        reason: "extra unsigned information",
      },
    }
  );
};

const generateModifiedInformationProofCase = async (
  fixtureName: string,
  input: [string, any],
  suite: string,
  suiteName: string
) => {
  let unsignedDocument = { ...input[1].document };

  let signed = await jsigs.sign(unsignedDocument, {
    suite,
    purpose: new jsigs.purposes.AssertionProofPurpose(),
    documentLoader: customLoader,
  });

  let signedDocument = { ...signed };

  signedDocument.firstName = "John";

  await writeJsonToFile(
    `${OUTPUT_DIRECTORY}/${suiteName}/${PROOFS_SUB_DIRECTORY}/${fixtureName}.json`,
    {
      caseName: "Person document with modified information",
      signedDocument,
      result: {
        valid: false,
        reason: "modified information",
      },
    }
  );
};

const generateDerivedProofCases = async (
  inputs: { [key: string]: any },
  suite: any,
  proofSuite: any,
  suiteName: string
) => {
  for (let i = 0; i < Object.entries(inputs).length; i++) {
    const input = Object.entries(inputs)[i];

    const data = input[1];

    let unsignedDocument = { ...data.document };

    const signed = await jsigs.sign(data.document, {
      suite,
      purpose: new jsigs.purposes.AssertionProofPurpose(),
      documentLoader: customLoader,
    });

    // Derives Proof
    const derivedProof = await deriveProof(signed, data.revealDocument, {
      suite: proofSuite,
      documentLoader: customLoader,
    });

    // TODO why is it adding more than just the defined cases?

    await writeJsonToFile(
      `${OUTPUT_DIRECTORY}/${suiteName}/${DERIVED_PROOFS_SUB_DIRECTORY}/${input[0]}.json`,
      {
        caseName: data.caseName,
        unsignedDocument,
        signedDocument: signed,
        revealDocument: data.revealDocument,
        derivedProof: derivedProof,
        result: {
          valid: true,
        },
      }
    );
  }

  let fixtureName = Object.entries(inputs).length + 1;

  // Generate the extra unsigned information proof case
  generateExtraUnsignedInformationDerivedProofCase(
    `${fixtureName}`,
    Object.entries(inputs)[0],
    suite,
    proofSuite,
    suiteName
  );

  fixtureName++;

  // Generate the modified information proof case
  generateModifiedInformationDerivedProofCase(
    `${fixtureName}`,
    Object.entries(inputs)[0],
    suite,
    proofSuite,
    suiteName
  );
};

const generateExtraUnsignedInformationDerivedProofCase = async (
  fixtureName: string,
  input: [string, any],
  suite: any,
  proofSuite: any,
  suiteName: string
) => {
  const data = input[1];

  let unsignedDocument = { ...data.document };

  const signed = await jsigs.sign(data.document, {
    suite,
    purpose: new jsigs.purposes.AssertionProofPurpose(),
    documentLoader: customLoader,
  });

  // Derives Proof
  const derivedProof = await deriveProof(signed, data.revealDocument, {
    suite: proofSuite,
    documentLoader: customLoader,
  });

  let derivedProofModified = { ...derivedProof };

  derivedProofModified.unsignedValue = true;

  await writeJsonToFile(
    `${OUTPUT_DIRECTORY}/${suiteName}/${DERIVED_PROOFS_SUB_DIRECTORY}/${fixtureName}.json`,
    {
      caseName: "Person document with extra unsigned information",
      signedDocument: unsignedDocument,
      revealDocument: data.revealDocument,
      derivedProof: derivedProofModified,
      result: {
        valid: false,
        reason: "extra unsigned information",
      },
    }
  );
};

const generateModifiedInformationDerivedProofCase = async (
  fixtureName: string,
  input: [string, any],
  suite: any,
  proofSuite: any,
  suiteName: string
) => {
  const data = input[1];

  let unsignedDocument = { ...data.document };

  let signed = await jsigs.sign(unsignedDocument, {
    suite,
    purpose: new jsigs.purposes.AssertionProofPurpose(),
    documentLoader: customLoader,
  });

  // Derives Proof
  const derivedProof = await deriveProof(signed, data.revealDocument, {
    suite: proofSuite,
    documentLoader: customLoader,
  });

  let derivedProofModified = { ...derivedProof };

  derivedProofModified.firstName = "John";

  await writeJsonToFile(
    `${OUTPUT_DIRECTORY}/${suiteName}/${DERIVED_PROOFS_SUB_DIRECTORY}/${fixtureName}.json`,
    {
      caseName: "Person document with modified information",
      signedDocument: unsignedDocument,
      revealDocument: data.revealDocument,
      derivedProof: derivedProofModified,
      result: {
        valid: false,
        reason: "modified information",
      },
    }
  );
};

const main = async () => {
  // TODO check folder is created?

  // Generate the fixtures for proof generation
  await generateProofCases(
    documentInputs,
    new BbsBlsSignature2020({ key }),
    "BbsBlsSignature2020"
  );

  // Generate the fixtures for derived proof generation
  await generateDerivedProofCases(
    proofInputs,
    new BbsBlsSignature2020({ key }),
    new BbsBlsSignatureProof2020(),
    "BbsBlsSignature2020"
  );
};

main();
