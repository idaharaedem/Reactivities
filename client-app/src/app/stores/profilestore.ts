import { makeAutoObservable, runInAction } from "mobx";
import { toast } from "react-toastify";
import agent from "../API/agent";
import { IPhoto, IProfile } from "../models/Profile";
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
    uploadingPhoto = false;
    setMainLoading = false;
    setDeleteLoading = false;

    //computed
    get isCurrentUser() {
       const  user = this.rootStore.userStore.user;

       if(user?.username === this.profile?.username) {
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

    uploadUserPhoto = async (file: Blob) => {
        this.uploadingPhoto = true

        try {
            const userPhoto = await agent.Profiles.uploadUserPhoto(file);

            runInAction(()=> {
                if(this.profile) {
                    this.profile.photos.push(userPhoto);
                    if(userPhoto.isMain && this.rootStore.userStore.user) {
                        this.rootStore.userStore.user.image = userPhoto.url;
                        this.profile.mainImage = userPhoto.url;
                    }

                }
            })
            this.uploadingPhoto = false;
        }
        catch (error) {
            console.log(error);
            toast.error('Problem Uploading Image');
            runInAction(()=> {
                this.uploadingPhoto = false;
            })
        }
    }

    setMainPhoto = async (photo: IPhoto) => {
        this.setMainLoading = true
        try{
            await agent.Profiles.setMainPhoto(photo.id);
            runInAction(()=> {
                    this.rootStore.userStore.user!.image = photo.url;
                    //find the alrady main photo. set it to false
                    this.profile!.photos.find(m => m.isMain)!.isMain = false
                    //set this main to true
                     this.profile!.photos.find(m => m.id === photo.id)!.isMain = true;
                     this.profile!.mainImage = photo.url;
                    this.setMainLoading = false;
                     
            })
        }
        catch(err) {
            runInAction(()=> {
                this.setMainLoading = false;
            })
            console.log(err);
            toast.error('Problem setting main photo');
        }
    }

    deletePhoto = async (id: string) => {
       this.setDeleteLoading = true;
       await agent.Profiles.deletPhoto(id);

        try {
            runInAction(()=> {
                this.setDeleteLoading = false;
                this.profile!.photos = this.profile!.photos.filter(m => m.id !== id);
            })
        }

        catch (error) {
            runInAction(()=> {
                this.setDeleteLoading = false;
                console.log(error);
                toast.error('Problem deleting photo');
            })
        }
    }

}