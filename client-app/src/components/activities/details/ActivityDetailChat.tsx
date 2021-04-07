import React, { Fragment, useContext, useEffect } from 'react'
import { Segment, Header, Form, Button,Comment } from 'semantic-ui-react'
import { observer } from 'mobx-react-lite';
import { RootStoreContext } from '../../../app/stores/rootStore';
import {Form as FinalForm, Field} from 'react-final-form';
import { Link } from 'react-router-dom';
import { TextAreaInput } from '../../../app/form/TextAreaInput';
import { formatDistance } from 'date-fns';

 const ActivityDetailChat = () => {

  const rootStore = useContext(RootStoreContext);

  const {createHubConnection,stopHubConnection, addComment, selectedActivity} = rootStore.activityStore;

  useEffect(()=> {
    createHubConnection();
    //cleaning up when leaving component
    return ()=> {
      stopHubConnection();
    }
  },[createHubConnection,stopHubConnection, selectedActivity])
    return (
        <Fragment>
        <Segment
          textAlign='center'
          attached='top'
          inverted
          color='orange'
          style={{ border: 'none' }}
          secondary
        >
          <Header>Chat about this event</Header>
        </Segment>
        <Segment attached>
          <Comment.Group>
            {selectedActivity && selectedActivity.comments &&
            selectedActivity.comments.map((comment) => (
              <Comment key = {comment.id}>
              <Comment.Avatar src={comment.photos || '/assets/user.png'} />
              <Comment.Content>
                <Comment.Author as={Link} to={`/profile/${comment.username}`}> {comment.displayName} </Comment.Author>
                <Comment.Metadata>
                  <div>{formatDistance(comment.createdAt, new Date)}</div>
                </Comment.Metadata>
                <Comment.Text>{comment.body}</Comment.Text>
                {/* <Comment.Actions>
                  <Comment.Action>Reply</Comment.Action>
                </Comment.Actions> */}
              </Comment.Content>
            </Comment>
            ))}

            <FinalForm
            onSubmit={addComment}
            render={({handleSubmit, submitting, form}) => (
              <Form onSubmit={()=> handleSubmit()!.then(()=> form.reset())}>
              <Field
                name='body'
                component={TextAreaInput}
                rows={3}
                placeholder='Enter your comment'
              />
              <Button
                content='Add Reply'
                labelPosition='left'
                icon='edit'
                color='grey'
                loading={submitting}
              />
            </Form>
            )}
              />

          </Comment.Group>
        </Segment>
      </Fragment>
    )
};

export default observer (ActivityDetailChat)
