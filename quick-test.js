// Quick test for image upload system
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function quickTest() {
  console.log('🔍 Quick Status Check...\n');

  // Check gallery table
  const { data: gallery, error: galleryError } = await supabase
    .from('gallery')
    .select('*')
    .limit(1);

  console.log('📊 Gallery Table:', galleryError ? '❌ Error' : '✅ Working');
  if (!galleryError) {
    console.log(`   - Items: ${gallery?.length || 0}`);
  }

  // Check storage buckets
  const { data: buckets, error: bucketsError } = await supabase.storage.listBuckets();
  
  console.log('📦 Storage Buckets:', bucketsError ? '❌ Error' : '✅ Working');
  if (!bucketsError) {
    console.log(`   - Available: ${buckets?.length || 0} buckets`);
    const galleryBucket = buckets?.find(b => b.name === 'gallery');
    console.log(`   - Gallery bucket: ${galleryBucket ? '✅ Exists' : '❌ Missing'}`);
  }

  // Check if we can access gallery bucket
  if (buckets?.some(b => b.name === 'gallery')) {
    const { data: files, error: filesError } = await supabase.storage
      .from('gallery')
      .list();
    
    console.log('🔒 Gallery Access:', filesError ? '❌ Error' : '✅ Working');
    if (!filesError) {
      console.log(`   - Files: ${files?.length || 0}`);
    }
  }

  console.log('\n📋 CURRENT STATUS:');
  console.log('='.repeat(40));
  
  if (galleryError) {
    console.log('❌ Database setup needed');
  } else if (!buckets?.some(b => b.name === 'gallery')) {
    console.log('❌ Storage bucket needed');
    console.log('💡 Run storage-setup.sql in Supabase SQL Editor');
  } else {
    console.log('✅ System ready for testing!');
    console.log('🌐 Admin panel: http://localhost:8081/admin');
    console.log('🔑 Login: admin123');
  }

  console.log('\n🚀 NEXT STEPS:');
  if (!buckets?.some(b => b.name === 'gallery')) {
    console.log('1. Go to Supabase Dashboard');
    console.log('2. Open SQL Editor');
    console.log('3. Run storage-setup.sql');
    console.log('4. Test upload at /admin');
  } else {
    console.log('1. Open http://localhost:8081/admin');
    console.log('2. Login with: admin123');
    console.log('3. Click Gallery tab');
    console.log('4. Try uploading an image');
  }
}

quickTest();
