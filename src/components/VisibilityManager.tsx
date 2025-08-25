import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { useVisibility } from '@/contexts/VisibilityContext';
import { useToast } from '@/components/ui/use-toast';
import { MessageSquare, Eye, EyeOff, Phone, Mail, MapPin, Clock } from 'lucide-react';

export const VisibilityManager = () => {
  const { visibility, updateVisibility } = useVisibility();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    showContactForm: visibility.showContactForm,
    showPhone: visibility.showPhone,
    showEmail: visibility.showEmail,
    showAddress: visibility.showAddress,
    showHours: visibility.showHours,
    showFooterPhone: visibility.showFooterPhone,
    showFooterEmail: visibility.showFooterEmail,
    showFooterAddress: visibility.showFooterAddress
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
      showContactForm: visibility.showContactForm,
      showPhone: visibility.showPhone,
      showEmail: visibility.showEmail,
      showAddress: visibility.showAddress,
      showHours: visibility.showHours,
      showFooterPhone: visibility.showFooterPhone,
      showFooterEmail: visibility.showFooterEmail,
      showFooterAddress: visibility.showFooterAddress
    });
  };

  const handleToggle = (key: keyof typeof formData) => {
    setFormData(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <div>
          <h2 className="text-xl sm:text-2xl font-bold">Visibility Management</h2>
          <p className="text-gray-600 text-sm sm:text-base">Control which sections are visible on the website</p>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:gap-6 mb-6 sm:mb-8">
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

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    Show Phone Section
                  </Label>
                  <p className="text-sm text-gray-500">
                    Display the phone number information
                  </p>
                </div>
                <Switch
                  checked={formData.showPhone}
                  onCheckedChange={() => handleToggle('showPhone')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    Show Email Section
                  </Label>
                  <p className="text-sm text-gray-500">
                    Display the email address information
                  </p>
                </div>
                <Switch
                  checked={formData.showEmail}
                  onCheckedChange={() => handleToggle('showEmail')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center gap-2">
                    <MapPin className="w-4 h-4" />
                    Show Address Section
                  </Label>
                  <p className="text-sm text-gray-500">
                    Display the business address information
                  </p>
                </div>
                <Switch
                  checked={formData.showAddress}
                  onCheckedChange={() => handleToggle('showAddress')}
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base flex items-center gap-2">
                    <Clock className="w-4 h-4" />
                    Show Hours Section
                  </Label>
                  <p className="text-sm text-gray-500">
                    Display the business hours information
                  </p>
                </div>
                <Switch
                  checked={formData.showHours}
                  onCheckedChange={() => handleToggle('showHours')}
                />
              </div>

              {/* Footer Visibility Controls */}
              <div className="border-t pt-4 mt-4">
                <h5 className="font-medium text-gray-700 mb-3">Footer Contact Information</h5>
                
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <Phone className="w-4 h-4" />
                        Show Footer Phone
                      </Label>
                      <p className="text-sm text-gray-500">
                        Display phone number in the footer
                      </p>
                    </div>
                    <Switch
                      checked={formData.showFooterPhone}
                      onCheckedChange={() => handleToggle('showFooterPhone')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <Mail className="w-4 h-4" />
                        Show Footer Email
                      </Label>
                      <p className="text-sm text-gray-500">
                        Display email address in the footer
                      </p>
                    </div>
                    <Switch
                      checked={formData.showFooterEmail}
                      onCheckedChange={() => handleToggle('showFooterEmail')}
                    />
                  </div>

                  <div className="flex items-center justify-between">
                    <div className="space-y-0.5">
                      <Label className="text-base flex items-center gap-2">
                        <MapPin className="w-4 h-4" />
                        Show Footer Address
                      </Label>
                      <p className="text-sm text-gray-500">
                        Display business address in the footer
                      </p>
                    </div>
                    <Switch
                      checked={formData.showFooterAddress}
                      onCheckedChange={() => handleToggle('showFooterAddress')}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 justify-end">
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
