import React, { useState } from 'react';
import InfoForm from './InfoForm';
import Password from '../Existinguser/Password';

const NewUser = (props) => {
  const [next, setNext] = useState(false);
  return (
    <>
      {!next ? (
        <InfoForm
          onFormChange={props.onFormChange}
          formDetails={props.formDetails}
          setNext={setNext}
        />
      ) : (
        <Password
          onFormChange={props.onFormChange}
          formDetails={props.formDetails}
        />
      )}
    </>
  );
};

export default NewUser;
