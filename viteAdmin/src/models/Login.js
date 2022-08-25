import { message } from "antd";
import md5 from "js-md5";
import { ELocalStorage } from "../cofing/Enum";
import { bindJWTToken, requestGet, requestPost } from "../utils";
import { namespace } from "../utils/enums";
export const ELogin = namespace("NExam", {
  EPutUser: "EPutUser",
});

export default {
  namespace: ELogin.Name,
  state: {
    status: ELocalStorage.login,
    examData: null,
    editFlag: null,
    data: null,
  },
  reducers: {
    [ELogin.RSetState](state, payload) {
      return { ...state, ...payload };
    },
    [ELogin.RAdd](state, payload) {
      return { ...state, count: state.count + payload };
    },
  },
  effects: {
    async [ELogin.EPost]({ state, payload }, { reducer, select, effect }) {
      payload.password = md5(payload.password);
      const response = await requestPost("login", payload);
      const { userInfo, token } = response;
      if (token && userInfo) {
        bindJWTToken(response.token);
        message.success("登录成功");
        // 判断是否有token有就保存没有就删除
        reducer(ELogin.RSetState, {
          currentUser: userInfo,
          status: ELocalStorage.autherized,
        });
      }
    },
    // async [ELogin.EGet]({ state, payload }, { reducer, select, effect }) {
    //   const response = await requestGet("freshman");
    //   const [data] = response;
    //   reducer(ELogin.RSetState, { data: data[0] });
    // },
  },
};
