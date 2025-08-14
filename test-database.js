// Test script to verify database connectivity and permissions
// Run this with: node test-database.js

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testDatabase() {
  console.log('🔍 Testing database connectivity and permissions...\n');

  try {
    // Test 1: Check if tables exist
    console.log('1️⃣ Testing table existence...');
    const tables = ['courses', 'testimonials', 'faq', 'gallery', 'website_content', 'contacts'];
    
    for (const table of tables) {
      try {
        const { data, error } = await supabase
          .from(table)
          .select('count')
          .limit(1);
        
        if (error) {
          console.log(`❌ Table '${table}' - Error: ${error.message}`);
        } else {
          console.log(`✅ Table '${table}' - Accessible`);
        }
      } catch (err) {
        console.log(`❌ Table '${table}' - Exception: ${err.message}`);
      }
    }

    console.log('\n2️⃣ Testing insert permissions...');
    
    // Test 2: Try to insert a test record
    const testData = {
      title: 'Test Course',
      description: 'Test description',
      price: 100,
      duration: '1 hour',
      features: ['test'],
      is_active: true
    };

    const { data: insertResult, error: insertError } = await supabase
      .from('courses')
      .insert(testData)
      .select();

    if (insertError) {
      console.log(`❌ Insert test failed: ${insertError.message}`);
    } else {
      console.log(`✅ Insert test successful: ${insertResult?.length || 0} records inserted`);
      
      // Clean up test data
      if (insertResult && insertResult.length > 0) {
        const { error: deleteError } = await supabase
          .from('courses')
          .delete()
          .eq('id', insertResult[0].id);
        
        if (deleteError) {
          console.log(`⚠️ Cleanup failed: ${deleteError.message}`);
        } else {
          console.log('✅ Test data cleaned up');
        }
      }
    }

    console.log('\n3️⃣ Testing current data count...');
    
    // Test 3: Count existing records
    for (const table of tables) {
      try {
        const { count, error } = await supabase
          .from(table)
          .select('*', { count: 'exact', head: true });
        
        if (error) {
          console.log(`❌ Count '${table}' - Error: ${error.message}`);
        } else {
          console.log(`📊 Table '${table}' - ${count || 0} records`);
        }
      } catch (err) {
        console.log(`❌ Count '${table}' - Exception: ${err.message}`);
      }
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testDatabase();
