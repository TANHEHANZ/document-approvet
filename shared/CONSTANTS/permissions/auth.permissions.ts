export const AUTH = {
  LOGIN_CREDENTIALS: "auth:login:credentials",
  LOGIN_GOOGLE: "auth:login:google",
  LOGIN_CI: "auth:login:ci",

  LOGOUT: "auth:session:logout",

  REGISTER: "auth:account:register",
  FORGOT_PASSWORD: "auth:account:forgot-password",
  RESET_PASSWORD: "auth:account:reset-password",

  VERIFY_EMAIL: "auth:verify:email",
  VERIFY_PHONE: "auth:verify:phone",

  VIEW_STATUS: "auth:status:view",
  UPDATE_STATUS: "auth:status:update",

  CHANGE_PASSWORD: "auth:security:change-password",
  TWO_FACTOR: "auth:security:2fa",
} as const;
