import { PackageJson } from "type-fest";
import { getNodeModulePackageJson } from "./package-manifest";
import { dedent } from "ts-dedent";

export class NodeModulesVersionChecker {
  private cache = new Map<string, PackageJson>();
  addAndCheckFile(path: string) {
    const { manifest } = getNodeModulePackageJson(path);
    const { name, version } = manifest;

    if (!this.cache.has(name)) {
      this.cache.set(name, manifest);
    }

    // version conflict check
    const existingVersion = this.cache.get(name)!.version;
    if (existingVersion !== manifest.version) {
      throw new Error(
        dedent`The version of ${name} is not consistent, current version: ${version}, existing version: ${existingVersion}. 
              You may need to set resolutions in package.json like \`${name}: x.y.z\` and reinstall.`
      );
    }
  }
}
