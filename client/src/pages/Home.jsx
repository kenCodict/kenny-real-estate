import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../Components/Loader";
import ErrorModal from "../Components/ErrorModal";
import {Swiper, SwiperSlide} from 'swiper/react'
import SwiperCore from 'swiper'
import { Navigation} from "swiper/modules";
import 'swiper/css/bundle'
import ListingCard from "../Components/ListingCard";

const Home = () => {
   SwiperCore.use([Navigation]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
  const [listingGroup, setListingGroup] =
    useState({
      offerListing: [],
      saleListing: [],
      rentListing: [],
    })
    // filteredlisting;
  useEffect(() => {
const getfilteredListing = async  () => {

  setLoading(true);
  try {
    const res = await axios.get(`/api/listing/filteredlisting`);
    const dat = res.data;

    if (dat.success === false) {
      setError(dat.message);
    } else {
      setListingGroup(dat.data);
      console.log("====================dat.data================");
      console.log(dat.data);
      console.log('====================================');
      setLoading(false);
    }
  } catch (error) {
    setError(error.response?.data?.message || "Something went wrong");
  } finally {
    setLoading(false);
  }


}
getfilteredListing()
  },[])
  return (
    <main>
      <section className="py-28 px-4 mx-auto max-w-6xl flex flex-col gap-6">
        <h1 className="text-slate-700 font-black text-3xl lg:text-6xl">
          Find Your Next <span className="text-slate-500">Perfect</span> <br />{" "}
          Place With Ease
        </h1>
        <p className="text-gray-400 text-xs sm:text-sm">
          Kennytor is your ultimate real estate destination, offering a seamless
          platform to buy, sell, and rent all types of properties—including
          apartments, offices, warehouses, lands, and luxury estates. Whether
          you're searching for your dream home or the perfect commercial space,
          Kennytor connects you with top listings for a hassle-free experience.
          <br />
          we have a wide range of properties for you to choose from.
        </p>
        <Link
          className="text-blue-700 underline text-xs sm:text-sm "
          to="/search"
        >
          Let's Start now...
        </Link>
      </section>

      <section className="mb-28">
        {!loading && listingGroup?.offerListing?.length > 0 && (
          <Swiper navigation>
            {listingGroup.offerListing.map((item) => {
              return (
                <SwiperSlide key={item._id}>
                  <div
                    className="h-[500px] bg-center "
                    style={{
                      background: `url(${item.imgUrls[0]?.url})`,
                      backgroundRepeat: "no-repeat",
                      backgroundPosition: "center",
                      backgroundSize: "cover",
                      backgroundAttachment: "fixed",
                    }}
                  >
                    {/* <img src={item.url} alt="" className="" /> */}
                  </div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        )}
      </section>
      <section className="max-w-6xl mx-auto flex flex-col gap-8 mb-10">
        {!loading && listingGroup?.offerListing?.length > 0 && (
          <div className="">
            <h3 className="font-black text-2xl text-slate-700">
              Recent Offers
            </h3>
            <Link
              className="text-blue-700 underline text-xs sm:text-sm "
              to="/search?offer=true"
            >
              show more offers
            </Link>
            <div className="flex flex-wrap gap-6 my-4">
              {listingGroup?.offerListing.map((item) => (
                <ListingCard listing={item} key={item._id} />
              ))}
            </div>
          </div>
        )}
        {!loading && listingGroup?.saleListing?.length > 0 && (
          <div className="">
            <h3 className="font-black text-2xl text-slate-700">
              Recent Places for Sales
            </h3>
            <Link
              className="text-blue-700 underline text-xs sm:text-sm "
              to="/search?type=sell"
            >
              show more sale
            </Link>
            <div className="flex flex-wrap gap-6 my-4">
              {listingGroup?.saleListing.map((item) => (
                <ListingCard listing={item} key={item._id} />
              ))}
            </div>
          </div>
        )}
        {!loading && listingGroup?.rentListing?.length > 0 && (
          <div className="">
            <h3 className="font-black text-2xl text-slate-700">
              Recent Places for Rent
            </h3>
            <Link
              className="text-blue-700 underline text-xs sm:text-sm "
              to="/search?type=rent"
            >
              show more rent
            </Link>
            <div className="flex flex-wrap gap-6 my-4">
              {listingGroup?.rentListing.map((item) => (
                <ListingCard listing={item} key={item._id} />
              ))}
            </div>
          </div>
        )}
      </section>

      {loading && <Loader />}
      {error && <ErrorModal setError={setError} error={error} />}
    </main>
  );
}

export default Home