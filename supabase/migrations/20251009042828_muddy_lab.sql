/*
  # Insert Sample Data for Kasturi Reality Venture

  1. Sample Properties
  2. Sample Testimonials
  3. Sample Blog Posts

  This migration populates the database with realistic sample data
  for development and demonstration purposes.
*/

-- Insert sample properties
INSERT INTO properties (title, description, price, price_display, location, address, property_type, bedrooms, bathrooms, sqft, status, featured, images, amenities) VALUES
(
  'Luxury Villa - Green Valley',
  'Stunning 4-bedroom villa with modern amenities, spacious garden, and premium finishes. Perfect for families seeking luxury living in a prime location.',
  25000000,
  '₹2.5 Cr',
  'Banjara Hills, Hyderabad',
  'Plot No. 123, Green Valley, Banjara Hills, Hyderabad - 500034',
  'Villa',
  4,
  3,
  3500,
  'available',
  true,
  '["https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg", "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg", "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg"]',
  '["Swimming Pool", "Garden", "Parking", "Security", "Power Backup", "Gym", "Club House"]'
),
(
  'Premium Apartments - Skyline',
  'Modern 2-3 BHK apartments with world-class amenities in the heart of IT corridor. Excellent connectivity and investment potential.',
  8500000,
  '₹85 L - 1.2 Cr',
  'Gachibowli, Hyderabad',
  'Skyline Towers, Gachibowli, Hyderabad - 500032',
  'Apartment',
  3,
  2,
  1800,
  'available',
  true,
  '["https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg", "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg"]',
  '["Gym", "Swimming Pool", "Parking", "Security", "Power Backup", "Elevator", "Garden"]'
),
(
  'Commercial Complex - Tech Hub',
  'Premium office spaces in the bustling HITEC City. Ideal for IT companies and startups. Flexible space options available.',
  500000,
  '₹5-50 L',
  'HITEC City, Hyderabad',
  'Tech Hub Complex, HITEC City, Hyderabad - 500081',
  'Commercial',
  0,
  0,
  5000,
  'available',
  true,
  '["https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg"]',
  '["High Speed Internet", "Parking", "Security", "Power Backup", "Conference Rooms", "Cafeteria"]'
),
(
  'Garden Homes - Serene Living',
  'Beautiful 3-bedroom independent house with private garden. Peaceful neighborhood with excellent schools and hospitals nearby.',
  18000000,
  '₹1.8 Cr',
  'Kompally, Hyderabad',
  'Garden Homes, Kompally, Hyderabad - 500014',
  'Villa',
  3,
  2,
  2800,
  'available',
  false,
  '["https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"]',
  '["Garden", "Parking", "Security", "Power Backup", "Children Play Area"]'
),
(
  'Executive Apartments - City Center',
  'Luxury 2 BHK apartments in prime city location. Perfect for professionals and small families.',
  7500000,
  '₹75 L',
  'Jubilee Hills, Hyderabad',
  'Executive Heights, Jubilee Hills, Hyderabad - 500033',
  'Apartment',
  2,
  2,
  1200,
  'under_offer',
  false,
  '["https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg"]',
  '["Gym", "Parking", "Security", "Power Backup", "Elevator"]'
),
(
  'Residential Plots - Future City',
  'Premium residential plots in upcoming area. Excellent investment opportunity with high appreciation potential.',
  3000000,
  '₹30 L',
  'Outer Ring Road, Hyderabad',
  'Future City Layout, Outer Ring Road, Hyderabad - 500039',
  'Plot',
  0,
  0,
  2400,
  'available',
  false,
  '["https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg"]',
  '["Gated Community", "Security", "Water Supply", "Electricity", "Road Access"]'
);

-- Insert sample testimonials
INSERT INTO testimonials (name, role, content, rating, property_id, is_featured, is_published) VALUES
(
  'Rajesh Kumar',
  'Property Owner',
  'Kasturi helped us find our dream home. Their attention to detail and customer service is exceptional. Manoj personally guided us through every step of the process.',
  5,
  (SELECT id FROM properties WHERE title = 'Luxury Villa - Green Valley' LIMIT 1),
  true,
  true
),
(
  'Priya Sharma',
  'Investor',
  'Professional team with deep market knowledge. They made my commercial property investment seamless and profitable. Highly recommend their services.',
  5,
  (SELECT id FROM properties WHERE title = 'Commercial Complex - Tech Hub' LIMIT 1),
  true,
  true
),
(
  'Amit Patel',
  'Home Buyer',
  'Transparent dealings and quality construction. Highly recommend Kasturi for luxury properties. The apartment we bought exceeded our expectations.',
  5,
  (SELECT id FROM properties WHERE title = 'Premium Apartments - Skyline' LIMIT 1),
  true,
  true
),
(
  'Sunita Reddy',
  'Villa Owner',
  'Excellent service from start to finish. The villa we purchased is exactly what we wanted. Great location and beautiful construction quality.',
  5,
  (SELECT id FROM properties WHERE title = 'Garden Homes - Serene Living' LIMIT 1),
  false,
  true
),
(
  'Vikram Singh',
  'Investor',
  'Kasturi Reality Venture provided excellent investment advice. Their market insights helped me make the right property investment decision.',
  4,
  NULL,
  false,
  true
);

-- Insert sample blog posts
INSERT INTO blog_posts (title, slug, excerpt, content, featured_image, author, category, tags, is_published, is_featured, published_at) VALUES
(
  'Top 5 Investment Areas in Hyderabad 2024',
  'top-5-investment-areas-hyderabad-2024',
  'Discover the most promising real estate investment locations in Hyderabad for 2024. Expert insights on growth potential and ROI.',
  'Hyderabad continues to be one of India''s most attractive real estate markets. Here are the top 5 areas showing exceptional growth potential in 2024...',
  'https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg',
  'Manoj Shrivastav',
  'Investment Tips',
  '["investment", "hyderabad", "real estate", "2024", "ROI"]',
  true,
  true,
  now() - interval '2 days'
),
(
  'Understanding Property Documentation in India',
  'property-documentation-guide-india',
  'A comprehensive guide to property documents you need to verify before buying real estate in India.',
  'When buying property in India, proper documentation is crucial. This guide covers all essential documents you should verify...',
  'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg',
  'Manoj Shrivastav',
  'Property News',
  '["documentation", "legal", "property", "buying guide"]',
  true,
  false,
  now() - interval '5 days'
),
(
  'Luxury Villa Market Trends in Hyderabad',
  'luxury-villa-market-trends-hyderabad',
  'Analysis of luxury villa market trends in Hyderabad. Price movements, demand patterns, and future outlook.',
  'The luxury villa segment in Hyderabad has shown remarkable resilience and growth. Our analysis reveals key trends...',
  'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg',
  'Manoj Shrivastav',
  'Market Updates',
  '["luxury", "villa", "market trends", "hyderabad"]',
  true,
  true,
  now() - interval '1 week'
);