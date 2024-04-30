import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import fg from 'fast-glob';
import { remove } from 'fs-extra';

import { SDK_ROOT, WEBSITE_ROOT, WEBSITE_TEMPLATE } from '../utils';

import { Script } from '@/models/script';

type IPathToCode = Record<string, string>;

export default class extends Script<{}> {
  protected description = '生成 playground 的模板(website/public/template.json)，需要先构建 sdk';
  async execute(): Promise<void> {
    const json: IPathToCode = {
      ...(await dirToJson(join(WEBSITE_TEMPLATE), '/', ['**/*'], (x) => x.replace('// @ts-nocheck\n', ''))),
      ...(await dirToJson(join(__dirname, '..', '..', 'node_modules', '@types/react'), '/node_modules/@types/react', ['**/*.d.ts'])),
      ...(await dirToJson(join(__dirname, '..', '..', 'node_modules', '@types/react-dom'), '/node_modules/@types/react-dom', ['**/*.d.ts'])),
      ...(await dirToJson(join(__dirname, '..', '..', 'node_modules', '@types/react-router-dom'), '/node_modules/@types/react-router-dom', [
        '**/*.d.ts'
      ])),
      ...(await dirToJson(join(SDK_ROOT, 'dist', 'src'), '/src', ['**/*']))
    };

    const publicDir = join(WEBSITE_ROOT, 'public');

    // 生成 template.json 文件
    const templateFilePath = join(publicDir, 'template.json');
    await remove(templateFilePath);
    await writeFile(templateFilePath, JSON.stringify(json), 'utf-8');

    // 生成 template-without-dts.json 文件
    const miniJson = removeDts(json);
    const templateMiniFilePath = join(publicDir, 'template-without-dts.json');
    await remove(templateMiniFilePath);
    await writeFile(templateMiniFilePath, JSON.stringify(miniJson), 'utf-8');
  }
}

async function dirToJson(dir: string, basePath = '/', files: string[], replaceContent: (content: string) => string = (x) => x) {
  const ret: IPathToCode = {};
  const filePaths = await fg(files, { cwd: dir, absolute: false, onlyFiles: true });

  await Promise.all(
    filePaths.map(async (filePath) => {
      const content = await readFile(join(dir, filePath), 'utf-8');
      ret[join(basePath, filePath)] = replaceContent(content);
    })
  );
  return ret;
}

function removeDts(pathToCode: IPathToCode) {
  const ret = { ...pathToCode };
  Object.keys(ret).forEach((key) => {
    if (key.endsWith('.d.ts')) {
      delete ret[key];
    }
  });
  return ret;
}
