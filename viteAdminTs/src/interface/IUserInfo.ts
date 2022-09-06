export interface IUserInfo {
    name: string; //角色名称
    level: number; //角色级别
    permission: Array<string>; //角色权限
    status: boolean; //角色状态
}