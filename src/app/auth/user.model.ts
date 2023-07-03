
export class User {
  constructor(
    public email: string,
    public localId: string,
    public _token: string,
    public _tokenExpirationDate: Date
  ) {
    console.log(this._tokenExpirationDate)
  }
  get token() {
    if (!this._tokenExpirationDate || new Date() > this._tokenExpirationDate) {
      return null;
    }
    return this._token;
  }
}
