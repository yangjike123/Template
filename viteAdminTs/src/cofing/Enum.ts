export enum ELocalStorage {
    Token = 'viteToken',
    Login = 'Login',
    Autherized = 'Autherized',
    Loading = 'Loading'
}

export enum EAdminAccess {
    // 管理员权限
    RoleAdmin = '角色管理',
    UserEdit = '用户编辑权限',

    // 潜在用户
    LatentAdmin = '潜在用户管理',
    LatentDelete = '潜在用户删除',
    LatentCreate = '潜在用户导入',
    LatentCounselor = '潜在用户认领',  // 认领未认领的，取消自己认领的

    // 考试
    ExamAdmin = '考试管理',
    ApplyExam = '报考查询',
    ExamineeEdit = '考生基本信息编辑',
    ExamineeInfo = '考生基本信息详情',
    ExamineeList = '考生基本信息列表',
    ResultsAdmin = '成绩管理',
}