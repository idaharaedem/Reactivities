import { makeAutoObservable, configure, runInAction} from "mobx";
import { SyntheticEvent } from "react";
import { createContext } from "react";
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
        const sortAct = activities.sort((a,b) => Date.parse(a.date) -  Date.parse(b.date));

    //bundle each date to a collection of matching IActivity arrays
        return Object.entries(sortAct.reduce((accumActivities, currDateActivity) => {
            const date = currDateActivity.date.split('T')[0];
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
                 activities.forEach(act => {
                     act.date = act.date.split('.')[0];
                     this.activityRegistry.set(act.id, act);
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
       }
       else {
        this.loadingInitial = true;
           try{
            activity = await agent.Activities.details(id);
            runInAction(()=> {
                this.selectedActivity = activity;
                this.loadingInitial = false;
            })
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
        let act =  await agent.Activities.create(activity);
        try{
           runInAction(()=> {
            this.selectedActivity = act;
            this.submitting = false;
           });
        }
        catch(err){
            console.log(err);
        }

    }
    
    editActivity = async (activity: IActivity) => {
    this.submitting = true;
       let act = await agent.Activities.update(activity.id, activity);
       
        try {
            runInAction(()=> {
                this.selectedActivity = act;
                this.submitting = false;
            })
        }
        catch(err) {
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