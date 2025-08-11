import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Save } from 'lucide-react';

interface ContentItem {
  id: string;
  section: string;
  key: string;
  value: string;
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
        .order('section', { ascending: true });

      if (error) throw error;
      setContent(data || []);
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to load content',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const updateContent = async (id: string, section: string, key: string, value: string) => {
    try {
      const { error } = await supabase
        .from('website_content')
        .upsert({ id, section, key, value, updated_at: new Date().toISOString() });

      if (error) throw error;

      setContent(prev => 
        prev.map(item => 
          item.section === section && item.key === key 
            ? { ...item, value }
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

  const handleInputChange = (section: string, key: string, value: string) => {
    setContent(prev => 
      prev.map(item => 
        item.section === section && item.key === key 
          ? { ...item, value }
          : item
      )
    );
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  const groupedContent = content.reduce((acc, item) => {
    if (!acc[item.section]) acc[item.section] = [];
    acc[item.section].push(item);
    return acc;
  }, {} as Record<string, ContentItem[]>);

  return (
    <div className="space-y-6">
      {Object.entries(groupedContent).map(([section, items]) => (
        <Card key={section}>
          <CardHeader>
            <CardTitle className="capitalize">{section} Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {items.map((item) => (
              <div key={`${item.section}-${item.key}`}>
                <Label className="capitalize">{item.key.replace('_', ' ')}</Label>
                {item.key.includes('description') || item.key.includes('content') ? (
                  <Textarea
                    value={item.value || ''}
                    onChange={(e) => handleInputChange(item.section, item.key, e.target.value)}
                    className="mt-1"
                    rows={3}
                  />
                ) : (
                  <Input
                    value={item.value || ''}
                    onChange={(e) => handleInputChange(item.section, item.key, e.target.value)}
                    className="mt-1"
                  />
                )}
                <Button
                  onClick={() => updateContent(item.id, item.section, item.key, item.value)}
                  size="sm"
                  className="mt-2"
                >
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};