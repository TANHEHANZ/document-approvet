export interface AuthError {
  error: string;
  error_description: string;
  error_uri?: string;
  state?: string;
}

export enum AuthErrorType {
  ACCESS_DENIED = "access_denied",
  INVALID_REQUEST = "invalid_request",
  UNAUTHORIZED_CLIENT = "unauthorized_client",
  ACCOUNT_BLOCKED = "account_blocked",
  INVALID_AUTH_METHOD = "invalid_auth_method",
  SERVER_ERROR = "server_error",
}
