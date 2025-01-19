import axios from 'axios'
import { useState } from 'react'
import { useSelector } from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector(state => state.persistedReducer.user)
    const [data, setData] = useState({
      name: currentUser.name,
      password:'',
      email:currentUser.email,
      username:currentUser.username,
      avatar: currentUser.avatar,
    })
  
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const handleChange =  (e) => {
    setData({...data, [e.target.name]:e.target.value})
  }
  const handleImageChane =  (e) => {
    setData({...data, [e.target.name]:e.target.file[0]})
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
 
  }
  console.log('====================================');
  console.log(dat);
  console.log('====================================');
} catch (error) {
 console.log('====================================');
 console.log(error);
 console.log('===================================='); 
 setError(error.response.data.message)
 setLoading(false)
}

  }
  return (
    <section className='max-w-xl mx-auto p-4'>
      <h1 className="font-black text-center text-3xl">Profile</h1>
      <form className="flex flex-col   gap-5" onSubmit={submit}>
       <label htmlFor="avatar">
       <input type="file" name="avatar" id="avatar" className='hidden' onChange={handleImageChane} />
       <img src={currentUser.avatar} alt="" className="rounded-full h-24 w-24 block mx-auto cursor-pointer" />
       </label>
  <input type="text" className="border rounded-lg p-3" id="name" value={data.name} name='name' onChange={handleChange}  placeholder="Full Name"/>
  <input type="email" className="border rounded-lg p-3" id="email" value={data.email} name='email' onChange={handleChange} placeholder="Email Address" />
  <input type="username" className="border rounded-lg p-3" id="username" value={data.username} name='username' onChange={handleChange} placeholder="Username" />
  <input type="password" className="border rounded-lg p-3" id="email" value={data.password} name='password' onChange={handleChange}  placeholder="Password"/>
  <button disabled={loading} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-2" type="submit">Update Changes</button>

</form>

<div className="flex gap-2 mb-5 my-5 justify-between ">
<button className="text-red-500 font-black">Delete Account</button>
<button className="text-red-500 font-black">Sign out</button>
  
</div>
    </section>
  )
}

export default Profile