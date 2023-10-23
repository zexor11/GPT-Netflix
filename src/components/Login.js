import React from 'react'
import Header from './Header'
import { useState } from 'react';

const Login = () => {
    const [isSignInForm, setIsSignInForm] = useState(true);
    const toogleSighInForm = () => {
        setIsSignInForm(!isSignInForm);
    }
    return (
        <div >
            <Header />
            <div className='absolute'>
                <img src="https://assets.nflxext.com/ffe/siteui/vlv3/a73c4363-1dcd-4719-b3b1-3725418fd91d/fe1147dd-78be-44aa-a0e5-2d2994305a13/IN-en-20231016-popsignuptwoweeks-perspective_alpha_website_large.jpg" alt='' />
            </div>
            <form className='w-3/12 absolute p-12 bg-black my-36 mx-auto left-0 right-0 text-white rounded-lg bg-opacity-75'>
                <h1 className='font-bold text-3xl py-4'>{isSignInForm ? "Sign In" : "Sign Up"}</h1>
                {!isSignInForm &&
                    (<input type='text' placeholder='Name' className='p-3 m-2 w-full bg-gray-800 ' />)
                }
                <input type='email' placeholder='Email' className='p-3 m-2 w-full bg-gray-800 ' />
                <input type='text' placeholder='Password' className='p-3 m-2 w-full bg-gray-800 ' />
                <button className='p-2 m-2 bg-red-700 w-full rounded-lg'>{isSignInForm ? "Sign In" : "Sign Up"}</button>
                <p className='py-4'>{isSignInForm ? "New to Netfilx Sign In" : "Already user Sign Up"}
                    <u onClick={toogleSighInForm} className='cursor-pointer px-1'>Here</u>
                </p>
            </form>
        </div>
    )
}

export default Login
