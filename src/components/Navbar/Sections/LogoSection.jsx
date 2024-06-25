import React from 'react';
import { useHistory } from 'react-router-dom';

const LogoSection = () => {
  const navigation = useHistory();

  const redirectHome = () => {
    navigation.push('/');
  };
  return (
    <div
      className='flex font-[Montserrat] items-center font-bold mt-1 text-[#203e5a] cursor-pointer'
      onClick={redirectHome}
    >
      <i className='fa-solid fa-hotel m-[0rem_0.6rem_0.5rem_0] text-[#2f5b85] scale-[1.7]'></i>
      <h1 className='text-[1.7rem]'>Hotelo</h1>
      <p className='text-xs font-light mt-3'>.com</p>
    </div>
  );
};

export default LogoSection;
