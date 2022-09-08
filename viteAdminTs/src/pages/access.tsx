import { ERoleLevel } from '../interface/ERole';
import defaultRouter from './router'
// level:角色的等级 permission：角色的权限内容
export const accessRouter = (level: number, permission: string[]) => {
    if (level == ERoleLevel.Super) {
        // 如果是超级管理员那么直接返回所以路由不用走任何判断
        return defaultRouter
    } else {
        // 否则你将面临我的判断条件
        // v 代表第一层 c代表第二层
        return {
            route: {
                path: defaultRouter.route.path,
                routes: defaultRouter.route.routes.map((v) => {
                    if (v.component && permission?.includes(v.access)) {
                        // 第一层v.component可能存在undefined所以需要加强判断过滤掉不需要的
                        return { path: v.path, name: v.name, icon: v.icon, component: v.component }
                    } else if (v.routes?.length) {
                        for (let index = 0; index < v.access.length; index++) {
                            if (permission?.includes(v.access[index])) {
                                // 第二层路由判断可能存在routes有主路由下面伴随这子路由
                                return {
                                    path: v.path,
                                    name: v.name,
                                    routes: v.routes.map((c) => {
                                        if (permission?.includes(c.access)) {
                                            return { path: c.path, name: c.name, icon: v.icon, component: c.component }
                                        }
                                    })
                                }
                            }

                        }
                    }
                })
            }
        }
    }
} 