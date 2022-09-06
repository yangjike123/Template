import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import defaultRouter from './router'
// level:角色的等级 permission：角色的权限内容
export default function accessRouter(level: number, permission: Array<string>) {
    const { pathname } = useLocation();
    return <Routes location={pathname}>
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
} 