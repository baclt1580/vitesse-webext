import { FirebaseApp, initializeApp } from 'firebase/app';
import { firebaseConfig } from '~/env';
let app=ref<FirebaseApp>()
export function useFireBase(){
    if(!app.value){
        app.value = initializeApp(firebaseConfig);
    
    }
    return app;
}