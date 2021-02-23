import React, {FormEvent, useState} from 'react';
import { Button, Form, Segment } from 'semantic-ui-react';
import { IActivity } from '../../../app/models/Activity';
import {v4 as uuid} from 'uuid';

interface IProps {
    setEditMode: (editMode:boolean) => void;
    initialFormActivity: IActivity;
    createActivity: (activity: IActivity) => void;
    editActivity: (activity:IActivity) => void;
    submitting: boolean;
}

export const ActivityForm: React.FC<IProps> = ({setEditMode, initialFormActivity, createActivity, editActivity, submitting}) => {
    
    const initializeForm = () => {
        if(initialFormActivity) {
            return initialFormActivity;
        } else {
           return {
                id:'',
                title: '',
                category: '',
                description: '',
                date: '',
                city: '', 
                venue: ''
           }
        }
    };

    const [activity, setActivity] = useState<IActivity>(initializeForm);
    
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

        createActivity(newActivity);
    } else {
        editActivity(activity);
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
               <Button onClick={()=> setEditMode(false)} type="button" floated="right" content="Cancel" color="grey"/>
           </Form>
       </Segment>
    )
}
