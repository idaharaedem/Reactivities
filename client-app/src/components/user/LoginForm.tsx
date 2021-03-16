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
    email: isRequired('email'),
    password: isRequired('password')
})


export const LoginForm = () => {
    
    const rootStore = useContext(RootStoreContext);

    const {login} = rootStore.userStore;
    
    return (

        <FinalForm
            onSubmit={(values: IUserFormValues) => login(values).catch((error) => ({
                //getting error response from axious and storing it in error
                [FORM_ERROR]: error
            }))}
            validate={validate}
            render={({handleSubmit, submitError, invalid, pristine, dirtySinceLastSubmit}) => (

                <Form onSubmit={handleSubmit} error>
                    <Header color='blue' content='Login to your activities' as='h2' textAlign='center'/>
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

                    {submitError && !dirtySinceLastSubmit && <ErrorMessage error={submitError} text='Invalid Username or Password'/>}
              
                    <Button fluid disabled = { (invalid && !dirtySinceLastSubmit) || pristine} color='blue' content='Login' type='submit'/>
                </Form>
            )}
        />
    )
}
