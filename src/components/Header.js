import { onAuthStateChanged, signOut } from 'firebase/auth';
import React, { useEffect } from 'react'
import { auth } from '../utils/firebase';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser, removeUser } from '../utils/userSlice';
import { LOGO, icon } from '../utils/constant';
import { toggleGptSearchView } from '../utils/gptSlice';
import { changeLanguage } from '../utils/configSlice';

const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(store => store.user);
  const showGptSearch = useSelector((store) => store.gpt.showGptSearch);

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
        const { uid, displayName, email } = user;
        dispatch(addUser({ uid, displayName, email }));
        navigate("/browse")

      } else {
        // User is signed out
        dispatch(removeUser());
        navigate("/")

      }

    });
    return () => unsubscribe();
  }, [])

  const handleGptSearchClick = () => {
    dispatch(toggleGptSearchView())
  }

  const handleLanguageChange = (e) => {
    dispatch(changeLanguage(e.target.value));
  }

  return (
    <div className='absolute w-screen px-8 py-2 background-gradient-to-b from-black z-10 flex justify-between'>
      <img className='w-44'
        src={LOGO} alt='' />

      {user && (<div className='flex p-2'>
        {showGptSearch && (
          <select className='p-2 m-2 bg-gray-900 text-white' onChange={handleLanguageChange}>
            <option value="en">English</option>
            <option value="hindi">Hindi</option>
            <option value="spanish">Spanish</option>
          </select>
        )
        } <button className='py-2 px-4 mx-4  bg-purple-800 text-white rounded-lg'
          onClick={handleGptSearchClick}
          >
          {showGptSearch ? "Home Page" : "GPT Search"}
          </button>
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
