import React, { useContext, useState } from 'react';
import AuthContext from '../../../context/AuthContext';
import useLogin from '../../../hooks/UseLogin';
import { useHistory } from 'react-router-dom';
import buttonloader from '../../../assets/infinite-spinner.svg';

const Password = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const ctx = useContext(AuthContext);
  const { error, login } = useLogin();
  const history = useHistory();

  const formDetailChangeHandler = (event) => {
    props.onFormChange(event);
  };

  const submitEmailHandler = async (event) => {
    event.preventDefault();
    setShowLoader(true);
    const done = await login(props.formDetails);

    if (done) {
      props.redirecting();
    }
    setShowLoader(false);
  };
  return (
    <form
      className='flex flex-col basis-[25rem] gap-[1.3rem] self-center m-[2rem_auto_0_auto] px-6'
      onSubmit={submitEmailHandler}
    >
      <h4 className='text-4xl text-[#191e3b] mb-[-0.4rem] font-medium leading-10'>
        Enter your password
      </h4>
      <div className='flex mt-5 flex-col flex-nowrap gap-0 pl-4'>
        <label className='text-[0.75rem] font-bold'>Email</label>
        <p className='m-0 text-base font-light'>{props.formDetails.email}</p>
      </div>
      <input
        type='password'
        placeholder='Password'
        name='password'
        className='h-[2.7rem] bg-[white] rounded-[10px] text-[black] pl-4 border border-[#0000009e]'
        onChange={formDetailChangeHandler}
      />
      <button className='h-12 bg-[#1661d1] border-[transparent] border text-[1.2rem] font-medium mt-2 rounded-[25px] hover:bg-[#094aaa] hover:border-[#094aaa]'>
        {showLoader ? <img src={buttonloader} className='w-16' /> : ' Continue'}
      </button>
    </form>
  );
};

export default Password;
