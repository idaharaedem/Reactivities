import React, {useContext, useState, useEffect} from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import { ActivityFormValues } from '../../../app/models/Activity';
import {v4 as uuid} from 'uuid';
import { observer } from 'mobx-react-lite';
import { RouteComponentProps } from 'react-router-dom';
import {Form as FinalForm, Field} from 'react-final-form'
import { TextInput } from '../../../app/form/TextInput';
import { TextAreaInput } from '../../../app/form/TextAreaInput';
import { SelectInput } from '../../../app/form/SelectInput';
import { category } from '../../../app/form/common/categoryOption';
import { DateInput } from '../../../app/form/DateInput';
import { combineDateAndTime } from '../../../app/form/common/util/util';
import {combineValidators, composeValidators, hasLengthGreaterThan, isRequired} from 'revalidate'
import { RootStoreContext } from '../../../app/stores/rootStore';

interface ActivityForms {
    id: string;
}

const validate = combineValidators({
    title: isRequired({message: 'The event title is missing'}),
    category: isRequired('Category'),
    description: composeValidators(
    isRequired('Description'),
    hasLengthGreaterThan(8)({message: 'Description must be greater than 8 characters'})
    )(),
    city: isRequired('City'),
    venue: isRequired('Venue'),
    date: isRequired('Date'),
    time: isRequired('Time')
})

 const ActivityForm: React.FC<RouteComponentProps<ActivityForms>> = ({match, history}) => {
    
    const rootStore = useContext(RootStoreContext)

    
    const {createActivity, 
        editActivity, 
        submitting, 
        loadActivity} = rootStore.activityStore;



    const [activity, setActivity] = useState(new ActivityFormValues());
    const [loading, setLoading] = useState(false)

    // because it ran syncroniously if you refreshed the page values would be blank
//Combat that by setting the activit in the use effect so it runs after
    useEffect(()=> {
        if(match.params.id) {
            setLoading(true);
            loadActivity(match.params.id).then((activity)=> {
                 setActivity(new ActivityFormValues(activity))
            }).finally(()=> setLoading(false))
        }
        // used to cleanup and basically unmount our activity after use

    }, [loadActivity, match.params.id]);
    
// const handleInputChange = (event: FormEvent <HTMLInputElement | HTMLTextAreaElement>) => {
//     //would normally be event.target
//     const {name, value} = event.currentTarget;
//     setActivity({...activity, [name]:value})
// }

const handleFinalFormSubmit = (values: any) => {
    const dateAndTime = combineDateAndTime(values.date, values.time)
    //ommiting certain aspects from a destructured property
    const {date, time, ...activity} = values;
    activity.date = dateAndTime;

    if(!activity.id) {
        let newActivity =  {
            ...activity,
            id: uuid()
        }
        createActivity(newActivity)
    } 
    else 
    {
        editActivity(activity);
    }
};

    return (
        <Grid>
            <Grid.Column width={10}>
                <FinalForm
                validate={validate}
                //Can take initial values as a property
                initialValues={activity}
                onSubmit={handleFinalFormSubmit}
                render={({handleSubmit, invalid, pristine}) => (
                    <Segment clearing>
                    <Form onSubmit={handleSubmit} loading={loading}>
                    
                    <Field
                    name='title'
                    placeholder= "Title"
                    value = {activity.title}
                    component={TextInput}
                    />
                    
                    <Field 
                    name="description" 
                    placeholder = "Description"
                    rows = {3}
                    value = {activity.description}
                    component={TextAreaInput}
                    />

                    <Field
                    name="category" 
                    placeholder= "Category" 
                    value = {activity.category}
                    component={SelectInput}
                    options={category}
                    />

                    <Form.Group widths = 'equal'>

                    <Field
                    name="date" 
                    placeholder = "Date" 
                    date = {true}
                    value = {activity.date}
                    component={DateInput}
                    />

                    <Field
                    name="time"
                    time ={true} 
                    placeholder = "Date" 
                    value = {activity.date}
                    component={DateInput}
                    />

                    </Form.Group>

                    
                    <Field
                    name="city" 
                    placeholder= "City" 
                    value = {activity.city}
                    component={TextInput}
                    />

                    <Field
                    name="venue" 
                    placeholder= "Venue" 
                    value = {activity.venue}
                    component={TextInput}
                    />
                
                    <Button loading={submitting} floated="right" type="submit" content="Submit" color="instagram" disabled={loading || invalid || pristine}/>
                    {
                        activity.id 
                        ? 
                        <Button onClick={()=> history.push(`/activities/${activity.id}`)} type="button" floated="right" content="Cancel" color="grey" disabled={loading || invalid || pristine} />
                        :
                        <Button onClick={()=> history.push(`/activities/`)} type="button" floated="right" content="Cancel" color="grey" disabled={loading || invalid || pristine}/>
                    }
                   
                </Form>
                </Segment>
                )}

                />
                
            </Grid.Column>
        </Grid>
       
    )
}

export default observer (ActivityForm);
