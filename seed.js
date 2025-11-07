const mongoose = require('mongoose');
require('dotenv').config();

const Parcel = require('./models/Parcel');
const Trip = require('./models/Trip');

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected for seeding'))
.catch(err => {
  console.error('MongoDB connection error:', err);
  process.exit(1);
});

// Sample parcels data
const sampleParcels = [
  {
    senderName: 'John Doe',
    from: 'New York, USA',
    to: 'London, UK',
    weight: 2.5,
    date: new Date('2024-02-15'),
    status: 'pending',
  },
  {
    senderName: 'Jane Smith',
    from: 'Los Angeles, USA',
    to: 'Paris, France',
    weight: 1.8,
    date: new Date('2024-02-20'),
    status: 'pending',
  },
  {
    senderName: 'Mike Johnson',
    from: 'Chicago, USA',
    to: 'Tokyo, Japan',
    weight: 3.2,
    date: new Date('2024-02-25'),
    status: 'pending',
  },
];

// Sample trips data
const sampleTrips = [
  {
    travelerName: 'Alice Brown',
    from: 'New York, USA',
    to: 'London, UK',
    date: new Date('2024-02-15'),
    capacity: 5,
  },
  {
    travelerName: 'Bob Wilson',
    from: 'San Francisco, USA',
    to: 'Paris, France',
    date: new Date('2024-02-20'),
    capacity: 3,
  },
  {
    travelerName: 'Carol Davis',
    from: 'Seattle, USA',
    to: 'Tokyo, Japan',
    date: new Date('2024-02-25'),
    capacity: 4,
  },
];

// Seed function
const seedDatabase = async () => {
  try {
    // Clear existing data (optional - comment out if you want to keep existing data)
    await Parcel.deleteMany({});
    await Trip.deleteMany({});
    console.log('Cleared existing data');

    // Insert parcels
    const insertedParcels = await Parcel.insertMany(sampleParcels);
    console.log(`✓ Inserted ${insertedParcels.length} parcels`);

    // Insert trips
    const insertedTrips = await Trip.insertMany(sampleTrips);
    console.log(`✓ Inserted ${insertedTrips.length} trips`);

    console.log('\n✅ Database seeded successfully!');
    console.log('\nSample data:');
    console.log('- 3 parcels');
    console.log('- 3 trips');
    
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
};

// Run seed function
seedDatabase();

