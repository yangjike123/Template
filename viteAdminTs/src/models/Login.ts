import { namespace } from "../utils/enums"

const ELogin = namespace("ELogin")
export default {
    namespace: ELogin.Name,
    state: {
        examData: null,
        editFlag: null,
        data: null,
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
        // [ELogin.EPosLogin]({ state, payload }, { reducer, select, effect }) {

        // }
    }
}