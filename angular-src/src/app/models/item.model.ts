export class Item {
  public product: string;
  public amount: number;

  public constructor(
    _product: string, _amount: number
  ) {
    this.product = _product;
    this.amount = _amount;
  }
}
