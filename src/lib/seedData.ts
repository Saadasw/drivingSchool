import { supabase } from './supabase';

export const seedData = async () => {
  try {
    console.log('🚀 Starting to seed data...');
    console.log('📊 This will add sample data to all tables...');

    // Seed Courses
    const coursesData = [
      {
        title: 'Beginner Package',
        description: 'Perfect for first-time drivers. Learn the basics of driving with our experienced instructors.',
        price: 299,
        duration: '10 hours',
        features: [
          'Basic driving skills',
          'Road safety training',
          'Traffic rules education',
          'Practice in quiet areas',
          'Professional instructor'
        ],
        is_active: true
      },
      {
        title: 'Intensive Course',
        description: 'Fast-track your driving license with our intensive 5-day course.',
        price: 599,
        duration: '5 days',
        features: [
          'Comprehensive driving training',
          'Highway driving practice',
          'Parallel parking mastery',
          'Emergency procedures',
          'Test preparation',
          'Certificate upon completion'
        ],
        is_active: true
      },
      {
        title: 'Refresher Course',
        description: 'Brush up on your driving skills if you haven\'t driven for a while.',
        price: 199,
        duration: '5 hours',
        features: [
          'Skill assessment',
          'Confidence building',
          'Modern driving techniques',
          'Road safety updates',
          'Flexible scheduling'
        ],
        is_active: true
      }
    ];

    // Seed Testimonials
    const testimonialsData = [
      {
        name: 'Sarah Johnson',
        content: 'Amazing experience! The instructors were patient and professional. I passed my test on the first try!',
        rating: 5,
        image_url: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face',
        is_active: true
      },
      {
        name: 'Michael Chen',
        content: 'Great driving school with excellent instructors. The intensive course was perfect for my busy schedule.',
        rating: 5,
        image_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
        is_active: true
      },
      {
        name: 'Emma Davis',
        content: 'Very professional and patient instructors. I felt confident and safe throughout my lessons.',
        rating: 5,
        image_url: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
        is_active: true
      },
      {
        name: 'David Wilson',
        content: 'Excellent teaching methods and modern vehicles. Highly recommend for anyone learning to drive.',
        rating: 5,
        image_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
        is_active: true
      }
    ];

    // Seed FAQ
    const faqData = [
      {
        question: 'How long does it take to get a driving license?',
        answer: 'The time varies depending on your experience and the course you choose. Our intensive course can prepare you in 5 days, while regular lessons typically take 4-6 weeks.',
        is_active: true
      },
      {
        question: 'What documents do I need to start driving lessons?',
        answer: 'You\'ll need a valid learner\'s permit, proof of identity, and comfortable clothing and shoes for driving.',
        is_active: true
      },
      {
        question: 'Do you provide vehicles for the driving test?',
        answer: 'Yes, we provide our training vehicles for the driving test to ensure you\'re comfortable and familiar with the car.',
        is_active: true
      },
      {
        question: 'What is your pass rate?',
        answer: 'We have a 95% pass rate, which is well above the national average. Our instructors are highly qualified and experienced.',
        is_active: true
      },
      {
        question: 'Can I book lessons on weekends?',
        answer: 'Yes, we offer flexible scheduling including weekends and evenings to accommodate your busy lifestyle.',
        is_active: true
      }
    ];

    // Seed Gallery
    const galleryData = [
      {
        title: 'Modern Training Vehicle',
        description: 'Our latest training vehicle equipped with dual controls for safety',
        image_url: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=300&fit=crop',
        is_active: true
      },
      {
        title: 'Professional Instructor',
        description: 'Experienced instructor helping student with parallel parking',
        image_url: 'https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=400&h=300&fit=crop',
        is_active: true
      },
      {
        title: 'Classroom Training',
        description: 'Interactive classroom sessions covering road safety and traffic rules',
        image_url: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400&h=300&fit=crop',
        is_active: true
      },
      {
        title: 'Highway Practice',
        description: 'Students practicing highway driving under supervision',
        image_url: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=300&fit=crop',
        is_active: true
      }
    ];

    // Seed Website Content
    const contentData = [
      {
        section_name: 'hero_title',
        content: 'Learn to Drive with Confidence',
        is_active: true
      },
      {
        section_name: 'hero_description',
        content: 'Professional driving instruction with experienced instructors. Get your license faster with our proven teaching methods.',
        is_active: true
      },
      {
        section_name: 'hero_cta_primary',
        content: 'Start Learning Today',
        is_active: true
      },
      {
        section_name: 'hero_cta_secondary',
        content: 'View Our Packages',
        is_active: true
      },
      {
        section_name: 'courses_title',
        content: 'Our Driving Courses',
        is_active: true
      },
      {
        section_name: 'courses_description',
        content: 'Choose from our range of professional driving courses designed to meet your needs and schedule.',
        is_active: true
      },
      {
        section_name: 'contact_title',
        content: 'Get In Touch',
        is_active: true
      },
      {
        section_name: 'contact_description',
        content: 'Ready to start your driving journey? Contact us today to book your lessons or ask any questions.',
        is_active: true
      }
    ];

    // Insert courses
    console.log('📚 Inserting courses...');
    const { data: coursesResult, error: coursesError } = await supabase
      .from('courses')
      .insert(coursesData)
      .select();
    
    if (coursesError) {
      console.error('❌ Error inserting courses:', coursesError);
      throw new Error(`Failed to insert courses: ${coursesError.message}`);
    } else {
      console.log('✅ Courses inserted successfully:', coursesResult?.length || 0, 'items');
    }

    // Insert testimonials
    console.log('⭐ Inserting testimonials...');
    const { data: testimonialsResult, error: testimonialsError } = await supabase
      .from('testimonials')
      .insert(testimonialsData)
      .select();
    
    if (testimonialsError) {
      console.error('❌ Error inserting testimonials:', testimonialsError);
      throw new Error(`Failed to insert testimonials: ${testimonialsError.message}`);
    } else {
      console.log('✅ Testimonials inserted successfully:', testimonialsResult?.length || 0, 'items');
    }

    // Insert FAQ
    console.log('❓ Inserting FAQ...');
    const { data: faqResult, error: faqError } = await supabase
      .from('faq')
      .insert(faqData)
      .select();
    
    if (faqError) {
      console.error('❌ Error inserting FAQ:', faqError);
      throw new Error(`Failed to insert FAQ: ${faqError.message}`);
    } else {
      console.log('✅ FAQ inserted successfully:', faqResult?.length || 0, 'items');
    }

    // Insert gallery
    console.log('🖼️ Inserting gallery...');
    const { data: galleryResult, error: galleryError } = await supabase
      .from('gallery')
      .insert(galleryData)
      .select();
    
    if (galleryError) {
      console.error('❌ Error inserting gallery:', galleryError);
      throw new Error(`Failed to insert gallery: ${galleryError.message}`);
    } else {
      console.log('✅ Gallery inserted successfully:', galleryResult?.length || 0, 'items');
    }

    // Insert website content
    console.log('🌐 Inserting website content...');
    const { data: contentResult, error: contentError } = await supabase
      .from('website_content')
      .insert(contentData)
      .select();
    
    if (contentError) {
      console.error('❌ Error inserting website content:', contentError);
      throw new Error(`Failed to insert website content: ${contentError.message}`);
    } else {
      console.log('✅ Website content inserted successfully:', contentResult?.length || 0, 'items');
    }

    // Insert sample contact messages
    const contactMessagesData = [
      {
        name: 'John Smith',
        email: 'john.smith@email.com',
        phone: '0412 345 678',
        message: 'Hi, I\'m interested in booking driving lessons. I\'m a complete beginner and would like to know about your beginner package. What are your available times?',
        is_read: false,
        created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString() // 2 days ago
      },
      {
        name: 'Sarah Johnson',
        email: 'sarah.j@email.com',
        phone: '0423 456 789',
        message: 'I need to get my license quickly for a new job. Do you offer intensive courses? How long does it typically take?',
        is_read: true,
        response: 'Hi Sarah, yes we do offer intensive courses! Our 5-day intensive course is perfect for getting your license quickly. It includes comprehensive training and test preparation. Please call us at 0481 322 734 to book.',
        responded_at: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
        created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() // 3 days ago
      },
      {
        name: 'Michael Chen',
        email: 'michael.chen@email.com',
        message: 'What documents do I need to bring for my first lesson? Also, do you provide the car for the driving test?',
        is_read: false,
        created_at: new Date(Date.now() - 6 * 60 * 60 * 1000).toISOString() // 6 hours ago
      }
    ];

    console.log('📧 Inserting sample contact messages...');
    const { data: contactsResult, error: contactsError } = await supabase
      .from('contacts')
      .insert(contactMessagesData)
      .select();
    
    if (contactsError) {
      console.error('❌ Error inserting contact messages:', contactsError);
      throw new Error(`Failed to insert contact messages: ${contactsError.message}`);
    } else {
      console.log('✅ Sample contact messages inserted successfully:', contactsResult?.length || 0, 'items');
    }

    console.log('✅ Data seeding completed successfully!');
    console.log('📋 Summary of data added:');
    console.log('   - Courses: 3 items');
    console.log('   - Testimonials: 4 items');
    console.log('   - FAQ: 5 items');
    console.log('   - Gallery: 4 items');
    console.log('   - Website Content: 8 items');
    console.log('   - Contact Messages: 3 items');
    return { success: true };

  } catch (error) {
    console.error('Error seeding data:', error);
    return { success: false, error };
  }
};
