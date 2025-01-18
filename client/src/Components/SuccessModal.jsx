
import Modal from "../Components/Modal"
import { GiCheckMark } from "react-icons/gi";
import { FaRegWindowClose } from "react-icons/fa";
const SuccessModal = ({success, setSuccess}) => {
  return (
    <Modal show={success} onClose={() => setSuccess('')} closeable={true}>
    <div className="bg-green-100 min-h-[100px] rounded-md flex flex-col items-center justify-center text-green-900 p-5 relative">
      <button className="absolute top-5  right-4 text-red-950 animate-bounce" onClick={() => setSuccess('')}><FaRegWindowClose size={30} /></button>
    <GiCheckMark size={50} className="animate-pulse" />
    <p className="text-center font-black text-md my-5">{success}</p>
    </div>
    
      </Modal>
  )
}

export default SuccessModal