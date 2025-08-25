import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Save, Settings } from 'lucide-react';

interface ContentItem {
  id: string;
  section_name: string;
  content: any;
  is_active: boolean;
}

export const ContentEditor = () => {
  const [content, setContent] = useState<ContentItem[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    fetchContent();
  }, []);

  const fetchContent = async () => {
    try {
      const { data, error } = await supabase
        .from('website_content')
        .select('*')
        .order('section_name', { ascending: true });

      if (error) {
        // If table doesn't exist, show empty state
        if (error.message.includes('relation "website_content" does not exist')) {
          setContent([]);
          return;
        }
        throw error;
      }
      setContent(data || []);
    } catch (error) {
      console.error('Error fetching content:', error);
      toast({
        title: 'Error',
        description: 'Failed to load content. Please add sample data first.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: string, section_name: string, content: any) => {
    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({ id, section_name, content, updated_at: new Date().toISOString() });

      if (error) throw error;

      setContent(prev => 
        prev.map(item => 
          item.section_name === section_name 
            ? { ...item, content }
            : item
        )
      );

      toast({
        title: 'Success',
        description: 'Content updated successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to update content',
        variant: 'destructive',
      });
    }
  };

  const handleInputChange = (section_name: string, content: any) => {
    setContent(prev => 
      prev.map(item => 
        item.section_name === section_name 
          ? { ...item, content }
          : item
      )
    );
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section_name]) acc[item.section_name] = [];
    acc[item.section_name].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  if (content.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <Settings className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No content available</h3>
          <p className="text-sm mb-4">Website content will appear here once sample data is added.</p>
          <p className="text-xs text-gray-400">Click "Add Sample Data" in the admin dashboard to get started.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {Object.entries(groupedContent).map(([section, items]) => (
        <Card key={section}>
          <CardHeader>
            <CardTitle className="capitalize">{section.replace(/_/g, ' ')}</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="space-y-2">
                <Label htmlFor={`content-${item.id}`}>
                  {item.section_name.replace(/_/g, ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Label>
                {typeof item.content === 'string' ? (
                  <Textarea
                    id={`content-${item.id}`}
                    value={item.content}
                    onChange={(e) => handleInputChange(item.section_name, e.target.value)}
                    placeholder={`Enter ${item.section_name.replace(/_/g, ' ')} content`}
                    rows={3}
                  />
                ) : (
                  <div className="space-y-2">
                    {Object.entries(item.content).map(([key, value]) => (
                      <div key={key} className="space-y-1">
                        <Label htmlFor={`${item.id}-${key}`} className="text-sm font-medium">
                          {key.replace(/\b\w/g, l => l.toUpperCase())}
                        </Label>
                        <Input
                          id={`${item.id}-${key}`}
                          value={value as string}
                          onChange={(e) => {
                            const newContent = { ...item.content, [key]: e.target.value };
                            handleInputChange(item.section_name, newContent);
                          }}
                          placeholder={`Enter ${key}`}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  onClick={() => updateContent(item.id, item.section_name, item.content)}
                  className="w-full sm:w-auto"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};