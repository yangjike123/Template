import { BasicLayoutProps, PageContainer, ProLayout, PageLoading } from '@ant-design/pro-components'
import { useEffect, useState } from 'react'
import { Routes, useLocation, useNavigate, Route } from 'react-router-dom'
import HeadPortrait from '../components/HeadPortrait'
import defaultRouter from './router'
import vite from '../../public/vite.svg'
import './app.less'
import accessRouter from './access'
import { effect, useConnect } from '../utils'
import { ELogin } from '../models/Login'
import Login from './Login'
import { ELocalStorage } from '../cofing/Enum'
import { IRoleInfo } from '../interface/IUserInfo'

export default () => {
	const { currentUser, status, roleInfo }: { currentUser: any, status: string, roleInfo: IRoleInfo } = useConnect(ELogin.Name)
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
	// 过滤展示路由
	const routers: any = accessRouter(roleInfo?.level, roleInfo?.permission)
	useEffect(() => {
		// 页面关闭时删除本浏览器token
		effect(ELogin.Name, ELogin.EPosLogin)
	}, [])
	if (status == ELocalStorage.Loading) {
		return <PageLoading />
	} else if (status == ELocalStorage.Login) {
		return <Login />
	} else {
		return <div>
			<ProLayout
				title="Vite"
				style={{ height: "100vh" }}
				{...settings}
				{...routers}
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
							({ name, path, component, routes, access }, i: number) => {
								return (
									<Route key={i} path={path} element={component}>
										{routes &&
											routes.map(({ path: path2, component, access }, j) => {
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

}
