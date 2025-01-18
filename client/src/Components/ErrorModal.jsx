
import Modal from "../Components/Modal"
import { BiMessageAltError } from "react-icons/bi";
import { FaRegWindowClose } from "react-icons/fa";
const ErrorModal = ({error, setError}) => {
  return (
    <Modal show={error} onClose={() => setError('')} closeable={true}>
    <div className="bg-red-100 min-h-[100px] rounded-md flex flex-col items-center justify-center text-red-900 p-5 relative">
      <button className="absolute top-5  right-4 text-red-950 animate-bounce" onClick={() => setError('')}><FaRegWindowClose size={30} /></button>
    <BiMessageAltError size={50} className="animate-pulse" />
    <p className="text-center font-black text-md my-5">{error}</p>
    </div>
    
      </Modal>
  )
}

export default ErrorModal