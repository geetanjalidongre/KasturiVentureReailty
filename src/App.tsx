import React, { useState, useEffect } from 'react';
import {
  ChevronDown, Phone, Mail, MapPin, Home, Building, Users, Award,
  ArrowRight, Star, CheckCircle, MessageCircle, Menu, X, Play, Pause,
  ChevronLeft, ChevronRight, Search, Filter, Eye, Heart, Share2, Settings
} from 'lucide-react';
import { AnimatedSection } from './components/AnimatedSection';
import { PropertyCard } from './components/PropertyCard';
import { AnimatedCounter } from './components/AnimatedCounter';
import { PropertyCarousel } from './components/PropertyCarousel';
import { FilterPanel } from './components/FilterPanel';
import { FloatingLabelInput, FloatingLabelTextarea } from './components/FloatingLabels';
import { TestimonialSlider } from './components/TestimonialSlider';
import { FeedbackModal } from './components/FeedbackModal';
import { FeedbackViewer } from './components/FeedbackViewer';
import { PropertyDetailModal } from './components/PropertyDetailModal';
import { PropertyManagementModal } from './components/PropertyManagementModal';
import { emailEnquiryService, propertyService, Property } from './lib/supabase';

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeProperty, setActiveProperty] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false);
  const [isFeedbackViewerOpen, setIsFeedbackViewerOpen] = useState(false);
  const [selectedProperty, setSelectedProperty] = useState<Property | null>(null);
  const [isPropertyDetailOpen, setIsPropertyDetailOpen] = useState(false);
  const [isPropertyManagementOpen, setIsPropertyManagementOpen] = useState(false);
  const [showManageButton, setShowManageButton] = useState(false);
  const [properties, setProperties] = useState<Property[]>([]);
  const [isLoadingProperties, setIsLoadingProperties] = useState(true);
  const [filters, setFilters] = useState({
    type: 'All',
    location: 'All',
    minPrice: undefined,
    maxPrice: undefined,
    bedrooms: undefined
  });
  const [contactForm, setContactForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    interest: '',
    message: ''
  });

  const handleEmailInquiry = () => {
    const subject = encodeURIComponent('Property Inquiry - Kasturi Realty Venture');
    const body = encodeURIComponent(`Dear Manoj Shrivastav,

I am interested in learning more about your properties. Please contact me with more details.

Best regards`);

    emailEnquiryService.submitEmailEnquiry({
      sender_name: 'Website Visitor',
      sender_email: 'visitor@example.com',
      subject: 'Property Inquiry - Kasturi Realty Venture',
      message: 'I am interested in learning more about your properties. Please contact me with more details.',
      enquiry_source: 'hero_section'
    }).catch(console.error);

    window.open(`mailto:Kasturiventures99@gmail.com?subject=${subject}&body=${body}`, '_blank');
  };

  const handleWhatsAppInquiry = () => {
    const message = encodeURIComponent('Hi, I am interested in your properties. Can you please share more details?');

    emailEnquiryService.submitEmailEnquiry({
      sender_name: 'Website Visitor',
      sender_email: 'visitor@example.com',
      subject: 'WhatsApp Inquiry - Kasturi Realty Venture',
      message: 'Hi Manoj, I am interested in your properties. Can you please share more details?',
      enquiry_source: 'whatsapp'
    }).catch(console.error);

    window.open(`https://wa.me/919987739999?text=${message}`, '_blank');
  };

