import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Loader from "../Components/Loader"
import ErrorModal from "../Components/ErrorModal"
import SuccessModal from "../Components/SuccessModal"
import { useDispatch,useSelector } from "react-redux";
import {  sigInState ,signInSuccess ,signInFailure} from "../redux/features/user/userSlice";
import OAuth from "../Components/OAuth"

const SignIn = () => {
  const [data, setData] = useState({
    password:"",
    email:"",
  })

  
  const {error, loading} = useSelector(state => state.persistedReducer.user)
  const navigate = useNavigate();

  const [success, setSuccess] = useState('')
  const [errorCustom, setErrorCustom] = useState('')

  const handleChange =  (e) => {
    setData({...data, [e.target.name]:e.target.value})
  }
  const dispatch = useDispatch()
  const submit = async (e) => {
e.preventDefault()
// setLoading(true)
dispatch(sigInState())
try {
  const res = await axios.post('/api/auth/signin',JSON.stringify(data), {
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
    setData({
      password:"",
      email:"",
     
    })
    navigate('/')
  }

} catch (error) {
 console.log('====================================');
 console.log(error);
 console.log('====================================');
 setErrorCustom(error.response.data.message)
 dispatch(signInFailure(error.response.data.message))

}

  }
  return (
    <section className='px-6 max-w-xl mx-auto'>
<h1 className="text-3xl text-center font-black my-7 ">Sign Sign</h1>
<form className="flex flex-col  mx-auto  gap-5" onSubmit={submit}>
  
  <input type="email" className="border rounded-lg p-3" id="email" value={data.email} name='email' onChange={handleChange} placeholder="Email Address" />
 
  <input type="password" className="border rounded-lg p-3" id="email" value={data.password} name='password' onChange={handleChange}  placeholder="Password"/>
  <button disabled={loading} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-2" type="submit">Sign In</button>
  <OAuth setError={setErrorCustom} error={errorCustom} setSuccess={setSuccess} />
</form>
<div className="flex gap-2 mb-5 my-5 ">
  <p className="">Do Not Have an Account?</p>
  <Link to={'/signup'} className="text-blue-600 underline">{loading ? 'Loading' : 'Create Account'}</Link>
</div>

{
  loading && <Loader />
}

{
  errorCustom && <ErrorModal setError={setErrorCustom} error={errorCustom} />
}
{
  success && <SuccessModal setSuccess={setSuccess} success={success} />
}
    </section>
  )
}

export default SignIn