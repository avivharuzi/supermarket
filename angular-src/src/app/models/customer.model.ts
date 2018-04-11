export class Customer {
  public identityCard: number;
  public email: string;
  public password: string;
  public firstname: string;
  public lastname: string;
  public city: string;
  public street: string;

  public constructor(
    _identityCard: number, _email: string, _password: string, _firstname: string, _lastname: string,
    _city: string,  _street: string
  ) {
    this.identityCard = _identityCard;
    this.email = _email;
    this.password = _password;
    this.firstname = _firstname;
    this.lastname = _lastname;
    this.city = _city;
    this.street = _street;
  }
}
