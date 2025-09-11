import { UserLogin,IUserLoginParamas, roleGet } from '@/api/user';
import { createSlice, Dispatch } from '@reduxjs/toolkit'
import { NavigateFunction } from 'react-router-dom';
import store2 from 'store2';

export interface IuserInfoType{
    username:string,
    objectId:string,
    sessionToken:string,
    avatar:string,
    poster:string,
    checkedKeys:Array<string>,
    checkList:Array<string>,
    roleId:String,
    roleName:String
}

export interface IinitialStateType{
    isLogin:boolean,
    isLoading:boolean,
    userInfo:IuserInfoType |null
}


let initialState:IinitialStateType={
    isLogin:false, //表达用户登录状态
    isLoading:false,    //控制登录交互
    userInfo:null   //存储用户信息
}
    
let info = store2.get('class-admin-userinfo') || store2.session.get('class-admin-userinfo')

if(info){
    
    initialState.isLogin=true
    initialState.isLoading=false
    initialState.userInfo=info
}

let user = createSlice({
    name:'user',
    initialState,
    reducers:{
        loginstart(state){
            state.isLoading=true
        },
        loginsuccess(state,actions){
            console.log(actions);
            let { autoLodin , userinfo} = actions.payload
            state.isLogin=true
            state.isLoading=false
            state.userInfo=userinfo
            let auto = actions?true:false
            store2('autoLodin',auto)
            if(autoLodin){
                store2('class-admin-userinfo',userinfo)
            }else{
                store2.session('class-admin-userinfo',userinfo)
                //session存储，页面刷新即数据丢失
            }
        },
        loginfail(state){
            state.isLogin=false
            state.isLoading=false
            state.userInfo=null
            store2.remove('class-admin-userinfo')
            store2.session.remove('class-admin-userinfo')
        },
        loginUpdate(state,actions){
            console.log(actions);
            
            let auto = store2.get('autoLodin')
            state.userInfo = actions.payload
            if(auto){
                store2("class-admin-userinfo",actions.payload)
            }else{
                store2.session("class-admin-userinfo",actions.payload)
            }
        }
    }
})

export const UserLoginActive = (params:IUserLoginParamas,dispatch:Dispatch,Navigate:NavigateFunction)=>{
    dispatch(loginstart())
        
    setTimeout(()=>{
        
        UserLogin(params)
        .then((res:any)=>{
            // console.log(res); //用户详细
            roleGet(res.data.roleId).then(role=>{
                // console.log('role:'+role.data);
                dispatch(loginsuccess({userinfo:{...res.data,...role.data},autoLodin:params.autoLogin}))
                Navigate('/')
            })
        })
        .catch((err:any)=>{
            dispatch(loginfail())
        })
    }, 1000);
}

export default user.reducer
export const { loginstart,loginsuccess,loginfail,loginUpdate }  = user.actions