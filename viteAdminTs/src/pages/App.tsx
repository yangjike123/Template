import { BasicLayoutProps, PageContainer, ProLayout } from '@ant-design/pro-components'
import { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import HeadPortrait from '../components/HeadPortrait'
import defaultRouter from './router'
import vite from '../../public/vite.svg'
import './app.less'
import accessRouter from './access'
import { effect, useConnect } from '../utils'
import { ELogin } from '../models/Login'
import Login from './Login'
import { ELocalStorage } from '../cofing/Enum'

export default () => {
	const { currentUser, status, roleInfo } = useConnect(ELogin.Name)
	console.log('roleInfo: ', roleInfo);
	console.log('status: ', status);
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
					{/* {accessRouter(0)} */}
				</PageContainer>
			</ProLayout>
		</div>
	}

}
