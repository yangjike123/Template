import ProLayout from "@ant-design/pro-layout";
import defaultRouter from "./router";
import { PageContainer, SettingDrawer } from "@ant-design/pro-components";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import AvatarRender from "../component/AvatarRender";
import "./app.less";
import Login from "./Login";
import { useEffect, useState } from "react";
import { ELogin } from "../models/Login";
import { useConnect } from "../utils";
import { ELocalStorage } from "../cofing/Enum";
export default () => {
  const { pathname } = useLocation();
  // 配置界面样式风格
  const [settings, setSetting] = useState({
    contentWidth: "Fluid",
    fixSiderbar: true,
    headerHeight: 48,
    layout: "mix",
    navTheme: "light",
    primaryColor: "#1890ff",
    splitMenus: false,
  });
  const token = localStorage.getItem(ELocalStorage.Token);
  const { status } = useConnect(ELogin.Name);
  const nav = useNavigate();
  useEffect(()=>{
    console.log("----------");
  },[])
  if (!token) {
    return <Login />;
  } else {
    return (
      <div id="test-pro-layout">
        <ProLayout
          title="Remax"
          logo={
            "https://gw.alipayobjects.com/mdn/rms_b5fcc5/afts/img/A*1NHAQYduQiQAAAAAAAAAAABkARQnAQ"
          }
          {...defaultRouter}
          {...settings}
          style={{ height: "100vh" }}
          location={{ pathname }}
          menuItemRender={(item, dom) => (
            <a onClick={() => nav(item.itemPath)}>{dom}</a>
          )}
          itemRender={(route, params, routes, paths) => (
            <a>{route.breadcrumbName}</a>
          )}
          rightContentRender={() => <AvatarRender />}
        >
          <PageContainer
            title={false}
            className={pathname == "/home" && "pageCrumbs"}
          >
            <Routes location={pathname}>
              {defaultRouter.route.routes.map(
                ({ name, path, component, routes }, i) => {
                  return (
                    <Route key={i} path={path} element={component}>
                      {routes &&
                        routes.map(({ path: path2, component, routes }, j) => {
                          let subPath = path2.slice(path.length + 1);
                          return (
                            <Route key={j} path={subPath} element={component} />
                          );
                        })}
                    </Route>
                  );
                }
              )}
            </Routes>
          </PageContainer>
        </ProLayout>
          {/* <SettingDrawer
            pathname={pathname}
            enableDarkTheme
            getContainer={() => document.getElementById("test-pro-layout")}
            settings={settings}
            onSettingChange={(changeSetting) => {
              console.log("changeSetting: ", changeSetting);
              setSetting(changeSetting);
            }}
            disableUrlParams={false}
          /> */}
      </div>
    );
  }
};
