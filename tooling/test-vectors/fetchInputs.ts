import * as path from "path";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/no-var-requires */

const isObject = (value: unknown) => value && typeof value === "object";

const resolveFixtures = (subDirectory: string) =>
  require("require-all")({
    dirname: `${__dirname}/${subDirectory}`,
    filter: /.json$/,
    map: (__: unknown, path: unknown) => {
      return `${path}`;
    },
  });

const fetchNestedFiles = <T>(name: string, input: any): ReadonlyArray<T> => {
  if (input.caseName) {
    return [
      {
        name: path.basename(name).split(".")[0] as string,
        value: input,
      } as any,
    ];
  }
  if (!isObject(input)) {
    return [];
  }

  const extractedFiles = Object.keys(input).map((key) =>
    fetchNestedFiles(key, input[key])
  );
  return Array.prototype.concat.apply([], extractedFiles);
};

export const proofInputs = fetchNestedFiles<any>(
  "",
  resolveFixtures("inputs/proofs")
).reduce((map, item) => {
  map = {
    ...map,
    [item.name]: item.value,
  };
  return map;
}, {}) as { [key: string]: any };

export const documentInputs = fetchNestedFiles<any>(
  "",
  resolveFixtures("inputs/documents")
).reduce((map, item) => {
  map = {
    ...map,
    [item.name]: item.value,
  };
  return map;
}, {}) as { [key: string]: any };
