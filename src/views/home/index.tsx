import { FC } from "react";
import { Link } from "react-router";

const Home: FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full bg-blue-500 bg-gradient-to-tl from-blue-500 to-blue-700 p-4">
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-lg overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="w-full p-8 h-full">
            <div className="mb-6">
              <h1 className="text-3xl font-bold text-gray-800 mb-2">Lumin Client Research</h1>
              <div className="h-1 w-20 bg-blue-600 rounded-full"></div>
            </div>
            
            <p className="text-gray-600 mb-6">
              Welcome to the leading platform for client research and market analysis. Discover insights and make data-driven decisions with our powerful tools.
            </p>
            
            <div className="space-y-4 mb-8">
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">Access to comprehensive market research tools</p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">Real-time data analytics and visualization</p>
              </div>
              <div className="flex items-center">
                <div className="flex-shrink-0 h-6 w-6 text-blue-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <p className="ml-3 text-gray-600">Collaborative research environment for teams</p>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-lg transition duration-200 ease-in-out">
                Learn More
              </button>
              <button className="bg-white hover:bg-gray-100 text-blue-600 font-medium py-2 px-6 border border-blue-600 rounded-lg transition duration-200 ease-in-out">
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;