export class Order {
  public city: string;
  public street: string;
  public creditCard: string;
  public shippingDate: any;

  public constructor(
    _city: string, _street: string, _creditCard: string, _shippingDate: any
  ) {
    this.city = _city;
    this.street = _street;
    this.creditCard = _creditCard;
    this.shippingDate = _shippingDate;
  }
}
