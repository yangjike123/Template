export interface IUserInfo {
    account: string;
    id: number;
    name: string
    password: string
    remark: string
    status: boolean
}
export interface IRoleInfo {
    name: string; //角色名称
    level: number; //角色级别
    permission: string[]; //角色权限
    status: boolean; //角色状态
}