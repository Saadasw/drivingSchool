import React, { useEffect, useState } from 'react';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { supabase } from '@/lib/supabase';

interface FAQItem {
  id: string;
  question: string;
  answer: string;
  is_active: boolean;
}

const FAQ: React.FC = () => {
  const [faqs, setFaqs] = useState<FAQItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchFAQ = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log('🔍 FAQ: Fetching data...');
        const { data, error } = await supabase
          .from('faq')
          .select('*')
          .eq('is_active', true)
          .order('created_at', { ascending: true });
        
        console.log('🔍 FAQ: Response:', { data, error });
        
        if (error) throw error;
        console.log('🔍 FAQ: Setting items:', data?.length || 0);
        setFaqs(data || []);
      } catch (err: any) {
        console.error('🔍 FAQ: Error:', err);
        setError('Failed to load FAQ.');
      } finally {
        setLoading(false);
      }
    };
    fetchFAQ();
  }, []);

  return (
    <section id="faq" className="relative py-24 bg-gradient-to-br from-white via-indigo-50/30 to-purple-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-driving-blue/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-driving-purple/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-driving-blue/10 rounded-full mb-6">
            <span className="text-driving-blue font-semibold text-sm">❓ FAQ</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Frequently Asked
            <span className="bg-gradient-to-r from-driving-blue to-driving-purple bg-clip-text text-transparent block">
              Questions
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Find answers to common questions about our driving courses, requirements, and policies.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-driving-blue to-driving-purple mx-auto rounded-full mt-6"></div>
        </div>
        
        {loading ? (
          <div className="flex justify-center py-8">Loading...</div>
        ) : error ? (
          <div className="flex justify-center py-8 text-red-600">{error}</div>
        ) : faqs.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            <p>No FAQ items available at the moment.</p>
          </div>
        ) : (
          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-6">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.id} value={`item-${index}`} className="bg-white/90 backdrop-blur-sm border-0 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  <AccordionTrigger className="text-left hover:no-underline px-8 py-6 font-semibold text-lg text-gray-900 hover:text-driving-blue transition-colors">
                    <span>{faq.question}</span>
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-6 px-8 leading-relaxed">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        )}
        

      </div>
    </section>
  );
};

export default FAQ;