import { makeAutoObservable, configure, runInAction} from "mobx";
import { SyntheticEvent } from "react";
import { createContext } from "react";
import { toast } from "react-toastify";
import { history } from "../..";
import agent from "../API/agent";
import { IActivity } from "../models/Activity";

configure({enforceActions: 'always'});

//This is a class property
class ActivityStore {
    
    constructor() {
        makeAutoObservable(this);
    }

    //observables
    //these would be the setters in terms of hooks
     loadingInitial = false;
     submitting = false;
     selectedActivity: IActivity | null  = null;
     editMode = false;
     activityRegistry = new Map();
     target = '';

     //Computed
     get activitiesByDate() {
        return this.groupActivitiesByDate(Array.from(this.activityRegistry.values()));
     }

     groupActivitiesByDate (activities: IActivity[]) {
        const sortAct = activities.sort((a,b) => a.date!.getTime() -  b.date!.getTime());

    //bundle each date to a collection of matching IActivity arrays
        return Object.entries(sortAct.reduce((accumActivities, currDateActivity) => {
            const date = currDateActivity.date.toISOString().split('T')[0];
            accumActivities[date] = accumActivities[date] ? [...accumActivities[date], currDateActivity] : [currDateActivity];
            return accumActivities;
        }, {} as {[key:string] : IActivity[]}));
     }
    

    //actions
     // RuninAction is necessarry for mobx dev tools mode
     loadActivities = async () => {
         
         this.loadingInitial = true;
         try {
         let activities = await agent.Activities.lists();
             runInAction(()=> {
                 activities.forEach(activity => {
                     activity.date = new Date(activity.date);
                     this.activityRegistry.set(activity.id, activity);
                     this.loadingInitial = false;
                 });
                
             }); 
            
         } catch(err) {
           console.log(err);
         }
    }

    //If you make it async then the return type will be a promise
    loadActivity = async (id:string) => {
       let activity = this.activityRegistry.get(id);  
       if(activity) {
           this.selectedActivity = activity;
           return activity;
       }
       else {
        this.loadingInitial = true;
           try{
            activity = await agent.Activities.details(id);
            runInAction(()=> {
                this.selectedActivity = activity;
                this.activityRegistry.set(activity.id, activity);
                this.loadingInitial = false;
                activity.date = new Date(activity.date);
            })
            return activity;
           }
           catch(err) {
            console.log(err);
           }
       }
    }

    selectActivity = (id: string) => {
        try{
            runInAction(()=> {
                this.selectedActivity = this.activityRegistry.get(id);
                this.editMode = false;
            });
        }
        catch(err) {
            console.log(err);
        }
        
    }

    clearActivity = () => {
        this.selectedActivity = null;
    }

    //not relying on anything back from the server
    createActivity = async (activity: IActivity) => {
        
        this.submitting = true;
    
        try{
            await agent.Activities.create(activity);
           runInAction(()=> {
            this.activityRegistry.set(activity.id, activity);
            this.selectedActivity = activity;
            this.submitting = false;
            //because we now have access to the global history
            history.push(`/activities/${activity.id}`)
           });
        }
        catch(err){
            runInAction(()=> {
                this.submitting = false;
            })
            toast.error('Problem submitting data');
            console.log(err.response);
        }

    }
    
    editActivity = async (activity: IActivity) => {
    this.submitting = true;
       
        try {
            await agent.Activities.update(activity.id, activity);
            runInAction(()=> {
                this.selectedActivity = activity;
                this.submitting = false;
                history.push(`/activities/${activity.id}`)
            })
        }
        catch(err) {
            runInAction(()=> {
                this.submitting = false;
            })
            toast.error('Problem submitting data');
            console.log(err);
        }
    }
    
    // Giving each delete a unique id for the loading spinner
    deleteActivity = (event: SyntheticEvent<HTMLButtonElement> , id:string) => {
        this.submitting = true;
        this.target = event.currentTarget.name;
        agent.Activities.delete(id)
        .then(() => {
            this.activityRegistry.delete(id);
            this.target = '';
          
        }).catch((err)=> {
            console.log(err);
            this.target = '';
        }).finally(()=> {
        this.submitting = false;
        })
    }


    cancelSelectedActivity = () => {
        this.selectedActivity = null;
    }

    closeCreateForm = () => {
        this.editMode = false;
        
    }
}

//to use our store inside react components
export default createContext(new ActivityStore())