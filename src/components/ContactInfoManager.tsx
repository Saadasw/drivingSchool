import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Phone, Mail, MapPin, Clock, Save, Eye, EyeOff } from 'lucide-react';
import { useVisibility } from '@/contexts/VisibilityContext';
import { useContactInfo } from '@/contexts/ContactInfoContext';

interface ContactInfo {
  phone: string;
  email: string;
  address: string;
  hours: string;
}

export const ContactInfoManager = () => {
  const { visibility, updateVisibility } = useVisibility();
  const { contactInfo, updateContactInfo, isLoading, resetToDefaults } = useContactInfo();
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  // Local state for editing
  const [editForm, setEditForm] = useState({
    phone: '',
    email: '',
    address: '',
    hours: ''
  });

  // Initialize edit form when contactInfo changes
  useEffect(() => {
    if (contactInfo) {
      setEditForm({
        phone: contactInfo.phone,
        email: contactInfo.email,
        address: contactInfo.address,
        hours: contactInfo.hours
      });
    }
  }, [contactInfo]);

  const handleSave = async () => {
    setIsSaving(true);
    
    try {
      const success = await updateContactInfo(editForm);
      if (success) {
        setIsEditing(false);
      } else {
        // Show error message or handle failure
        console.error('Failed to save contact information');
      }
    } catch (error) {
      console.error('Error saving contact information:', error);
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    // Reset edit form to current contact info
    if (contactInfo) {
      setEditForm({
        phone: contactInfo.phone,
        email: contactInfo.email,
        address: contactInfo.address,
        hours: contactInfo.hours
      });
    }
    setIsEditing(false);
  };

  const handleVisibilityToggle = (key: keyof typeof visibility) => {
    updateVisibility({ [key]: !visibility[key] });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <h3 className="text-lg font-semibold">Contact Information Management</h3>
                 <div className="flex flex-col sm:flex-row gap-2">
           {!isEditing ? (
             <>
               <Button onClick={() => setIsEditing(true)} variant="outline" disabled={isLoading}>
                 Edit Contact Info
               </Button>
               <Button onClick={resetToDefaults} variant="outline" disabled={isLoading}>
                 Reset to Defaults
               </Button>
             </>
           ) : (
             <>
               <Button onClick={handleCancel} variant="outline">
                 Cancel
               </Button>
               <Button onClick={handleSave} disabled={isSaving}>
                 {isSaving ? 'Saving...' : 'Save Changes'}
               </Button>
             </>
           )}
         </div>
      </div>

      {/* Contact Information Editor */}
      {isEditing && (
        <Card>
          <CardHeader>
            <CardTitle>Edit Contact Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="phone">Phone Number</Label>
                                 <Input
                   id="phone"
                   value={editForm.phone}
                   onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
                   placeholder="Enter phone number"
                 />
               </div>
               <div className="space-y-2">
                 <Label htmlFor="email">Email Address</Label>
                 <Input
                   id="email"
                   value={editForm.email}
                   onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                   placeholder="Enter email address"
                 />
               </div>
             </div>
             <div className="space-y-2">
               <Label htmlFor="email">Address</Label>
               <Textarea
                 id="address"
                 value={editForm.address}
                 onChange={(e) => setEditForm({ ...editForm, address: e.target.value })}
                 placeholder="Enter address"
                 rows={3}
               />
             </div>
             <div className="space-y-2">
               <Label htmlFor="hours">Business Hours</Label>
               <Textarea
                 id="hours"
                   value={editForm.hours}
                   onChange={(e) => setEditForm({ ...editForm, hours: e.target.value })}
                   placeholder="Enter business hours"
                   rows={3}
               />
            </div>
          </CardContent>
        </Card>
      )}

      {/* Visibility Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Section Visibility Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Phone Section</p>
                  <p className="text-sm text-gray-500">Show/hide phone information</p>
                </div>
              </div>
              <Switch
                checked={visibility.showPhone}
                onCheckedChange={() => handleVisibilityToggle('showPhone')}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Email Section</p>
                  <p className="text-sm text-gray-500">Show/hide email information</p>
                </div>
              </div>
              <Switch
                checked={visibility.showEmail}
                onCheckedChange={() => handleVisibilityToggle('showEmail')}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Address Section</p>
                  <p className="text-sm text-gray-500">Show/hide address information</p>
                </div>
              </div>
              <Switch
                checked={visibility.showAddress}
                onCheckedChange={() => handleVisibilityToggle('showAddress')}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Clock className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Hours Section</p>
                  <p className="text-sm text-gray-500">Show/hide business hours</p>
                </div>
              </div>
              <Switch
                checked={visibility.showHours}
                onCheckedChange={() => handleVisibilityToggle('showHours')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Footer Visibility Controls */}
      <Card>
        <CardHeader>
          <CardTitle>Footer Visibility Controls</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Footer Phone</p>
                  <p className="text-sm text-gray-500">Show/hide phone in footer</p>
                </div>
              </div>
              <Switch
                checked={visibility.showFooterPhone}
                onCheckedChange={() => handleVisibilityToggle('showFooterPhone')}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Footer Email</p>
                  <p className="text-sm text-gray-500">Show/hide email in footer</p>
                </div>
              </div>
              <Switch
                checked={visibility.showFooterEmail}
                onCheckedChange={() => handleVisibilityToggle('showFooterEmail')}
              />
            </div>

            <div className="flex items-center justify-between p-4 border rounded-lg">
              <div className="flex items-center space-x-3">
                <MapPin className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Footer Address</p>
                  <p className="text-sm text-gray-500">Show/hide address in footer</p>
                </div>
              </div>
              <Switch
                checked={visibility.showFooterAddress}
                onCheckedChange={() => handleVisibilityToggle('showFooterAddress')}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Preview */}
      <Card>
        <CardHeader>
          <CardTitle>Preview</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
            {visibility.showPhone && (
              <Card>
                <CardContent className="p-4 sm:p-6 text-center">
                  <Phone className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Phone</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{contactInfo.phone}</p>
                </CardContent>
              </Card>
            )}

            {visibility.showEmail && (
              <Card>
                <CardContent className="p-4 sm:p-6 text-center">
                  <Mail className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Email</h3>
                  <p className="text-gray-600 text-sm sm:text-base">{contactInfo.email}</p>
                </CardContent>
              </Card>
            )}

            {visibility.showAddress && (
              <Card>
                <CardContent className="p-4 sm:p-6 text-center">
                  <MapPin className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Address</h3>
                  <p className="text-gray-600 text-sm sm:text-base whitespace-pre-line">{contactInfo.address}</p>
                </CardContent>
              </Card>
            )}

            {visibility.showHours && (
              <Card>
                <CardContent className="p-4 sm:p-6 text-center">
                  <Clock className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600 mx-auto mb-3 sm:mb-4" />
                  <h3 className="font-semibold mb-2 text-sm sm:text-base">Hours</h3>
                  <p className="text-gray-600 text-sm sm:text-base whitespace-pre-line">{contactInfo.hours}</p>
                </CardContent>
              </Card>
            )}

            {!visibility.showPhone && !visibility.showEmail && !visibility.showAddress && !visibility.showHours && (
              <div className="col-span-1 sm:col-span-2 text-center py-6 sm:py-8 text-gray-500 text-sm sm:text-base">
                All contact sections are currently hidden. Use the visibility controls above to show them.
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
