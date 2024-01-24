'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { useProModal } from '@/hooks/useProModal';
import { Separator } from './ui/separator';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import { useEffect, useState } from 'react';
import axios from 'axios';

const ProModal = () => {
  const proModal = useProModal();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const onSubscribe = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get('/api/stripe');
      window.location.href = response.data.url;
    } catch (error) {
      toast({
        variant: 'destructive',
        description: 'Something went wrong.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <Dialog open={proModal.isOpen} onOpenChange={proModal.onClose}>
      <DialogContent>
        <DialogHeader className='space-y-4'>
          <DialogTitle className='text-center'>Upgrade to Pro</DialogTitle>
          <DialogDescription className='text-center space-y-2'>
            Create
            <span className='text-sky-500 mx-1 font-medium'>Custom AI</span>
            companion
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <div className='flex justify-between'>
          <p className='text-2xl font-medium'>
            ₹ 2000 / <span className='text-sm font-normal'>month</span>
          </p>

          <Button disabled={isLoading} variant='premium' onClick={onSubscribe}>
            Subscribe
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ProModal;
