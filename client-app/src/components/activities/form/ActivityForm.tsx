import React, {FormEvent, useContext, useState, useEffect} from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import {v4 as uuid} from 'uuid';
import ActivityStore from '../../../app/stores/activityStore';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';


interface ActivityForms {
    id: string;
}

 const ActivityForm: React.FC<RouteComponentProps<ActivityForms>> = ({match, history}) => {
    
    const activityStore = useContext(ActivityStore);
    const {createActivity, 
        editActivity, 
        submitting, 
        loadActivity, 
        selectedActivity,
        clearActivity} = activityStore;



    const [activity, setActivity] = useState<IActivity>({
                id:'',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '', 
                venue: ''
    });

    // because it ran syncroniously if you refreshed the page values would be blank
//Combat that by setting the activit in the use effect so it runs after
    useEffect(()=> {
        if(match.params.id && activity.id.length === 0 ) {
            loadActivity(match.params.id).then(()=> {
                //if there is a selected activity to combat 'undefined' possability
                selectedActivity && setActivity(selectedActivity)
            })
        }
        // used to cleanup and basically unmount our activity after use
        return () => {
            clearActivity()
        }
       
    }, [loadActivity,clearActivity, match.params.id, selectedActivity]);
    
const handleInputChange = (event: FormEvent <HTMLInputElement | HTMLTextAreaElement>) => {
    //would normally be event.target
    const {name, value} = event.currentTarget;
    setActivity({...activity, [name]:value})
}

const handleSubmit = () => {
    if(activity.id.length === 0) {
        let newActivity =  {
            ...activity,
            id: uuid()
        }
        createActivity(newActivity)
        .then(()=> {
            history.push(`/activities/${newActivity.id}`)
        })
        .catch((err)=> {
            console.log(err)
        })
    } else {
        editActivity(activity).then(()=> {
            history.push(`/activities/${activity.id}`)
        })
        .catch((err)=> {
            console.log(err)
        })
    }
}

    return (
       <Segment clearing>
           <Form onSubmit={handleSubmit}>
               <Form.Input
                onChange={handleInputChange} 
                name='title'
                placeholder= "Title"
                value = {activity.title}
                />
               
               <Form.TextArea 
                onChange={handleInputChange} 
                rows={2} 
                name="description" 
                placeholder = "Description"
                value = {activity.description}
                />

               <Form.Input 
               onChange={handleInputChange} 
               name="category" 
               placeholder= "Category" 
               value = {activity.category}
               />

               <Form.Input
               onChange={handleInputChange} 
               type="datetime-local" 
               name="date" 
               placeholder = "Date" 
               value = {activity.date}
               />

               <Form.Input 
               onChange={handleInputChange} 
               name="city" 
               placeholder= "City" 
               value = {activity.city}
               />

               <Form.Input 
               onChange={handleInputChange} 
               name="venue" 
               placeholder= "Venue" 
               value = {activity.venue}
               />
               
               <Button loading={submitting} floated="right" type="submit" content="Submit" color="instagram"/>
               <Button onClick={()=> history.push(`/activities/${activity.id}`)} type="button" floated="right" content="Cancel" color="grey"/>
           </Form>
       </Segment>
    )
}

export default observer (ActivityForm);
