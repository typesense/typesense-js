export default class TypesenseError extends Error {
  httpStatus?: number;
  httpBody?: string;

  // Source: https://stackoverflow.com/a/58417721/123545
  constructor(message?: string, httpBody?: string, httpStatus?: number) {
    super(message);
    this.name = new.target.name;
    this.httpBody = httpBody;
    this.httpStatus = httpStatus;
    Object.setPrototypeOf(this, new.target.prototype);
  }
}
