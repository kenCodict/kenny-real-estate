import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Loader from "../Components/Loader";
import ErrorModal from "../Components/ErrorModal";
import ListingCard from "../Components/ListingCard";

const Search = () => {
  const [data, setData] = useState({
    type: "all",
    searchTerm: "",
    offer: true,
    parking: false,
    furnished: false,
    sort: "createdAt",
    order: "desc",
  });

  const [listings, setListings] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    per_page: 9,
    total: 0,
    last_page: 1,
    next_page_url: null,
    prev_page_url: null,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, type, checked, value } = e.target;
    if (name === "sort_order") {
      const sort = value.split("_")[0] || "createdAt";
      const order = value.split("_")[1] || "desc";
      setData({ ...data, order, sort });
    } else {
      setData({ ...data, [name]: type === "checkbox" ? checked : value });
    }
  };

  const search = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set("searchTerm", data.searchTerm);
    urlParams.set("offer", data.offer);
    urlParams.set("sort", data.sort);
    urlParams.set("order", data.order);
    urlParams.set("type", data.type);
    urlParams.set("furnished", data.furnished);
    urlParams.set("parking", data.parking);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
    fetchListings(searchQuery);
  };

  const fetchListings = async (searchQuery) => {
    setLoading(true);
    try {
      const res = await axios.get(`/api/listing?${searchQuery}`);
      const dat = res.data;

      if (dat.success === false) {
        setError(dat.message);
      } else {
        setListings(dat.data.data);
        setPagination({
          currentPage: dat.data.current_page,
          per_page: dat.data.per_page,
          total: dat.data.total,
          last_page: dat.data.last_page,
          next_page_url: dat.data.next_page_url,
          prev_page_url: dat.data.prev_page_url,
        });
      }
    } catch (error) {
      setError(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (url) => {
    if (!url) return;
    const queryParams = new URL(url).searchParams.toString();
    fetchListings(queryParams);
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    fetchListings(urlParams.toString());
  }, [location.search]);

  return (
    <main className="flex flex-wrap gap-5 min-h-screen">
      <section className="border-b md:border-r p-4 min-w-[200px]">
        <form onSubmit={search}>
          <div className="flex gap-4 items-center">
            <label htmlFor="searchTerm" className="font-black">
              Search Term:
            </label>
            <input
              type="text"
              name="searchTerm"
              value={data.searchTerm}
              className="bg-white rounded py-2 px-3"
              onChange={handleChange}
            />
          </div>

          <article className="my-4">
            <div className="flex gap-5 flex-wrap mb-4">
              <label className="font-black">Type: </label>
              {["all", "rent", "sell"].map((type) => (
                <div key={type} className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-5"
                    id={type}
                    name="type"
                    onChange={() => setData({ ...data, type })}
                    checked={data.type === type}
                  />
                  <label htmlFor={type}>
                    {type.charAt(0).toUpperCase() + type.slice(1)}
                  </label>
                </div>
              ))}
              <div className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-5"
                  id="offer"
                  name="offer"
                  onChange={handleChange}
                  checked={data.offer}
                />
                <label htmlFor="offer">Offer</label>
              </div>
            </div>

            <div className="flex gap-5 flex-wrap mb-4">
              <label className="font-black">Amenities: </label>
              {["parking", "furnished"].map((amenity) => (
                <div key={amenity} className="flex gap-2">
                  <input
                    type="checkbox"
                    className="w-5"
                    id={amenity}
                    name={amenity}
                    onChange={handleChange}
                    checked={data[amenity]}
                  />
                  <label htmlFor={amenity}>
                    {amenity.charAt(0).toUpperCase() + amenity.slice(1)}
                  </label>
                </div>
              ))}
            </div>

            <div className="flex gap-5">
              <label htmlFor="sort_order" className="font-black">
                Sort:
              </label>
              <select
                name="sort_order"
                className="w-[150px] py-2 px-5 rounded-lg"
                onChange={handleChange}
                value={`${data.sort}_${data.order}`}
              >
                <option value="regularPrice_desc">Price high to low</option>
                <option value="regularPrice_asc">Price low to high</option>
                <option value="createdAt_asc">Oldest</option>
                <option value="createdAt_desc">Latest</option>
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

        {!loading && listings.length === 0 && (
          <p className="text-xl text-slate-700">No Listings Found!!!</p>
        )}

        {listings.length > 0 && (
          <>
            <article className="flex gap-4 flex-wrap p-4">
              {listings.map((item) => (
                <ListingCard listing={item} key={item._id} />
              ))}
            </article>

            <div className="flex justify-center gap-3 mt-5">
              <button
                disabled={!pagination.prev_page_url}
                onClick={() => handlePageChange(pagination.prev_page_url)}
                className={`px-4 py-2 rounded-md ${
                  pagination.prev_page_url
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Previous
              </button>

              <span className="px-4 py-2 bg-gray-200 rounded-md">
                Page {pagination.currentPage} of {pagination.last_page}
              </span>

              <button
                disabled={!pagination.next_page_url}
                onClick={() => handlePageChange(pagination.next_page_url)}
                className={`px-4 py-2 rounded-md ${
                  pagination.next_page_url
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 text-gray-600 cursor-not-allowed"
                }`}
              >
                Next
              </button>
            </div>
          </>
        )}
      </section>

      {loading && <Loader />}
      {error && <ErrorModal setError={setError} error={error} />}
    </main>
  );
};

export default Search;
