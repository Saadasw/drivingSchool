import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useVisibility } from '@/contexts/VisibilityContext';
import { useToast } from '@/components/ui/use-toast';
import { Map, MessageSquare, Eye, EyeOff } from 'lucide-react';

export const VisibilityManager = () => {
  const { visibility, updateVisibility } = useVisibility();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    showMap: visibility.showMap,
    showContactForm: visibility.showContactForm
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateVisibility(formData);
    
    toast({
      title: 'Success',
      description: 'Visibility settings updated successfully!',
    });
  };

  const handleReset = () => {
    setFormData({
      showMap: visibility.showMap,
      showContactForm: visibility.showContactForm
    });
  };

  const handleToggle = (key: 'showMap' | 'showContactForm') => {
    setFormData(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Visibility Management</h2>
          <p className="text-gray-600">Control which sections are visible on the website</p>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-6 mb-8">
        <Card>
          <CardHeader className="text-center">
            <Map className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Map Section</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              {visibility.showMap ? (
                <Eye className="w-5 h-5 text-green-600" />
              ) : (
                <EyeOff className="w-5 h-5 text-red-600" />
              )}
              <span className="text-sm font-medium">
                {visibility.showMap ? 'Visible' : 'Hidden'}
              </span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <MessageSquare className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Contact Form</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div className="flex items-center justify-center gap-2">
              {visibility.showContactForm ? (
                <Eye className="w-5 h-5 text-green-600" />
              ) : (
                <EyeOff className="w-5 h-5 text-red-600" />
              )}
              <span className="text-sm font-medium">
                {visibility.showContactForm ? 'Visible' : 'Hidden'}
              </span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Visibility Settings</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center gap-2">
                    <Map className="w-4 h-4" />
                    Show Map Section
                  </Label>
                  <p className="text-sm text-gray-500">
                    Display the Google Maps iframe in the contact section
                  </p>
                </div>
                <Switch
                  checked={formData.showMap}
                  onCheckedChange={() => handleToggle('showMap')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    Show Contact Form
                  </Label>
                  <p className="text-sm text-gray-500">
                    Display the "Send us a Message" form in the contact section
                  </p>
                </div>
                <Switch
                  checked={formData.showContactForm}
                  onCheckedChange={() => handleToggle('showContactForm')}
                />
              </div>
            </div>

            <div className="flex gap-2 justify-end">
              <Button
                type="button"
                variant="outline"
                onClick={handleReset}
              >
                Reset
              </Button>
              <Button
                type="submit"
                className="flex items-center gap-2"
              >
                <Eye className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 How it works</h4>
        <p className="text-sm text-blue-700 mb-2">
          These visibility settings control which sections appear on the website's contact page.
        </p>
        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>Changes are saved automatically to your browser's local storage</li>
          <li>No database required - everything is stored locally</li>
          <li>Sections update immediately on the website</li>
          <li>Settings persist even after browser restart</li>
        </ul>
      </div>
    </div>
  );
};
