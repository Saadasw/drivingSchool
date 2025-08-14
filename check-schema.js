// Check database schema for FAQ and Gallery tables
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkSchema() {
  console.log('🔍 Checking database schema...\n');

  try {
    // Check Gallery table structure
    console.log('📸 Gallery Table Structure:');
    const { data: galleryData, error: galleryError } = await supabase
      .from('gallery')
      .select('*')
      .limit(1);

    if (galleryError) {
      console.log(`❌ Gallery error: ${galleryError.message}`);
    } else if (galleryData && galleryData.length > 0) {
      console.log('✅ Gallery fields:', Object.keys(galleryData[0]));
      console.log('Sample record:', galleryData[0]);
    }

    console.log('\n❓ FAQ Table Structure:');
    const { data: faqData, error: faqError } = await supabase
      .from('faq')
      .select('*')
      .limit(1);

    if (faqError) {
      console.log(`❌ FAQ error: ${faqError.message}`);
    } else if (faqData && faqData.length > 0) {
      console.log('✅ FAQ fields:', Object.keys(faqData[0]));
      console.log('Sample record:', faqData[0]);
    }

  } catch (error) {
    console.error('❌ Schema check failed:', error);
  }
}

checkSchema();
