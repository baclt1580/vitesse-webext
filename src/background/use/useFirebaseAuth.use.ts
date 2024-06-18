import { getAuth, Auth } from 'firebase/auth';
import { useFireBase } from './useFirebase.use';
let auth=ref<Auth>()
export function useFireBaseAuth(){
    if(!auth.value){
        auth.value = getAuth(useFireBase().value)
    }
    return auth;
}