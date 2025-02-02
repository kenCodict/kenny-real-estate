import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from 'react-router-dom'
import Loader from "../Components/Loader";
import ErrorModal from "../Components/ErrorModal";
import ListingCard from "../Components/ListingCard";
const Search = () => {
const [data, setData] = useState({
    type:'all',
  searchTerm:'',
  offer:true,
  parking:false,
  furnished:false,
  sort:"createdAt",
  order:'desc'
})
const navigate = useNavigate()
    const [error, setError] = useState("");
    const [listings, setListing] = useState([]);
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        if (name == 'sort_order') {
            const sort = value.split('_')[0] || 'createdAt';
            const order = value.split('_')[1] || 'desc';
            setData({...data, order:order, sort:sort})
        }else {
   setData({
     ...data,
     [name]: type === "checkbox" ? checked : value,
   });
        }
     
      };
const search = async (e) => {
e.preventDefault()
const urlParams = new URLSearchParams(window.location.search);
urlParams.set("searchTerm", data.searchTerm);
urlParams.set("offer", data.offer);
urlParams.set("sort", data.sort);
urlParams.set("type", data.type);
urlParams.set("furnished", data.furnished);
urlParams.set("parking", data.parking);
const searchQuery = urlParams.toString()
navigate(`/search?${searchQuery}`)
}
useEffect(() => {
  const urlParams = new URLSearchParams(location.search);
  const searching = urlParams.get("searchTerm");
  const offer = urlParams.get("offer");
  const sort = urlParams.get("sort");
  const order = urlParams.get("order");
  const type = urlParams.get("type");
  const furnished = urlParams.get("furnished");
  const parking = urlParams.get("parking");

  if (searching ||offer ||sort ||type || furnished||parking ) {
    setData({
      ...data,
      searchTerm: searching || "",
      offer: offer == "true" ? true : false,
      sort: sort || 'createdAt',
      order: order || 'desc',
      type: type || "all",
      furnished: furnished == "true" ? true : false,
      parking: parking == "true" ? true : false,
    });
  }
  const searchQuery = urlParams.toString();
  fetchListings(searchQuery);
},[location.search])

const fetchListings = async (searchQuery) => {
  setLoading(true);
  try {
    const res = await axios.get(`/api/listing?${searchQuery}`, {
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
console.log("===========listings=========================");
console.log(listings);
console.log("==============listings======================");
  return (
    <main className="flex flex-wrap gap-5 min-h-screen ">
      <section className="border-b border-b-gray-200 md:border-b-0 md:border-r  md:border-r-gray-200 p-4 min-w-[200px] ">
        <form action="" className="" onSubmit={search}>
          <div className="flex gap-4 items-center">
            <label htmlFor="searchTerm" className="font-black">
              Search Term:
            </label>
            <input
              type="text"
              value={data.searchTerm}
              className="bg-white rounded py-2 px-3"
              onChange={handleChange}
            />
          </div>
          <article className="my-4">
            <div className="flex gap-5 flex-wrap mb-4">
              <label htmlFor="" className="font-black">
                Type:{" "}
              </label>
              <div className="flex  gap-2">
                <input
                  type="checkbox"
                  className=" w-5  "
                  id="all"
                  name="type"
                  onChange={(e) => setData({ ...data, type: "all" })}
                  checked={data.type == "all"}
                />
                <label htmlFor="all">Rent & Sell</label>
              </div>
              <div className="flex  gap-2">
                <input
                  type="checkbox"
                  className=" w-5  "
                  id="rent"
                  name="type"
                  placeholder="rent"
                  onChange={(e) => setData({ ...data, type: "rent" })}
                  checked={data.type == "rent"}
                />
                <label htmlFor="rent">Rent</label>
              </div>
              <div className="flex  gap-2">
                <input
                  type="checkbox"
                  className=" w-5  "
                  id="sell"
                  name="type"
                  onChange={(e) => setData({ ...data, type: "sell" })}
                  checked={data.type == "sell"}
                />
                <label htmlFor="sell">Sell</label>
              </div>

              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className=" w-5  "
                  id="offer"
                  name="offer"
                  placeholder="offer"
                  onChange={handleChange}
                  checked={data.offer}
                />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>

            <div className="flex gap-5 flex-wrap mb-4">
              <label className="font-black">Amenities: </label>
              <div className="flex  gap-2">
                <input
                  type="checkbox"
                  className=" w-5  "
                  id="parking"
                  name="parking"
                  placeholder="parking"
                  onChange={handleChange}
                  checked={data.parking}
                />
                <label htmlFor="parking">Parking Spot</label>
              </div>
              <div className="flex  gap-2">
                <input
                  type="checkbox"
                  className=" w-5  "
                  id="furnished"
                  name="furnished"
                  placeholder="furnished"
                  onChange={handleChange}
                />
                <label htmlFor="furnished">Furnished</label>
              </div>
            </div>

            <div className="flex gap-5">
              <label htmlFor="sort" className="font-black">
                Sort:{" "}
              </label>
              <select
                name="sort_order"
                id="sort_order"
                className="w-[150px] py-2 px-5 rounded-lg"
                onChange={handleChange}
                // defaultValue={`${data.sort}_${data.order}`}
                value={`${data.sort}_${data.order}`}
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createAt_asc">Oldest</option>
                <option value="createAt_desc">Latest</option>
              </select>
            </div>
          </article>

          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-2 block w-full text-center mt-5"
            type="submit"
          >
            Search
          </button>
        </form>
      </section>

      <section className="flex-1">
        <h1 className="font-black text-3xl p-3 border-b text-slate-700">
          Listing Results:
        </h1>
        <div className="">
            {
                 !loading &&  listings && listings.length == 0 && (
                    <p className="text-xl text-slate-700">No Listing Found!!!</p>
                  )
            }
            {
                listings && listings.length > 0 && (
                    <article className="flex gap-4 flex-wrap p-4">
                        {
                            listings.map(item => <ListingCard listing={item} key={item._id} />)
                        }
                    </article>
                )
            }
        </div>
      </section>
      {loading && <Loader />}

      {error && <ErrorModal setError={setError} error={error} />}
    </main>
  );
}

export default Search