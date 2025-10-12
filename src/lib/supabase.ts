import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Create a mock client if environment variables are not set (for development)
let supabase: any;

if (!supabaseUrl || !supabaseAnonKey) {
  console.warn('Supabase environment variables not found. Using mock client for development.');
  supabase = {
    from: () => ({
      select: () => ({ data: [], error: null }),
      insert: () => ({ data: null, error: null }),
      update: () => ({ data: null, error: null }),
      delete: () => ({ data: null, error: null }),
    }),
  };
} else {
  supabase = createClient(supabaseUrl, supabaseAnonKey);
}

export { supabase };

// Database Types
export interface Property {
  id: string;
  title: string;
  description?: string;
  price: number;
  price_display: string;
  location: string;
  address?: string;
  property_type: 'Villa' | 'Apartment' | 'Commercial' | 'Plot';
  bedrooms: number;
  bathrooms: number;
  sqft: number;
  status: 'available' | 'sold' | 'under_offer' | 'coming_soon';
  featured: boolean;
  images: string[];
  amenities: string[];
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  property_id?: string;
  inquiry_type: 'buying' | 'selling' | 'renting' | 'investment' | 'general';
  budget_min?: number;
  budget_max?: number;
  message?: string;
  preferred_contact: 'email' | 'phone' | 'whatsapp';
  visit_date?: string;
  status: 'new' | 'contacted' | 'scheduled' | 'completed' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface Testimonial {
  id: string;
  name: string;
  role: string;
  content: string;
  rating: number;
  image_url?: string;
  property_id?: string;
  is_featured: boolean;
  is_published: boolean;
  created_at: string;
  updated_at: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt?: string;
  content: string;
  featured_image?: string;
  author: string;
  category: 'Real Estate' | 'Market Updates' | 'Investment Tips' | 'Property News' | 'Company News';
  tags: string[];
  is_published: boolean;
  is_featured: boolean;
  published_at?: string;
  created_at: string;
  updated_at: string;
}

export interface Setting {
  id: string;
  key: string;
  value: any;
  description?: string;
  category: 'general' | 'contact' | 'social' | 'seo' | 'appearance';
  is_public: boolean;
  created_at: string;
  updated_at: string;
}

export interface EmailEnquiry {
  id: string;
  sender_name: string;
  sender_email: string;
  sender_phone?: string;
  subject: string;
  message: string;
  property_id?: string;
  enquiry_source: 'website' | 'hero_section' | 'contact_form' | 'property_page' | 'whatsapp';
  email_sent: boolean;
  email_sent_at?: string;
  status: 'new' | 'read' | 'replied' | 'closed';
  created_at: string;
  updated_at: string;
}

export interface Feedback {
  id: string;
  name: string;
  email: string;
  rating: number;
  message: string;
  created_at: string;
}

// Database Functions
export const propertyService = {
  // Get all properties with optional filters
  async getProperties(filters?: {
    type?: string;
    location?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    featured?: boolean;
  }) {
    let query = supabase
      .from('properties')
      .select('*')
      .eq('status', 'available')
      .order('created_at', { ascending: false });

    if (filters?.type && filters.type !== 'All') {
      query = query.eq('property_type', filters.type);
    }
    if (filters?.location && filters.location !== 'All') {
      query = query.ilike('location', `%${filters.location}%`);
    }
    if (filters?.minPrice) {
      query = query.gte('price', filters.minPrice);
    }
    if (filters?.maxPrice) {
      query = query.lte('price', filters.maxPrice);
    }
    if (filters?.bedrooms) {
      query = query.eq('bedrooms', filters.bedrooms);
    }
    if (filters?.featured) {
      query = query.eq('featured', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Property[];
  },

  // Get single property by ID
  async getProperty(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    return data as Property;
  },

  // Get featured properties
  async getFeaturedProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('featured', true)
      .eq('status', 'available')
      .order('created_at', { ascending: false })
      .limit(6);
    
    if (error) throw error;
    return data as Property[];
  }
};

export const inquiryService = {
  // Submit new inquiry
  async submitInquiry(inquiry: Omit<Inquiry, 'id' | 'status' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('inquiries')
      .insert([inquiry])
      .select()
      .single();
    
    if (error) throw error;
    return data as Inquiry;
  },

  // Get all inquiries (admin only)
  async getInquiries() {
    const { data, error } = await supabase
      .from('inquiries')
      .select(`
        *,
        properties (
          title,
          location,
          price_display
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  }
};

export const testimonialService = {
  // Get published testimonials
  async getTestimonials(featured?: boolean) {
    let query = supabase
      .from('testimonials')
      .select('*')
      .eq('is_published', true)
      .order('created_at', { ascending: false });

    if (featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Testimonial[];
  }
};

export const blogService = {
  // Get published blog posts
  async getBlogPosts(featured?: boolean) {
    let query = supabase
      .from('blog_posts')
      .select('*')
      .eq('is_published', true)
      .order('published_at', { ascending: false });

    if (featured) {
      query = query.eq('is_featured', true);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as BlogPost[];
  },

  // Get single blog post by slug
  async getBlogPost(slug: string) {
    const { data, error } = await supabase
      .from('blog_posts')
      .select('*')
      .eq('slug', slug)
      .eq('is_published', true)
      .single();
    
    if (error) throw error;
    return data as BlogPost;
  }
};

export const settingsService = {
  // Get public settings
  async getSettings() {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('is_public', true);
    
    if (error) throw error;
    return data as Setting[];
  },

  // Get setting by key
  async getSetting(key: string) {
    const { data, error } = await supabase
      .from('settings')
      .select('*')
      .eq('key', key)
      .eq('is_public', true)
      .single();
    
    if (error) throw error;
    return data as Setting;
  }
};

export const emailEnquiryService = {
  // Submit new email enquiry
  async submitEmailEnquiry(enquiry: Omit<EmailEnquiry, 'id' | 'email_sent' | 'email_sent_at' | 'status' | 'created_at' | 'updated_at'>) {
    const { data, error } = await supabase
      .from('email_enquiries')
      .insert([{
        ...enquiry,
        email_sent: true,
        email_sent_at: new Date().toISOString()
      }])
      .select()
      .single();
    
    if (error) throw error;
    return data as EmailEnquiry;
  },

  // Get all email enquiries (admin only)
  async getEmailEnquiries() {
    const { data, error } = await supabase
      .from('email_enquiries')
      .select(`
        *,
        properties (
          title,
          location,
          price_display
        )
      `)
      .order('created_at', { ascending: false });
    
    if (error) throw error;
    return data;
  },

  // Update enquiry status
  async updateEnquiryStatus(id: string, status: EmailEnquiry['status']) {
    const { data, error } = await supabase
      .from('email_enquiries')
      .update({
        status,
        updated_at: new Date().toISOString()
      })
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as EmailEnquiry;
  }
};

export const feedbackService = {
  // Submit new feedback
  async submitFeedback(feedback: Omit<Feedback, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('feedback')
      .insert([feedback])
      .select()
      .single();

    if (error) throw error;
    return data as Feedback;
  },

  // Get all feedback (admin only)
  async getFeedback() {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Feedback[];
  },

  // Delete feedback
  async deleteFeedback(id: string) {
    const { error } = await supabase
      .from('feedback')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};