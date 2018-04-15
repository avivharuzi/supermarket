export class Product {
  public name: string;
  public category: string;
  public price: number;
  public picture: string;
  public existName?: string;
  public existPicture?: string;

  public constructor(
    _name: string, _category: string, _price: number, _picture: string,
    _existName?: string, _existPicture?: string
  ) {
    this.name = _name;
    this.category = _category;
    this.price = _price;
    this.picture = _picture;
    this.existName = _existName;
    this.existPicture = _existPicture;
  }
}
