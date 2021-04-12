import { useContext } from 'react';
import { Button, Form, Grid, Segment } from 'semantic-ui-react';
import {Form as FinalForm, Field} from 'react-final-form'
import { TextInput } from '../../app/form/TextInput';
import { RootStoreContext } from '../../app/stores/rootStore';
import { TextAreaInput } from '../../app/form/TextAreaInput';

export const ProfileAboutUs = () => {

    const rootStore = useContext(RootStoreContext);
    
    const {editUserDetails, profile, isCurrentUser} = rootStore.profileStore;

    return (
<Segment>
    {isCurrentUser ?
    ( 
        <Grid>
            <Grid.Column width={10}>
                <FinalForm 
                initialValues={profile}
                onSubmit = {editUserDetails}
                render={({invalid, handleSubmit, submitting, pristine})=> (

                    <Form onSubmit={handleSubmit} error>
                       <Field
                            placeholder={"Enter display name"}
                            component={TextInput}
                            value = {profile?.displayName}
                            name="displayName"
                       />

                        <Field
                            placeholder={"Enter a brief bio"}
                            component={TextAreaInput}
                            value = {profile?.bio}
                            name="bio"
                       />

                        <Button floated='right' content='Submit' color='olive' loading={submitting} disabled={pristine} />  

                    </Form>
                )}
                />
                
          
            </Grid.Column>

        </Grid>
    )
    : (<span> {profile?.bio} </span>)}

        </Segment>
        
    )
}
