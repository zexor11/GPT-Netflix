import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, icon } from '../utils/constant';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // Sign-out successful.
    }).catch((error) => {
      // An error happened.
      navigate("/error");
    });
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        const {uid, displayName, email} = user;
        dispatch(addUser({uid, displayName, email}));
        navigate("/browse")
      
      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/")
        
      }

    });
    return () => unsubscribe();
  }, [])

  return (
    <div className='absolute w-screen px-8 py-2 background-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44'
        src={LOGO} alt='' />
      
      {user && (<div >
        <img className="w-10 h-10 ml-4 mr-1 mb-1" src={icon} alt='' />

        <button
          className='bg-red-500 w-15 h-9 text-white font-bold p-1 rounded-lg'
          onClick={handleSignOut}>
          Sign Out
        </button>
      </div>)}

    </div>


  )
}

export default Header
