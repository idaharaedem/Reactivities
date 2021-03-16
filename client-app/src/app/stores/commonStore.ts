import { makeAutoObservable, reaction, runInAction } from "mobx";
import { RootStore } from "./rootStore";

export default class CommonStore {
    rootStore: RootStore

    constructor(rootStore: RootStore) {
        makeAutoObservable(this)
        this.rootStore = rootStore;
        

        reaction(
            // 1st what we want to react on
            () => this.token,
            //2nd What we want to do when token has changed
            token => {
                if(token) {
                    window.localStorage.setItem('token', token)
                } else {
                    window.localStorage.removeItem('token')
                }
            }
        )
    }

    //observable
    token: string | null = window.localStorage.getItem('token');
    appLoaded = false;

    
    //actions

    //to stop the page from losing the user on refresh
    setToken = (token: string | null) => {
        
        //window.localStorage.setItem('token', token!)
        //dont need to set the token anymore because of the reaction
        runInAction(()=> {
            this.token = token;
        })
        
    }

    setAppLoaded = () => {

        runInAction(()=> {
            this.appLoaded = true;
        })
       
    }

}