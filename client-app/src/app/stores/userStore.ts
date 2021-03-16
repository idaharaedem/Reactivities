import { makeAutoObservable, runInAction } from "mobx";
import { history } from "../..";
import agent from "../API/agent";
import { IUser, IUserFormValues } from "../models/User";
import { RootStore } from "./rootStore";

export default class UserStore {
    
    rootStore: RootStore
    constructor(rootStore: RootStore) {
        makeAutoObservable(this)

        this.rootStore = rootStore;
    }

    //observables
    user: IUser | null = null;


    //computed
    get isLoggedIn() {
        //returns a boolean
        return !!this.user;
    }

    //actions
    login = async (logValues: IUserFormValues) => 
    {
        try 
        {
            const user = await agent.User.login(logValues);
            runInAction(()=> {
                this.user = user; 
            });
            this.rootStore.commonStore.setToken(user.token);
            this.rootStore.modalStore.closeModal();
            history.push('/activities');
        }
        catch(err) 
        {
            throw err;
        }
    }

    register = async (regValues: IUserFormValues) => 
    {
        try 
        {
            const user = await agent.User.register(regValues)
            runInAction(()=> {
               this.rootStore.commonStore.setToken(user.token);
               this.user = user; 
            });
            this.rootStore.modalStore.closeModal();
            history.push('/activities')
        }
        catch (error) {
            throw error;
        }
    }

    getUser = async () => {
        const user = await agent.User.current();
        try{
            runInAction(() => {
                this.user = user;
            })
        }
        catch (err)
        {
            throw err
        }
    }

    logout = () => {
        this.rootStore.commonStore.setToken(null);
        this.user = null;
        history.push('/');
    }
}