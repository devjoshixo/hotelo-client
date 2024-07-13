import React, { useState, useEffect } from 'react';
import uniqid from 'uniqid';
import Modal from './Modal/Modal';

const Image = (props) => {
  const [modal, setModal] = useState(false);
  const modalToggle = (event) => {
    let value = true;
    if (event.target.getAttribute('name') == 'close') {
      value = false;
    }
    setModal((prevState) => {
      return value;
    });
  };

  useEffect(() => {
    const body = document.querySelector('body');
    body.style.overflow = modal ? 'hidden' : 'auto';
  }, [modal]);

  return (
    <div className='flex gap-1 w-full cursor-pointer' onClick={modalToggle}>
      <div className='w-auto'>
        <img
          src={props.images[0].image.url + '&rw=1200'}
          loading='eager'
          alt=''
          className='w-[32rem] h-[18.4rem] object-cover bg-[#31668e3]'
          key={uniqid()}
        />
      </div>
      <div className='w-1/2 flex flex-col gap-1'>
        <div className='w-full flex flex-row gap-1'>
          <img
            src={props.images[1].image.url + '&rw=1200'}
            loading='eager'
            alt=''
            className='w-1/2 h-36 bg-[#1668e3]'
            key={uniqid()}
          />
          <img
            src={props.images[2].image.url + '&rw=1200'}
            loading='eager'
            alt=''
            className='w-1/2 h-36 bg-[#1668e3]'
            key={uniqid()}
          />
        </div>
        <div className='w-full flex flex-row gap-1'>
          <img
            src={props.images[3].image.url + '&rw=1200'}
            loading='eager'
            alt=''
            className='w-1/2 h-36  bg-[#1668e3]'
            key={uniqid()}
          />
          <div className='w-1/2 relative'>
            <img
              src={props.images[4].image.url + '&rw=1200'}
              loading='eager'
              alt=''
              className='w-full h-36  bg-[#1668e3]'
              key={uniqid()}
            />
            <div className='absolute bg-[#20202098] text-[white] top-[60%] right-[4%] w-24 h-10 flex justify-center font-bold text-[1.2rem] gap-[10px] items-center rounded-[20px] hover:bg-[#202020b3]'>
              <i className='fa-regular fa-images'></i>
              {props.images.length - 1}+
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      {modal && (
        <Modal
          images={props.images}
          modalToggle={modalToggle}
          title={props.title}
        />
      )}
      {/* Modal */}
    </div>
  );
};

export default Image;
