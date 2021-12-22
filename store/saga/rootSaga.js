import { call, put, takeEvery, all, takeLatest } from "redux-saga/effects";
import { hashPassword } from "../../Helpers/bcryptUtils";
import {
  changePasswordAPI,
  invokeSignInAPI,
  registerAPI,
} from "../actions/actionAPI";
import { signIn, signout } from "next-auth/client";

function* incrementCounterSagaFn(action) {
  try {
    yield put({
      type: "INCREASE_COUNTER",
      data: action.data,
    });
  } catch (e) {}
}

function* onRegisterHandlerSagaFn(action) {
  try {
    const {
      data: { email, password },
    } = action;
    console.log(email, password);
    const hashedPassword = yield call(hashPassword, password);
    console.log(hashedPassword);
    const apiResponse = yield call(registerAPI, {
      email: email,
      password: hashedPassword,
    });
    console.log(apiResponse);
  } catch (e) {
    console.log(e);
  }
}

function* onLoginSubmitHandlerSagaFn({ data }) {
  try {
    const { email, password } = data;
    console.log(email, password);
    // const hashedPassword = yield call(hashPassword, password);
    // console.log(hashedPassword);
    const response = yield call(invokeSignInAPI, {
      email,
      password,
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

function* onLogoutSubmitHandlerSagaFn({ data }) {
  try {
    const response = yield call(() => {
      signout({
        redirect: false,
      });
    });
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

function* onUpdatePasswordSubmitHandlerSagaFn({ data }) {
  try {
    console.table(data);
    const postData = {
      oldPassword: data.oldPassword,
      newPassword: yield call(hashPassword, data.newPassword),
    };
    const response = yield call(changePasswordAPI, postData);
    console.log(response);
  } catch (e) {
    console.log(e);
  }
}

function* watcherSaga() {
  yield takeLatest("INCREASE_COUNTER_VAL", incrementCounterSagaFn);
  yield takeLatest("INVOKE_REGISTER_API", onRegisterHandlerSagaFn);
  yield takeLatest("INVOKE_LOGIN_API", onLoginSubmitHandlerSagaFn);
  yield takeLatest("INVOKE_LOGOUT_API", onLogoutSubmitHandlerSagaFn);
  yield takeLatest("UPDATE_PASSWORD_API", onUpdatePasswordSubmitHandlerSagaFn);
}

export default function* rootSaga() {
  yield all([watcherSaga()]);
  // code after all-effect
}
