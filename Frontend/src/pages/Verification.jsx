import React from "react";

const AccountVerification = () => {
  return (
    <div className="h-screen flex flex-col justify-center items-center bg-gray-100 relative">
      <button
        className="bg-gray-200 hover:bg-gray-300 text-gray-600 font-bold py-2 px-4 rounded absolute top-4 left-4"
        style={{ zIndex: 1 }}
      >
        Back
      </button>
      <button
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded absolute top-4 right-4"
        style={{ zIndex: 1 }}
      >
        Close
      </button>
      <div className="max-w-lg mx-auto p-6 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
        <h2 className="text-lg font-bold mb-4 text-center text-gray-800">
          Choose type of account to be verified
        </h2>
        <div className="flex justify-center space-x-5">
          <div className="w-1/2 bg-orange-100 p-8 rounded shadow-md h-64 flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold mb-2 text-gray-800">
              Organization/Institute
            </h3>
            <p className="text-sm text-gray-600 mb-10">
              Verify your organization or institute account
            </p>
            <a
              href="/organization-verification"
              className="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
            >
              Verify Now
            </a>
          </div>
          <div className="w-1/2 bg-blue-100 p-8 rounded shadow-md h-64 flex flex-col justify-center items-center">
            <h3 className="text-lg font-bold mb-2 text-gray-800">
              Personal Account
            </h3>
            <p className="text-sm text-gray-600 mb-10">
              Verify your personal account
            </p>
            <a
              href="/personal-verification"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            >
              Verify Now
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountVerification;
