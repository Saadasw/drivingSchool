import React from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';

const FAQ: React.FC = () => {
  const faqs = [
    {
      question: "How do I register for driving lessons?",
      answer: "You can register online through our booking form, call us directly, or visit our office. We'll help you choose the right package and schedule your lessons."
    },
    {
      question: "What's the duration of each driving lesson?",
      answer: "Standard lessons are 2 hours long. This gives enough time for proper instruction and practice without fatigue. We also offer 1-hour sessions for specific skill practice."
    },
    {
      question: "Do you offer both manual and automatic car lessons?",
      answer: "Yes! We have a modern fleet of both manual and automatic vehicles. You can choose based on your preference and the type of license you want to obtain."
    },
    {
      question: "What are the requirements for taking the driving test?",
      answer: "You must be at least 18 years old, have a valid learner's permit, complete the required training hours, and pass both theory and practical assessments."
    },
    {
      question: "How many lessons do I need before taking the test?",
      answer: "This varies by individual, but most students need 20-40 hours of practice. Our instructors will assess your progress and recommend when you're ready for the test."
    },
    {
      question: "Can I reschedule or cancel my lessons?",
      answer: "Yes, you can reschedule or cancel lessons with at least 24 hours notice. Late cancellations may incur a fee as outlined in our terms and conditions."
    }
  ];

  return (
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our driving courses, requirements, and policies.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="border rounded-lg px-6">
                <AccordionTrigger className="text-left hover:no-underline">
                  <span className="font-medium">{faq.question}</span>
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 pb-4">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Still have questions?</p>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </section>
  );
};

export default FAQ;