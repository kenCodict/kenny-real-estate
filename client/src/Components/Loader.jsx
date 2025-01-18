
// import { FaSpinner } from 'react-icons/fa'
import { ImSpinner } from "react-icons/im";
const Loader = () => {
  return (
    <section className="bg-gray-400 bg-opacity-30 fixed top-0 left-0 h-screen w-screen flex items-center justify-center z-40">
        <div className="flex flex-col gap-5">
            <h1 className="text-2xl font-mono font-black text-blue-800 animate-pulse ">
                Kenny Estate
            </h1>
            <p className="text-4xl animate-spin h-fit w-fit mx-auto">
                {/* <FaSpinner /> */}
                <ImSpinner />
            </p>
        </div>
    </section>
  )
}

export default Loader