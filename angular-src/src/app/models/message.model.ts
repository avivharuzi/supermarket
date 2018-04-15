export class Message {
  public type: string;
  public message: any;
  public id: number;

  public constructor (
    _type: string, _message: string
  ) {
    this.type = _type;
    this.message = _message;
    this.id = Math.floor(Math.random() * 1000000000);
  }
}
