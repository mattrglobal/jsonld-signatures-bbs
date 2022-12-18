import fs from "fs";

/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

export const writeJsonToFile = async (fileName: string, fixture: any) => {
  await fs.promises.writeFile(
    fileName,
    Buffer.from(JSON.stringify(fixture, null, 2)),
    "utf8"
  );
};
