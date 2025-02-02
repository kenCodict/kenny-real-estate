import { useState } from "react";

const Search = () => {
const [data, setData] = useState({
    type:'all',
  searchTerm:'',
  offer:true,
  parking:'',
  furnished:'',
})

    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setData({
          ...data,
          [name]: type === 'checkbox' ? checked : value,
        });
      };
  return (
    <main className="flex flex-wrap gap-5 ">
      <section className="border-b border-b-gray-400 md:border-b-0 md:border-r md:border-r-gray-400 p-4 min-w-[200px]">
        <form action="" className="">
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
                name="sort"
                id="sort"
                className="w-[150px] py-2 px-5 rounded-lg"
                onChange={handleChange}
              >
                <option value="latest">Price high to low</option>
                <option value="latest">Price low to high</option>
                <option value="latest">Oldest</option>
                <option value="latest">Latest</option>
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

      <section className="">
        <h1 className="font-black text-3xl p-3 border-b text-slate-700">
          Listing Results:
        </h1>
      </section>
    </main>
  );
}

export default Search