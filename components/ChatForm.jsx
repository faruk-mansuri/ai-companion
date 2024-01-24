import { SendHorizonal } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const ChatForm = ({ isLoading, input, handleInputChange, onSubmit }) => {
  return (
    <form
      className='border-t border-primary/10 py-4 flex items-center gap-x-2'
      onSubmit={onSubmit}
    >
      <Input
        disabled={isLoading}
        value={input}
        onChange={handleInputChange}
        placeholder='Type a message'
        className='rounded-lg bg-primary/10'
      />

      <Button variant='ghost' disabled={isLoading}>
        <SendHorizonal className='h-6 w-6' />
      </Button>
    </form>
  );
};

export default ChatForm;
