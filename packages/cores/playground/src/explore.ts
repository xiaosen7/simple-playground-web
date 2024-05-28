import { project } from "@simple-playground-web/project";
import {
  insideDir,
  join,
  relative,
  resolve,
} from "@simple-playground-web/path";
import { ReplaySubject, Subject, Subscription, filter } from "rxjs";
// @ts-ignore
import UndoManager from "undo-manager";
import { Logger } from "@simple-playground-web/logger";

export class Explore {
  change$ = new Subject<void>();
  newFile$ = new ReplaySubject<string>();

  #undoManager = new UndoManager();
  #subscription = new Subscription();
  #logger: Logger;

  constructor(protected readonly cwd: string) {
    this.#logger = new Logger(`explore-${cwd}`);

    // event: new file in cwd
    this.#subscription.add(
      project.newFile$
        .pipe(filter((path) => insideDir(path, this.cwd)))
        .subscribe((path) => {
          this.#logger.log(`new file ${path}`);
          this.newFile$.next(path);
        })
    );
  }
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

  readFileSync(path: string, encoding: string) {
    return project.fs.readFileSync(resolve(this.cwd, path), encoding);
  }

  isDirectory(path: string) {
    return (
      project.fs.existsSync(resolve(this.cwd, path)) &&
      project.fs.statSync(resolve(this.cwd, path)).isDirectory()
    );
  }

  resolve(path: string) {
    return resolve(this.cwd, path);
  }

  relative(path: string) {
    return relative(this.cwd, path);
  }

  existsSync(path: string) {
    return project.fs.existsSync(resolve(this.cwd, path));
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
