import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { LogOut, Settings, Image, BookOpen, MessageSquare, HelpCircle, Mail, BarChart3, Eye } from 'lucide-react';
import { ContentEditor } from './ContentEditor';
import { GalleryManager } from './GalleryManager';
import { CourseManager } from './CourseManager';
import { TestimonialManager } from './TestimonialManager';
import { FAQManager } from './FAQManager';
import { MessageManager } from './MessageManager';
import { StatisticsManager } from './StatisticsManager';
import { VisibilityManager } from './VisibilityManager';

interface AdminDashboardProps {
  onLogout: () => void;
}

export const AdminDashboard = ({ onLogout }: AdminDashboardProps) => {
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
          <TabsList className="grid w-full grid-cols-8">
            <TabsTrigger value="content" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              Content
            </TabsTrigger>
            <TabsTrigger value="gallery" className="flex items-center gap-2">
              <Image className="w-4 h-4" />
              Gallery
            </TabsTrigger>
            <TabsTrigger value="courses" className="flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              Courses
            </TabsTrigger>
            <TabsTrigger value="testimonials" className="flex items-center gap-2">
              <MessageSquare className="w-4 h-4" />
              Reviews
            </TabsTrigger>
            <TabsTrigger value="faq" className="flex items-center gap-2">
              <HelpCircle className="w-4 h-4" />
              FAQ
            </TabsTrigger>
            <TabsTrigger value="messages" className="flex items-center gap-2">
              <Mail className="w-4 h-4" />
              Messages
            </TabsTrigger>
            <TabsTrigger value="statistics" className="flex items-center gap-2">
              <BarChart3 className="w-4 h-4" />
              Statistics
            </TabsTrigger>
            <TabsTrigger value="visibility" className="flex items-center gap-2">
              <Eye className="w-4 h-4" />
              Visibility
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
          <TabsContent value="visibility" className="mt-6">
            <VisibilityManager />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};