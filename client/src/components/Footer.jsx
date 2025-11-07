const Footer = () => {
  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center">
          {/* Logo and Project Name */}
          <div className="flex items-center justify-center space-x-3 mb-4">
            <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-md">
              <span className="text-white font-bold text-xl">C</span>
            </div>
            <span className="text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
              CourierConnect
            </span>
          </div>
          
          {/* Tagline */}
          <p className="text-gray-600 text-sm mb-6 max-w-md mx-auto">
            Connecting parcel senders with travelers going to the same destination
          </p>

          {/* Copyright */}
          <div className="pt-6 border-t border-gray-200">
            <p className="text-sm text-gray-500">
              &copy; {new Date().getFullYear()} <span className="font-semibold text-gray-700">CourierConnect</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer

