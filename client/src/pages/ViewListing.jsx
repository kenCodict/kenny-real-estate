import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import Loader from "../Components/Loader";
import ErrorModal from "../Components/ErrorModal";
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation} from "swiper/modules";
import 'swiper/css/bundle'
import { FaBath, FaBed, FaChair, FaMapMarked, FaMapMarker, FaMarker, FaParking, FaShare, FaShower } from "react-icons/fa";

import { useDispatch, useSelector } from 'react-redux'

const ViewListing = () => {
  const { currentUser } = useSelector(state => state.persistedReducer.user)
  SwiperCore.use([Navigation]);
  const router = useNavigate();
  const [error, setError] = useState("");
  //   const [file, setFile] = useState(undefined)
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [showContactFor, setShowContactForm] = useState(false);

  //const [progress, setProgress] = useState(0) // For tracking upload progress
  const [uploading, setUploading] = useState(false); // To manage upload state
  const [listing, setListing] = useState(null); // To manage upload state
  const { id } = useParams();
const [message, setMessage] = useState("");
const hadleContactMessage = () => {};

  useEffect(() => {
    getSingleListing();
  }, []);

  const getSingleListing = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/listing/listing/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      const dat = res.data;

      if (dat.success === false) {
        setError(dat.message);
        // setError(dat.message);
        setLoading(false);
      } else {
        setSuccess(dat.message);
        setListing(dat.data);
        console.log("====================================");
        console.log(dat.data);
        console.log("====================================");
       
        setLoading(false);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Something went wrong");
      setLoading(false);
    }
  };

  console.log('====================================');
  console.log(listing);
  console.log('====================================');
  return (
    <main className="">
      {listing && (
        <>
          {" "}
          <section className="relative">
            <Swiper navigation>
              {listing?.imgUrls.map((item) => {
                return (
                  <SwiperSlide key={item.url}>
                    <div
                      className="h-[500px] bg-center "
                      style={{ background: `url(${item.url})`, backgroundRepeat:'no-repeat', backgroundPosition:'center', backgroundSize:'cover', backgroundAttachment:"fixed" }}
                    >
                      {/* <img src={item.url} alt="" className="" /> */}
                    </div>
                  </SwiperSlide>
                );
              })}
            </Swiper>
            <button className="absolute top-10 right-10 h-10 w-10 rounded-full bg-slate-200 z-50 flex items-center justify-center cursor-pointer">
              <FaShare />
            </button>
          </section>
          <section className="max-w-4xl mx-auto p-4">
            <h1 className="font-black text-2xl ">
              {listing?.name} - $
              {Number(listing?.regularPrice).toLocaleString()}{" "}
              {listing?.type == "rent" ? "/ month" : ""}{" "}
            </h1>
            <div className="flex gap-1 my-4">
              <FaMapMarker color="green" size={24} />
              <p className="text-slate-500">{listing?.address}</p>
            </div>
            <div className="flex gap-4">
              <p className="bg-red-700 w-fit text-white capitalize rounded-md shadow px-10 py-1">
                {listing.type == "sell" ? "For Sale" : "For Rent"}
              </p>
              {listing.offer && (
                <p className="bg-green-700 w-fit text-white capitalize rounded-md shadow px-10 py-1">
                  $
                  {(
                    +listing.regularPrice - +listing.dicountPrice
                  ).toLocaleString()} off
                </p>
              )}
            </div>

            <p className="text-slate-700 my-4">
              <strong className="text-black font-semibold">
                Description -{" "}
              </strong>
              {listing.description}
            </p>

            <ul className="flex items-center gap-5 flex-wrap text-green-700 font-black">
              <li className="flex gap-1 items-center">
                <FaBed />
                <p>{listing.bedrooms} Bed(s)</p>
              </li>
              <li className="flex gap-1 items-center">
                <FaBath />
                <p>{listing.bathrooms} Bath(s)</p>
              </li>
              <li className="flex gap-1 items-center">
                <FaParking />
                <p>{listing.parking ? "Parking Space " : "No Parking Space"}</p>
              </li>
              <li className="flex gap-1 items-center">
                <FaChair />
                <p>{listing.furnished ? "Well Furnished" : "Not Furnished"}</p>
              </li>
            </ul>

            {
            !showContactFor 
            && 
            currentUser 
            && listing.userRef != currentUser._id 
            && (
              <button
                disabled={loading}
                className="bg-slate-700 text-white rounded-lg  hover:opacity-95 disabled:opacity-80 p-2 block w-full my-5"
                onClick={() => setShowContactForm(true)}
              >
                Contact Landlord
              </button>
            )}
            {showContactFor && (
              <article className="">
                <div className="flex flex-col">
                  <label htmlFor="message" className="font-semibold text-md mt-4">Contact {listing?.landlord?.name} for {listing?.name} </label>

                  <textarea
                    type="text"
                    className="border p-3 w-full rounded-lg "
                    id="message"
                    name="message"
                    placeholder="Enter your Message here..."
                    required
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                  />
                </div>
                <Link
                  to={`mailto:${listing.landlord.email}?subject=Regarding ${listing.name}&body=${message}`}
                  className="bg-slate-700 text-white rounded-lg  hover:opacity-95 disabled:opacity-80 p-2 block my-4 w-full text-center"
                  onClick={hadleContactMessage}
                >
                  Send Message
                </Link>
              </article>
            )}
          </section>
        </>
      )}

      {loading && <Loader />}
      {error && <ErrorModal setError={setError} error={error} />}
    </main>
  );
}

export default ViewListing