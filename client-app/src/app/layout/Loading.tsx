import React from 'react'
import { Dimmer, Loader } from 'semantic-ui-react'

//instead of making an interface you make an object directly
export const Loading: React.FC<{inverted?: boolean, content?: string}> = ({inverted, content}) => {
    return (
      <Dimmer active inverted = {inverted}>
          <Loader content = {content}/>
      </Dimmer>
    )
}
