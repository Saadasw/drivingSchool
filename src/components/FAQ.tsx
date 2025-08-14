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
    <section id="faq" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about our driving courses, requirements, and policies.
          </p>
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
          <div className="max-w-3xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => (
                <AccordionItem key={faq.id} value={`item-${index}`} className="border rounded-lg px-6">
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
        )}
        

      </div>
    </section>
  );
};

export default FAQ;