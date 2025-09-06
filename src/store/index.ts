import { configureStore } from "@reduxjs/toolkit";
import user from '@/store/modules/user'

const store = configureStore({
    reducer:{user}
})

export default store

//ReturnType是TS中内置工具类型，作用：提取返回值的类型
export type RootState = ReturnType<typeof store.getState>