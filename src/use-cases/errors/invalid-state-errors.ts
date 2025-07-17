export class InvalidStateError extends Error {
  constructor() {
    super('Invalid state. Must be a valid Brazilian state abbreviation.')
  }
}
