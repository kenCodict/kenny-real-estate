import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Loader from "../Components/Loader"
import ErrorModal from "../Components/ErrorModal"
import SuccessModal from "../Components/SuccessModal"

const SignIn = () => {
  const [data, setData] = useState({
    password:"",
    email:"",
  })
  const navigate = useNavigate();
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const handleChange =  (e) => {
    setData({...data, [e.target.name]:e.target.value})
  }
  const submit = async (e) => {
e.preventDefault()
setLoading(true)

try {
  const res = await axios.post('/api/auth/signin',JSON.stringify(data), {
    headers: {
      'Content-Type':'application/json'
    }
  })
  const dat = await res.data
  if (dat.success  === false) {
    setError(dat.message)
    setLoading(false)
  }else {
    setSuccess(dat.message)
    setLoading(false)
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
 setError(error.response.data.message)
 setLoading(false)
}

  }
  return (
    <section className='px-6 max-w-xl mx-auto'>
<h1 className="text-3xl text-center font-black my-7 ">Sign Sign</h1>
<form className="flex flex-col  mx-auto  gap-5" onSubmit={submit}>
  
  <input type="email" className="border rounded-lg p-3" id="email" value={data.email} name='email' onChange={handleChange} placeholder="Email Address" />
 
  <input type="password" className="border rounded-lg p-3" id="email" value={data.password} name='password' onChange={handleChange}  placeholder="Password"/>
  <button disabled={loading} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-2" type="submit">Sign In</button>
</form>
<div className="flex gap-2 mb-5 my-5 ">
  <p className="">Do Not Have an Account?</p>
  <Link to={'/signup'} className="text-blue-600 underline">{loading ? 'Loading' : 'Create Account'}</Link>
</div>

{
  loading && <Loader />
}

{
  error && <ErrorModal setError={setError} error={error} />
}
{
  success && <SuccessModal setSuccess={setSuccess} success={success} />
}
    </section>
  )
}

export default SignIn