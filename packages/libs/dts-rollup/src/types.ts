import { PackageJson, Simplify } from "type-fest";

export type INodeModulePackageJson = Simplify<
  PackageJson & {
    name: string;
  }
>;
