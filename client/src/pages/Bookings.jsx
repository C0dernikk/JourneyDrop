import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../utils/api'

const Bookings = () => {
  const [bookings, setBookings] = useState([])
  const [loading, setLoading] = useState(false)
  const [updatingStatus, setUpdatingStatus] = useState({})

  useEffect(() => {
    fetchBookings()
  }, [])

  const fetchBookings = async () => {
    setLoading(true)
    try {
      const response = await api.get('/api/bookings')
      setBookings(response.data)
    } catch (error) {
      console.error('Failed to fetch bookings:', error)
      toast.error('Failed to load bookings')
    } finally {
      setLoading(false)
    }
  }

  const handleUpdateStatus = async (bookingId, newStatus) => {
    setUpdatingStatus({ ...updatingStatus, [bookingId]: true })
    try {
      await api.put(`/api/bookings/${bookingId}`, {
        status: newStatus,
      })
      toast.success('Status updated successfully!')
      fetchBookings()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to update status')
    } finally {
      setUpdatingStatus({ ...updatingStatus, [bookingId]: false })
    }
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'bg-green-100 text-green-800 border-green-200'
      case 'accepted':
        return 'bg-blue-100 text-blue-800 border-blue-200'
      case 'requested':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 mb-8 shadow-md"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Bookings</h1>
          <p className="text-gray-600">Manage all your parcel bookings</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading bookings...</p>
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No bookings found.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 lg:grid-cols-2 gap-6"
          >
            {bookings.map((booking) => (
              <motion.div
                key={booking._id}
                variants={itemVariants}
                whileHover={{ scale: 1.02, y: -4 }}
                className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow"
              >
                {/* Status Badge */}
                <div className="flex justify-between items-start mb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Booking Details</h3>
                  <span
                    className={`px-3 py-1 text-xs font-semibold rounded-full border ${getStatusColor(
                      booking.status
                    )}`}
                  >
                    {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                  </span>
                </div>

                {/* Parcel Info */}
                <div className="mb-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                    </svg>
                    Parcel Information
                  </h4>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><span className="font-medium">Sender:</span> {booking.parcelId?.senderName}</p>
                    <p className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Route:</span> {booking.parcelId?.from} → {booking.parcelId?.to}
                    </p>
                    <p><span className="font-medium">Weight:</span> {booking.parcelId?.weight} kg</p>
                    <p><span className="font-medium">Date:</span> {new Date(booking.parcelId?.date).toLocaleDateString()}</p>
                  </div>
                </div>

                {/* Trip Info */}
                <div className="mb-4 p-4 bg-primary-50 rounded-lg border border-primary-200">
                  <h4 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                    <svg className="w-5 h-5 text-primary-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                    Trip Information
                  </h4>
                  <div className="space-y-1 text-sm text-gray-700">
                    <p><span className="font-medium">Traveler:</span> {booking.tripId?.travelerName}</p>
                    <p className="flex items-center gap-1">
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                      <span className="font-medium">Route:</span> {booking.tripId?.from} → {booking.tripId?.to}
                    </p>
                    <p><span className="font-medium">Date:</span> {new Date(booking.tripId?.date).toLocaleDateString()}</p>
                    <p><span className="font-medium">Capacity:</span> {booking.tripId?.capacity} parcels</p>
                  </div>
                </div>

                {/* Status Update Dropdown */}
                <div>
                  <label htmlFor={`status-${booking._id}`} className="block text-sm font-medium text-gray-700 mb-2">
                    Update Status
                  </label>
                  <select
                    id={`status-${booking._id}`}
                    value={booking.status}
                    onChange={(e) => handleUpdateStatus(booking._id, e.target.value)}
                    disabled={updatingStatus[booking._id]}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all disabled:opacity-50 disabled:cursor-not-allowed bg-white"
                  >
                    <option value="requested">Requested</option>
                    <option value="accepted">Accepted</option>
                    <option value="completed">Completed</option>
                  </select>
                  {updatingStatus[booking._id] && (
                    <p className="mt-2 text-xs text-gray-500">Updating...</p>
                  )}
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Bookings
