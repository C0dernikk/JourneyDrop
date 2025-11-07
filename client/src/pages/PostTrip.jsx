import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import api from '../utils/axios'

const PostTrip = () => {
  const [formData, setFormData] = useState({
    travelerName: '',
    from: '',
    to: '',
    date: '',
    capacity: '',
  })
  const [loading, setLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      // Send date as ISO string instead of Date object
      const payload = {
        travelerName: formData.travelerName,
        from: formData.from,
        to: formData.to,
        date: formData.date ? new Date(formData.date).toISOString() : null,
        capacity: parseInt(formData.capacity),
      }
      
      await api.post('/api/trips', payload)
      
      toast.success('Trip Added')
      setFormData({
        travelerName: '',
        from: '',
        to: '',
        date: '',
        capacity: '',
      })
    } catch (error) {
      console.error('Error creating trip:', error)
      toast.error(error.response?.data?.message || 'Failed to post trip')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-gray-50 to-white">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-r from-primary-50 to-primary-100 rounded-xl p-6 mb-8 shadow-md"
        >
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Post a Trip</h1>
          <p className="text-gray-600">Share your travel plans and help deliver parcels</p>
        </motion.div>

        {/* Form Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-white rounded-xl shadow-lg p-6 md:p-8 border border-gray-100"
        >
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="travelerName" className="block text-sm font-medium text-gray-700 mb-2">
                Traveler Name
              </label>
              <input
                type="text"
                id="travelerName"
                name="travelerName"
                value={formData.travelerName}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="Enter your name"
              />
            </div>

            <div>
              <label htmlFor="from" className="block text-sm font-medium text-gray-700 mb-2">
                From
              </label>
              <input
                type="text"
                id="from"
                name="from"
                value={formData.from}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="e.g., New York, USA"
              />
            </div>

            <div>
              <label htmlFor="to" className="block text-sm font-medium text-gray-700 mb-2">
                To
              </label>
              <input
                type="text"
                id="to"
                name="to"
                value={formData.to}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="e.g., London, UK"
              />
            </div>

            <div>
              <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <input
                type="date"
                id="date"
                name="date"
                value={formData.date}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
              />
            </div>

            <div>
              <label htmlFor="capacity" className="block text-sm font-medium text-gray-700 mb-2">
                Capacity
              </label>
              <input
                type="number"
                id="capacity"
                name="capacity"
                value={formData.capacity}
                onChange={handleChange}
                required
                min="1"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-primary-500 transition-all"
                placeholder="e.g., 5"
              />
            </div>

            <motion.button
              type="submit"
              disabled={loading}
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
              className="w-full py-3.5 bg-primary-600 text-white rounded-lg font-semibold text-lg hover:bg-primary-700 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-md hover:shadow-lg"
            >
              {loading ? 'Submitting...' : 'Submit Trip'}
            </motion.button>
          </form>
        </motion.div>
      </div>
    </div>
  )
}

export default PostTrip
