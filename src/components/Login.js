import React from 'react'
import Header from './Header'
import { useState } from 'react';
import { checkValidData } from '../utils/validate';
import { useRef } from 'react';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../utils/firebase';
import { addUser } from "../utils/userSlice";
import { useDispatch } from 'react-redux';
import {icon} from "../utils/constant"


const Login = () => {
    const dispatch = useDispatch();
    const [isSignInForm, setIsSignInForm] = useState(true);
    const [errorMessage, setErrorMessage] = useState(null);
    const name = useRef(null);
    const email = useRef(null);
    const password = useRef(null);

    const handleButtonClick = () => {
        const message = checkValidData(email.current.value, password.current.value);
        setErrorMessage(message);

        if (message) return;

        if (!isSignInForm) {
            //SignUp Logic
            createUserWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed up 
                    const user = userCredential.user;
                    updateProfile(user, {
                        displayName: name.current.value, photoURL: icon
                      }).then(() => {
                        // Profile updated!
                        const { uid, email, displayName, photoURL } = auth.currentUser;
              dispatch(
                addUser({
                  uid: uid,
                  email: email,
                  displayName: displayName,
                  photoURL: photoURL,
                }));
                        // ...
                      }).catch((error) => {
                        // An error occurred
                        setErrorMessage(error);
                        // ...
                      });
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage(errorCode + "- " + errorMessage);
                    // ..
                });
        } else {
            //SignIn Logic
            signInWithEmailAndPassword(auth, email.current.value, password.current.value)
                .then((userCredential) => {
                    // Signed in 
                    const user = userCredential.user;
                    // ...
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    setErrorMessage("Invalid Email or Password");
                });

        }
    }

    const toogleSighInForm = () => {
        setIsSignInForm(!isSignInForm)
    }
    return (
        <div >
            <Header />
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt='' />
            </div>
            <form
                onSubmit={(e) => e.preventDefault()}
                className="w-full md:w-3/12 absolute p-12 bg-black my-36 mx-auto right-0 left-0 text-white rounded-lg bg-opacity-80">
                <h1
                    className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}
                </h1>
                {!isSignInForm &&
                    (<input ref={name} type='text' placeholder='Name' className='p-3 m-2 w-full bg-gray-800 ' />)
                }
                <input
                    ref={email}
                    type='email'
                    placeholder='Email'
                    className='p-3 m-2 w-full bg-gray-800 '
                />
                <input
                    ref={password}
                    type='text'
                    placeholder='Password'
                    className='p-3 m-2 w-full bg-gray-800 '
                />
                <p
                    className='ml-2 py-2 text-sm'>{errorMessage}</p>
                <button
                    className='p-2 m-2 bg-red-700 w-full rounded-lg'
                    onClick={handleButtonClick}>{isSignInForm ? "Sign In" : "Sign Up"}
                </button>
                <p
                    className='py-4 text-sm'>{isSignInForm ? "New to Netfilx Sign In" : "Already user Sign Up"}
                    <u onClick={toogleSighInForm} className='cursor-pointer px-1'>Here</u>
                </p>
            </form>
        </div>
    )
}

export default Login
