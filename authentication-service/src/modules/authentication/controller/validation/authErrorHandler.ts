import { ValidationResult } from "../validation/validated";

export class AuthErrorHandler {
  static handleValidationError(validation: ValidationResult): Error | null {
    if (validation.error) {
      return new Error(validation.error);
    }

    if (!validation.isActive) {
      return new Error("Account is inactive");
    }

    if (!validation.isMethodActive) {
      return new Error(
        `Authentication method ${validation.methodAuth} is not available`
      );
    }

    return null;
  }
}
