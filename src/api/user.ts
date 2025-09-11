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
    name:string,
    checkedKeys:Array<string>,
    idx:number
}
export const rolePost = (roleObj:RoleType)=>{
    return request.post('classes/ReactRole1',roleObj)
}

//获取角色
export const roleGet = (role:string="")=>{
    let params = role ?`/${role}`:""
    return request.get(`classes/ReactRole1${params}`)
}
//修改角色
export const rolePut = (objectId:string,value:RoleType)=>{
    return request.put(`classes/ReactRole1/${objectId}`,value)
}
//删除角色
export const roleDelete = (objectId:string)=>{
    return request.delete(`classes/ReactRole1/${objectId}`)
}

//批量删除角色
export const RolebatchDelete = (obj:React.Key[])=>{
    let requests =  obj.map((id)=>{
        return {
            'method':'DELETE',
            'path':`/1.1/classes/ReactRole1/${id}`
        }
    })
    console.log(requests);
    return request.post(`batch`,{requests})
}

//注册账号
interface UserType {
    objectId:string,
    username:string,
    password:string,
    roleId:string,
    roleName:string
}
export const userPost = (Userobj:UserType)=>{
    return request.post('classes/_users',Userobj)
}

export const userGet = ()=>{
    return request.get('classes/_users')
}

//删除账号
export const UserDelete = (objectId:string)=>{
    return request.delete(`classes/_users/${objectId}`)
}




// data ?,code string, message 

interface Ire<T>{
    data:T,
    code:string,
    message:string
}
export const UserDeletetext:Ire<Number> = (objectId:string)=>{
    return request.delete(`classes/_users/${objectId}`)
}

