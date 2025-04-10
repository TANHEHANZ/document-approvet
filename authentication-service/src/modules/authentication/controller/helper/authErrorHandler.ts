import { ValidationResult } from "./validated";
import { Provider } from "@prisma/client";

const getMethodName = (provider: Provider): string => {
  const methods = {
    [Provider.GOOGLE]: "Google",
    [Provider.CI]: "CI Authentication",
    [Provider.CREDENTIALS]: "Credentials",
  };
  return methods[provider] || provider;
};

export const handleValidationError = (
  validation: ValidationResult
): Error | null => {
  if (!validation.exists) {
    return new Error("No Tienes acceso al sistema");
  }

  if (validation.error) {
    return new Error(validation.error);
  }

  if (!validation.isActive) {
    return new Error(
      `Your account is currently inactive. Please contact support.`
    );
  }

  if (!validation.isMethodActive) {
    const methodName = getMethodName(validation.methodAuth);
    return new Error(
      `${methodName} login is not available for your account. Please use another method or contact support.`
    );
  }

  return null;
};
