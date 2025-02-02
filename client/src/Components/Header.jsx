import { FaSearch } from 'react-icons/fa'
import { Link, useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react'
const Header = () => {
  const {currentUser} = useSelector(state => state.persistedReducer.user)
const [searchTerm, setSearchTem] = useState('')
const navigate = useNavigate()
const handleSubmit = (e) => {
e.preventDefault()
const urlParams = new URLSearchParams(window.location.search)
urlParams.set('searchTerm', searchTerm);
const searchQuery = urlParams.toString()
navigate(`/search?${searchQuery}`)
}

useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const searching = urlParams.get("searchTerm");
  if (searching) {
    setSearchTem(searching);
  }
},[])
  return (
    <header className="bg-slate-200 shadow-md ">
      <div className="flex justify-between items-center max-w-7xl mx-auto p-3 gap-5">
        <Link to={"/"}>
          <h1 className="font-black text-sm sm:text-lg flex flex-wrap">
            <span className="text-slate-500">Kenny</span>
            <span className="text-slate-700">Estate</span>
          </h1>
        </Link>
        <form className="bg-slate-100 p-3 rounded-lg flex justify-between items-center" onSubmit={handleSubmit}>
          <input
            type="text"
            value={searchTerm}
            className="bg-transparent focus:outline-none w-24 sm:w-64"
            placeholder="Search..."
            onChange={(e) => setSearchTem(e.target.value)}
          />
          <button type='submit'>
            <FaSearch size={20} className="text-slate-500" />
          </button>
        </form>
        <nav className="flex gap-4">
          <Link
            to={"/"}
            className="hidden sm:inline text-slate-700  hover:underline"
          >
            Home
          </Link>
          <Link
            to={"/about"}
            className="hidden sm:inline text-slate-700  hover:underline"
          >
            About
          </Link>
          {currentUser ? (
            <Link to={"/profile"} className=" text-slate-700  hover:underline">
              <img
                src={currentUser?.avatar}
                alt=""
                className="rounded-full h-7 w-7 object-cover"
              />
            </Link>
          ) : (
            <Link to={"/signin"} className=" text-slate-700  hover:underline">
              Sign In
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}

export default Header