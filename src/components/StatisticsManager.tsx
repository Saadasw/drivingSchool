import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useStatistics } from '@/contexts/StatisticsContext';
import { useToast } from '@/components/ui/use-toast';
import { Users, Target, Clock, Save } from 'lucide-react';

export const StatisticsManager = () => {
  const { statistics, updateStatistics } = useStatistics();
  const { toast } = useToast();
  
  const [formData, setFormData] = useState({
    happyStudents: statistics.happyStudents,
    passRate: statistics.passRate,
    yearsExperience: statistics.yearsExperience,
    languagesSupported: statistics.languagesSupported
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    updateStatistics(formData);
    
    toast({
      title: 'Success',
      description: 'Statistics updated successfully!',
    });
  };

  const handleReset = () => {
    setFormData({
      happyStudents: statistics.happyStudents,
      passRate: statistics.passRate,
      yearsExperience: statistics.yearsExperience,
      languagesSupported: statistics.languagesSupported
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Statistics Management</h2>
          <p className="text-gray-600">Update the statistics displayed on the website</p>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <Card>
          <CardHeader className="text-center">
            <Users className="h-8 w-8 text-blue-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Current Statistics</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div>
              <div className="text-2xl font-bold text-blue-600">{statistics.happyStudents}</div>
              <div className="text-sm text-gray-500">Happy Students</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Target className="h-8 w-8 text-green-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Current Statistics</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div>
              <div className="text-2xl font-bold text-green-600">{statistics.passRate}</div>
              <div className="text-sm text-gray-500">Pass Rate</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <Clock className="h-8 w-8 text-purple-600 mx-auto mb-2" />
            <CardTitle className="text-lg">Current Statistics</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div>
              <div className="text-2xl font-bold text-purple-600">{statistics.yearsExperience}</div>
              <div className="text-sm text-gray-500">Years Experience</div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="text-center">
            <div className="h-8 w-8 text-orange-600 mx-auto mb-2 flex items-center justify-center">
              <span className="text-2xl">🌐</span>
            </div>
            <CardTitle className="text-lg">Current Statistics</CardTitle>
          </CardHeader>
          <CardContent className="text-center space-y-2">
            <div>
              <div className="text-lg font-bold text-orange-600">{statistics.languagesSupported}</div>
              <div className="text-sm text-gray-500">Languages Supported</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Edit Statistics</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <Label htmlFor="happyStudents" className="flex items-center gap-2">
                  <Users className="w-4 h-4" />
                  Happy Students
                </Label>
                <Input
                  id="happyStudents"
                  value={formData.happyStudents}
                  onChange={(e) => setFormData({ ...formData, happyStudents: e.target.value })}
                  placeholder="e.g., 500+"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Example: 500+, 1000+, etc.</p>
              </div>

              <div>
                <Label htmlFor="passRate" className="flex items-center gap-2">
                  <Target className="w-4 h-4" />
                  Pass Rate
                </Label>
                <Input
                  id="passRate"
                  value={formData.passRate}
                  onChange={(e) => setFormData({ ...formData, passRate: e.target.value })}
                  placeholder="e.g., 95%"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Example: 95%, 98%, etc.</p>
              </div>

              <div>
                <Label htmlFor="yearsExperience" className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  Years Experience
                </Label>
                <Input
                  id="yearsExperience"
                  value={formData.yearsExperience}
                  onChange={(e) => setFormData({ ...formData, yearsExperience: e.target.value })}
                  placeholder="e.g., 10+"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Example: 10+, 15+, etc.</p>
              </div>

              <div>
                <Label htmlFor="languagesSupported" className="flex items-center gap-2">
                  <span className="text-lg">🌐</span>
                  Languages Supported
                </Label>
                <Input
                  id="languagesSupported"
                  value={formData.languagesSupported}
                  onChange={(e) => setFormData({ ...formData, languagesSupported: e.target.value })}
                  placeholder="e.g., English & Arabic"
                  className="mt-1"
                />
                <p className="text-xs text-gray-500 mt-1">Example: English & Arabic, English, Arabic, etc.</p>
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
                <Save className="w-4 h-4" />
                Save Changes
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h4 className="text-sm font-medium text-blue-800 mb-2">💡 How it works</h4>
        <p className="text-sm text-blue-700 mb-2">
          These statistics are stored locally in your browser and will be displayed on the website immediately after saving.
        </p>
        <ul className="text-sm text-blue-700 list-disc list-inside space-y-1">
          <li>Changes are saved automatically to your browser's local storage</li>
          <li>No database required - everything is stored locally</li>
          <li>Statistics update immediately on the website</li>
          <li>Data persists even after browser restart</li>
        </ul>
      </div>
    </div>
  );
};
