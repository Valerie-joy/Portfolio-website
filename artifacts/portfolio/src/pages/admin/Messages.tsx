import React from 'react';
import { useListMessages, useDeleteMessage, getListMessagesQueryKey } from '@/hooks/useMessages';
import { useQueryClient } from '@tanstack/react-query';
import { Mail, Calendar, Trash2, Search, Filter } from 'lucide-react';
import { formatDistanceToNow, format } from 'date-fns';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';

export default function Messages() {
  const { data: messages, isLoading } = useListMessages();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const deleteMutation = useDeleteMessage();

  const handleDelete = async (id: number) => {
    if (confirm('Are you sure you want to delete this message?')) {
      await deleteMutation.mutateAsync({ id });
      queryClient.invalidateQueries({ queryKey: getListMessagesQueryKey() });
      toast({ title: 'Message deleted' });
    }
  };

  return (
    <div className="p-8 max-w-5xl mx-auto space-y-8 h-full flex flex-col">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Messages Inbox</h1>
          <p className="text-muted-foreground mt-1">Inquiries from your portfolio contact form.</p>
        </div>
      </div>

      <div className="glass-panel border-border rounded-lg p-4 flex-1 flex flex-col overflow-hidden">
        <div className="flex gap-4 mb-4 shrink-0">
          <div className="relative flex-1 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search messages..." 
              className="pl-9 bg-background/50"
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <div className="overflow-y-auto flex-1 pr-2 space-y-4 pb-4 custom-scrollbar">
          {isLoading ? (
            <div className="text-center py-12 text-muted-foreground">Loading messages...</div>
          ) : messages?.length === 0 ? (
            <div className="text-center py-24 flex flex-col items-center justify-center">
              <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                <Mail className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-lg font-medium text-foreground mb-1">Your inbox is empty</h3>
              <p className="text-muted-foreground text-sm">When someone fills out the contact form on your portfolio, it will appear here.</p>
            </div>
          ) : (
            messages?.map(message => (
              <Card key={message.id} className={`border ${!message.read ? 'border-primary/50 bg-primary/5' : 'border-border bg-background/50'} transition-colors hover:border-primary/30`}>
                <CardContent className="p-0">
                  <div className="p-5">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex gap-4">
                        <Avatar className="h-10 w-10 border border-primary/20">
                          <AvatarFallback className="bg-primary/10 text-primary">{message.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-semibold text-foreground">{message.name}</h3>
                            {!message.read && <Badge className="h-5 px-1.5 text-[10px] bg-primary/20 text-primary border-none hover:bg-primary/30">New</Badge>}
                          </div>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Mail className="h-3 w-3" /> {message.email}
                          </p>
                        </div>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span className="text-xs text-muted-foreground flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {format(new Date(message.createdAt), 'MMM d, yyyy h:mm a')}
                        </span>
                        <span className="text-[10px] text-muted-foreground">
                          {formatDistanceToNow(new Date(message.createdAt), { addSuffix: true })}
                        </span>
                      </div>
                    </div>
                    
                    <div className="flex gap-2 mb-4">
                      {message.projectType && (
                        <Badge variant="outline" className="bg-background text-xs font-normal">
                          Type: <span className="font-medium ml-1">{message.projectType}</span>
                        </Badge>
                      )}
                      {message.budget && (
                        <Badge variant="outline" className="bg-background text-xs font-normal">
                          Budget: <span className="font-medium ml-1">{message.budget}</span>
                        </Badge>
                      )}
                    </div>
                    
                    <div className="bg-background/50 rounded p-4 text-sm text-foreground/90 border border-border whitespace-pre-wrap">
                      {message.message}
                    </div>
                  </div>
                  <div className="bg-muted/30 px-5 py-3 border-t border-border flex justify-end">
                    <Button 
                      variant="ghost" 
                      size="sm" 
                      className="text-destructive hover:text-destructive hover:bg-destructive/10 h-8"
                      onClick={() => handleDelete(message.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" /> Delete Message
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
