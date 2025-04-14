import React from 'react';
import { useSelector } from 'react-redux';

const Profile = () => {
    const {user} = useSelector((state) => state.auth);
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col items-center justify-center py-12">
      <div className="bg-orange-400 text-white rounded-full w-[12%] flex items-center justify-center h-[25vh] text-8xl font-semibold uppercase">
             {user.name.split(' ')[0][0]}{user.name.split(' ')[1]?.[0] || ''}
      </div>
      <div className="max-w-4xl w-full rounded-lg p-8">
        {/* User Info */}
        <div className="space-y-4">
          <div className="flex justify-between">
            <div className="text-xl font-semibold">{user.name}</div>
            <button className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Edit Profile
            </button>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-600">Email:</div>
            <div className="text-gray-700">{user.email}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-600">Phone:</div>
            <div className="text-gray-700">{user.phone}</div>
          </div>

          <div className="space-y-2">
            <div className="text-sm font-semibold text-gray-600">Address:</div>
            <div className="text-gray-700">{user.address}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
