// Setup script for Supabase Storage
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function setupStorage() {
  try {
    console.log('🔧 Setting up Supabase Storage...');

    // List existing buckets
    const { data: buckets, error: listError } = await supabase.storage.listBuckets();
    
    if (listError) {
      console.error('❌ Error listing buckets:', listError);
      return;
    }

    console.log('📦 Existing buckets:', buckets?.map(b => b.name) || []);

    // Check if gallery bucket exists
    const galleryBucketExists = buckets?.some(bucket => bucket.name === 'gallery');
    
    if (!galleryBucketExists) {
      console.log('🖼️ Creating gallery bucket...');
      
      const { error: createError } = await supabase.storage.createBucket('gallery', {
        public: true,
        allowedMimeTypes: ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
        fileSizeLimit: 5242880 // 5MB
      });

      if (createError) {
        console.error('❌ Error creating gallery bucket:', createError);
        return;
      }
      
      console.log('✅ Gallery bucket created successfully');
    } else {
      console.log('✅ Gallery bucket already exists');
    }

    // Test bucket access
    console.log('🧪 Testing bucket access...');
    const { data: testFiles, error: testError } = await supabase.storage
      .from('gallery')
      .list();

    if (testError) {
      console.error('❌ Error testing bucket access:', testError);
    } else {
      console.log('✅ Bucket access working correctly');
      console.log('📁 Files in bucket:', testFiles?.length || 0);
    }

    console.log('🎉 Storage setup completed successfully!');
    console.log('\n📋 Next steps:');
    console.log('1. Go to your admin panel at /admin');
    console.log('2. Navigate to the Gallery tab');
    console.log('3. Click "Add Image" to test file uploads');
    console.log('4. You can drag & drop images or click browse to select files');

  } catch (error) {
    console.error('❌ Storage setup failed:', error);
  }
}

setupStorage();
