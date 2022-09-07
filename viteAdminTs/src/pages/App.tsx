import { BasicLayoutProps, PageContainer, ProLayout } from '@ant-design/pro-components'
import { useEffect, useState } from 'react'
import { Routes, useLocation, useNavigate } from 'react-router-dom'
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
	useEffect(() => {
		// 页面关闭时删除本浏览器token
		// window.onbeforeunload = function (e) {
		// 	var n = window.event.screenX - window.screenLeft;
		// 	var b = n > document.documentElement.scrollWidth - 20;

		// 	if (b && window.event.clientY < 0 || window.event.altKey) {
		// 		alert("是关闭而非刷新");
		// 		localStorage.removeItem(ELocalStorage.Token)
		// 	}
		// }
		effect(ELogin.Name, ELogin.EPosLogin)
	}, [])
	if (status == ELocalStorage.Login) {
		return <Login />
	} else {
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
						{accessRouter(roleInfo.level, roleInfo.permission)}
					</Routes>
				</PageContainer>
			</ProLayout>
		</div>
	}

}
