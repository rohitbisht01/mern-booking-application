import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import * as apiClient from "../api-clients";
import { BeatLoader } from "react-spinners";
import { FaBed, FaMapMarkerAlt, FaStar } from "react-icons/fa";
import { FaHouse } from "react-icons/fa6";
import { GiMoneyStack } from "react-icons/gi";

const MyHotels = () => {
  const { data: hotelData, isLoading } = useQuery({
    queryKey: ["my-hotel"],
    queryFn: apiClient.fetchMyHotels,
  });

  if (!hotelData) {
    return <span>No Hotels Found</span>;
  }

  if (isLoading) {
    return <BeatLoader color="#145cd7" />;
  }

  return (
    <div className="space-y-5">
      <span className="flex justify-between items-center">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to={"/add-hotel"}
          className="p-2 rounded-md font-bold bg-blue-600 text-white hover:bg-blue-500"
        >
          Add Hotel
        </Link>
      </span>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {hotelData.hotels.map((hotel: apiClient.HotelType) => (
          <div className="flex flex-col gap-2 p-3 rounded-md border border-slate-300">
            <h1 className="font-bold text-xl">{hotel.name}</h1>
            <div className="whitespace-pre-line">{hotel.description}</div>
            <hr />
            <div className="flex flex-col gap-2 mb-2">
              <div className="flex items-center gap-2">
                <FaMapMarkerAlt color="gray" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="flex items-center gap-2">
                <FaHouse color="gray" />
                {hotel.type}
              </div>
              <div className="flex items-center gap-2">
                <GiMoneyStack color="gray" />${hotel.pricePerNight} per night
              </div>
              <div className="flex items-center gap-2">
                <FaBed color="gray" />
                {hotel.adultCount} adult{" "}
                {hotel.childCount > 0 && `, ${hotel.childCount} children`}
              </div>
              <div className="flex items-center gap-2">
                <FaStar color="gray" />
                {hotel.starRating} Star Rating
              </div>
            </div>

            <Link
              to={`/edit-hotel/${hotel._id}`}
              className="p-2 bg-blue-600 rounded-md  text-white flex justify-center hover:bg-blue-500 mt-auto"
            >
              View Details
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
