import React from 'react';
import uniqid from 'uniqid';

const Modal = (props) => {
  return (
    <div className='fixed top-0 left-0 flex justify-center items-center z-[9999] w-[100vw] h-[100vh] overflow-y-hidden bg-[#00000076]'>
      <div className='fixed w-5/6 h-5/6 rounded-[20px] z-[999] bg-[white] overflow-hidden '>
        <div className='relative flex h-16 ml-3 mt-1 gap-2'>
          <i
            className='fa-regular fa-circle-xmark  text-[black] scale-[1.5] mt-3 h-10 flex justify-center font-bold text-[1.2rem] items-center rounded-[20px]'
            name='close'
            onClick={props.modalToggle}
          />
          <h3 className='text-2xl font-semibold'>{props.title}</h3>
        </div>

        {/* Image List */}

        <h1 className='ml-5 text-4xl'>All Photos</h1>
        <section className='mt-4 flex flex-row flex-wrap gap-3 min-h-[80px] justify-center items-center font-[0.9rem] h-5/6 w-full overflow-y-scroll'>
          {props.images.map((image) => {
            const url = image.image.url + '&rw=1200';
            return (
              <div className='w-[49%] h-3/5 flex flex-row flex-wrap mb-12'>
                <img
                  src={url}
                  className='w-full h-full object-cover mb-1'
                  loading='eager'
                  alt=''
                  key={uniqid()}
                />
                <p className='text-xl'>{image.image.description}</p>
              </div>
            );
          })}
        </section>

        {/* Image List */}
      </div>
    </div>
  );
};

export default Modal;
