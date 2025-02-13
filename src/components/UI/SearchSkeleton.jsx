import React from 'react';
import Skeleton from '@mui/material/Skeleton';
import uniqid from 'uniqid';
const SearchSkeleton = () => {
  return (
    <div className='w-full flex flex-col gap-3 pl-4'>
      {[...Array(3)].map((_, index) => (
        <div key={uniqid()} className='flex items-center gap-2'>
          <Skeleton sx={{ bgcolor: 'grey.300' }} width={25} height={55} />
          <div>
            <Skeleton sx={{ bgcolor: 'grey.300' }} width={170} />
            <Skeleton sx={{ bgcolor: 'grey.300' }} width={70} height={15} />
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchSkeleton;
