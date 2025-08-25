// Test basic Supabase connection
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

console.log('🔍 Testing basic Supabase connection...');

try {
  const supabase = createClient(supabaseUrl, supabaseKey);
  console.log('✅ Supabase client created successfully');
  
  // Test a simple query
  supabase
    .from('contact_information')
    .select('phone')
    .limit(1)
    .then(({ data, error }) => {
      if (error) {
        console.log('❌ Database query failed:', error.message);
      } else {
        console.log('✅ Database query successful:', data);
      }
    });
    
} catch (error) {
  console.error('💥 Error creating Supabase client:', error);
}
