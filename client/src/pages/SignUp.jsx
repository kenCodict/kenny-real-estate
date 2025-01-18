import { useState } from "react"
import {Link, useNavigate} from 'react-router-dom'
import axios from 'axios'
import Loader from "../Components/Loader"
import ErrorModal from "../Components/ErrorModal"
import SuccessModal from "../Components/SuccessModal"

const SignUp = () => {
  const [data, setData] = useState({
    name:"",
    password:"",
    email:"",
    username:"",
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
console.log('====================================');
console.log(data);
console.log('====================================');
try {
  const res = await axios.post('/api/auth/signup',JSON.stringify(data), {
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
      name:"",
      password:"",
      email:"",
      username:"",
    })
    navigate('/signin')
  }
  console.log('====================================');
  console.log(dat);
  console.log('====================================');
} catch (error) {
 console.log('====================================');
 console.log(error);
 console.log('===================================='); 
 setError(error.message)
 setLoading(false)
}

  }
  return (
    <section className='px-6'>
<h1 className="text-3xl text-center font-black my-7 ">Sign Up</h1>
<form className="flex flex-col max-w-xl mx-auto  gap-5" onSubmit={submit}>
  <input type="text" className="border rounded-lg p-3" id="name" value={data.name} name='name' onChange={handleChange}  placeholder="Full Name"/>
  <input type="email" className="border rounded-lg p-3" id="email" value={data.email} name='email' onChange={handleChange} placeholder="Email Address" />
  <input type="username" className="border rounded-lg p-3" id="username" value={data.username} name='username' onChange={handleChange} placeholder="Username" />
  <input type="password" className="border rounded-lg p-3" id="email" value={data.password} name='password' onChange={handleChange}  placeholder="Password"/>
  <button disabled={loading} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-2" type="submit">Sign Up</button>
</form>
<div className="flex gap-2 mb-5 my-5 ">
  <p className="">Have an Account?</p>
  <Link to={'/signin'} className="text-blue-600 underline">{loading ? 'Loading' : 'Sign In'}</Link>
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

export default SignUp