export class Category {
  public name: string;
  public existName?: string;

  public constructor(
    _name: string, _existName?: string
  ) {
    this.name = _name;
    this.existName = _existName;
  }
}
