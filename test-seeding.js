// Test script to run the seedData function directly
// Run this with: node test-seeding.js

import { seedData } from './src/lib/seedData.ts';

async function testSeeding() {
  console.log('🧪 Testing the seedData function...\n');
  
  try {
    const result = await seedData();
    
    if (result.success) {
      console.log('\n🎉 Seeding completed successfully!');
    } else {
      console.log('\n❌ Seeding failed:', result.error);
    }
  } catch (error) {
    console.log('\n💥 Seeding crashed:', error);
  }
}

testSeeding();
