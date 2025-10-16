import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhykwsyjyqjtnfjvgqas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeWt3c3lqeXFqdG5manZncWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzg3NDIsImV4cCI6MjA3NTg1NDc0Mn0.pvVSPOSlL2QDp5AJHIdMpneO7KBrtsgovjm92OI_egw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addProperty() {
  console.log('Attempting to add LEVEL NXT property...');

  const propertyData = {
    title: 'LEVEL NXT',
    description: 'Step into the future with LEVEL NXT, where sleek design, premium amenities, and a prime location come together to offer the ultimate living experience. Strategically located in the heart of Kandivali West featuring wide, plush, and airy Vaastu-perfect layouts with 15+ state-of-the-art amenities. Enjoy picturesque views of the city skyline and the glorious sea. Launching Soon with spacious 1 & 2 BHK apartments.',
    price: 7900000,
    price_display: '₹79 Lakh - ₹1.11 Cr++',
    location: 'Kandivali West',
    address: 'Kandivali West, Mumbai',
    property_type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 380,
    status: 'available',
    featured: true,
    images: ['property 2 copy copy.jpg'],
    amenities: {
      highlights: [
        'Launching Soon in Kandivali West',
        'Sleek Design with Premium Amenities',
        '15+ State-of-the-Art Amenities',
        'Vaastu-Perfect Homes',
        'Wide, Plush, and Airy Layouts',
        'Picturesque City Skyline and Sea Views',
        'Podium Parking with Car Lift',
        'Confirmed Booking ₹2,00,000'
      ],
      configurations: [
        '1 BHK – 380+ Sqft Carpet @ ₹79 Lakh++',
        '1 BHK – 412+ Sqft Carpet @ Price on Request',
        '1 BHK – 425+ Sqft Carpet @ Price on Request',
        '2 BHK – 530+ Sqft Carpet @ ₹1.11 Cr++',
        '2 BHK – 580+ Sqft Carpet @ Price on Request',
        '2 BHK – 652+ Sqft Carpet @ Price on Request'
      ],
      amenities: [
        'Infinity Rooftop Swimming Pool with Deck',
        'Gymnasium',
        'Open Rooftop Dining Area',
        'Gazebo Lounge',
        'Open Air Mini Theatre',
        'Open to Sky Gym',
        'Yoga Deck',
        'Library',
        'Podium Parking with Car Lift',
        '15+ State-of-the-Art Amenities'
      ],
      usp: [
        'Strategically Located in Heart of Kandivali West',
        'Wide, Plush, and Airy Layouts',
        'Vaastu-Perfect Homes',
        'Podium Parking with Car Lift',
        '15+ State-of-the-Art Amenities',
        'Picturesque City Skyline Views',
        'Glorious Sea Views'
      ],
      developer: 'Ongoing Project – Nandanvan (Kandivali West). Future Endeavours in Kandivali, Borivali, Bandra, Vile Parle',
      booking: 'Confirmed Booking: ₹2,00,000/-',
      contact: 'Manoj Shrivastava'
    }
  };

  const { data, error } = await supabase
    .from('properties')
    .insert([propertyData])
    .select();

  if (error) {
    console.error('Error adding property:', error);
    console.error('\nNote: You may need to update the RLS policies in Supabase dashboard.');
    console.error('Go to: https://nhykwsyjyqjtnfjvgqas.supabase.co/project/nhykwsyjyqjtnfjvgqas/auth/policies');
    console.error('And update the INSERT policy on the properties table to allow public access.');
  } else {
    console.log('Property added successfully!');
    console.log('Property ID:', data[0].id);
  }
}

addProperty();
