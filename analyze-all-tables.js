// Comprehensive database table analysis
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function analyzeAllTables() {
  try {
    console.log('🔍 COMPREHENSIVE DATABASE ANALYSIS');
    console.log('=====================================\n');
    
    // 1. Analyze contact_information table
    console.log('📋 1. CONTACT_INFORMATION TABLE');
    console.log('--------------------------------');
    const { data: contactData, error: contactError } = await supabase
      .from('contact_information')
      .select('*');
    
    if (contactError) {
      console.log('❌ Error:', contactError.message);
    } else {
      console.log(`✅ Records found: ${contactData.length}`);
      if (contactData.length > 0) {
        console.log('📊 Sample data:');
        console.log(JSON.stringify(contactData[0], null, 2));
        
        // Check required fields
        const requiredFields = ['phone', 'email', 'address', 'hours'];
        requiredFields.forEach(field => {
          if (contactData[0][field]) {
            console.log(`✅ ${field}: ${contactData[0][field]}`);
          } else {
            console.log(`❌ ${field}: MISSING`);
          }
        });
      }
    }
    
    console.log('\n');
    
    // 2. Analyze visibility_settings table
    console.log('📋 2. VISIBILITY_SETTINGS TABLE');
    console.log('--------------------------------');
    const { data: visibilityData, error: visibilityError } = await supabase
      .from('visibility_settings')
      .select('*')
      .order('setting_name');
    
    if (visibilityError) {
      console.log('❌ Error:', visibilityError.message);
    } else {
      console.log(`✅ Records found: ${visibilityData.length}`);
      
      // Expected settings
      const expectedSettings = [
        'showContactForm', 'showPhone', 'showEmail', 'showAddress', 'showHours',
        'showFooterPhone', 'showFooterEmail', 'showFooterAddress'
      ];
      
      console.log('\n🔍 Checking expected settings:');
      expectedSettings.forEach(expected => {
        const found = visibilityData.find(s => s.setting_name === expected);
        if (found) {
          console.log(`✅ ${expected}: ${found.is_visible}`);
        } else {
          console.log(`❌ ${expected}: MISSING`);
        }
      });
      
      if (visibilityData.length > 0) {
        console.log('\n📊 All visibility settings:');
        visibilityData.forEach(setting => {
          console.log(`   ${setting.setting_name}: ${setting.is_visible}`);
        });
      }
    }
    
    console.log('\n');
    
    // 3. Analyze website_content table
    console.log('📋 3. WEBSITE_CONTENT TABLE');
    console.log('-----------------------------');
    const { data: contentData, error: contentError } = await supabase
      .from('website_content')
      .select('*')
      .order('section_name');
    
    if (contentError) {
      console.log('❌ Error:', contentError.message);
    } else {
      console.log(`✅ Records found: ${contentData.length}`);
      
      // Expected content
      const expectedContent = [
        'hero_title', 'hero_description', 'company_name', 'company_domain'
      ];
      
      console.log('\n🔍 Checking expected content:');
      expectedContent.forEach(expected => {
        const found = contentData.find(c => c.section_name === expected);
        if (found) {
          console.log(`✅ ${expected}: ${JSON.stringify(found.content)}`);
        } else {
          console.log(`❌ ${expected}: MISSING`);
        }
      });
      
      if (contentData.length > 0) {
        console.log('\n📊 All website content:');
        contentData.forEach(content => {
          console.log(`   ${content.section_name}: ${JSON.stringify(content.content)}`);
        });
      }
    }
    
    console.log('\n');
    
    // 4. Check for other tables that might exist
    console.log('📋 4. CHECKING FOR OTHER TABLES');
    console.log('--------------------------------');
    
    // Try to access other tables that might exist
    const otherTables = ['contacts', 'courses', 'testimonials', 'faq', 'gallery'];
    
    for (const tableName of otherTables) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select('*')
          .limit(1);
        
        if (error) {
          console.log(`❌ ${tableName}: ${error.message}`);
        } else {
          console.log(`✅ ${tableName}: Table exists with ${data.length} records`);
        }
      } catch (err) {
        console.log(`❌ ${tableName}: Table does not exist`);
      }
    }
    
    console.log('\n');
    
    // 5. Summary and recommendations
    console.log('📋 5. ANALYSIS SUMMARY & RECOMMENDATIONS');
    console.log('------------------------------------------');
    
    // Count missing data
    const missingVisibility = expectedSettings.filter(expected => 
      !visibilityData?.find(s => s.setting_name === expected)
    );
    
    const missingContent = expectedContent.filter(expected => 
      !contentData?.find(c => c.section_name === expected)
    );
    
    if (missingVisibility.length > 0) {
      console.log(`⚠️  Missing visibility settings: ${missingVisibility.length}`);
      missingVisibility.forEach(setting => console.log(`   - ${setting}`));
    }
    
    if (missingContent.length > 0) {
      console.log(`⚠️  Missing website content: ${missingContent.length}`);
      missingContent.forEach(content => console.log(`   - ${content}`));
    }
    
    if (missingVisibility.length === 0 && missingContent.length === 0) {
      console.log('🎉 All required data is present! Database is consistent.');
    } else {
      console.log('\n💡 RECOMMENDATION: Run the fix-data-inconsistency.sql script to resolve missing data.');
    }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

// Run the analysis
analyzeAllTables();
