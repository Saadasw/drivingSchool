import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Mail, Trash2, Eye, Clock, User, Phone, MessageSquare } from 'lucide-react';

interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string;
  message: string;
  created_at: string;
  is_read?: boolean;
}

export const MessageManager = () => {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [loading, setLoading] = useState(true);

  const { toast } = useToast();

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    try {
      console.log('Fetching messages from contacts table...');
      const { data, error } = await supabase
        .from('contacts')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Supabase error:', error);
        if (error.message.includes('relation "contacts" does not exist')) {
          console.log('Contacts table does not exist yet');
          setMessages([]);
          toast({
            title: 'Database Setup Required',
            description: 'Please run the database-setup.sql script in Supabase first',
            variant: 'destructive',
          });
          return;
        }
        throw error;
      }
      console.log('Messages fetched successfully:', data?.length || 0, 'messages');
      setMessages(data || []);
    } catch (error) {
      console.error('Error fetching messages:', error);
      toast({
        title: 'Error',
        description: 'Failed to load messages',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const markAsRead = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .update({ is_read: true })
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => 
        prev.map(msg => 
          msg.id === messageId ? { ...msg, is_read: true } : msg
        )
      );

      toast({
        title: 'Success',
        description: 'Message marked as read',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to mark message as read',
        variant: 'destructive',
      });
    }
  };

  const deleteMessage = async (messageId: string) => {
    try {
      const { error } = await supabase
        .from('contacts')
        .delete()
        .eq('id', messageId);

      if (error) throw error;

      setMessages(prev => prev.filter(msg => msg.id !== messageId));
      toast({
        title: 'Success',
        description: 'Message deleted successfully',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Failed to delete message',
        variant: 'destructive',
      });
    }
  };



  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString();
  };

  const getUnreadCount = () => {
    return messages.filter(msg => !msg.is_read).length;
  };

  if (loading) {
    return <div className="flex justify-center py-8">Loading...</div>;
  }

  if (messages.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="text-gray-500 mb-4">
          <MessageSquare className="h-16 w-16 mx-auto mb-4 text-gray-300" />
          <h3 className="text-lg font-medium mb-2">No messages available</h3>
          <p className="text-sm mb-4">Contact form messages will appear here once customers start sending inquiries.</p>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 max-w-md mx-auto">
            <h4 className="text-sm font-medium text-blue-800 mb-2">💡 Quick Setup</h4>
            <p className="text-sm text-blue-700 mb-2">To see sample messages:</p>
            <ol className="text-sm text-blue-700 list-decimal list-inside space-y-1 text-left">
              <li>Run the database-setup.sql script in Supabase</li>
              <li>Click "Add Sample Data" in the admin dashboard</li>
              <li>Messages will appear here automatically</li>
            </ol>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Message Management</h2>
          <p className="text-gray-600">Manage customer inquiries and responses</p>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            {messages.length} Total
          </Badge>
          {getUnreadCount() > 0 && (
            <Badge variant="destructive" className="flex items-center gap-1">
              <Eye className="w-4 h-4" />
              {getUnreadCount()} Unread
            </Badge>
          )}
        </div>
      </div>

      <div className="grid gap-4">
        {messages.map((message) => (
          <Card key={message.id} className={`${!message.is_read ? 'border-blue-200 bg-blue-50' : ''}`}>
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <User className="w-4 h-4 text-gray-500" />
                    <span className="font-semibold">{message.name}</span>
                  </div>
                  {!message.is_read && (
                    <Badge variant="secondary" className="text-xs">New</Badge>
                  )}

                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Clock className="w-3 h-3" />
                    {formatDate(message.created_at)}
                  </span>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                  <Label className="text-sm font-medium text-gray-700">Email</Label>
                  <p className="text-sm">{message.email}</p>
                </div>
                {message.phone && (
                  <div>
                    <Label className="text-sm font-medium text-gray-700 flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      Phone
                    </Label>
                    <p className="text-sm">{message.phone}</p>
                  </div>
                )}
              </div>
              
              <div className="mb-4">
                <Label className="text-sm font-medium text-gray-700">Message</Label>
                <p className="text-sm bg-gray-50 p-3 rounded-md mt-1">{message.message}</p>
              </div>



                             <div className="flex gap-2">
                 {!message.is_read && (
                   <Button
                     onClick={() => markAsRead(message.id)}
                     size="sm"
                     variant="outline"
                   >
                     <Eye className="w-4 h-4 mr-2" />
                     Mark as Read
                   </Button>
                 )}
                 <Button
                   onClick={() => deleteMessage(message.id)}
                   size="sm"
                   variant="destructive"
                 >
                   <Trash2 className="w-4 h-4 mr-2" />
                   Delete
                 </Button>
               </div>
            </CardContent>
          </Card>
        ))}
      </div>

      
    </div>
  );
};
