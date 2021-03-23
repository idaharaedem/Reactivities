import { makeAutoObservable, runInAction } from "mobx";
import agent from "../API/agent";
import { IProfile } from "../models/Profile";
import { RootStore } from "./rootStore";

export default class ProfileStore {
    rootStore: RootStore
    
    constructor(rootStore: RootStore) {
        makeAutoObservable(this);
        this.rootStore = rootStore;
    }

    //observables
    profile: IProfile | null = null;
    loading: boolean = false;

    //computed
    get isCurrentUser() {
       const  user = this.rootStore.userStore.user;

       if(user?.username == this.profile?.username) {
        return true;
       }
       else {
           return false;
       }
    }

    //Actions

    loadUserProfile = async(username: string) => {
        this.loading = true;
        try{
            const profile = await agent.Profiles.getDetails(username);
            runInAction(() => {
                this.profile = profile;
                this.loading = false;
            })
            
        }
        catch(err) 
        {
            runInAction(()=> {
                this.loading = false
            })

            console.log(err);
        }
    }

}