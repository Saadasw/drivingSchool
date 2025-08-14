import { supabase } from './supabase';

export const setupDatabase = async () => {
  try {
    console.log('Setting up database schema...');

    // Create courses table
    const { error: coursesError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'courses',
      table_sql: `
        CREATE TABLE IF NOT EXISTS courses (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          price DECIMAL(10,2) NOT NULL,
          duration TEXT,
          features TEXT[],
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (coursesError) {
      console.error('Error creating courses table:', coursesError);
    } else {
      console.log('Courses table created successfully');
    }

    // Create testimonials table
    const { error: testimonialsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'testimonials',
      table_sql: `
        CREATE TABLE IF NOT EXISTS testimonials (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          content TEXT NOT NULL,
          rating INTEGER DEFAULT 5,
          image_url TEXT,
          age INTEGER,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (testimonialsError) {
      console.error('Error creating testimonials table:', testimonialsError);
    } else {
      console.log('Testimonials table created successfully');
    }

    // Create FAQ table
    const { error: faqError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'faq',
      table_sql: `
        CREATE TABLE IF NOT EXISTS faq (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          question TEXT NOT NULL,
          answer TEXT NOT NULL,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (faqError) {
      console.error('Error creating FAQ table:', faqError);
    } else {
      console.log('FAQ table created successfully');
    }

    // Create gallery table
    const { error: galleryError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'gallery',
      table_sql: `
        CREATE TABLE IF NOT EXISTS gallery (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          title TEXT NOT NULL,
          description TEXT,
          image_url TEXT NOT NULL,
          is_active BOOLEAN DEFAULT true,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (galleryError) {
      console.error('Error creating gallery table:', galleryError);
    } else {
      console.log('Gallery table created successfully');
    }

    // Create website_content table
    const { error: contentError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'website_content',
      table_sql: `
        CREATE TABLE IF NOT EXISTS website_content (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          section TEXT NOT NULL,
          key TEXT NOT NULL,
          value TEXT,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
          UNIQUE(section, key)
        );
      `
    });

    if (contentError) {
      console.error('Error creating website_content table:', contentError);
    } else {
      console.log('Website content table created successfully');
    }

    // Create contacts table
    const { error: contactsError } = await supabase.rpc('create_table_if_not_exists', {
      table_name: 'contacts',
      table_sql: `
        CREATE TABLE IF NOT EXISTS contacts (
          id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
          name TEXT NOT NULL,
          email TEXT NOT NULL,
          phone TEXT,
          message TEXT NOT NULL,
          created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
        );
      `
    });

    if (contactsError) {
      console.error('Error creating contacts table:', contactsError);
    } else {
      console.log('Contacts table created successfully');
    }

    console.log('Database setup completed!');
    return { success: true };

  } catch (error) {
    console.error('Error setting up database:', error);
    return { success: false, error };
  }
};
