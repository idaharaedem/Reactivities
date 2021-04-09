import React from 'react';
import { Card, Image, Icon} from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import { IProfile } from '../../app/models/Profile';

interface IProp {
profile: IProfile 
}

const ProfileCard: React.FC<IProp> = ({profile}) => {
  return (
    <Card as={Link} to={`/profile/${profile?.username}`}>
      <Image src={profile?.mainImage || '/assets/user.png'} />
      <Card.Content>
        <Card.Header>{profile?.displayName}</Card.Header>
      </Card.Content>
      <Card.Content extra>
        <div>
          <Icon name='user' />
          {profile?.followersCount}
        </div>
      </Card.Content>
    </Card>
  );
};

export default ProfileCard;