import React, { useEffect } from "react";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { MdOutlinePhone } from "react-icons/md";
import { BiMapPin } from "react-icons/bi";
import { useDispatch, useSelector } from "react-redux";
import { getAddress } from "../redux/Slice/AddressSlice";

const Address = () => {
    const {addressList = []} = useSelector((state) => state.address);
    const dispatch = useDispatch();

    useEffect(() =>{
        dispatch(getAddress());
    },[dispatch])
  return (
    <div className="min-h-screen px-4 md:px-10 py-8 mt-20">
      <h2 className="text-3xl font-bold mb-8 text-center text-gray-800">📍 Your Saved Addresses</h2>

      {addressList.length === 0 ? (
        <p className="text-center text-gray-500 text-lg">No address found. Please add one during checkout.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto mt-10">
          {addressList.map((address) => (
            <div
              key={address._id}
              className="bg-white border border-gray-200 rounded-2xl p-6 shadow-md hover:shadow-lg transition-all duration-300 relative"
            >
              {/* Location Icon */}
              <div className="absolute -top-6 left-6 bg-indigo-600 text-white p-2 rounded-full shadow-lg">
                <HiOutlineLocationMarker size={22} />
              </div>

              {/* Address Details */}
              <div className="mt-4">
                <h3 className="text-lg font-bold text-gray-800">{address.fullName}</h3>
                <p className="flex items-center text-sm text-gray-600 mt-1">
                  <MdOutlinePhone className="mr-2" /> {address.phoneNumber}
                </p>
                <p className="flex items-center text-sm text-gray-600 mt-1">
                  <BiMapPin className="mr-2" /> {address.address}, {address.city}, {address.state}
                </p>
                <p className="text-sm text-gray-600 mt-1">
                  Pin: <span className="font-medium">{address.postalCode}</span>
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Address;
