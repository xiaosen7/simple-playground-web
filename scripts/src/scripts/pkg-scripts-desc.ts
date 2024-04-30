import markdown from 'markdown-doc-builder';

import { PKG_ROOT, getRelativeFromPkgRoot } from '@/utils/path';
import { findWorkspaceProjects } from '@/utils/wsp';
import type { IProject } from '@/utils/wsp';

import { Script } from '@/models/script';

const START_ANCHOR = '<!-- package scripts descriptions start-->';
const END_ANCHOR = '<!-- package scripts descriptions end-->';

interface IOptions {}
export default class extends Script<IOptions> {
  description = '生成脚本说明到每个项目的 README.md';
  async execute(): Promise<void> {
    const projects = await findWorkspaceProjects();
    await Promise.all(projects.map((x) => genForProject(x)));
  }
}

async function genForProject(project: IProject) {
  const content = project.readme.content;
  const startAnchorIndex = content.indexOf(START_ANCHOR);
  const endAnchorIndex = content.indexOf(END_ANCHOR);
  if (startAnchorIndex < 0 || endAnchorIndex < 0) {
    console.warn(`${getRelativeFromPkgRoot(project.readme.filePath)} 起始位置或者结束位置未找到`);
    return;
  }

  await project.readme.write(
    `${content.slice(0, startAnchorIndex + START_ANCHOR.length)}

${await genMdString(project)}
${content.slice(endAnchorIndex)}
    `
  );
}

async function genMdString(project: IProject) {
  const builder = markdown.newTableBuilder(0, 3).header(['命令', '描述', '内容', '运行方法']);

  Object.entries(project.packageScriptsJSON.content)
    .filter(([name]) => !!project.manifest.scripts?.[name])
    .forEach(([name, desc]) =>
      builder.appendRow([
        name,
        desc,
        `\`${project.manifest.scripts![name]}\``,
        project.dir === PKG_ROOT ? `\`pnpm -w run ${name}\`` : `\`pnpm --filter="${project.manifest.name}" run ${name}\``
      ])
    );

  return builder.toMarkdown();
}
