import { BasicLayoutProps, PageContainer, ProLayout } from '@ant-design/pro-components'
import { useState } from 'react'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import HeadPortrait from '../components/HeadPortrait'
import defaultRouter from './router'
import vite from '../../public/vite.svg'
import './app.less'

export default () => {
  const { pathname } = useLocation();
  const nav = useNavigate();
  const [settings, setSetting] = useState<BasicLayoutProps>({
    contentWidth: "Fluid",
    fixSiderbar: true,
    headerHeight: 48,
    layout: "mix",
    navTheme: "light",
    primaryColor: "#1890ff",
    splitMenus: false,
  });
  return <div>
    <ProLayout
      title="Vite"
      style={{ height: "100vh" }}
      {...settings}
      {...defaultRouter}
      location={{ pathname }}
      logo={<img src={vite} />}
      rightContentRender={() => <HeadPortrait />}
      menuItemRender={(item, dom) => (
        <a onClick={() => nav(item.itemPath)}>{dom}</a>
      )}
      itemRender={(route) => (
        <a>{route.breadcrumbName}</a>
      )}
    >
      <PageContainer title={false}>
        <Routes location={pathname}>
          {defaultRouter.route.routes.map(
            ({ name, path, component, routes }, i: number) => {
              return (
                <Route key={i} path={path} element={component}>
                  {routes &&
                    routes.map(({ path: path2, component }, j) => {
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
  </div>
}
