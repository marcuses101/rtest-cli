import fs from 'fs/promises'
import path from 'path'
import testTemplate from "./testTemplate";

export async function cli(){
  try {
    const arg = process.argv[2];
    const componentName = path.basename(arg,'.js');
    const testPath = path.dirname(arg) + '/'  + componentName +'.test.js'
    const readFile = await fs.readFile(arg,'utf-8');
    const isRouterTest = readFile.includes('react-router-dom')
    const testFile = testTemplate(componentName,isRouterTest)
    await fs.writeFile(testPath,testFile);
    console.log(componentName + ' test created')
  } catch (error) {
    console.error(error)
  }
}