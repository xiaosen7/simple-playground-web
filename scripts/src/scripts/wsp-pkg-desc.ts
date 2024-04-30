import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import markdown from 'markdown-doc-builder';

import { PKG_ROOT, getRelativeFromPkgRoot } from '@/utils/path';
import { findWorkspaceProjects } from '@/utils/wsp';

import { Script } from '@/models/script';

interface IOptions {}
export default class WspPkgDesc extends Script<IOptions> {
  description = '生成工作空间项目说明到根项目的 README.md';

  async execute() {
    const content = await readFile(input, 'utf-8');
    const startAnchorIndex = content.indexOf(START_ANCHOR);
    const endAnchorIndex = content.indexOf(END_ANCHOR);
    if (startAnchorIndex < 0 || endAnchorIndex < 0) {
      console.warn('起始位置或者结束位置未找到');
      return;
    }

    await writeFile(
      input,
      `${content.slice(0, startAnchorIndex + START_ANCHOR.length)}

${await getDescMdString()}
${content.slice(endAnchorIndex)}
    `
    );
  }
}

const START_ANCHOR = '<!-- workspace packages descriptions start -->';
const END_ANCHOR = '<!-- workspace packages descriptions end -->';
const input = join(PKG_ROOT, 'README.md');

async function getDescMdString() {
  const projects = await findWorkspaceProjects({
    excludeRoot: true
  });

  const builder = markdown.newTableBuilder(0, 3).header(['包名', '目录', '描述']);

  projects.forEach(({ manifest: { name = '未命名', description }, dir }) =>
    builder.appendRow([name, `[${getRelativeFromPkgRoot(dir)}](${join(getRelativeFromPkgRoot(dir), 'README.md')})`, description])
  );

  return builder.toMarkdown();
}