useEffect(() => {
    loadProperties();

    // Secret keyboard shortcut: Ctrl + Shift + M
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'M') {
        setShowManageButton(prev => !prev);
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, []);

  const loadProperties = async () => {
    setIsLoadingProperties(true);
    try {
      const data = await propertyService.getAllProperties();
      setProperties(data);
    } catch (error) {
      console.error('Error loading properties:', error);
    } finally {
      setIsLoadingProperties(false);
    }
  };

  const filteredProperties = properties.filter(property => {
    if (filters.type !== 'All' && property.property_type !== filters.type) return false;
    if (filters.location !== 'All' && !property.location.includes(filters.location)) return false;
    if (filters.minPrice && property.price && property.price < filters.minPrice) return false;
    if (filters.maxPrice && property.price && property.price > filters.maxPrice) return false;
    if (filters.bedrooms && property.bedrooms && property.bedrooms < filters.bedrooms) return false;
    return true;
  });

  const featuredProperties = properties.filter(p => p.featured);

  const services = [
    {
      icon: <Home className="w-12 h-12" />,
      title: "Luxury Residences",
      description: "Premium villas and apartments crafted for sophisticated living with world-class amenities.",
      features: ["Premium Locations", "Modern Architecture", "Smart Home Features"]
    },
    {
      icon: <Building className="w-12 h-12" />,
      title: "Commercial Spaces",
      description: "Strategic commercial properties in prime business districts with excellent connectivity.",
      features: ["Prime Locations", "High ROI", "Professional Management"]
    },
    {
      icon: <Users className="w-12 h-12" />,
      title: "Property Management",
      description: "Comprehensive property management services ensuring maximum returns on your investment.",
      features: ["Tenant Management", "Maintenance", "Legal Support"]
    },
    {
      icon: <Award className="w-12 h-12" />,
      title: "Investment Advisory",
      description: "Expert guidance on real estate investments with market insights and portfolio optimization.",
      features: ["Market Analysis", "Portfolio Planning", "Risk Assessment"]
    }
  ];

  const testimonials = [
    {
      name: "Rajesh Kumar",
      role: "Villa Owner",
      content: "Kasturi transformed our dream into reality. The attention to detail and premium quality exceeded our expectations. Manoj's personal involvement made all the difference.",
      rating: 5,
      image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg"
    },
    {
      name: "Priya Sharma",
      role: "Commercial Investor",
      content: "Outstanding investment returns and professional service. Their market knowledge helped me make the right investment decisions. Highly recommended for serious investors.",
      rating: 5,
      image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg"
    },
    {
      name: "Amit Patel",
      role: "Apartment Owner",
      content: "Transparent dealings and exceptional quality. The apartment we purchased is exactly as promised. Great location and beautiful construction quality.",
      rating: 5,
      image: "https://images.pexels.com/photos/1681010/pexels-photo-1681010.jpeg"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-amber-50">
      {/* Navigation */}
      <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-md shadow-lg border-b border-amber-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <img
                  src="/KASTURI REAILTY VENTURE 2.jpg"
                  alt="Kasturi Realty Venture"
                  className="h-16 w-auto rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
                />
              </div>
              <div className="hidden md:block">
                <h1 className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">
                  Kasturi Realty Venture
                </h1>
                <p className="text-sm text-gray-600">Premium Real Estate Solutions</p>
              </div>
            </div>
            
            <div className="hidden lg:flex space-x-8">
              <a href="#home" className="nav-link text-gray-800 hover:text-amber-600 transition-all duration-300 font-medium relative group">
                Home
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#properties" className="nav-link text-gray-800 hover:text-amber-600 transition-all duration-300 font-medium relative group">
                Properties
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#services" className="nav-link text-gray-800 hover:text-amber-600 transition-all duration-300 font-medium relative group">
                Services
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#about" className="nav-link text-gray-800 hover:text-amber-600 transition-all duration-300 font-medium relative group">
                About
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
              <a href="#contact" className="nav-link text-gray-800 hover:text-amber-600 transition-all duration-300 font-medium relative group">
                Contact
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-amber-600 transition-all duration-300 group-hover:w-full"></span>
              </a>
            </div>
            
            <div className="flex items-center space-x-4">
              <button
                onClick={handleWhatsAppInquiry}
                className="hidden md:flex items-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-full hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-medium shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <MessageCircle className="w-5 h-5" />
                <span>Chat</span>
              </button>
              <button
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
        
        {/* Mobile Menu */}
        <div className={`lg:hidden transition-all duration-300 ${isMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'} overflow-hidden bg-white border-t border-gray-200`}>
          <div className="px-4 py-6 space-y-4">
            <a href="#home" className="block text-gray-800 hover:text-amber-600 transition-colors font-medium">Home</a>
            <a href="#properties" className="block text-gray-800 hover:text-amber-600 transition-colors font-medium">Properties</a>
            <a href="#services" className="block text-gray-800 hover:text-amber-600 transition-colors font-medium">Services</a>
            <a href="#about" className="block text-gray-800 hover:text-amber-600 transition-colors font-medium">About</a>
            <a href="#contact" className="block text-gray-800 hover:text-amber-600 transition-colors font-medium">Contact</a>
            <button
              onClick={handleWhatsAppInquiry}
              className="w-full flex items-center justify-center space-x-2 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-3 rounded-full font-medium"
            >
              <MessageCircle className="w-5 h-5" />
              <span>Chat</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0">
          <img
            src="/Screenshot 2025-11-09 144838 copy copy.png"
            alt="Luxury Property"
            className="w-full h-full object-cover animate-kenburns"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-black/70"></div>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/30"></div>
        </div>

        {/* Floating Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-2 h-2 bg-amber-400/30 rounded-full animate-float" style={{ animationDelay: '0s' }}></div>
          <div className="absolute top-40 right-20 w-3 h-3 bg-yellow-400/20 rounded-full animate-float" style={{ animationDelay: '1s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-2 h-2 bg-amber-300/25 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute top-1/3 right-1/3 w-1.5 h-1.5 bg-yellow-300/30 rounded-full animate-float" style={{ animationDelay: '1.5s' }}></div>
          <div className="absolute bottom-1/4 right-1/4 w-2.5 h-2.5 bg-amber-400/20 rounded-full animate-float" style={{ animationDelay: '0.5s' }}></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection className="space-y-8" animation="slideRight">
              <div className="space-y-6">
                <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium animate-bounce animate-glow">
                  <Star className="w-4 h-4 mr-2 fill-current animate-rotate-in" />
                  Premium Real Estate Since 2019
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight animate-slide-from-top">
                  <span className="block text-white">Discover Your</span>
                  <span className="block bg-gradient-to-r from-amber-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient">
                    Dream Property
                  </span>
                </h1>

                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed max-w-2xl animate-fade-in" style={{ animationDelay: '0.3s' }}>
                  Experience luxury living with Kasturi Realty Venture. We create exceptional residential and commercial spaces that blend modern elegance with timeless sophistication.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-4 pt-4 animate-zoom-in" style={{ animationDelay: '0.5s' }}>
                  <button className="group bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:scale-105 flex items-center justify-center hover:animate-pulse">
                    Explore Properties
                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <div className="flex space-x-3">
                    <button
                      onClick={handleEmailInquiry}
                      className="flex items-center space-x-2 bg-blue-600 text-white px-6 py-4 rounded-full hover:bg-blue-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:rotate-3 animate-zoom-in" style={{ animationDelay: '0.6s' }}
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email Us</span>
                    </button>

                    <button
                      onClick={handleWhatsAppInquiry}
                      className="flex items-center space-x-2 bg-green-600 text-white px-6 py-4 rounded-full hover:bg-green-700 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-rotate-3 animate-zoom-in" style={{ animationDelay: '0.7s' }}
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-8 pt-12">
                <div className="text-center group transform hover:scale-110 transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.7s' }}>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    <AnimatedCounter end={500} suffix="+" />
                  </div>
                  <div className="text-gray-300 font-medium group-hover:text-white transition-colors">Properties Sold</div>
                  <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto mt-2 rounded-full group-hover:w-16 group-hover:animate-pulse transition-all duration-300"></div>
                </div>
                <div className="text-center group transform hover:scale-110 transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.85s' }}>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    <AnimatedCounter end={5} suffix="+" />
                  </div>
                  <div className="text-gray-300 font-medium group-hover:text-white transition-colors">Years Experience</div>
                  <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto mt-2 rounded-full group-hover:w-16 group-hover:animate-pulse transition-all duration-300"></div>
                </div>
                <div className="text-center group transform hover:scale-110 transition-all duration-300 animate-zoom-in" style={{ animationDelay: '1s' }}>
                  <div className="text-4xl font-bold text-white mb-2 group-hover:text-amber-400 transition-colors">
                    <AnimatedCounter end={100} suffix="%" />
                  </div>
                  <div className="text-gray-300 font-medium group-hover:text-white transition-colors">Client Satisfaction</div>
                  <div className="w-12 h-1 bg-gradient-to-r from-amber-400 to-yellow-400 mx-auto mt-2 rounded-full group-hover:w-16 group-hover:animate-pulse transition-all duration-300"></div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection className="relative" animation="slideLeft" delay={200}>
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-3xl transform rotate-6 animate-pulse animate-glow"></div>
                <div className="relative bg-white rounded-3xl shadow-2xl p-2 transform hover:rotate-0 transition-transform duration-700 animate-zoom-in" style={{ animationDelay: '0.4s' }}>
                  <img
                    src="https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg"
                    alt="Luxury Property"
                    className="w-full h-96 lg:h-[500px] object-cover rounded-2xl hover:scale-105 transition-transform duration-700"
                  />
                </div>

                {/* Floating Elements */}
                <div className="absolute -top-4 -right-4 bg-white rounded-full p-4 shadow-lg animate-bounce hover:scale-125 transition-transform cursor-pointer animate-rotate-in" style={{ animationDelay: '1s' }}>
                  <Heart className="w-6 h-6 text-red-500" />
                </div>
                <div className="absolute -bottom-4 -left-4 bg-white rounded-full p-4 shadow-lg animate-bounce hover:scale-125 transition-transform cursor-pointer animate-rotate-in" style={{animationDelay: '1.2s'}}>
                  <Eye className="w-6 h-6 text-blue-500" />
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Properties Section */}
      <section id="properties" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium mb-6">
              <Building className="w-4 h-4 mr-2" />
              Featured Properties
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Exceptional <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Properties</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our carefully curated collection of premium properties, each designed to offer the perfect blend of luxury, comfort, and modern sophistication.
            </p>
          </AnimatedSection>
          
          <AnimatedSection className="mb-16" delay={200}>
            <PropertyCarousel properties={featuredProperties} />
          </AnimatedSection>
          
          <AnimatedSection delay={300}>
            <FilterPanel filters={filters} onFilterChange={setFilters} />
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-16">
            {isLoadingProperties ? (
              <div className="col-span-full flex items-center justify-center py-20">
                <div className="w-12 h-12 border-4 border-amber-500 border-t-transparent rounded-full animate-spin" />
              </div>
            ) : filteredProperties.length === 0 ? (
              <div className="col-span-full text-center py-20">
                <p className="text-xl text-gray-600">No properties found matching your criteria</p>
              </div>
            ) : (
              filteredProperties.map((property, index) => (
                <AnimatedSection key={property.id} delay={index * 100} animation="fadeUp">
                  <PropertyCard
                    property={property}
                    onViewDetails={(prop) => {
                      setSelectedProperty(prop);
                      setIsPropertyDetailOpen(true);
                    }}
                  />
                </AnimatedSection>
              ))
            )}
          </div>
          
          <AnimatedSection className="text-center mt-16" delay={400}>
            <button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105">
              View All Properties
            </button>
          </AnimatedSection>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="py-24 bg-gradient-to-br from-gray-50 to-amber-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium mb-6">
              <Award className="w-4 h-4 mr-2" />
              Our Services
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              Premium <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Services</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              From property development to investment advisory, we provide comprehensive real estate solutions tailored to your unique needs and aspirations.
            </p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {services.map((service, index) => (
              <AnimatedSection key={index} delay={index * 150} animation="fadeUp">
                <div className="group bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 border border-amber-100">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-20 h-20 bg-gradient-to-br from-amber-100 to-yellow-100 rounded-2xl flex items-center justify-center text-amber-600 group-hover:from-amber-500 group-hover:to-yellow-500 group-hover:text-white transition-all duration-300 transform group-hover:scale-110">
                        {service.icon}
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-amber-600 transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed mb-6">
                        {service.description}
                      </p>
                      <ul className="space-y-2">
                        {service.features.map((feature, idx) => (
                          <li key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-amber-500 mr-2 flex-shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-gray-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-gray-800 to-amber-900"></div>
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;charset=utf-8,%3Csvg%20width%3D%2260%22%20height%3D%2260%22%20viewBox%3D%220%200%2060%2060%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%3E%3Cg%20fill%3D%22none%22%20fill-rule%3D%22evenodd%22%3E%3Cg%20fill%3D%22%23f59e0b%22%20fill-opacity%3D%220.1%22%3E%3Ccircle%20cx%3D%2230%22%20cy%3D%2230%22%20r%3D%221%22%2F%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E')]"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideRight">
              <div className="inline-flex items-center px-4 py-2 bg-amber-500/20 rounded-full text-amber-300 text-sm font-medium mb-8">
                <Award className="w-4 h-4 mr-2" />
                About Kasturi Realty Venture
              </div>
              
              <h2 className="text-4xl lg:text-6xl font-bold mb-8 leading-tight">
                Building Dreams <span className="bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">Since 2019</span>
              </h2>
              
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                With over 5 years of excellence in the real estate industry, Kasturi Realty Venture has been at the forefront of creating premium living and working spaces that define modern luxury and sophistication.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-10">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                  </div>
                  <span className="text-gray-300">Award-winning designs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                  </div>
                  <span className="text-gray-300">Sustainable construction</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                  </div>
                  <span className="text-gray-300">Premium locations</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-amber-400 to-yellow-400 rounded-full flex items-center justify-center">
                    <CheckCircle className="w-5 h-5 text-gray-900" />
                  </div>
                  <span className="text-gray-300">Transparent dealings</span>
                </div>
              </div>
              
              <button className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-8 py-4 rounded-full hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold shadow-lg hover:shadow-xl transform hover:scale-105">
                Learn More About Us
              </button>
            </AnimatedSection>
            
            <AnimatedSection className="relative" animation="slideLeft">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-amber-400/20 to-yellow-400/20 rounded-3xl transform -rotate-6"></div>
                <img 
                  src="https://images.pexels.com/photos/325185/pexels-photo-325185.jpeg" 
                  alt="About Kasturi" 
                  className="relative w-full h-96 lg:h-[500px] object-cover rounded-3xl shadow-2xl"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent rounded-3xl"></div>
                <div className="absolute bottom-8 left-8 right-8">
                  <h3 className="text-3xl font-bold mb-2">Creating Memories</h3>
                  <p className="text-gray-200">Where dreams become reality</p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-24 bg-gradient-to-br from-amber-50 to-yellow-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium mb-6">
              <Star className="w-4 h-4 mr-2 fill-current" />
              Client Testimonials
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6">
              What Our <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent">Clients Say</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Hear from satisfied homeowners and investors who chose Kasturi Realty Venture for their property needs
            </p>
          </AnimatedSection>
          
          <AnimatedSection delay={200}>
            <TestimonialSlider testimonials={testimonials} />
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="text-center mb-20">
            <div className="inline-flex items-center px-4 py-2 bg-amber-100 rounded-full text-amber-800 text-sm font-medium mb-6 animate-bounce animate-glow">
              <MessageCircle className="w-4 h-4 mr-2 animate-rotate-in" />
              Get In Touch
            </div>
            <h2 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 animate-slide-from-top">
              Ready to Find Your <span className="bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent animate-gradient">Dream Property?</span>
            </h2>
            <p className="text-xl text-gray-600 animate-fade-in" style={{ animationDelay: '0.3s' }}>Contact our expert team today and let us help you make the right investment</p>
          </AnimatedSection>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <AnimatedSection animation="slideRight">
              <div className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Contact Information</h3>
                
                <div className="space-y-8">
                  <div className="flex items-start space-x-4 group hover:bg-white hover:shadow-md transition-all duration-300 p-4 rounded-xl animate-zoom-in" style={{ animationDelay: '0.2s' }}>
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-glow">
                      <Phone className="w-6 h-6 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Phone</div>
                      <div className="text-gray-600 text-lg">+91 99877 39999</div>
                      <div className="text-amber-600 font-medium">Manoj Shrivastav</div>
                      <button
                        onClick={handleWhatsAppInquiry}
                        className="flex items-center space-x-1 text-green-600 hover:text-green-700 transition-all duration-300 mt-2 text-sm font-medium hover:translate-x-1 hover:scale-105"
                      >
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group hover:bg-white hover:shadow-md transition-all duration-300 p-4 rounded-xl animate-zoom-in" style={{ animationDelay: '0.4s' }}>
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-glow">
                      <Mail className="w-6 h-6 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Email</div>
                      <div className="text-gray-600 text-lg">Kasturiventures99@gmail.com</div>
                      <button
                        onClick={handleEmailInquiry}
                        className="text-blue-600 hover:text-blue-700 transition-all duration-300 text-sm font-medium hover:translate-x-1 hover:scale-105"
                      >
                        Send Email
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-start space-x-4 group hover:bg-white hover:shadow-md transition-all duration-300 p-4 rounded-xl animate-zoom-in" style={{ animationDelay: '0.6s' }}>
                    <div className="w-12 h-12 bg-gradient-to-r from-amber-500 to-yellow-500 rounded-xl flex items-center justify-center text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 animate-glow">
                      <MapPin className="w-6 h-6 group-hover:animate-bounce" />
                    </div>
                    <div>
                      <div className="font-semibold text-gray-900 text-lg">Address</div>
                      <div className="text-gray-600 leading-relaxed">
                        Vatsalya flat no. B-103, Sector no. 8,<br />
                        Charkop, Kandivali West,<br />
                        Mumbai 400067
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="mt-10 p-6 bg-white rounded-2xl shadow-sm hover:shadow-xl transition-all duration-300 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                  <h4 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse mr-2"></div>
                    Office Hours
                  </h4>
                  <div className="space-y-2 text-gray-600">
                    <div className="flex justify-between">
                      <span>Monday - Friday:</span>
                      <span className="font-medium">9:00 AM - 7:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Saturday:</span>
                      <span className="font-medium">10:00 AM - 5:00 PM</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Sunday:</span>
                      <span className="font-medium">By Appointment</span>
                    </div>
                  </div>
                </div>
              </div>
            </AnimatedSection>
            
            <AnimatedSection animation="slideLeft">
              <div className="bg-gradient-to-br from-gray-50 to-amber-50 rounded-3xl p-8 shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105">
                <h3 className="text-3xl font-bold text-gray-900 mb-8">Send us a Message</h3>
                
                <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 animate-zoom-in" style={{ animationDelay: '0.2s' }}>
                    <FloatingLabelInput
                      label="First Name"
                      type="text"
                      value={contactForm.firstName}
                      onChange={(e) => setContactForm({...contactForm, firstName: e.target.value})}
                      required
                    />
                    <FloatingLabelInput
                      label="Last Name"
                      type="text"
                      value={contactForm.lastName}
                      onChange={(e) => setContactForm({...contactForm, lastName: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="animate-zoom-in" style={{ animationDelay: '0.3s' }}>
                    <FloatingLabelInput
                      label="Email Address"
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({...contactForm, email: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="animate-zoom-in" style={{ animationDelay: '0.4s' }}>
                    <FloatingLabelInput
                      label="Phone Number"
                      type="tel"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({...contactForm, phone: e.target.value})}
                      required
                    />
                  </div>
                  
                  <div className="relative animate-zoom-in" style={{ animationDelay: '0.5s' }}>
                    <select
                      value={contactForm.interest}
                      onChange={(e) => setContactForm({...contactForm, interest: e.target.value})}
                      className="w-full p-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-transparent transition-all duration-300 bg-white hover:border-amber-400 hover:shadow-md"
                    >
                      <option value="">I'm interested in...</option>
                      <option value="buying">Buying a property</option>
                      <option value="selling">Selling a property</option>
                      <option value="renting">Renting a property</option>
                      <option value="investment">Investment opportunities</option>
                    </select>
                  </div>
                  
                  <div className="animate-zoom-in" style={{ animationDelay: '0.6s' }}>
                    <FloatingLabelTextarea
                      label="Tell us about your requirements..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({...contactForm, message: e.target.value})}
                      rows={4}
                    />
                  </div>
                  
                  <button className="w-full bg-gradient-to-r from-amber-500 to-yellow-500 text-white py-4 rounded-xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 font-semibold text-lg shadow-lg hover:shadow-xl transform hover:scale-105 animate-zoom-in hover:animate-pulse" style={{ animationDelay: '0.7s' }}>
                    Send Message
                  </button>
                  
                  <div className="flex space-x-4 mt-6 animate-zoom-in" style={{ animationDelay: '0.8s' }}>
                    <button
                      type="button"
                      onClick={handleEmailInquiry}
                      className="flex-1 flex items-center justify-center space-x-2 bg-blue-600 text-white py-3 rounded-xl hover:bg-blue-700 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg hover:rotate-2"
                    >
                      <Mail className="w-5 h-5" />
                      <span>Email Us</span>
                    </button>

                    <button
                      type="button"
                      onClick={handleWhatsAppInquiry}
                      className="flex-1 flex items-center justify-center space-x-2 bg-green-600 text-white py-3 rounded-xl hover:bg-green-700 transition-all duration-300 font-medium hover:scale-105 hover:shadow-lg hover:-rotate-2"
                    >
                      <MessageCircle className="w-5 h-5" />
                      <span>WhatsApp</span>
                    </button>
                  </div>
                </form>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-32 h-32 bg-amber-400 rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-40 h-40 bg-yellow-400 rounded-full blur-3xl animate-float" style={{ animationDelay: '2s' }}></div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="md:col-span-2 animate-zoom-in" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center space-x-4 mb-6 group">
                <img
                  src="/kasturi logo 2.jpg"
                  alt="Kasturi Realty Venture"
                  className="h-16 w-auto rounded-lg group-hover:scale-110 transition-transform duration-300 hover:rotate-6"
                />
                <div>
                  <h3 className="text-2xl font-bold bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent">
                    Kasturi Realty Venture
                  </h3>
                  <p className="text-gray-400">Premium Real Estate Solutions</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed max-w-md">
                Building dreams and creating premium living spaces for over 5 years. Your trusted partner in real estate with a commitment to excellence and customer satisfaction.
              </p>
            </div>
            
            <div className="animate-zoom-in" style={{ animationDelay: '0.4s' }}>
              <h4 className="text-lg font-bold mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-yellow-400 mr-3 rounded-full"></div>
                Quick Links
              </h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#home" className="hover:text-amber-400 transition-all duration-300 hover:translate-x-2 inline-block">Home</a></li>
                <li><a href="#properties" className="hover:text-amber-400 transition-all duration-300 hover:translate-x-2 inline-block">Properties</a></li>
                <li><a href="#services" className="hover:text-amber-400 transition-all duration-300 hover:translate-x-2 inline-block">Services</a></li>
                <li><a href="#about" className="hover:text-amber-400 transition-all duration-300 hover:translate-x-2 inline-block">About</a></li>
                <li><a href="#contact" className="hover:text-amber-400 transition-all duration-300 hover:translate-x-2 inline-block">Contact</a></li>
              </ul>
            </div>
            
            <div className="animate-zoom-in" style={{ animationDelay: '0.6s' }}>
              <h4 className="text-lg font-bold mb-6 flex items-center">
                <div className="w-1 h-6 bg-gradient-to-b from-amber-400 to-yellow-400 mr-3 rounded-full"></div>
                Services
              </h4>
              <ul className="space-y-3 text-gray-400">
                <li>Luxury Residences</li>
                <li>Commercial Spaces</li>
                <li>Property Management</li>
                <li>Investment Advisory</li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-gray-800 mt-12 pt-8 animate-fade-in" style={{ animationDelay: '0.8s' }}>
            <div className="flex flex-col md:flex-row justify-between items-center">
              <p className="text-gray-400 text-sm">
                &copy; 2024 Kasturi Reality Ventures. All rights reserved.
              </p>
              <div className="flex space-x-6 mt-4 md:mt-0">
                <button
                  onClick={handleEmailInquiry}
                  className="text-gray-400 hover:text-amber-400 transition-all duration-300 hover:scale-125 hover:-rotate-12 animate-zoom-in"
                  style={{ animationDelay: '0.2s' }}
                >
                  <Mail className="w-5 h-5" />
                </button>
                <button
                  onClick={handleWhatsAppInquiry}
                  className="text-gray-400 hover:text-green-400 transition-all duration-300 hover:scale-125 hover:rotate-12 animate-zoom-in"
                  style={{ animationDelay: '0.3s' }}
                >
                  <MessageCircle className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-8 right-8 flex flex-col space-y-4 z-40">
        {showManageButton && (
          <button
            onClick={() => setIsPropertyManagementOpen(true)}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white p-4 rounded-full shadow-2xl hover:from-blue-600 hover:to-indigo-600 transition-all duration-300 transform hover:scale-110 flex items-center space-x-2 group animate-zoom-in"
            style={{ animationDelay: '0.8s' }}
          >
            <Settings className="w-6 h-6" />
            <span className="hidden group-hover:inline-block font-semibold pr-2">Manage</span>
          </button>
        )}

        <button
          onClick={() => setIsFeedbackOpen(true)}
          className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white p-4 rounded-full shadow-2xl hover:from-amber-600 hover:to-yellow-600 transition-all duration-300 transform hover:scale-110 flex items-center space-x-2 group animate-zoom-in animate-bounce hover:animate-pulse"
          style={{ animationDelay: '1s' }}
        >
          <Star className="w-6 h-6 fill-current" />
          <span className="hidden group-hover:inline-block font-semibold pr-2">Feedback</span>
        </button>
      </div>

      {/* Feedback Modal */}
      <FeedbackModal isOpen={isFeedbackOpen} onClose={() => setIsFeedbackOpen(false)} />

      {/* Feedback Viewer Modal */}
      <FeedbackViewer isOpen={isFeedbackViewerOpen} onClose={() => setIsFeedbackViewerOpen(false)} />

      {/* Property Detail Modal */}
      <PropertyDetailModal
        property={selectedProperty}
        isOpen={isPropertyDetailOpen}
        onClose={() => {
          setIsPropertyDetailOpen(false);
          setSelectedProperty(null);
        }}
      />

      {/* Property Management Modal */}
      <PropertyManagementModal
        isOpen={isPropertyManagementOpen}
        onClose={() => setIsPropertyManagementOpen(false)}
        onPropertyChange={loadProperties}
      />
    </div>
  );
}

export default App;