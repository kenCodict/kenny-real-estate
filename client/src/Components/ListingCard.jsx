import React from 'react'
import { FaMapMarkerAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ListingCard = ({ listing }) => {
  return (
    <div className="bg-white shadow-md hover:shadow-xl transition-all overflow-hidden rounded-lg duration-300 w-full sm:w-[330px]">
      <Link to={`/listing/${listing?._id}`} className="flex flex-col gap-4">
        <img
          src={listing?.imgUrls[0]?.url}
          alt={listing?.name}
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-all duration-300 "
        />

        <div className="p-3 flex flex-col gap-4 w-full">
          <h3 className="text-lg font-semibold text-slate-700 truncate">
            {listing?.name}
          </h3>

          <div className="flex gap-1 item-center">
            <FaMapMarkerAlt size={24} color="green" className="w-5 h-5" />
            <p className="text-sm text-gray-600 truncate w-full">
              {listing?.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2 ">
            {listing?.description}
          </p>

          <p className="text-slate-500 mt-2 font-semibold">
            ${" "}
            {listing?.offer
              ? Number(listing?.dicountPrice).toLocaleString()
              : Number(listing?.regularPrice).toLocaleString()}
            {listing.type == "rent" ? "/ Month" : ""}
          </p>
          <div className="flex gap-4">
            <p className="font-bold text-xs text-slate-700">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </p>
            <p className="font-bold text-xs text-slate-700">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} Baths`
                : `${listing.bathrooms} Bath`}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default ListingCard