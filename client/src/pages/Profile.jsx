import axios from 'axios'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Loader from '../Components/Loader'
import ErrorModal from '../Components/ErrorModal'
import SuccessModal from '../Components/SuccessModal'
import {signOutUserSuccess,signOutFailure,updateUserSuccess ,UpdateFailure, deleteUserSuccess,deleteFailure} from '../redux/features/user/userSlice'
import {Link} from 'react-router-dom'
import { FaEdit, FaTrash } from 'react-icons/fa'

const Profile = () => {
  const { currentUser } = useSelector(state => state.persistedReducer.user)
  const [data, setData] = useState({
    name: currentUser.name,
    password: null,
    email: currentUser.email,
    username: currentUser.username,
    avatar: currentUser.avatar,
  })
  const [error, setError] = useState('')
  const [file, setFile] = useState(undefined)
  const [success, setSuccess] = useState('')
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0) // For tracking upload progress
  const [uploading, setUploading] = useState(false) // To manage upload state
const [listings, setListings] = useState([])
  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value })
  }

  const handleImageChange = (e) => {
    setFile(e.target.files[0]) // Fixing access to file
  }

  useEffect(() => {
    if (file) {
      handleFileUpload('image') // Upload file when file is set
    }
  }, [file]) // Trigger whenever the file state changes

  const handleFileUpload = async (type) => {
    const formData = new FormData()
    formData.append('file', file)
    formData.append('upload_preset', type === 'image' ? 'image_preset' : 'video_preset')

    try {
      let cloudName = import.meta.env.VITE_CLOUDINARY_CLOUDNAME
      let apiurl = `https://api.cloudinary.com/v1_1/${cloudName}/${type}/upload`

      setUploading(true)

      const res = await axios.post(apiurl, formData, {
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total)
            setProgress(percent)
          }
        },
      })

      const mydat = res.data
      const { secure_url } = mydat
      setUploading(false)
      setData({ ...data, avatar: secure_url }) // Set avatar URL once upload is complete

      console.log('Image uploaded: ', secure_url)
    } catch (error) {
      setUploading(false)
      setError(error.message)
      console.error('Upload failed:', error)
    }
  }
