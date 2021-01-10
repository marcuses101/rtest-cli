import fs from "fs/promises";
import fsSync from "fs";
import path from "path";
import testTemplate from "./testTemplate";

export async function cli() {
  try {
    const arg = process.argv[2];
    const isDirectory =
      fsSync.existsSync(arg) && (await fs.lstat(arg)).isDirectory();
    if (isDirectory) {
      const fileNames = await fs.readdir(arg);
      const jsFiles = fileNames.filter(
        (filename) => filename.slice(-3) === ".js"
      );
      await Promise.all(
        jsFiles.map(async (fileName) => {
          const componentName = path.basename(fileName, ".js");
          const testPath = arg + "/" + componentName + ".test.js";
          const filePath = arg + "/" + fileName;
          const readFile = await fs.readFile(filePath, "utf-8");
          const isRouterTest = readFile.includes("react-router-dom");
          const testFile = testTemplate(componentName, isRouterTest);
          await fs.writeFile(testPath, testFile);
          console.log(componentName + " test created")
        })
      );
      return;
    }

    const componentName = path.basename(arg, ".js");
    const testPath = path.dirname(arg) + "/" + componentName + ".test.js";
    const readFile = await fs.readFile(arg, "utf-8");
    const isRouterTest = readFile.includes("react-router-dom");
    const testFile = testTemplate(componentName, isRouterTest);
    await fs.writeFile(testPath, testFile);
    console.log(componentName + " test created");
  } catch (error) {
    console.error(error);
  }
}
