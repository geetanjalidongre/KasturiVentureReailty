import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nhykwsyjyqjtnfjvgqas.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oeWt3c3lqeXFqdG5manZncWFzIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjAyNzg3NDIsImV4cCI6MjA3NTg1NDc0Mn0.pvVSPOSlL2QDp5AJHIdMpneO7KBrtsgovjm92OI_egw';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function addProperty() {
  console.log('Attempting to add Royal Pristo property...');

  const propertyData = {
    title: 'ROYAL PRISTO by Royal Realtors Group',
    description: 'Royal Pristo by Royal Realtors Group - Premium residential project at Ghanwat Estate, Next to Santoshi Mata Mandir, Triveni Nagar Road, Kurar Village, Off Western Express Highway, Malad East, Mumbai. MahaRERA Registered project offering quality living spaces with excellent connectivity.',
    price: 10000000,
    price_display: 'Price on Request',
    location: 'Malad East',
    address: 'Ghanwat Estate, Next to Santoshi Mata Mandir, Triveni Nagar Road, Kurar Village, Off Western Express Highway, Malad (East), Mumbai 400 097',
    property_type: 'Apartment',
    bedrooms: 1,
    bathrooms: 1,
    sqft: 400,
    status: 'available',
    featured: true,
    images: ['royal 1 copy.jpg'],
    amenities: {
      highlights: [
        'MahaRERA Registered - P51800019529',
        'Royal Realtors Group Project',
        'Prime Malad East Location',
        'Next to Santoshi Mata Mandir',
        'Off Western Express Highway',
        'Excellent Connectivity'
      ],
      location: {
        address: 'Ghanwat Estate, Next to Santoshi Mata Mandir, Triveni Nagar Road, Kurar Village, Off Western Express Highway, Malad (East), Mumbai 400 097',
        mapLink: 'https://maps.app.goo.gl/41bhd'
      },
      rera: 'P51800019529',
      reraLink: 'https://maharera.mahaonline.gov.in',
      website: 'www.royalpristo.co.in',
      contact: 'Neeta Jetty - 8909153333',
      developer: 'Royal Realtors Group'
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
