export class serevrError extends Error {
  constructor(message = "server error") {
    super(message);
    this.name = "serevrError";
  }
}
