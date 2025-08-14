// Quick test to check gallery and FAQ data
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://drfswdmnqvnknaacvbeo.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImRyZnN3ZG1ucXZua25hYWN2YmVvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTI3NzkwMTksImV4cCI6MjA2ODM1NTAxOX0.FefCksJz2TI-AEiPT7l8W8c_jL_q5lwKo6enDyvxAOE';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkGalleryAndFAQ() {
  console.log('🔍 Checking Gallery and FAQ data...\n');

  try {
    // Check Gallery data
    console.log('📸 Gallery Data:');
    const { data: galleryData, error: galleryError } = await supabase
      .from('gallery')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: false });

    if (galleryError) {
      console.log(`❌ Gallery error: ${galleryError.message}`);
    } else {
      console.log(`✅ Gallery: ${galleryData?.length || 0} items`);
      galleryData?.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.title} - ${item.image_url ? 'Has image' : 'No image'}`);
      });
    }

    console.log('\n❓ FAQ Data:');
    const { data: faqData, error: faqError } = await supabase
      .from('faq')
      .select('*')
      .eq('is_active', true)
      .order('created_at', { ascending: true });

    if (faqError) {
      console.log(`❌ FAQ error: ${faqError.message}`);
    } else {
      console.log(`✅ FAQ: ${faqData?.length || 0} items`);
      faqData?.forEach((item, index) => {
        console.log(`  ${index + 1}. ${item.question.substring(0, 50)}...`);
      });
    }

  } catch (error) {
    console.error('❌ Test failed:', error);
  }
}

checkGalleryAndFAQ();
