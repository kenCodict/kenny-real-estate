import { FaSearch } from 'react-icons/fa'
import { Link } from 'react-router-dom'
const Header = () => {
  return (
    <header className='bg-slate-200 shadow-md '>
       <div className="flex justify-between items-center max-w-7xl mx-auto p-3 gap-5">
       <Link to={'/'}  >
       <h1 className="font-black text-sm sm:text-lg flex flex-wrap">
            <span className="text-slate-500">Kenny</span>
            <span className="text-slate-700">Estate</span>
            </h1>
</Link>
            <form  className="bg-slate-100 p-3 rounded-lg flex justify-between items-center">
                <input type="text" className="bg-transparent focus:outline-none w-24 sm:w-64" placeholder='Search...' />
            <FaSearch size={20} className='text-slate-500' />
            </form>
            <nav className="flex gap-4">
                <Link to={'/'} className='hidden sm:inline text-slate-700  hover:underline' >Home</Link>
                <Link to={'/about'} className='hidden sm:inline text-slate-700  hover:underline'>About</Link>
                <Link to={'/signin'} className=' text-slate-700  hover:underline' >Sign In</Link>
                
            </nav>
       </div>
    </header>
  )
}

export default Header