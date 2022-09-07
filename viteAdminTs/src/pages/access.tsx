import { Route } from 'react-router-dom'
import { ERoleLevel } from '../interface/ERole';
import defaultRouter from './router'
// level:角色的等级 permission：角色的权限内容
export default function accessRouter(level: number, permission: string[]) {
    console.log('permission: ', permission);
    console.log('level: ', level);
    if (level == ERoleLevel.Super) {
        return <>
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
        </>
    } else {
        return <>
            {defaultRouter.route.routes.map(
                ({ name, path, component, routes, access }, i: number) => {
                    if (permission.includes(access)) {
                        return (
                            <Route key={i} path={path} element={component}>
                                {routes &&
                                    routes.map(({ path: path2, component, access }, j) => {
                                        if (permission.includes(access)) {
                                            let subPath = path2.slice(path.length + 1);
                                            return (
                                                <Route key={j} path={subPath} element={component} />
                                            );
                                        } else {
                                            return false
                                        }

                                    })}
                            </Route>
                        );
                    } else {
                        return false
                    }
                }
            )}
        </>
    }


} 