import { ArrowPathIcon } from '@heroicons/react/24/solid';

const retryApi = (fetch: any, message: string) => (
    <div className="flex flex-col items-center p-4 bg-red-50 border border-red-200 rounded-lg shadow-sm">
                <ArrowPathIcon className="w-10 h-10 text-red-500 mb-2 animate-spin" />
                <p className="text-red-500 mb-2">{message}</p>
                <button
                  onClick={fetch}
                  className="flex items-center px-4 py-2 bg-gray-400 text-white font-medium rounded-lg shadow-md hover:bg-green-600 focus:outline-none focus:ring focus:ring-blue-300 transition duration-300"
                >
                  <ArrowPathIcon className="w-5 h-5 mr-2" />
                  Reintentar
                </button>
     </div>
    
)
export default retryApi;