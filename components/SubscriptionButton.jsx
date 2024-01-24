'use client';
import { Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useState } from 'react';
import { useToast } from './ui/use-toast';
import axios from 'axios';

const SubscriptionButton = ({ isPro }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const onClick = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Button
      size='sm'
      variant={isPro ? 'default' : 'premium'}
      disabled={isLoading}
      onClick={onClick}
    >
      {isPro ? 'Manage Subscription' : 'Upgrade'}
      {!isPro && <Sparkles className='w-4 h-4 ml-2 fill-white' />}
    </Button>
  );
};

export default SubscriptionButton;
