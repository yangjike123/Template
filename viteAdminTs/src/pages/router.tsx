import { SmileOutlined } from "@ant-design/icons";
import Account from "./Admin/Account";
import Role from "./Admin/Role";
import Home from "./Home";
import { EAdminAccess } from "../cofing/Enum";
export default {
    route: {
        path: "/",
        routes: [
            {
                path: "/",
                name: "首页",
                icon: <SmileOutlined />,
                access: EAdminAccess.ExamineeList,
                component: <Home />,
            },
            {
                path: "/admin",
                name: "管理员",
                access: [EAdminAccess.LatentCounselor, EAdminAccess.LatentDelete],
                routes: [
                    {
                        path: "/admin/account",
                        name: "账号",
                        access: EAdminAccess.LatentDelete,
                        component: <Account />,
                    },
                    {
                        path: "/admin/role",
                        name: "角色",
                        access: EAdminAccess.LatentCounselor,
                        component: <Role />,
                    },
                ],
            },
        ],
    },
}