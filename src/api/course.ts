import request from '@/utils/request'

//测试 首次请求创建表，在classes后面写入表名，同时定义字段数据格式
export const testPost=()=>{
   return request.post('/classes/ReactTest',{name:'三丰',score:100})
}

export interface CategoryType{
    objectId:string,
    cateName:string,
    fatherId:string,
    status:boolean,
    children?:CategoryType[]
}
export const CategoryPost=(object:CategoryType)=>{
    return request.post('/classes/ReactCategoryForm',object)
}

interface whereParms{
    fatherId?:string
}
export const CategoryGet = (where:whereParms={fatherId:'0-01'})=>{
    return request.get('/classes/ReactCategoryForm',{
        params:{
            where
        }
    })
}

//改变数据的status状态
export const CategoryPut = (objectId:string,status:boolean)=>{
    return request.put(`/classes/ReactCategoryForm/${objectId}`,{status})
}

export interface IcoursePostType {
    name:string,
    poster:string,
    isvip:boolean,
    info:string,
    desc:string,
    category:[string,string],
    catelv1:string,
    catelv2:string
}
export const coursePost = (courseObj:IcoursePostType)=>{
    return request.post('/classes/ReactAricle',courseObj)
}

interface ICourseGetParams{
    created_at?:string,
    name?:string,
    isvip?:string|boolean,
    objectId?:string,
    current?:number,
    pageSize?:number
}

type ICourseForin = keyof ICourseGetParams
export const courseGet = (params:ICourseGetParams={})=>{
    delete params.created_at 
    delete params.current 
    delete params.pageSize

    for (const key  in params) {
        if(params[key as ICourseForin]==''){
            delete params[key as ICourseForin]
        }
    }
    if(params.isvip && params.isvip!='2'){
        params.isvip=Boolean(Number(params.isvip))
    }else{
         delete params.isvip
    }

    let str = JSON.stringify(params)
    return request.get(`/classes/ReactAricle?where=${str}`)
}