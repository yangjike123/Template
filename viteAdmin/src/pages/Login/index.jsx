// import './index.less'
import { Button } from "antd";
import styles from "./index.module.less";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { effect } from "../../utils";
import { ELogin } from "../../models/Login";
export default () => {
  const nav = useNavigate();
  useEffect(() => {}, []);
  return (
    <div>
      <div>
        <Button
          onClick={() => {
            effect(ELogin.Name, ELogin.EPost, {
              password: "123123",
              account: "18888888888",
            }).then(()=>{
              nav("/");
            });
          }}
        >
          登录
        </Button>
      </div>
    </div>
  );
};
