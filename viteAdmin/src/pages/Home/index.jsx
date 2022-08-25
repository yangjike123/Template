import { useNavigate } from "react-router-dom";
import { DatePicker, Card } from "antd";
import { useEffect } from "react";
import { effect, useConnect } from "../../utils";
import { ELogin } from "../../models/Login";
export default () => {
  const { data } = useConnect(ELogin.Name);
  console.log("data: ", data);
  useEffect(() => {
    // effect(ELogin.name, ELogin.EGet);
  }, []);
  return (
    <div>
      <Card>
        <DatePicker.RangePicker />
      </Card>
    </div>
  );
};
