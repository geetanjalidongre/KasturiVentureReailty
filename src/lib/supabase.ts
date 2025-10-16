import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export interface Property {
  id: string;
  title: string;
  description?: string;
  price?: number;
  price_display: string;
  location: string;
  address?: string;
  property_type: string;
  bedrooms?: number;
  bathrooms?: number;
  sqft?: number;
  status?: string;
  featured?: boolean;
  images?: string[] | any;
  amenities?: any;
  image_url?: string;
  created_at: string;
  updated_at?: string;
}

export interface Feedback {
  id: string;
  name: string;
  email?: string;
  rating: number;
  message: string;
  created_at: string;
}

export interface EmailEnquiry {
  sender_name: string;
  sender_email: string;
  subject: string;
  message: string;
  enquiry_source?: string;
}

export const propertyService = {
  async getAllProperties() {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Property[];
  },

  async getPropertyById(id: string) {
    const { data, error } = await supabase
      .from('properties')
      .select('*')
      .eq('id', id)
      .maybeSingle();

    if (error) throw error;
    return data as Property | null;
  },

  async createProperty(property: Omit<Property, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('properties')
      .insert([property])
      .select()
      .single();

    if (error) throw error;
    return data as Property;
  },

  async updateProperty(id: string, updates: Partial<Property>) {
    const { data, error } = await supabase
      .from('properties')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    return data as Property;
  },

  async deleteProperty(id: string) {
    const { error } = await supabase
      .from('properties')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

export const feedbackService = {
  async submitFeedback(feedback: Omit<Feedback, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('feedback')
      .insert([feedback])
      .select()
      .single();

    if (error) throw error;
    return data as Feedback;
  },

  async getAllFeedback() {
    const { data, error } = await supabase
      .from('feedback')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Feedback[];
  },

  async deleteFeedback(id: string) {
    const { error } = await supabase
      .from('feedback')
      .delete()
      .eq('id', id);

    if (error) throw error;
  }
};

export const emailEnquiryService = {
  async submitEmailEnquiry(enquiry: EmailEnquiry) {
    const { data, error } = await supabase
      .from('email_enquiries')
      .insert([enquiry])
      .select()
      .single();

    if (error) throw error;
    return data;
  },

  async getAllEnquiries() {
    const { data, error } = await supabase
      .from('email_enquiries')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data;
  }
};
