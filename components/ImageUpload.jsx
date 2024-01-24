'use client';

import { CldUploadButton } from 'next-cloudinary';
import Image from 'next/image';
import { useEffect, useState } from 'react';

const ImageUpload = ({ value, onChange, disabled }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) return null;

  return (
    <div className='space-y-4 w-full flex  justify-center items-center'>
      <CldUploadButton
        options={{
          maxFiles: 1,
        }}
        uploadPreset='qtjvg6zr'
        onUpload={(result) => onChange(result.info.secure_url)}
      >
        <div className='p-4 border-4 border-dashed border-primary/10 rounded-lg hover:opacity-75 transition flex flex-col space-y-2 items-center justify-center'>
          <div className='relative h-40 w-40'>
            <Image
              fill
              alt='upload'
              src={value || '/placeholder.svg'}
              className='rounded-lg object-cover'
            />
          </div>
        </div>
      </CldUploadButton>
    </div>
  );
};

export default ImageUpload;
