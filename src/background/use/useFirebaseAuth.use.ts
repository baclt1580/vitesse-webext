import { getAuth, Auth,onAuthStateChanged } from 'firebase/auth';
import { useFireBase } from './useFirebase.use';
let auth=ref<Auth>()
export function useFireBaseAuth(){
    if(!auth.value){
        auth.value = getAuth(useFireBase().value)
        onAuthStateChanged(auth.value,user=>{
            if(user){
                console.log(user.email,"登录了")
            }else{
                console.log("注销登录了")
            }
        })
    }
    return auth;
}