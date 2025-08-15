// Detailed storage test to check bucket creation
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function detailedStorageTest() {
  console.log('🔍 Detailed Storage Test...\n');

  try {
    // Test 1: List all buckets
    console.log('📦 Test 1: Listing all storage buckets...');
    const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
    
    if (bucketsError) {
      console.log('❌ Error listing buckets:', bucketsError.message);
      console.log('Error details:', bucketsError);
    } else {
      console.log('✅ Successfully listed buckets');
      console.log('📋 Buckets found:', buckets?.length || 0);
      
      if (buckets && buckets.length > 0) {
        buckets.forEach((bucket, index) => {
          console.log(`   ${index + 1}. ${bucket.name} (${bucket.id})`);
          console.log(`      - Public: ${bucket.public}`);
          console.log(`      - File size limit: ${bucket.file_size_limit}`);
          console.log(`      - Allowed types: ${bucket.allowed_mime_types?.join(', ') || 'Any'}`);
        });
      } else {
        console.log('   No buckets found');
      }
    }

    // Test 2: Try to access gallery bucket specifically
    console.log('\n🖼️ Test 2: Testing gallery bucket access...');
    const { data: galleryFiles, error: galleryError } = await supabase.storage
      .from('gallery')
      .list();

    if (galleryError) {
      console.log('❌ Gallery bucket access error:', galleryError.message);
      console.log('Error details:', galleryError);
    } else {
      console.log('✅ Gallery bucket exists and is accessible!');
      console.log(`📁 Files in gallery: ${galleryFiles?.length || 0}`);
    }

    // Test 3: Try to create bucket via API (this might fail due to RLS)
    console.log('\n🔧 Test 3: Attempting to create bucket via API...');
    const { data: createData, error: createError } = await supabase.storage.createBucket('gallery-test', {
      public: true,
      allowedMimeTypes: ['image/jpeg', 'image/png'],
      fileSizeLimit: 5242880
    });

    if (createError) {
      console.log('❌ API bucket creation failed (expected):', createError.message);
      console.log('   This is normal - buckets should be created via SQL');
    } else {
      console.log('✅ API bucket creation succeeded (unexpected)');
    }

    // Test 4: Check if we can list files in any bucket
    console.log('\n📁 Test 4: Testing file operations...');
    if (buckets && buckets.length > 0) {
      const testBucket = buckets[0];
      console.log(`Testing with bucket: ${testBucket.name}`);
      
      const { data: files, error: filesError } = await supabase.storage
        .from(testBucket.name)
        .list();

      if (filesError) {
        console.log('❌ File listing error:', filesError.message);
      } else {
        console.log(`✅ File listing works in ${testBucket.name}`);
        console.log(`   Files: ${files?.length || 0}`);
      }
    }

    // Summary
    console.log('\n📋 SUMMARY:');
    console.log('='.repeat(50));
    
    const galleryExists = !galleryError;
    const hasBuckets = buckets && buckets.length > 0;
    
    if (galleryExists) {
      console.log('✅ Gallery bucket is working!');
      console.log('🎉 You can now test image uploads');
    } else if (hasBuckets) {
      console.log('⚠️ Gallery bucket not found, but other buckets exist');
      console.log('💡 Check if the SQL script ran successfully');
    } else {
      console.log('❌ No storage buckets found');
      console.log('💡 The SQL script may not have executed properly');
    }

    console.log('\n🔗 Next Steps:');
    if (galleryExists) {
      console.log('1. Go to http://localhost:8081/admin');
      console.log('2. Login with: admin123');
      console.log('3. Click Gallery tab');
      console.log('4. Try uploading an image');
    } else {
      console.log('1. Go to Supabase Dashboard');
      console.log('2. Check SQL Editor for any error messages');
      console.log('3. Re-run the storage-setup.sql script');
      console.log('4. Check Storage section in dashboard');
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

detailedStorageTest();
