import React, { useState, useRef, useEffect } from 'react';

const useOutsideClick = () => {
  const [visible, setVisible] = useState(false);
  const newRef = useRef(null);
  const handleOutsideClick = (e) => {
    if (newRef.current && !newRef.current.contains(e.target)) {
      setVisible(false);
    }
  };

  useEffect(() => {
    document.addEventListener('click', handleOutsideClick, true);
    return () => {
      document.removeEventListener('click', handleOutsideClick, true);
    };
  });

  return [newRef, visible, setVisible];
};

export default useOutsideClick;
