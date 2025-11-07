import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'

const Home = () => {
  return (
    <div className="min-h-screen overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-primary-100 overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            className="absolute top-20 left-10 w-72 h-72 bg-primary-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, 30, 0],
              y: [0, -50, 0],
              scale: [1, 1.1, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
          <motion.div
            className="absolute top-40 right-10 w-72 h-72 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, -20, 0],
              y: [0, 20, 0],
              scale: [1, 0.9, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 2,
            }}
          />
          <motion.div
            className="absolute -bottom-8 left-1/2 w-72 h-72 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-30"
            animate={{
              x: [0, 20, 0],
              y: [0, -30, 0],
              scale: [1, 1.05, 1],
            }}
            transition={{
              duration: 7,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
          />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Project Name */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-6"
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-4">
              <span className="bg-gradient-to-r from-gray-900 via-primary-600 to-gray-900 bg-clip-text text-transparent">
                CourierConnect
              </span>
            </h1>
          </motion.div>

          {/* Subtext */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-700 mb-12 max-w-2xl mx-auto font-light"
          >
            Send parcels securely with verified travelers.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-6 justify-center items-center"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/send"
                className="group relative px-10 py-4 bg-primary-600 text-white rounded-xl font-semibold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden block"
              >
                <span className="relative z-10">Send a Parcel</span>
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-primary-700 to-primary-500"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                to="/trip"
                className="group relative px-10 py-4 bg-white text-primary-600 rounded-xl font-semibold text-lg border-2 border-primary-600 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden block"
              >
                <span className="relative z-10">Post a Trip</span>
                <motion.div
                  className="absolute inset-0 bg-primary-50"
                  initial={{ opacity: 0 }}
                  whileHover={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </div>
  )
}

export default Home
