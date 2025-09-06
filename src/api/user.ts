import request from '@/utils/request'
export interface IUserLoginParamas{
    username:string,
    password:string,
    autoLogin?:boolean
}
//登录接口
export const UserLogin =(params:IUserLoginParamas)=>{
   return request.post('/login',params)
}

export interface UserUpdateParams{
    username:string,
    poster:string
}

//更新用户数据接口
export const UserUpdate = (userInfo:string,params:UserUpdateParams)=>{
    return request.put(`/users/${userInfo}`,params)
}

//新增角色
export interface RoleType {
    objectId:string,
    roleName:string,
    checkedkeys:Array<string>
}
export const rolePost = (roleObj:RoleType)=>{
    return request.post('classes/ReactRole1',roleObj)
}

//获取角色
export const roleGet = ()=>{
    return request.get('classes/ReactRole1')
}