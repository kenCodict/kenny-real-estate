import { useEffect, useState } from 'react'
import { uploadFilesToCloudinary } from '../utils/uploadFilesToCloudinary'
import Loader from '../Components/Loader'
import ErrorModal from '../Components/ErrorModal'
import SuccessModal from '../Components/SuccessModal'
import useCloudinaryUpload from '../hooks/useCloudinaryUpload'
import { FaTrash } from 'react-icons/fa'

const CreateListing = () => {
    const [data, setData] = useState({
        name:'',
        description:'',
        address:'',
        regularPrice:0,
        dicountPrice:0,
        bathrooms:1,
        bedrooms:1,
        furnished:false,
        parking:false,
        type:'sell',
        offer:false,
        imgUrls:[],
        userRef:'',
    })
    const [files, setFiles] = useState([])

      const [error, setError] = useState('')
    //   const [file, setFile] = useState(undefined)
      const [success, setSuccess] = useState('')
      const [loading, setLoading] = useState(false)
      //const [progress, setProgress] = useState(0) // For tracking upload progress
      const [uploading, setUploading] = useState(false) // To manage upload state
       const {
         upload,
         multiUpload,
         progress,
         loading: uploadLoading,
         error: uploadError,
         imgUrls:imgUrl,
       } = useCloudinaryUpload(
         import.meta.env.VITE_CLOUDINARY_CLOUDNAME,
         "image_preset"
       );

    const handleChange = (e) => {
        const { name, type, checked, value } = e.target;
        setData({
          ...data,
          [name]: type === 'checkbox' ? checked : value,
        });
      };
useEffect(() => {
  if (imgUrl?.length > 0 ) {
    setData((prev) => ({
      ...prev,
      imgUrls: [...prev.imgUrls, ...imgUrl], // Spread previous and new images
    }));
  }
  console.log("=======imgUrl=============================");
  console.log(imgUrl);
  console.log('====================================');
}, [imgUrl]);


// console.log('====================================');
// console.log(data);
// console.log('====================================');
     const handleImageUpload = async () => {
       if (
         files.length === 0 ||
         files.length > 6 ||
         data.imgUrls?.length + files.length > 6
       ) {
         // Fix file limit condition
         alert("Please select between 1 to 6 images to upload!");
         return;
       }

       setUploading(true);
       setError(null);
       setSuccess(null);

       try {
         await multiUpload(files); // No need to store the return value, `imgUrl` updates automatically
         setSuccess("Images uploaded successfully!");
       } catch (error) {
         setError("Upload failed! Please try again.");
         console.error("Upload error:", error);
       }

       setUploading(false);
     };

console.log('====================================');
console.log(data);
console.log('====================================');

  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl text-center font-semibold my-2">
        Create Listing
      </h1>
      <form className="flex flex-col sm:flex-row gap-6">
        <section className="flex flex-col gap-4 flex-1">
          <div className="flex flex-col ">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="border p-3 w-full rounded-lg "
              id="name"
              name="name"
              placeholder="name"
              maxLength={62}
              minLength={10}
              required
              onChange={handleChange}
              value={data.name}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="description">Description</label>

            <textarea
              type="text"
              className="border p-3 w-full rounded-lg "
              id="description"
              name="description"
              placeholder="Description"
              required
              onChange={handleChange}
              value={data.description}
            />
          </div>
          <div className="flex flex-col">
            <label htmlFor="address">Address</label>
            <input
              type="text"
              className="border p-3 w-full rounded-lg "
              id="address"
              name="address"
              placeholder="Address"
              required
              onChange={handleChange}
              value={data.address}
            />
          </div>

          <article className="flex gap-8 flex-wrap">
            <div className="flex  gap-2">
              <input
                type="checkbox"
                className=" w-5  "
                id="sell"
                name="type"
                onChange={(e) => setData({ ...data, type: "sell" })}
                checked={data.type == "sell"}
              />
              <label htmlFor="sale">Sell</label>
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
            <div className="flex  gap-2">
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
          </article>
          <article className="flex gap-6 flex-wrap">
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                className="border p-3 rounded-lg w-20 "
                id="bedrooms"
                name="bedrooms"
                required
                min={1}
                onChange={handleChange}
                value={data.bedrooms}
              />
              <label htmlFor="bedrooms">Beds</label>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                className="border p-3 rounded-lg w-20 "
                id="bathrooms"
                name="bathrooms"
                required
                min={1}
                onChange={handleChange}
                value={data.bathrooms}
              />
              <label htmlFor="bathrooms">Baths</label>
            </div>
            <div className="flex gap-2 items-center ">
              <input
                type="number"
                className="border p-3 rounded-lg w-28 "
                id="regularPrice"
                name="regularPrice"
                required
                min={1}
                onChange={handleChange}
                value={data.regularPrice}
              />
              <label
                htmlFor="regularPrice"
                className="flex flex-col items-center"
              >
                <span className="">Regular Price</span>
                {data.type == "rent" && (
                  <span className="text-xs">(₦ / Month)</span>
                )}
              </label>
            </div>
            {data.offer && (
              <div className="flex gap-2 items-center ">
                <input
                  type="number"
                  className="border p-3 rounded-lg w-28 "
                  id="dicountPrice"
                  name="dicountPrice"
                  required
                  min={1}
                  onChange={handleChange}
                  value={data.dicountPrice}
                />
                <label
                  htmlFor="dicountPrice"
                  className="flex flex-col items-center"
                >
                  <span className="">Discount Price</span>
                  {data.type == "rent" && (
                    <span className="text-xs">(₦ / Month)</span>
                  )}
                </label>
              </div>
            )}
          </article>
        </section>
        <section className="flex-1 flex flex-col">
          <p>
            <strong>Images:</strong>{" "}
            <span className="font-normal text-gray-600 ml-2">
              The First Image will be the cover (max-6)
            </span>
          </p>
          <div className="flex gap-2 mb-4">
            <input
              type="file"
              className="border p-3 w-full rounded-lg "
              id="image"
              name="image"
              placeholder="image"
              multiple
              required
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
            />
            <button
              type="button"
              className="border p-3 rounded-lg border-green-700 text-green-700 uppercase hover:shadow-lg disabled:opacity-80"
              disabled={uploadLoading}
              onClick={handleImageUpload}
            >
              {uploadLoading ? "Uploading" : "Upload"}
            </button>
          </div>
          {uploadLoading && (
            <div className="relative mb-4">
              <div className="w-full bg-gray-200 h-2 rounded-full">
                <div
                  className="bg-blue-600 h-2 rounded-full"
                  style={{
                    width: `${progress}%`,
                    transition: "width 0.3s ease",
                  }}
                ></div>
              </div>
              <div className="absolute inset-0 flex justify-center items-center">
                <span className="text-white text-xs font-semibold">
                  {progress}%
                </span>
              </div>
            </div>
          )}

          {data?.imgUrls?.map((url, index) => (
            <div
              className="flex items-center justify-between my-2 p-3 border-b"
              key={index}
            >
              <img
                src={url.url}
                className="w-[100px] h-[100px] rounded border-2 border-gray-300"
              />
              <button
                className="flex gap-2 text-red"
                onClick={() =>
                  setData({
                    ...data,
                    imgUrls: data.imgUrls.filter((item) => item.url != url.url),
                  })
                }
              >
                <FaTrash size={24} color="red" />
                Delete
              </button>
            </div>
          ))}
          <button
            disabled={loading}
            className="bg-slate-700 text-white rounded-lg uppercase hover:opacity-95 disabled:opacity-80 p-2"
            type="submit"
          >
            Update Changes
          </button>
        </section>
      </form>
      {(loading || uploadLoading) && <Loader />}

      {error && <ErrorModal setError={setError} error={error} />}
      {success && <SuccessModal setSuccess={setSuccess} success={success} />}
    </main>
  );
}

export default CreateListing