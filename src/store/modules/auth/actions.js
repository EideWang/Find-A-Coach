let timer;
export default {
  async login(context, payload) {
    //return很重要，??
    return context.dispatch("auth", {
      ...payload,
      mode: "login",
    });
  },
  async signup(context, payload) {
    return context.dispatch("auth", {
      ...payload,
      mode: "signup",
    });
  },
  async auth(context, payload) {
    const mode = payload.mode;
    let url =
      "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDLPBr6KisWHz-G0eh8HyQITuo5iEmQ6r8";
    if (mode === "signup") {
      url =
        "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDLPBr6KisWHz-G0eh8HyQITuo5iEmQ6r8";
    }
    const response = await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        email: payload.email,
        password: payload.password,
        returnSecureToken: true,
      }),
    });
    const responseData = await response.json();
    if (!response.ok) {
      const error = new Error(responseData.message || "Failed to authenticate(login).");
      throw error;
    }

    //重要用法!!!
    const expiresIn = +responseData.expiresIn * 1000; // + 讓它確保是NUMBER
    // const expiresIn = 5000;  //test~
    const expirationDate = new Date().getTime() + expiresIn;

    localStorage.setItem("token", responseData.idToken);
    localStorage.setItem("userId", responseData.localId);
    localStorage.setItem("tokenExpiration", expirationDate);

    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    context.commit("setUser", {
      token: responseData.idToken, //according to Firebase API Doc
      userId: responseData.localId,
      // tokenExpiration: expirationDate,  //這裡其實不會用到
    });
  },
  tryLogin(context) {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const tokenExpiration = localStorage.getItem("tokenExpiration");

    const expiresIn = +tokenExpiration - new Date().getTime();
    if (expiresIn < 0) {
      //token become invalid
      return;
    }
    timer = setTimeout(() => {
      context.dispatch("autoLogout");
    }, expiresIn);

    if (token && userId) {
      context.commit("setUser", {
        token: token,
        userId: userId,
        // tokenExpiration: null,
      });
    }
  },
  logout(context) {
    //移除localStorage內暫存的data
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("tokenExpiration");
    clearTimeout(timer);
    // userId: null,
    // token: null,
    // tokenExpiration: null,
    //把index內、上面這些還原為null
    context.commit("setUser", {
      userId: null,
      token: null,
      // tokenExpiration: null,
    });
  },
  autoLogout(context) {
    context.dispatch("logout");
    context.commit("setAutoLogout");
  },
};
