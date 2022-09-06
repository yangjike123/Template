import { Button } from "antd"
import { ELogin } from "../../models/Login"
import { effect } from "../../utils"
import { useNavigate } from 'react-router-dom'
export default () => {
    const nav = useNavigate();
    return <Button onClick={() => {
        effect(ELogin.Name, ELogin.EPost, { account: '16666666666', password: '123123' }).then(() => {
            nav('/')
        })
    }}>登入</Button>
}