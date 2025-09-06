import * as react from 'react'
import store,{RootState} from '@/store'
import { useSelector } from 'react-redux'
import Login from '@/views/login'
import MainLayout from '@/layout/index'

export default function AuthRequire(){
    let user = useSelector((store:RootState)=>store.user)
    return (
        <div>
            {user.isLogin?<MainLayout></MainLayout>:<Login></Login>}
        </div>
    )

}

