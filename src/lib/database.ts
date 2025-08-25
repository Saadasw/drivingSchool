import { supabase } from './supabase';

// Types for database operations
export interface ContactInfo {
  id: string;
  phone: string;
  email: string;
  address: string;
  hours: string;
  created_at: string;
  updated_at: string;
}

export interface VisibilitySettings {
  id: string;
  setting_name: string;
  is_visible: boolean;
  created_at: string;
  updated_at: string;
}

export interface WebsiteContent {
  id: string;
  section_name: string;
  content: any;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Database service class
export class DatabaseService {
  // Contact Information Operations
  static async getContactInfo(): Promise<ContactInfo | null> {
    try {
      const { data, error } = await supabase
        .from('contact_information')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(1)
        .single();

      if (error) {
        console.error('Error fetching contact info:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getContactInfo:', error);
      return null;
    }
  }

  static async updateContactInfo(contactInfo: Partial<ContactInfo>): Promise<boolean> {
    try {
      // Get the first record to update
      const { data: existing } = await supabase
        .from('contact_information')
        .select('id')
        .limit(1)
        .single();

      if (existing) {
        // Update existing record
        const { error } = await supabase
          .from('contact_information')
          .update(contactInfo)
          .eq('id', existing.id);

        if (error) {
          console.error('Error updating contact info:', error);
          return false;
        }
      } else {
        // Create new record if none exists
        const { error } = await supabase
          .from('contact_information')
          .insert([contactInfo]);

        if (error) {
          console.error('Error creating contact info:', error);
          return false;
        }
      }

      return true;
    } catch (error) {
      console.error('Error in updateContactInfo:', error);
      return false;
    }
  }

  // Visibility Settings Operations
  static async getVisibilitySettings(): Promise<Record<string, boolean>> {
    try {
      const { data, error } = await supabase
        .from('visibility_settings')
        .select('setting_name, is_visible');

      if (error) {
        console.error('Error fetching visibility settings:', error);
        return {};
      }

      const settings: Record<string, boolean> = {};
      data.forEach(setting => {
        settings[setting.setting_name] = setting.is_visible;
      });

      return settings;
    } catch (error) {
      console.error('Error in getVisibilitySettings:', error);
      return {};
    }
  }

  static async updateVisibilitySettings(settings: Record<string, boolean>): Promise<boolean> {
    try {
      const updates = Object.entries(settings).map(([setting_name, is_visible]) => ({
        setting_name,
        is_visible
      }));

      const { error } = await supabase
        .from('visibility_settings')
        .upsert(updates, { onConflict: 'setting_name' });

      if (error) {
        console.error('Error updating visibility settings:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Error in updateVisibilitySettings:', error);
      return false;
    }
  }

  // Website Content Operations
  static async getWebsiteContent(sectionName: string): Promise<any> {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('content')
        .eq('section_name', sectionName)
        .eq('is_active', true)
        .single();

      if (error) {
        console.error(`Error fetching website content for ${sectionName}:`, error);
        return null;
      }

      return data?.content;
    } catch (error) {
      console.error(`Error in getWebsiteContent for ${sectionName}:`, error);
      return null;
    }
  }

  static async updateWebsiteContent(sectionName: string, content: any): Promise<boolean> {
    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({
          section_name: sectionName,
          content,
          is_active: true
        }, { onConflict: 'section_name' });

      if (error) {
        console.error(`Error updating website content for ${sectionName}:`, error);
        return false;
      }

      return true;
    } catch (error) {
      console.error(`Error in updateWebsiteContent for ${sectionName}:`, error);
      return false;
    }
  }

  // Real-time Subscriptions
  static subscribeToContactInfo(callback: (contactInfo: ContactInfo) => void) {
    return supabase
      .channel('contact_info_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'contact_information'
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            callback(payload.new as ContactInfo);
          }
        }
      )
      .subscribe();
  }

  static subscribeToVisibilitySettings(callback: (settings: Record<string, boolean>) => void) {
    return supabase
      .channel('visibility_settings_changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'visibility_settings'
        },
        async () => {
          // Fetch updated settings when changes occur
          const settings = await this.getVisibilitySettings();
          callback(settings);
        }
      )
      .subscribe();
  }

  static subscribeToWebsiteContent(sectionName: string, callback: (content: any) => void) {
    return supabase
      .channel(`website_content_${sectionName}`)
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'website_content',
          filter: `section_name=eq.${sectionName}`
        },
        (payload) => {
          if (payload.eventType === 'UPDATE' || payload.eventType === 'INSERT') {
            callback(payload.new.content);
          }
        }
      )
      .subscribe();
  }

  // Utility Methods
  static async initializeDatabase(): Promise<boolean> {
    try {
      // Check if contact info exists, if not create default
      const contactInfo = await this.getContactInfo();
      if (!contactInfo) {
        await this.updateContactInfo({
          phone: '0481 322 734',
          email: 'info@rawaadrivingschool.com',
          address: '123 George Street\nSydney, NSW 2000',
          hours: 'Mon-Fri: 8AM-6PM\nSat: 9AM-4PM'
        });
      }

      // Check if visibility settings exist, if not create default
      const visibilitySettings = await this.getVisibilitySettings();
      if (Object.keys(visibilitySettings).length === 0) {
        await this.updateVisibilitySettings({
          showContactForm: true,
          showPhone: true,
          showEmail: true,
          showAddress: true,
          showHours: true,
          showFooterPhone: true,
          showFooterEmail: true,
          showFooterAddress: true
        });
      }

      return true;
    } catch (error) {
      console.error('Error initializing database:', error);
      return false;
    }
  }

  static async resetToDefaults(): Promise<boolean> {
    try {
      // Reset contact info to defaults
      await this.updateContactInfo({
        phone: '0481 322 734',
        email: 'info@rawaadrivingschool.com',
        address: '123 George Street\nSydney, NSW 2000',
        hours: 'Mon-Fri: 8AM-6PM\nSat: 9AM-4PM'
      });

      // Reset visibility settings to defaults
      await this.updateVisibilitySettings({
        showContactForm: true,
        showPhone: true,
        showEmail: true,
        showAddress: true,
        showHours: true,
        showFooterPhone: true,
        showFooterEmail: true,
        showFooterAddress: true
      });

      return true;
    } catch (error) {
      console.error('Error resetting to defaults:', error);
      return false;
    }
  }
}

// Export the class directly since all methods are static
export const databaseService = DatabaseService;
