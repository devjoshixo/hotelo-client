import React, { useState } from 'react';

const InfoForm = (props) => {
  const [error, setError] = useState({});
  const formDetailChangeHandler = (event) => {
    props.onFormChange(event);
  };

  const isObjectEmpty = (objectName) => {
    return Object.keys(objectName).length === 0;
  };

  const formSubmitHandler = (event) => {
    event.preventDefault();
    checkError();

    if (isObjectEmpty(error)) {
      props.setNext(true);
    }
  };

  const checkError = () => {
    let err = {};
    if (props.formDetails.firstname.trim() == '') {
      err.firstname = 'Please enter your first name';
    }
    if (props.formDetails.lastname.trim() == '') {
      err.lastname = 'Please enter your last name';
    }
    setError(err);
  };

  return (
    <form
      className='flex flex-col basis-[26rem] gap-[1.3rem] self-center m-[2rem_0_0_0] mx-auto'
      onSubmit={formSubmitHandler}
    >
      <h4 className=' text-[1.7rem] text-[#191e3b] mb-[-0.4rem] font-medium leading-10'>
        What name do you use on your travel ID?
      </h4>
      <p className='text-[13px] mt-0'>
        Match your account name to the ID you use when travelling, like a
        passport or licence. We'll have it ready next time you book.
      </p>
      <input
        type='text'
        className='h-[2.7rem] bg-[white] rounded-[10px] text-[black] text-base pl-4 border border-[#0000009e] placeholder-opacity-50'
        name='firstname'
        placeholder='First Name'
        onChange={formDetailChangeHandler}
      />
      <p className='my-[-0.8rem] mx-[5px] text-[12px] text-[red]'>
        {error.firstname}
      </p>
      <input
        type='text'
        className='h-[2.7rem] bg-[white] rounded-[10px] text-[black] text-base pl-4 border border-[#0000009e] placeholder-opacity-50'
        name='lastname'
        placeholder='Last Name'
        onChange={formDetailChangeHandler}
      />
      <p className='my-[-0.8rem] mx-[5px] text-[12px] text-[red]'>
        {error.lastname}
      </p>
      <button className='h-12 bg-[#0d4eaf] border-[transparent] border text-xl text-[white] font-medium mt-2 rounded-[20px] hover:bg-[white] hover:text-[#0d4eaf] hover:border-[#0d4eaf]'>
        Continue
      </button>
    </form>
  );
};

export default InfoForm;
