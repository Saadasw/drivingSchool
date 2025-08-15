// Test script for Image Upload System
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testUploadSystem() {
  console.log('🧪 Testing Image Upload System...\n');

  try {
    // Test 1: Check if gallery table exists
    console.log('📊 Test 1: Checking gallery table...');
    const { data: galleryData, error: galleryError } = await supabase
      .from('gallery')
      .select('*')
      .limit(1);

    if (galleryError) {
      console.log('❌ Gallery table error:', galleryError.message);
      console.log('💡 Solution: Run the database-setup.sql script in Supabase SQL Editor');
    } else {
      console.log('✅ Gallery table exists and is accessible');
      console.log(`📸 Current gallery items: ${galleryData?.length || 0}`);
    }

    // Test 2: Check storage buckets
    console.log('\n📦 Test 2: Checking storage buckets...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.log('❌ Storage buckets error:', bucketsError.message);
      console.log('💡 Solution: Run the storage-setup.sql script in Supabase SQL Editor');
    } else {
      console.log('✅ Storage buckets accessible');
      console.log('📦 Available buckets:', buckets?.map(b => b.name) || []);
      
      const galleryBucket = buckets?.find(b => b.name === 'gallery');
      if (galleryBucket) {
        console.log('✅ Gallery bucket exists');
        console.log('📋 Bucket details:', {
          public: galleryBucket.public,
          fileSizeLimit: galleryBucket.file_size_limit,
          allowedMimeTypes: galleryBucket.allowed_mime_types
        });
      } else {
        console.log('❌ Gallery bucket not found');
        console.log('💡 Solution: Run the storage-setup.sql script in Supabase SQL Editor');
      }
    }

    // Test 3: Check storage policies
    console.log('\n🔒 Test 3: Testing storage access...');
    if (buckets?.some(b => b.name === 'gallery')) {
      const { data: files, error: filesError } = await supabase.storage
        .from('gallery')
        .list();

      if (filesError) {
        console.log('❌ Storage access error:', filesError.message);
        console.log('💡 Solution: Check storage policies in Supabase dashboard');
      } else {
        console.log('✅ Storage access working');
        console.log(`📁 Files in gallery bucket: ${files?.length || 0}`);
      }
    }

    // Test 4: Check if components are properly imported
    console.log('\n🔧 Test 4: Checking component imports...');
    try {
      const fs = await import('fs');
      const path = await import('path');
      
      const componentsToCheck = [
        'src/components/GalleryManager.tsx',
        'src/lib/setupStorage.ts',
        'src/components/ui/progress.tsx'
      ];

      for (const component of componentsToCheck) {
        if (fs.existsSync(component)) {
          console.log(`✅ ${component} exists`);
        } else {
          console.log(`❌ ${component} missing`);
        }
      }
    } catch (error) {
      console.log('⚠️ Could not check component files');
    }

    // Test 5: Check package dependencies
    console.log('\n📦 Test 5: Checking dependencies...');
    try {
      const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
      const requiredDeps = ['@supabase/supabase-js'];
      
      for (const dep of requiredDeps) {
        if (packageJson.dependencies[dep]) {
          console.log(`✅ ${dep} is installed`);
        } else {
          console.log(`❌ ${dep} is missing`);
        }
      }
    } catch (error) {
      console.log('⚠️ Could not check package.json');
    }

    // Summary and next steps
    console.log('\n📋 SUMMARY & NEXT STEPS:');
    console.log('='.repeat(50));
    
    if (galleryError || bucketsError) {
      console.log('❌ SETUP REQUIRED:');
      console.log('1. Go to your Supabase dashboard');
      console.log('2. Open the SQL Editor');
      console.log('3. Run the database-setup.sql script');
      console.log('4. Run the storage-setup.sql script');
      console.log('5. Test the admin panel at /admin');
    } else {
      console.log('✅ SYSTEM READY:');
      console.log('1. Start the development server: npm run dev');
      console.log('2. Go to /admin and login with: admin123');
      console.log('3. Click the Gallery tab');
      console.log('4. Try uploading an image');
    }

    console.log('\n🔗 Useful Links:');
    console.log('- Supabase Dashboard: https://supabase.com/dashboard');
    console.log('- Project URL: https://drfswdmnqvnknaacvbeo.supabase.co');
    console.log('- Local Admin Panel: http://localhost:5173/admin');

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

testUploadSystem();