const dispatch = useDispatch();
// Update profile
  const submit = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.patch(`/api/user/update/${currentUser._id}`, JSON.stringify(data), {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const dat = res.data
      if (dat.success === false) {
        dispatch(UpdateFailure(dat.message))
        setError(dat.message)
        setLoading(false)
      } else {
        
        setSuccess(dat.message)
        dispatch(updateUserSuccess(dat.data))
        setLoading(false)
        
      }
    } catch (error) {
      console.log(error)
      dispatch(UpdateFailure(error.response?.data?.message || 'Something went wrong'))
      setError(error.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }
  const handleShowListing = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.get(
        `/api/user/listings/${currentUser._id}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const dat = res.data;
     
      if (dat.success === false) {
        setError(dat.message);
        // setError(dat.message);
        setLoading(false);
      } else {
        setSuccess(dat.message);
        setListings(dat.data);
       
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };
  const handleListingDelete = async (id) => {
    // e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.delete(`/api/listing/delete/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dat = res.data;
      console.log("====================================");
      console.log(dat);
      console.log("====================================");
      if (dat.success === false) {
        setError(dat.message);
        // setError(dat.message);
        setLoading(false);
      } else {
        setSuccess(dat.message);
        setListings(listings.filter(item => item._id != id))
      //  await handleShowListing()

        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  // Delete Profile
  const handleDeleteUser = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.delete(`/api/user/delete/${currentUser._id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const dat = res.data
      if (dat.success === false) {
        dispatch(deleteFailure(dat.message))
        setError(dat.message)
        setLoading(false)
      } else {
        
        setSuccess(dat.message)
        dispatch(deleteUserSuccess())
        setLoading(false)
        
      }
    } catch (error) {
      console.log(error)
      dispatch(deleteFailure(error.response?.data?.message || 'Something went wrong'))
      setError(error.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }
  // Delete Profile
  const handleSignout = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const res = await axios.get(`/api/user/signout/${currentUser._id}`, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const dat = res.data
      if (dat.success === false) {
        dispatch(signOutFailure(dat.message))
        setError(dat.message)
        setLoading(false)
      } else {
        
        setSuccess(dat.message)
        dispatch(signOutUserSuccess())
        setLoading(false)
        
      }
    } catch (error) {
      console.log(error)
      dispatch(signOutFailure(error.response?.data?.message || 'Something went wrong'))
      setError(error.response?.data?.message || 'Something went wrong')
      setLoading(false)
    }
  }

  return (
    <section className="max-w-xl mx-auto p-4">
      <h1 className="font-black text-center text-3xl">Profile</h1>
      <form className="flex flex-col gap-5" onSubmit={submit}>
        <label htmlFor="file">
          <input
            type="file"
            name="file"
            id="file"
            className="hidden"
            onChange={handleImageChange}
            accept="image/*"
          />
          <img
            src={data.avatar || currentUser.avatar}
            alt="Avatar"
            className="rounded-full h-24 w-24 block mx-auto cursor-pointer"
          />
        </label>

        {/* Avatar URL Display */}
        {data.avatar && !uploading && (
          <div className="mt-2 text-center text-sm text-green-500">
            <a href={data.avatar} target="_blank" rel="noopener noreferrer">
              View uploaded image
            </a>
          </div>
        )}

        {/* Progress bar */}
        {uploading && (
          <div className="relative mt-4">
            <div className="w-full bg-gray-200 h-2 rounded-full">
              <div
                className="bg-blue-600 h-2 rounded-full"
                style={{ width: `${progress}%`, transition: "width 0.3s ease" }}
              ></div>
            </div>
            <div className="absolute inset-0 flex justify-center items-center">
              <span className="text-white text-xs font-semibold">
                {progress}%
              </span>
            </div>
          </div>
        )}

        <input
          type="text"
          className="border rounded-lg p-3"
          id="name"
          value={data.name}
          name="name"
          onChange={handleChange}
          placeholder="Full Name"
        />
        <input
          type="email"
          className="border rounded-lg p-3"
          id="email"
          value={data.email}
          name="email"
          onChange={handleChange}
          placeholder="Email Address"
        />
        <input
          type="text"
          className="border rounded-lg p-3"
          id="username"
          value={data.username}
          name="username"
          onChange={handleChange}
          placeholder="Username"
        />
        <input
          type="password"
          className="border rounded-lg p-3"
          id="password"
          value={data.password}
          name="password"
          onChange={handleChange}
          placeholder="Password"
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-2"
          type="submit"
        >
          Update Changes
        </button>
      </form>
      <Link
        to={"/create-listing"}
        className="bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95 w-full block my-3"
      >
        Create Listing
      </Link>
      <div className="flex gap-2 mb-5 my-5 justify-between">
        <button className="text-red-500 font-black" onClick={handleDeleteUser}>
          Delete Account
        </button>
        <button className="text-red-500 font-black" onClick={handleSignout}>
          Sign out
        </button>
      </div>
      <button
        className="text-green-500 font-bold text-center flex items-center justify-end w-fit mx-aut"
        onClick={handleShowListing}
      >
        Show Listing
      </button>

      {listings && listings.length > 0 && (
        <section className="">
          <h1 className="font-black text-xl text-center my-5">Your Listings</h1>
          {listings.map((item) => {
            return (
              <article className=" mt-5 border-b-2 pb-4" key={item._id}>
                <div className="flex justify-between items-center gap-4 flex-wrap">
                  <Link to={`/listing/${item._id}`} className=" flex gap-2">
                    <img
                      src={item.imgUrls[0]?.url}
                      alt="listing"
                      className="w-[100px] h-[50px]"
                    />
                    <p className="font-blacktext-slate-700 hover:underline truncate">
                      {item.name}
                    </p>
                  </Link>
                  <div className="">
                    <button
                      className="text-red-500 mx-5"
                      onClick={() => handleListingDelete(item._id)}
                    >
                      <FaTrash />
                    </button>
                    <Link
                      to={`/update-listing/${item._id}`}
                      className="text-green-500"
                    >
                      <FaEdit />
                    </Link>
                  </div>
                </div>
              </article>
            );
          })}
        </section>
      )}

      {loading && <Loader />}

      {error && <ErrorModal setError={setError} error={error} />}
      {success && <SuccessModal setSuccess={setSuccess} success={success} />}
    </section>
  );
}

export default Profile
