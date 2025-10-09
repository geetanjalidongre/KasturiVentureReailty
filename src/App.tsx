import React, { useState } from 'react';
import { ChevronDown, Phone, Mail, MapPin, Home, Building, Users, Award, ArrowRight, Star, CheckCircle, MessageCircle } from 'lucide-react';
import { AnimatedSection } from './components/AnimatedSection';
import { PropertyCard } from './components/PropertyCard';
import { AnimatedCounter } from './components/AnimatedCounter';
import { PropertyCarousel } from './components/PropertyCarousel';
import { FilterPanel } from './components/FilterPanel';
import { FloatingLabelInput, FloatingLabelTextarea } from './components/FloatingLabels';
import { TestimonialSlider } from './components/TestimonialSlider';
import { emailEnquiryService } from './lib/supabase';

function App() {
  const [activeProperty, setActiveProperty] = useState(0);
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleEmailInquiry = () => {
    const subject = encodeURIComponent('Property Inquiry - Kasturi Reality Venture');
    const body = encodeURIComponent(`Dear Manoj Shrivastav,

I am interested in learning more about your properties. Please contact me with more details.

Best regards`);
    
    // Track email enquiry in database
    emailEnquiryService.submitEmailEnquiry({
      sender_name: 'Website Visitor',
      sender_email: 'visitor@example.com',
      subject: 'Property Inquiry - Kasturi Reality Venture',
      message: 'I am interested in learning more about your properties. Please contact me with more details.',
      enquiry_source: 'hero_section'
    }).catch(console.error);
    
    window.open(`mailto:Kasturiventures99@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent('Hi Manoj, I am interested in your properties. Can you please share more details?');
    
    // Track WhatsApp enquiry in database
    emailEnquiryService.submitEmailEnquiry({
      sender_name: 'Website Visitor',
      sender_email: 'visitor@example.com',
      subject: 'WhatsApp Inquiry - Kasturi Reality Venture',
      message: 'Hi Manoj, I am interested in your properties. Can you please share more details?',
      enquiry_source: 'whatsapp'
    }).catch(console.error);
    
    window.open(`https://wa.me/919876543210?text=${message}`, '_blank');
  };

  const properties = [
    {
      id: 1,
      title: "Luxury Villa - Green Valley",
      price: "₹2.5 Cr",
      location: "Banjara Hills, Hyderabad",
      beds: 4,
      baths: 3,
      sqft: "3,500",
      image: "https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg",
      type: "Villa"
    },
    {
      id: 2,
      title: "Premium Apartments - Skyline",
      price: "₹85 L - 1.2 Cr",
      location: "Gachibowli, Hyderabad",
      beds: "2-3",
      baths: "2-3",
      sqft: "1,200-1,800",
      image: "https://images.pexels.com/photos/439391/pexels-photo-439391.jpeg",
      type: "Apartment"
    },
    {
      id: 3,
      title: "Commercial Complex - Tech Hub",
      price: "₹5-50 L",
      location: "HITEC City, Hyderabad",
      beds: "Office",
      baths: "Common",
      sqft: "500-5,000",
      image: "https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg",
      type: "Commercial"
    },
    {
      id: 4,
      title: "Garden Homes - Serene Living",
      price: "₹1.8 Cr",
      location: "Kompally, Hyderabad",
      beds: 3,
      baths: 2,
      sqft: "2,800",
      image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
      type: "Villa"
    }
  ];

  const featuredProperties = properties.slice(0, 3);

  const services = [
    {
      icon: <Home className="w-8 h-8" />,
      title: "Residential Properties",
      description: "Luxury villas, apartments, and independent houses designed for modern living."
    },
    {
      icon: <Building className="w-8 h-8" />,
      title: "Commercial Spaces",
      description: "Premium office spaces, retail outlets, and commercial complexes in prime locations."
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Property Management",
      description: "Complete property management services including maintenance, leasing, and tenant relations."
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Investment Advisory",
      description: "Expert guidance on real estate investments and portfolio diversification strategies."
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Property Owner",
      content: "Kasturi helped us find our dream home. Their attention to detail and customer service is exceptional.",
      rating: 5
    },
    {
      name: "Priya Sharma",
      role: "Investor",
      content: "Professional team with deep market knowledge. They made my commercial property investment seamless.",
      rating: 5
    },
    {
      name: "Amit Patel",
      role: "Home Buyer",
      content: "Transparent dealings and quality construction. Highly recommend Kasturi for luxury properties.",
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Navigation */}
      <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <img 
                src="/kasturi logo 2.jpg" 
                alt="Kasturi Reality Venture" 
                className="h-12 w-auto"
              />
            </div>
            <div className="hidden md:flex space-x-8">
              <a href="#home" className="text-gray-800 hover:text-kasturi-gold transition-colors font-medium">Home</a>
              <a href="#properties" className="text-gray-800 hover:text-kasturi-gold transition-colors font-medium">Properties</a>
              <a href="#services" className="text-gray-800 hover:text-kasturi-gold transition-colors font-medium">Services</a>
              <a href="#about" className="text-gray-800 hover:text-kasturi-gold transition-colors font-medium">About</a>
              <a href="#contact" className="text-gray-800 hover:text-kasturi-gold transition-colors font-medium">Contact</a>
            </div>
            <button className="bg-kasturi-gold text-white px-4 py-2 rounded-lg hover:bg-kasturi-gold-dark transition-colors font-medium">
              Get Quote
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative bg-gradient-to-br from-yellow-50 to-amber-100 pt-20 pb-16 overflow-hidden hero-section">
        <div className="absolute inset-0 bg-black opacity-5"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[80vh]">
            <div className="space-y-8 hero-content">
              <div className="space-y-4">
                <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 leading-tight hero-title">
                  Your Dream 
                  <span className="text-kasturi-gold block">Property Awaits</span>
                </h1>
                <p className="text-xl text-gray-700 leading-relaxed hero-subtitle">
                  Discover luxury living with Kasturi Reality Venture. We create premium residential and commercial spaces that blend modern design with sustainable living.
                </p>
                <button className="border-2 border-kasturi-gold text-kasturi-gold px-8 py-4 rounded-lg hover:bg-kasturi-gold hover:text-white transition-all duration-300 font-medium text-lg">
                  Schedule Visit
                </button>
                
                <div className="flex space-x-4 mt-4">
                  <button 
                    onClick={handleEmailInquiry}
                    className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email Inquiry</span>
                  </button>
                  
                  <button 
                    onClick={handleWhatsAppInquiry}
                    className="flex items-center space-x-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-all duration-300 font-medium"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-8 hero-stats">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900"><AnimatedCounter end={500} suffix="+" /></div>
                  <div className="text-gray-600">Properties Sold</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900"><AnimatedCounter end={5} suffix="+" /></div>
                  <div className="text-gray-600">Years Experience</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gray-900"><AnimatedCounter end={100} suffix="%" /></div>
                  <div className="text-gray-600">Client Satisfaction</div>
                </div>
              </div>
            </div>
            
            <div className="relative hero-image">
              <div className="relative z-10 bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <img 
                  src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg" 
                  alt="Luxury Property" 
                  className="w-full h-80 object-cover rounded-xl"
                />
                <div className="absolute -bottom-4 -right-4 bg-kasturi-gold text-white p-6 rounded-xl shadow-lg price-badge">
                  <div className="text-2xl font-bold">₹2.5 Cr</div>
                  <div className="text-sm opacity-90">Premium Villa</div>
                </div>
              </div>
              <div className="absolute top-8 left-8 bg-white rounded-xl shadow-lg p-4 z-20">
                <div className="flex items-center space-x-2">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-sm font-medium">Available Now</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Properties</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our carefully curated collection of premium properties, each designed to offer the perfect blend of luxury, comfort, and modern amenities.
            </p>
          </AnimatedSection>
          
          {/* Property Carousel */}
          <AnimatedSection className="mb-12" delay={200}>
            <PropertyCarousel properties={featuredProperties} />
          </AnimatedSection>
          
          {/* Filter Panel */}
          <AnimatedSection delay={300}>
            <FilterPanel />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {properties.map((property, index) => (
              <AnimatedSection key={property.id} delay={index * 100} animation="fadeUp">
                <PropertyCard property={property} index={index} />
              </AnimatedSection>
            ))}
          </div>
          
          <AnimatedSection className="text-center mt-12" delay={400}>
            <button className="border-2 border-kasturi-gold text-kasturi-gold px-8 py-3 rounded-lg hover:bg-kasturi-gold hover:text-white transition-colors font-medium">
              View All Properties
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Services</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              From property development to investment advisory, we provide comprehensive real estate solutions tailored to your needs.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 150} animation="fadeUp">
                <div className="text-center p-8 bg-gray-50 rounded-xl hover:bg-amber-50 transition-all duration-500 group transform hover:scale-105 hover:shadow-lg">
                <div className="text-kasturi-gold group-hover:text-kasturi-gold-dark mb-6 flex justify-center">
                  {service.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-4">{service.title}</h3>
                <p className="text-gray-600 leading-relaxed">{service.description}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="slideRight">
              <h2 className="text-4xl font-bold mb-6">About Kasturi Reality Venture</h2>
              <p className="text-xl text-gray-300 mb-6 leading-relaxed">
                With over 5 years of excellence in the real estate industry, Kasturi Reality Venture has been at the forefront of creating premium living and working spaces that define modern luxury.
              </p>
              
              <div className="space-y-4 mb-8">
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-kasturi-gold mr-3" />
                  <span>Award-winning architectural designs</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-kasturi-gold mr-3" />
                  <span>Sustainable and eco-friendly construction</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-kasturi-gold mr-3" />
                  <span>Premium locations across Hyderabad</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="w-6 h-6 text-kasturi-gold mr-3" />
                  <span>Transparent and ethical business practices</span>
                </div>
              </div>
              
              <button className="bg-kasturi-gold text-white px-8 py-3 rounded-lg hover:bg-kasturi-gold-dark transition-colors font-medium">
                Learn More About Us
              </button>
            </AnimatedSection>
            
            <AnimatedSection className="relative" animation="slideLeft">
              <img 
                src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg" 
                alt="About Kasturi" 
                className="w-full h-96 object-cover rounded-xl"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent rounded-xl"></div>
              <div className="absolute bottom-6 left-6 right-6">
                <h3 className="text-2xl font-bold mb-2">Building Dreams Since 2019</h3>
                <p className="text-gray-200">Creating spaces where memories are made</p>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Clients Say</h2>
            <p className="text-xl text-gray-600">Hear from satisfied homeowners and investors who chose Kasturi</p>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <TestimonialSlider testimonials={testimonials} />
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
            <p className="text-xl text-gray-600">Ready to find your dream property? Contact our expert team today</p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <AnimatedSection animation="slideRight">
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Contact Information</h3>
              
              <div className="space-y-6">
                <div className="flex items-center">
                  <Phone className="w-6 h-6 text-yellow-600 mr-4" />
                  <div>
                    <div className="font-medium text-gray-900">Phone</div>
                    <div className="text-gray-600">+91 9876543210</div>
                    <div className="text-sm text-kasturi-gold font-medium">Manoj Shrivastav</div>
                    <button 
                      onClick={handleWhatsAppInquiry}
                      className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-colors mt-1 text-sm"
                    >
                      <MessageCircle className="w-4 h-4" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <Mail className="w-6 h-6 text-yellow-600 mr-4" />
                  <div>
                    <div className="font-medium text-gray-900">Email</div>
                    <div className="text-gray-600">Kasturiventures99@gmail.com</div>
                    <button 
                      onClick={handleEmailInquiry}
                      className="text-blue-600 hover:text-blue-700 transition-colors text-sm"
                    >
                      Send Email
                    </button>
                  </div>
                </div>
                
                <div className="flex items-center">
                  <MapPin className="w-6 h-6 text-yellow-600 mr-4" />
                  <div>
                    <div className="font-medium text-gray-900">Address</div>
                    <div className="text-gray-600">Vatsalya flat no. B-103, Sector no. 8, Charkop, Kandivali West, Mumbai 400067</div>
                  </div>
                </div>
              </div>
              
              <div className="mt-8">
                <h4 className="text-lg font-bold text-gray-900 mb-4">Office Hours</h4>
                <div className="text-gray-600 space-y-2">
                  <div>Monday - Friday: 9:00 AM - 7:00 PM</div>
                  <div>Saturday: 10:00 AM - 5:00 PM</div>
                  <div>Sunday: By Appointment</div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideLeft">
              <form className="space-y-6 contact-form" onSubmit={(e) => e.preventDefault()}>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <FloatingLabelInput
                    label="First Name"
                    type="text"
                    value={contactForm.firstName}
                    onChange={(value) => setContactForm({...contactForm, firstName: value})}
                    required
                  />
                  <FloatingLabelInput
                    label="Last Name"
                    type="text"
                    value={contactForm.lastName}
                    onChange={(value) => setContactForm({...contactForm, lastName: value})}
                    required
                  />
                </div>
                
                <FloatingLabelInput
                  label="Email Address"
                  type="email"
                  value={contactForm.email}
                  onChange={(value) => setContactForm({...contactForm, email: value})}
                  required
                />
                
                <FloatingLabelInput
                  label="Phone Number"
                  type="tel"
                  value={contactForm.phone}
                  onChange={(value) => setContactForm({...contactForm, phone: value})}
                  required
                />
                
                <div className="relative">
                  <select 
                    value={contactForm.interest}
                    onChange={(e) => setContactForm({...contactForm, interest: e.target.value})}
                    className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-kasturi-gold focus:border-transparent transition-all duration-300 transform focus:scale-105"
                  >
                    <option value="">I'm interested in...</option>
                    <option value="buying">Buying a property</option>
                    <option value="selling">Selling a property</option>
                    <option value="renting">Renting a property</option>
                    <option value="investment">Investment opportunities</option>
                  </select>
                </div>
                
                <FloatingLabelTextarea
                  label="Tell us about your requirements..."
                  value={contactForm.message}
                  onChange={(value) => setContactForm({...contactForm, message: value})}
                  rows={4}
                />
                
                <button className="w-full bg-kasturi-gold text-white py-4 rounded-lg hover:bg-kasturi-gold-dark transition-all duration-300 font-medium text-lg transform hover:scale-105 active:scale-95 cta-pulse">
                  Send Message
                </button>
                
                <div className="flex space-x-4 mt-4">
                  <button 
                    type="button"
                    onClick={handleEmailInquiry}
                    className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-all duration-300 font-medium"
                  >
                    <Mail className="w-5 h-5" />
                    <span>Email Us</span>
                  </button>
                  
                  <button 
                    type="button"
                    onClick={handleWhatsAppInquiry}
                    className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-lg hover:green-700 transition-all duration-300 font-medium"
                  >
                    <MessageCircle className="w-5 h-5" />
                    <span>WhatsApp</span>
                  </button>
                </div>
              </form>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <img 
                src="/kasturi logo 2.jpg" 
                alt="Kasturi Reality Venture" 
                className="h-16 w-auto mb-4 bg-white p-2 rounded"
              />
              <p className="text-gray-400 leading-relaxed">
                Building dreams and creating premium living spaces for over 5 years. Your trusted partner in real estate.
              </p>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#home" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#properties" className="hover:text-white transition-colors">Properties</a></li>
                <li><a href="#services" className="hover:text-white transition-colors">Services</a></li>
                <li><a href="#about" className="hover:text-white transition-colors">About</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Residential Properties</li>
                <li>Commercial Spaces</li>
                <li>Property Management</li>
                <li>Investment Advisory</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-lg font-bold mb-4">Connect With Us</h4>
              <div className="text-gray-400 space-y-2">
                <div>+91 9876543210</div>
                <div>Kasturiventures99@gmail.com</div>
                <div>Mumbai, Maharashtra</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Kasturi Reality Ventures. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;