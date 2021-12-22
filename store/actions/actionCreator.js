export const increaseCounterAction = (data) => ({
  type: "INCREASE_COUNTER_VAL",
  data,
});

export const onRegisterSubmitHandler = (data) => ({
  type: "INVOKE_REGISTER_API",
  data,
});

export const onLoginSubmitHandler = (data) => ({
  type: "INVOKE_LOGIN_API",
  data,
});

export const onLogoutSubmitHandler = (data) => ({
  type: "INVOKE_LOGOUT_API",
  data,
});

export const onUpdatePasswordHandler = (data) => ({
  type: "UPDATE_PASSWORD_API",
  data,
});
