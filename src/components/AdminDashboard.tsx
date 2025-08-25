import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Settings, Image, BookOpen, MessageSquare, HelpCircle, Mail, BarChart3, Eye, Shield, Phone } from 'lucide-react';
import { ContentEditor } from './ContentEditor';
import { GalleryManager } from './GalleryManager';
import { CourseManager } from './CourseManager';
import { TestimonialManager } from './TestimonialManager';
import { FAQManager } from './FAQManager';
import { MessageManager } from './MessageManager';
import { StatisticsManager } from './StatisticsManager';
import { VisibilityManager } from './VisibilityManager';
import { ChangePassword } from './ChangePassword';
import { ContactInfoManager } from './ContactInfoManager';

interface AdminDashboardProps {
  onLogout: () => void;
  onPasswordChange: (newPassword: string) => void;
  currentPassword: string;
}

export const AdminDashboard = ({ onLogout, onPasswordChange, currentPassword }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState('content');

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                  <div className="flex justify-between items-center py-4">
          <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          <div className="flex gap-2">
            <Button onClick={onLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <Card>
            <CardContent className="p-6">
                             <h2 className="text-xl font-semibold mb-2">Welcome to the Admin Dashboard!</h2>
               <p className="text-gray-600 mb-4">
                 Manage your driving school website content here. Use the tabs below to edit courses, testimonials, FAQ, and gallery items.
               </p>

            </CardContent>
          </Card>
        </div>
        
        <Tabs value={activeTab} onValueChange={setActiveTab}>
                     <TabsList className="grid w-full grid-cols-5 sm:grid-cols-8 lg:grid-cols-10 gap-1 sm:gap-2">
                         <TabsTrigger value="content" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <Settings className="w-3 h-3 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">Content</span>
             </TabsTrigger>
                         <TabsTrigger value="gallery" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <Image className="w-3 h-3 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">Gallery</span>
             </TabsTrigger>
             <TabsTrigger value="courses" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <BookOpen className="w-3 h-3 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">Courses</span>
             </TabsTrigger>
             <TabsTrigger value="testimonials" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <MessageSquare className="w-3 h-3 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">Reviews</span>
             </TabsTrigger>
             <TabsTrigger value="faq" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <HelpCircle className="w-3 h-3 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">FAQ</span>
             </TabsTrigger>
             <TabsTrigger value="messages" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <Mail className="w-3 h-3 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">Messages</span>
             </TabsTrigger>
             <TabsTrigger value="statistics" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <BarChart3 className="w-3 h-3 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">Statistics</span>
             </TabsTrigger>
             <TabsTrigger value="contact" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <Phone className="w-3 h-3 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">Contact</span>
             </TabsTrigger>
             <TabsTrigger value="visibility" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <Eye className="w-3 h-3 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">Visibility</span>
             </TabsTrigger>
             <TabsTrigger value="security" className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm">
               <Shield className="w-3 h-3 sm:w-4 sm:h-4" />
               <span className="hidden sm:inline">Security</span>
             </TabsTrigger>
          </TabsList>

          <TabsContent value="content" className="mt-6">
            <ContentEditor />
          </TabsContent>

          <TabsContent value="gallery" className="mt-6">
            <GalleryManager />
          </TabsContent>

          <TabsContent value="courses" className="mt-6">
            <CourseManager />
          </TabsContent>

          <TabsContent value="testimonials" className="mt-6">
            <TestimonialManager />
          </TabsContent>

          <TabsContent value="faq" className="mt-6">
            <FAQManager />
          </TabsContent>

          <TabsContent value="messages" className="mt-6">
            <MessageManager />
          </TabsContent>
          <TabsContent value="statistics" className="mt-6">
            <StatisticsManager />
          </TabsContent>
          <TabsContent value="contact" className="mt-6">
            <ContactInfoManager />
          </TabsContent>
          <TabsContent value="visibility" className="mt-6">
            <VisibilityManager />
          </TabsContent>
          <TabsContent value="security" className="mt-6">
            <ChangePassword onPasswordChange={onPasswordChange} currentPassword={currentPassword} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};