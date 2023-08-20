import Link from "next/link";

const notFound = () => {
    return (  
<div className="flex flex-col items-center justify-center h-screen bg-gray-200">
      <h1 className="text-5xl font-bold text-gray-800">404</h1>
      <p className="text-xl text-gray-600 mb-8">Oops! Page not found</p>
      <div className="bg-white shadow-lg rounded-lg p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">We couldn't find the page you're looking for.</h2>
        <p className="text-gray-600 mb-4">The page you requested does not exist or has been moved.</p>
        <p className="text-gray-600 mb-4">You can go back to the <Link href="/" className="text-blue-500">homepage</Link></p>
      </div>
    </div>
    );
}
 
export default notFound;