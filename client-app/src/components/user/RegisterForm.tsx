import { FORM_ERROR } from 'final-form';
import { useContext } from 'react';
import {Form as FinalForm, Field} from 'react-final-form';
import { combineValidators, isRequired } from 'revalidate';
import { Button, Form, Header } from 'semantic-ui-react';
import { TextInput } from '../../app/form/TextInput';
import { IUserFormValues } from '../../app/models/User';
import { RootStoreContext } from '../../app/stores/rootStore';
import {ErrorMessage} from '../../app/form/ErrorMessage'

const validate = combineValidators({
    displayname: isRequired('displayname'),
    username: isRequired('username'),
    email: isRequired('email'),
    password: isRequired('password')
})


export const RegisterForm = () => {
    
    const rootStore = useContext(RootStoreContext);

    const {register} = rootStore.userStore;
    
    return (

        <FinalForm
        //If we get a submissiion error it will set the rest of our errors in our form
            onSubmit={(values: IUserFormValues) => register(values).catch((error) => ({
                //getting error response from axious and storing it in error
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({handleSubmit, submitError, invalid, pristine, dirtySinceLastSubmit}) => (

                <Form onSubmit={handleSubmit} error>
                    <Header color='orange' content='Register' as='h2' textAlign='center'/>
                    <Field
                        name='username'
                        placeholder='Please enter username'
                        component={TextInput}
                    />

                    <Field
                        name='displayname'
                        placeholder='Please enter displayname'
                        component={TextInput}
                    />  
                    
                    <Field
                        name='email'
                        placeholder='Please enter email'
                        component={TextInput}
                    />

                    <Field
                        name='password'
                        placeholder='Please enter password'
                        component={TextInput}
                        type='password'
                    />

                    {submitError && !dirtySinceLastSubmit && 
                    <ErrorMessage error={submitError}/>}
              
                    <Button disabled = { (invalid && !dirtySinceLastSubmit) || pristine}  fluid color='red' content='Register' type='submit'/>
                </Form>
            )}
        />
    )
}
