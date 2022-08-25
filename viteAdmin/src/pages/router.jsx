import { SmileOutlined } from "@ant-design/icons";
import Account from "./Admin/Account";
import Role from "./Admin/Role";
import Home from "./Home";
export default {
  route: {
    path: "/",
    routes: [
      {
        path: "/",
        name: "首页",
        icon: <SmileOutlined />,
        component: <Home />,
      },
      {
        path: "/admin",
        name: "管理员",
        routes: [
          {
            path: "/admin/account",
            name: "账号",
            component: <Account />,
          },
          {
            path: "/admin/role",
            name: "角色",
            component: <Role />,
          },
        ],
      },
    ],
  },
  location: {
    pathname: "/",
  },
};
