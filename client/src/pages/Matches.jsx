import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../utils/axios'

const Matches = () => {
  const [matches, setMatches] = useState([])
  const [loading, setLoading] = useState(false)
  const [bookingLoading, setBookingLoading] = useState({})

  useEffect(() => {
    fetchMatches()
  }, [])

  const fetchMatches = async () => {
    setLoading(true)
    try {
      const parcelsResponse = await api.get('/api/parcels')
      const parcels = parcelsResponse.data

      const matchesPromises = parcels.map(async (parcel) => {
        try {
          const matchesResponse = await api.get(`/api/matches?parcelId=${parcel._id}`)
          return {
            parcel,
            matchingTrips: matchesResponse.data.matchingTrips || [],
          }
        } catch (error) {
          return {
            parcel,
            matchingTrips: [],
          }
        }
      })

      const matchesData = await Promise.all(matchesPromises)
      setMatches(matchesData.filter((match) => match.matchingTrips.length > 0))
    } catch (error) {
      console.error('Failed to fetch matches:', error)
      toast.error('Failed to load matches')
    } finally {
      setLoading(false)
    }
  }

  const handleBookTrip = async (parcelId, tripId) => {
    setBookingLoading({ ...bookingLoading, [`${parcelId}-${tripId}`]: true })
    try {
      await api.post('/api/bookings', {
        parcelId,
        tripId,
      })
      toast.success('Trip booked successfully!')
      fetchMatches()
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to book trip')
    } finally {
      setBookingLoading({ ...bookingLoading, [`${parcelId}-${tripId}`]: false })
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Matches</h1>
          <p className="text-gray-600">Find matching trips for your parcels</p>
        </motion.div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-600">Loading matches...</p>
          </div>
        ) : matches.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No matches found. Create parcels and trips to see matches.</p>
          </div>
        ) : (
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="space-y-8"
          >
            {matches.map((match, index) => (
              <motion.div
                key={match.parcel._id}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden"
              >
                {/* Parcel Info Header */}
                <div className="bg-gradient-to-r from-primary-50 to-primary-100 px-6 py-4 border-b border-gray-200">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                    <div>
                      <h2 className="text-xl font-bold text-gray-900 mb-1">
                        Parcel from {match.parcel.senderName}
                      </h2>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-1">
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {match.parcel.from} → {match.parcel.to}
                        </span>
                        <span>Weight: {match.parcel.weight} kg</span>
                        <span>Date: {new Date(match.parcel.date).toLocaleDateString()}</span>
                      </div>
                    </div>
                    <span className="px-3 py-1 text-xs font-semibold bg-primary-600 text-white rounded-full">
                      {match.matchingTrips.length} {match.matchingTrips.length === 1 ? 'Match' : 'Matches'}
                    </span>
                  </div>
                </div>

                {/* Matching Trips */}
                <div className="p-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {match.matchingTrips.map((trip) => (
                      <motion.div
                        key={trip._id}
                        whileHover={{ scale: 1.02, y: -4 }}
                        className="border border-gray-200 rounded-lg p-4 hover:border-primary-300 hover:shadow-md transition-all bg-white"
                      >
                        <div className="mb-4">
                          <h3 className="font-semibold text-gray-900 mb-2">{trip.travelerName}</h3>
                          <div className="space-y-1 text-sm text-gray-600">
                            <p className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                              </svg>
                              {trip.from} → {trip.to}
                            </p>
                            <p className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                              </svg>
                              {new Date(trip.date).toLocaleDateString()}
                            </p>
                            <p className="flex items-center gap-1">
                              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                              </svg>
                              Capacity: {trip.capacity} parcels
                            </p>
                          </div>
                        </div>
                        <motion.button
                          onClick={() => handleBookTrip(match.parcel._id, trip._id)}
                          disabled={bookingLoading[`${match.parcel._id}-${trip._id}`]}
                          whileHover={{ scale: bookingLoading[`${match.parcel._id}-${trip._id}`] ? 1 : 1.02 }}
                          whileTap={{ scale: bookingLoading[`${match.parcel._id}-${trip._id}`] ? 1 : 0.98 }}
                          className="w-full py-2.5 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
                        >
                          {bookingLoading[`${match.parcel._id}-${trip._id}`] ? 'Booking...' : 'Book Trip'}
                        </motion.button>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  )
}

export default Matches
