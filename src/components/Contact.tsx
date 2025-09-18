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
    <section id="contact" className="relative py-24 bg-gradient-to-br from-gray-50 via-green-50/30 to-blue-50/30 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-driving-green/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-driving-blue/5 rounded-full blur-3xl"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-20">
          <div className="inline-flex items-center px-4 py-2 bg-driving-green/10 rounded-full mb-6">
            <span className="text-driving-green font-semibold text-sm">📞 Get In Touch</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Get In
            <span className="bg-gradient-to-r from-driving-green to-driving-blue bg-clip-text text-transparent block">
              Touch
            </span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed mb-8">
            Ready to start your driving journey? Contact us today to book your lessons or ask any questions.
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-driving-green to-driving-blue mx-auto rounded-full"></div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            {isLoading ? (
              <div className="text-center py-8">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-driving-blue mx-auto"></div>
                <p className="mt-4 text-gray-600">Loading contact information...</p>
              </div>
            ) : contactInfo ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {visibility.showPhone && (
                  <Card className="group bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <CardContent className="p-8 text-center">
                      <div className="bg-gradient-to-br from-driving-blue to-driving-blue-light rounded-2xl p-4 w-16 h-16 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <Phone className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Phone</h3>
                      <p className="text-gray-600 font-medium">{contactInfo.phone}</p>
                    </CardContent>
                  </Card>
                )}
                {visibility.showEmail && (
                  <Card className="group bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105">
                    <CardContent className="p-8 text-center">
                      <div className="bg-gradient-to-br from-driving-orange to-driving-orange-light rounded-2xl p-4 w-16 h-16 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Email</h3>
                      <p className="text-gray-600 font-medium">{contactInfo.email}</p>
                    </CardContent>
                  </Card>
                )}
                {visibility.showAddress && (
                  <Card className="group bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 sm:col-span-2">
                    <CardContent className="p-8 text-center">
                      <div className="bg-gradient-to-br from-driving-purple to-driving-purple-light rounded-2xl p-4 w-16 h-16 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <MapPin className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Address</h3>
                      <p className="text-gray-600 font-medium whitespace-pre-line">{contactInfo.address}</p>
                    </CardContent>
                  </Card>
                )}
                {visibility.showHours && (
                  <Card className="group bg-white/90 backdrop-blur-sm border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 sm:col-span-2">
                    <CardContent className="p-8 text-center">
                      <div className="bg-gradient-to-br from-driving-green to-driving-green-light rounded-2xl p-4 w-16 h-16 mx-auto mb-4 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                        <Clock className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2 text-lg">Hours</h3>
                      <p className="text-gray-600 font-medium whitespace-pre-line">{contactInfo.hours}</p>
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
              <Card className="bg-white/90 backdrop-blur-sm border-0 shadow-2xl">
                <CardHeader className="pb-6">
                  <CardTitle className="text-2xl font-bold text-gray-900 text-center">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-200 focus:border-driving-blue rounded-xl px-4 py-3"
                      />
                      <Input
                        placeholder="Your Email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="border-2 border-gray-200 focus:border-driving-blue rounded-xl px-4 py-3"
                      />
                    </div>
                    <Input
                      placeholder="Phone Number"
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      className="border-2 border-gray-200 focus:border-driving-blue rounded-xl px-4 py-3"
                    />
                    <Textarea
                      placeholder="Your Message"
                      rows={4}
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      className="border-2 border-gray-200 focus:border-driving-blue rounded-xl px-4 py-3"
                    />
                    <Button
                      className="w-full bg-gradient-to-r from-driving-blue to-driving-orange hover:from-driving-blue-light hover:to-driving-orange-light text-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 font-semibold py-3 rounded-xl"
                      type="submit"
                      disabled={loading}
                    >
                      {loading ? 'Sending...' : 'Send Message'}
                    </Button>
                    {success && <p className="text-driving-green text-center mt-2 font-medium">{success}</p>}
                    {error && <p className="text-red-600 text-center mt-2 font-medium">{error}</p>}
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