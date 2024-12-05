export class InvalidCredentialsError extends Error {
  constructor() {
    super('Invalid credentials');
  }
}

export class EmailAlreadyRegisteredError extends Error {
  constructor() {
    super('Email already registered');
  }
}
