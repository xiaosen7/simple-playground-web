export abstract class Script<TOptions extends {}> {
  protected options: TOptions;
  protected abstract readonly description: string;

  constructor(options: TOptions) {
    this.options = options;
  }

  abstract execute(): Promise<void>;
}
