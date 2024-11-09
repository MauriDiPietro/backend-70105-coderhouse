export class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = "NotFound Error";
  }
}

export class UnhautorizedError extends Error {
  constructor(message) {
    super(message);
    this.name = "Unhautorized Error";
  }
}
