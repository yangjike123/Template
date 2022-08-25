import { Dropdown, Menu, message, Modal, Space } from "antd";
import { PoweroffOutlined, FormOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import { ELocalStorage } from "../../cofing/Enum";

export default () => {
  const nav = useNavigate();
  const onClick = ({ key }) => {
    if (key == "2") {
      Modal.confirm({
        title: "确认要退出吗？",
        onOk() {
          localStorage.removeItem(ELocalStorage.Token);
          // location.reload();
          nav('/')
          message.success("退出成功");
        },
      });
    }
  };
  const menu = (
    <Menu
      onClick={onClick}
      items={[
        {
          label: "修改密码",
          key: "1",
          icon: <FormOutlined style={{ color: "DarkKhaki" }} />,
        },
        {
          label: "退出登入",
          key: "2",
          icon: <PoweroffOutlined style={{ color: "red" }} />,
        },
      ]}
    />
  );
  return (
    <div>
      <Dropdown overlay={menu}>
        <a>
          <Space>Hover me</Space>
        </a>
      </Dropdown>
    </div>
  );
};
