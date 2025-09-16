'use client';

import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { MessageSquare } from 'lucide-react';
import { ChatInterface } from './chat-interface';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../ui/card';

export function FloatingChatbot() {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg"
          size="icon"
        >
          <MessageSquare className="h-8 w-8" />
          <span className="sr-only">Open Chatbot</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent
        side="top"
        align="end"
        className="w-[400px] p-0 border-none rounded-lg shadow-2xl"
        sideOffset={20}
      >
        <Card className="h-[600px] flex flex-col">
           <CardHeader>
            <CardTitle className="font-headline">AI Support Chatbot</CardTitle>
            <CardDescription>
              Your friendly AI assistant for stress and time management tips.
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1 flex flex-col p-0">
            <ChatInterface />
          </CardContent>
        </Card>
      </PopoverContent>
    </Popover>
  );
}
