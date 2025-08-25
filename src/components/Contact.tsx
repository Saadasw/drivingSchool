import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Phone, Mail, MapPin, Clock, MessageCircle } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useVisibility } from '@/contexts/VisibilityContext';
import { useContactInfo } from '@/contexts/ContactInfoContext';

const Contact: React.FC = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { visibility } = useVisibility();
  const { contactInfo, isLoading } = useContactInfo();


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);
    try {
      const { error } = await supabase
        .from('contacts')
        .insert([
          {
            name: form.name,
            email: form.email,
            phone: form.phone,
            message: form.message,
            created_at: new Date().toISOString(),
          },
        ]);
      if (error) throw error;
      setSuccess('Your message has been sent!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (err: any) {
      setError(err.message || 'Failed to send message.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
                 <div className="text-center mb-16">
           <h2 className="text-4xl font-bold text-gray-900 mb-4">Get In Touch</h2>
           <p className="text-xl text-gray-600 max-w-2xl mx-auto mb-6">
             Ready to start your driving journey? Contact us today to book your lessons or ask any questions.
           </p>
           
           {/* Mobile WhatsApp Button - Prominent in contact section */}
           <div className="md:hidden">
             <a 
               href="https://wa.me/61481322734" 
               target="_blank" 
               rel="noopener noreferrer"
               className="inline-flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-8 py-4 rounded-xl shadow-lg transition-all duration-200 hover:scale-105 hover:shadow-xl text-lg font-semibold"
             >
               <MessageCircle className="h-6 w-6" />
               Start Chat on WhatsApp
             </a>
           </div>
         </div>
                 <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                     <div>
             {isLoading ? (
               <div className="text-center py-8">
                 <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
                 <p className="mt-4 text-gray-600">Loading contact information...</p>
               </div>
             ) : contactInfo ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mb-6 sm:mb-8">
                 {visibility.showPhone && (
                   <Card>
                     <CardContent className="p-6 text-center">
                       <Phone className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                       <h3 className="font-semibold mb-2">Phone</h3>
                       <p className="text-gray-600">{contactInfo.phone}</p>
                     </CardContent>
                   </Card>
                 )}
                 {visibility.showEmail && (
                   <Card>
                     <CardContent className="p-6 text-center">
                       <Mail className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                       <h3 className="font-semibold mb-2">Email</h3>
                       <p className="text-gray-600">{contactInfo.email}</p>
                     </CardContent>
                   </Card>
                 )}
                 {visibility.showAddress && (
                   <Card>
                     <CardContent className="p-6 text-center">
                       <MapPin className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                       <h3 className="font-semibold mb-2">Address</h3>
                       <p className="text-gray-600 whitespace-pre-line">{contactInfo.address}</p>
                     </CardContent>
                   </Card>
                 )}
                 {visibility.showHours && (
                   <Card>
                     <CardContent className="p-6 text-center">
                       <Clock className="h-8 w-8 text-blue-600 mx-auto mb-4" />
                       <h3 className="font-semibold mb-2">Hours</h3>
                       <p className="text-gray-600 whitespace-pre-line">{contactInfo.hours}</p>
                     </CardContent>
                   </Card>
                 )}
               </div>
             ) : (
               <div className="text-center py-8 text-gray-600">
                 <p>Contact information not available</p>
               </div>
             )}
           </div>
          <div>
            {visibility.showContactForm && (
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-4" onSubmit={handleSubmit}>
                                         <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                      />
                      <Input
                        placeholder="Your Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <Input
                      placeholder="Phone Number"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                    />
                    <Textarea
                      placeholder="Your Message"
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                    />
                    <Button
                      className="w-full bg-blue-600 hover:bg-blue-700"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                    {success && <p className="text-green-600 text-center mt-2">{success}</p>}
                    {error && <p className="text-red-600 text-center mt-2">{error}</p>}
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;