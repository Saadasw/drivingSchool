// Test website content table structure and data
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testWebsiteContent() {
  try {
    console.log('🔍 Testing website content table...');
    
    // Get all website content records
    const { data: contentData, error: contentError } = await supabase
      .from('website_content')
      .select('*')
      .order('section_name');
    
    if (contentError) {
      console.log('❌ Error fetching website content:', contentError.message);
      return;
    }
    
    console.log(`✅ Found ${contentData.length} website content records:`);
    console.log('📋 Table structure:');
    
    contentData.forEach((record, index) => {
      console.log(`\n${index + 1}. ${record.section_name}:`);
      console.log(`   ID: ${record.id}`);
      console.log(`   Content:`, record.content);
      console.log(`   Active: ${record.is_active}`);
      console.log(`   Created: ${record.created_at}`);
      console.log(`   Updated: ${record.updated_at}`);
    });
    
    // Test specific content types
    console.log('\n🔍 Testing specific content access:');
    
    // Test hero title
    const heroTitle = contentData.find(r => r.section_name === 'hero_title');
    if (heroTitle) {
      console.log('✅ Hero Title:', heroTitle.content);
    } else {
      console.log('❌ Hero Title not found');
    }
    
    // Test company name
    const companyName = contentData.find(r => r.section_name === 'company_name');
    if (companyName) {
      console.log('✅ Company Name:', companyName.content);
    } else {
      console.log('❌ Company Name not found');
    }
    
    // Test hero description
    const heroDesc = contentData.find(r => r.section_name === 'hero_description');
    if (heroDesc) {
      console.log('✅ Hero Description:', heroDesc.content);
    } else {
      console.log('❌ Hero Description not found');
    }
    
    // Test company domain
    const companyDomain = contentData.find(r => r.section_name === 'company_domain');
    if (companyDomain) {
      console.log('✅ Company Domain:', companyDomain.content);
    } else {
      console.log('❌ Company Domain not found');
    }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

// Run the test
testWebsiteContent();
