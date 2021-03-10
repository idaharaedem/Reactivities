import React from 'react'
import { FieldRenderProps } from 'react-final-form'
import { Form, FormFieldProps, Label } from 'semantic-ui-react';
import {DateTimePicker} from 'react-widgets';

interface IProps extends FieldRenderProps<any, HTMLElement>, FormFieldProps {}

export const DateInput: React.FC<IProps> = (
    {input, 
    width, 
    placeholder, 
    meta:{touched, error}, 
    id = null,
    date = false,
    time=false,
    ...otherProps
}) => 
    
    {
    return (
        <Form.Field error={touched && !!error} width={width}>
            
        <DateTimePicker
        placeholder={placeholder}
        value={input.value || null}
        onChange={input.onChange}
        date = {date}
        time = {time}
        onBlur={input.onBlur}
        //prevents typing in field
        onKeyDown={(e)=> e.preventDefault()}
        {...otherProps}
        />
            {touched && error && (
                <Label basic color='red'>
                    {error}
                </Label>
            )}
        </Form.Field>
    )
}
