import { message } from "antd";
import { bindJWTToken, requestPost } from "../utils";
import { EFunctionKey } from "../utils/enums"
import { Md5 } from 'ts-md5';
import { ELocalStorage } from "../cofing/Enum";
import { IUserInfo, IRoleInfo } from "../interface/IUserInfo";
enum ENameSpace {
    EPosLogin = 'EPosLogin'
}
export const ELogin = { ...EFunctionKey, ...ENameSpace, Name: "ELogin" };
export default {
    namespace: ELogin.Name,
    state: {
        currentUser: null,
        roleInfo: null,
        status: ELocalStorage.Loading
    },
    reducers: {
        [ELogin.RSetState](state: any, payload: any) {
            return { ...state, ...payload };
        },
        [ELogin.RAdd](state: { count: any; }, payload: any) {
            return { ...state, count: state.count + payload };
        },
    },
    effects: {
        async [ELogin.EPost]({ state, payload }: any, { reducer, select, effect }: any) {
            payload.password = Md5.hashAsciiStr(payload.password)
            const resolve: any = await requestPost('login', payload)
            const { token, roleInfo }: { token: string, userInfo: IUserInfo, roleInfo: IRoleInfo } = resolve
            if (token) {
                bindJWTToken(token)
                message.success('登入成功')
                reducer(ELogin.RSetState, { currentUser: resolve, roleInfo, status: ELocalStorage.Autherized })
            } else {
                reducer(ELogin.RSetState, { status: ELocalStorage.Token })
            }
        },
        async [ELogin.EPosLogin]({ state, payload }: any, { reducer, select, effect }: any) {
            const oldToken = localStorage.getItem(ELocalStorage.Token) //拿到浏览器的token，如果有就走token换token，否则就走登入界面
            if (oldToken) {
                const response: any = await requestPost('token', { token: oldToken })
                const { userInfo, token, roleInfo }: { token: string, userInfo: IUserInfo, roleInfo: IRoleInfo } = response
                if (token) {
                    bindJWTToken(token)
                    localStorage.setItem(ELocalStorage.Token, token)
                    reducer(ELogin.RSetState, { currentUser: userInfo, roleInfo, status: ELocalStorage.Autherized })
                } else {
                    reducer(ELogin.RSetState, { status: ELocalStorage.Login })
                }
            } else {
                reducer(ELogin.RSetState, { status: ELocalStorage.Login })
            }
        },
    }
}