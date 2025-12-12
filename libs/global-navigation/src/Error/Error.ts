export class IrrecoverableError extends Error {
  constructor(message: string) {
    super(message);
    // This is important for proper instanceof checks
    Object.setPrototypeOf(this, IrrecoverableError.prototype);
    // TODO: Lana logging logic can go here
  }
}

type Severity
  = "Minor"
  | "Major"
  | "Critical"

export class RecoverableError extends Error {
  constructor(message: string, severity: Severity = "Minor") {
    super(message);
    // This is important for proper instanceof checks
    Object.setPrototypeOf(this, RecoverableError.prototype);
    if (severity !== "Minor") {
      // TODO: Lana logging logic can go here
    }
  }
}
