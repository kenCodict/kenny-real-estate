import { useState } from "react"
import {Link} from 'react-router-dom'

const SignUp = () => {
  const [data, setData] = useState({
    name:"",
    password:"",
    email:"",
    username:"",
  })
  const handleChange = (e) => {
    setData({...data, [e.target.name]:e.target.value})
  }
  return (
    <section className='px-6'>
<h1 className="text-3xl text-center font-black my-7 ">Sign Up</h1>
<form className="flex flex-col max-w-6xl mx-auto  gap-5">
  <input type="text" className="border rounded-lg p-3" id="name" value={data.name} name='name' onChange={handleChange}  placeholder="Full Name"/>
  <input type="email" className="border rounded-lg p-3" id="email" value={data.email} name='email' onChange={handleChange} placeholder="Email Address" />
  <input type="username" className="border rounded-lg p-3" id="username" value={data.username} name='username' onChange={handleChange} placeholder="Username" />
  <input type="password" className="border rounded-lg p-3" id="email" value={data.password} name='password' onChange={handleChange}  placeholder="Password"/>
  <button className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-2">Sign Up</button>
</form>
<div className="flex gap-2 mb-5 my-5 ">
  <p className="">Have an Account?</p>
  <Link to={'/signin'} className="text-blue-600 underline">Sign In</Link>
</div>
    </section>
  )
}

export default SignUp