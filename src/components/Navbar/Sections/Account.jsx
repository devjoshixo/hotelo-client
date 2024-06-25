import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import useOutSideClick from '../../../hooks/UseOutsideClick';
import AuthContext from '../../../context/AuthContext';
import UseLogout from '../../../hooks/UseLogout';
import { useHistory, useLocation } from 'react-router-dom/cjs/react-router-dom';

const Account = (props) => {
  const [signInref, signIn, setSignIn] = useOutSideClick();
  const ctx = useContext(AuthContext);
  const logout = UseLogout();
  const location = useLocation();
  const history = useHistory();

  const redirectLogin = () => {
    sessionStorage.setItem(
      'redirect',
      JSON.stringify({ redirect: location.pathname + location.search })
    );

    history.push('/account/login');
  };

  return (
    <div
      className='py-[15px] px-0'
      onClick={() => {
        setSignIn(true);
      }}
    >
      <p className='cursor-pointer text-[#2f5b85] hover:text-[black]'>
        {ctx.login.loggedIn ? ctx.login.user.firstname : 'Sign in'}
      </p>
      {signIn && (
        <div className='absolute top-[9%] left-3/4' ref={signInref}>
          {ctx.login.loggedIn ? (
            <div className='rounded-[20px] absolute flex flex-col gap-4 pb-8 items-center z-[5] radius-[10px] bg-[white] top-[110%] left-[-80%] min-w-[21rem] shadow-[5px_3px_5px] shadow-signin-shadow'>
              Hi,{ctx.login.user.firstname}
              <button onClick={logout}>Logout</button>
            </div>
          ) : (
            <div className='rounded-[20px] absolute flex flex-col gap-4 px-4 pt-0 pb-8 items-center z-[5] radius-[10px] bg-[white] top-full left-[-80%] min-w-[21rem] shadow-[10px_10px_5px] shadow-signin-shadow'>
              <h2 className='ml-4 text-[black]  font-medium'>
                Save an average of 15% on thousands of hotels when you're signed
                in
              </h2>

              <button
                className='w-[12rem] h-12 border-none bg-[#386997] text-[white] rounded-[50px]  hover:brightness-[80%]'
                onClick={redirectLogin}
              >
                Sign in
              </button>

              <p
                onClick={redirectLogin}
                className='text-[#386997] cursor-pointer hover:underline'
              >
                Sign up, it's free
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Account;
