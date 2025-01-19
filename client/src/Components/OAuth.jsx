import {  getAuth, GoogleAuthProvider, signInWithPopup} from "firebase/auth";
import { app } from "../firebase";
import axios from "axios";
import { signInFailure, signInSuccess } from "../redux/features/user/userSlice";
import { useNavigate } from "react-router";
import { useState } from "react";
import { useDispatch } from "react-redux";

const OAuth = ({error, setError, setSuccess}) => {
    const navigate = useNavigate();
    const dispatch = useDispatch()
  
const handleGoogleAuth = async () => {
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)

        const result = await signInWithPopup(auth, provider)
        console.log('=======result=============================');
console.log(result);
console.log('====================================');
const mydat =  {
    name: result?._tokenResponse?.fullName,
    username: result?._tokenResponse?.lastName + Math.random().toString(36).slice(-4),
    email: result?._tokenResponse?.email,
    photo: result?._tokenResponse?.photoUrl,

}
console.log('====================================');
console.log(mydat);
console.log('====================================');
        const res = await axios.post('/api/auth/google',mydat, {
            headers: {
                'Content-Type':'application/json'
              }
        })
        const dat = await res.data
          if (dat.success  === false) {
            dispatch(signInFailure(dat.message))
          }else {
            dispatch(signInSuccess(dat.data))
            setSuccess(dat.message)
          
            navigate('/')
          }
        console.log('=======auth result=============================');
        console.log(result);
        console.log('====================================');
    } catch (error) {
       console.log('====================================');
       console.log('Could Not Sign in with Google', error);
       console.log('====================================');
       setError('Could Not Sign in with Google')
    }
}
  return (
    <button onClick={handleGoogleAuth} type="button" className="text-white bg-red-700 rounded-lg p-3 shadow uppercase hover:opacity-95">Continue with google</button>
  )
}

export default OAuth