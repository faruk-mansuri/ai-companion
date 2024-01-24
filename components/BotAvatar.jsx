import { Avatar, AvatarImage } from './ui/avatar';

const BotAvatar = ({ src }) => {
  return (
    <Avatar className='h-12 w-12'>
      <AvatarImage src={src} />
    </Avatar>
  );
};

export default BotAvatar;
