import { project } from "@simple-playground-web/project";
import { join, relative, resolve } from "@simple-playground-web/path";
import { ReplaySubject, Subject } from "rxjs";
// @ts-ignore
import UndoManager from "undo-manager";

export class Explore {
  change$ = new Subject<void>();
  #undoManager = new UndoManager();

  constructor(protected readonly cwd: string) {}
  renameSync(oldPath: string, newPath: string) {
    const undo = () => {
      this.change$.next();
      project.fs.renameSync(this.resolve(newPath), this.resolve(oldPath));
    };

    const redo = () => {
      this.change$.next();
      project.fs.renameSync(this.resolve(oldPath), this.resolve(newPath));
    };

    this.#undoManager.add({
      undo,
      redo,
    });

    redo();
  }

  unlinkSync(path: string) {
    const redo = () => {
      this.change$.next();
      project.fs.unlinkSync(resolve(this.cwd, path));
    };

    const content = project.fs.readFileSync(this.resolve(path));
    const undo = () => {
      this.change$.next();
      project.fs.writeFileSync(this.resolve(path), content);
    };

    this.#undoManager.add({
      undo,
      redo,
    });

    redo();
  }

  rmdirSync(path: string) {
    const redo = () => {
      this.change$.next();
      project.fs.rmdirSync(resolve(this.cwd, path));
    };

    const files = project.fs.getFilesByPattern(
      [join(resolve(this.cwd, path), "**/*")],
      {
        onlyFiles: true,
      }
    );
    const undo = () => {
      this.change$.next();
      Object.entries(files).forEach(([path, content]) => {
        project.fs.writeFileSync(path, content);
      });
    };

    this.#undoManager.add({
      undo,
      redo,
    });

    redo();
  }

  mkdirSync(path: string) {
    const redo = () => {
      this.change$.next();
      project.fs.mkdirSync(resolve(this.cwd, path));
    };

    const undo = () => {
      this.change$.next();
      project.fs.rmdirSync(resolve(this.cwd, path));
    };

    this.#undoManager.add({
      undo,
      redo,
    });

    redo();
  }

  writeFileSync(path: string, content: string) {
    this.change$.next();
    project.fs.writeFileSync(resolve(this.cwd, path), content);
  }

  isDirectory(path: string) {
    return project.fs.statSync(resolve(this.cwd, path)).isDirectory();
  }

  resolve(path: string) {
    return resolve(this.cwd, path);
  }

  relative(path: string) {
    return relative(this.cwd, path);
  }

  undo() {
    this.#undoManager.undo();
  }

  redo() {
    this.#undoManager.redo();
  }

  hasUndo() {
    return this.#undoManager.hasUndo();
  }

  hasRedo() {
    return this.#undoManager.hasRedo();
  }
}
