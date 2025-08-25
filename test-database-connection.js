// Test database connection and table structure
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Test 1: Check if we can connect
    const { data: testData, error: testError } = await supabase
      .from('contact_information')
      .select('*')
      .limit(1);
    
    if (testError) {
      console.log('❌ Error connecting to contact_information:', testError.message);
      
      // Check what tables exist
      const { data: tables, error: tablesError } = await supabase
        .rpc('get_tables');
      
      if (tablesError) {
        console.log('❌ Cannot get tables list:', tablesError.message);
      } else {
        console.log('📋 Available tables:', tables);
      }
    } else {
      console.log('✅ Successfully connected to contact_information table');
      console.log('📊 Data found:', testData);
    }
    
    // Test 2: Check visibility_settings table
    const { data: visData, error: visError } = await supabase
      .from('visibility_settings')
      .select('*')
      .limit(1);
    
    if (visError) {
      console.log('❌ Error connecting to visibility_settings:', visError.message);
    } else {
      console.log('✅ Successfully connected to visibility_settings table');
      console.log('📊 Data found:', visData);
    }
    
    // Test 3: Check website_content table
    const { data: contentData, error: contentError } = await supabase
      .from('website_content')
      .select('*')
      .limit(1);
    
    if (contentError) {
      console.log('❌ Error connecting to website_content:', contentError.message);
    } else {
      console.log('✅ Successfully connected to website_content table');
      console.log('📊 Data found:', contentData);
    }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

// Run the test
testDatabase();
