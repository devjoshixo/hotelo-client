import React, { useState } from 'react';
import google from '../../assets/Google.svg';
import { useCheckemail } from '../../hooks/UseCheckemail';
import buttonloader from '../../assets/infinite-spinner.svg';
import { useGoogleLogin } from '@react-oauth/google';
import * as JWT from 'jwt-decode';
import useGoogleSignIn from '../../hooks/UseGoogleSignIn';
import { useHistory } from 'react-router-dom';

const Email = (props) => {
  const [showLoader, setShowLoader] = useState(false);
  const { googleSignIn } = useGoogleSignIn();
  const history = useHistory();
  const login = useGoogleLogin({
    onSuccess: async (credentialResponse) => {
      const token = credentialResponse['access_token'];
      const response = await fetch(
        'https://www.googleapis.com/oauth2/v3/userinfo?access_token=' + token
      );
      const credential = await response.json();

      const newJson = await googleSignIn(credential);
      props.redirecting();
      // console.log(JWT.jwtDecode(token));
    },
  });
  const formDetailChangeHandler = (event) => {
    props.onFormChange(event);
  };

  const { checkEmailHook, error } = useCheckemail();

  const submitEmailHandler = async (event) => {
    setShowLoader(true);
    event.preventDefault();
    const done = await checkEmailHook(props.formDetails.email);
    if (done) {
      props.setEmailPage(false);
    }
    setShowLoader(false);
  };

  return (
    <div className='flex flex-col basis-[28rem] gap-4 self-center p-[2rem_0_0_0] px-auto '>
      <h4 className='text-[1.6rem] mb-[-1rem] font-medium'>
        Sign in or create an account
      </h4>
      <p className='text-sm'>
        Save an average of 15% on thousands of hotels as a member—it’s always
        free.
      </p>
      <div className='relative' onClick={login}>
        <button className='w-full h-12 bg-[#0f56c1] text-[white] border-none text-base font-medium rounded-[5px] hover:brightness-[0.9]'>
          Sign in with Google
        </button>
        <div className='absolute flex justify-center items-center left-[2%] top-[14%] rounded-[6px] w-[2.7rem] h-[2.2rem] bg-[white]'>
          <img src={google} className='w-[1.2rem] h-[1.2rem]' />
        </div>
      </div>
      <p className='text-center text-sm'>or</p>

      <form
        className='w-full m-0 p-0 flex flex-col flex-nowrap justify-center'
        onSubmit={submitEmailHandler}
      >
        <input
          type='email'
          placeholder='Email'
          name='email'
          value={props.formDetails.email}
          className='h-[2.7rem] w-full bg-[white] rounded-[10px]  pl-4 border border-[#2c2c2c6c]'
          onChange={formDetailChangeHandler}
        />
        <p>{error}</p>
        <button
          className='h-12 w-full text-[white] bg-[#1661d1] border-none text-[1.2rem] font-medium mt-2 rounded-3xl hover:bg-[#094aaa] flex justify-center items-center'
          type='submit'
        >
          {showLoader ? (
            <img src={buttonloader} className='w-16' />
          ) : (
            'Continue'
          )}
        </button>
      </form>
    </div>
  );
};

export default Email;
