import React, { useState } from 'react'
import Loader from './Loader'
import axios from 'axios'
const Upload = () => {
  const [data, setData] = useState({
    image: '',
    video:''
  })
  const [loading, setLoading] = useState(false)
  const handleChange = (e) => {
    const { name, files } = e.target; // Destructure name and files
    if (files && files.length > 0) {
      setData({
        ...data,
        [name]: files[0] // Store the first file for the respective input
      });
    }
  };
  
  const uploadFile = async (type) => {
  const formData = new FormData()
  formData.append('file', type=== 'image' ? data.image : data.video)
  formData.append('upload_preset', type=== 'image' ? 'image_preset' : 'video_preset')
//   VITE_CLOUDINARY_CLOUDNAME
// VITE_CLOUDINARY_URL
// VITE_CLOUDINARY_API_KEY
// VITE_CLOUDINARY_SECRETE_KEY
try {
  let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME
  let apiurl = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`

  const res = await axios.post(apiurl, formData)
  const mydat = res.data
  const {secure_url} = mydat
  console.log('====================================');
  console.log(mydat);
  console.log(secure_url);
  console.log('====================================');
  return secure_url
} catch (error) {
  console.log('====================================');
  console.log(error);
  console.log('====================================');
}
  }
  const submit = async (e) => {
e.preventDefault()
setLoading(true)
const imgUrl = await uploadFile('image')
const videoUrl = await uploadFile('video')
const res = await axios.post('/api/upload/multi',JSON.stringify({imgUrl,videoUrl}), {
  headers: {
    'Content-Type':'application/json'
  }
})
const dat = await res.data
setData({
  image: '',
    video:''
})
setLoading(false)
console.log('====================================');
console.log(dat);
console.log('====================================');
  }
  return (
    <section className="">
      <form onSubmit={submit}>
     <div className="my-4">
     <label htmlFor="image">Upload Image</label>
     <input type="file" className="border rounded-lg p-3" id="image"  name='image' onChange={handleChange} accept='image/*' />
     </div>
     <div className="my-4">
     <label htmlFor="video">Upload Video</label>
     <input type="file" className="border rounded-lg p-3" id="video"  name='video' onChange={handleChange} accept='video/*' />
     </div>
     <button disabled={loading} className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-2" type="submit">Upload</button>
    </form>

    {
  loading && <Loader />
}
    </section>
  )
}

export default Upload