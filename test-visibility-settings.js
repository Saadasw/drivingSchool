// Test visibility settings table structure and data
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testVisibilitySettings() {
  try {
    console.log('🔍 Testing visibility settings table...');
    
    // Get all visibility settings
    const { data: visData, error: visError } = await supabase
      .from('visibility_settings')
      .select('*')
      .order('setting_name');
    
    if (visError) {
      console.log('❌ Error fetching visibility settings:', visError.message);
      return;
    }
    
    console.log(`✅ Found ${visData.length} visibility settings:`);
    console.log('📋 Current settings:');
    
    visData.forEach((setting, index) => {
      console.log(`\n${index + 1}. ${setting.setting_name}:`);
      console.log(`   ID: ${setting.id}`);
      console.log(`   Visible: ${setting.is_visible}`);
      console.log(`   Created: ${setting.created_at}`);
      console.log(`   Updated: ${setting.updated_at}`);
    });
    
    // Check if all required settings exist
    const requiredSettings = [
      'showContactForm',
      'showPhone', 
      'showEmail',
      'showAddress',
      'showHours',
      'showFooterPhone',
      'showFooterEmail',
      'showFooterAddress'
    ];
    
    console.log('\n🔍 Checking required settings:');
    requiredSettings.forEach(settingName => {
      const setting = visData.find(s => s.setting_name === settingName);
      if (setting) {
        console.log(`✅ ${settingName}: ${setting.is_visible}`);
      } else {
        console.log(`❌ ${settingName}: MISSING`);
      }
    });
    
    // Check if we need to add missing settings
    const missingSettings = requiredSettings.filter(
      required => !visData.find(s => s.setting_name === required)
    );
    
    if (missingSettings.length > 0) {
      console.log(`\n⚠️  Missing ${missingSettings.length} settings:`, missingSettings);
      console.log('💡 You may need to run the database setup script again');
    } else {
      console.log('\n🎉 All required visibility settings are present!');
    }
    
  } catch (error) {
    console.error('💥 Unexpected error:', error);
  }
}

// Run the test
testVisibilitySettings();
