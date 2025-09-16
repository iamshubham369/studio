'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Send, User, Bot, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { getAiChatbotResponse } from '@/app/chatbot/actions';
import { cn } from '@/lib/utils';

interface Message {
  id: number;
  role: 'user' | 'bot';
  text: string;
}

export function ChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isPending, startTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  useEffect(() => {
    setMessages([{ id: Date.now(), role: 'bot', text: "Hello! How can I help you today? I can offer tips on stress, time management, and more." }]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isPending) return;

    const userMessage: Message = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    startTransition(async () => {
      const result = await getAiChatbotResponse(input);
      if (result.success) {
        const botMessage: Message = { id: Date.now() + 1, role: 'bot', text: result.response! };
        setMessages(prev => [...prev, botMessage]);
      } else {
        const errorMessage: Message = { id: Date.now() + 1, role: 'bot', text: result.error! };
        setMessages(prev => [...prev, errorMessage]);
      }
    });
  };

  return (
    <div className="flex flex-col h-full max-h-[70vh] w-full border rounded-lg">
      <ScrollArea className="flex-1 p-4" ref={scrollAreaRef}>
        <div className="space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex items-start gap-3',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'bot' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                </Avatar>
              )}
              <div
                className={cn(
                  'max-w-xs md:max-w-md lg:max-w-lg rounded-lg px-4 py-3 text-sm',
                  message.role === 'user'
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-muted'
                )}
              >
                {message.text}
              </div>
              {message.role === 'user' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback><User className="h-5 w-5"/></AvatarFallback>
                </Avatar>
              )}
            </div>
          ))}
          {isPending && (
            <div className="flex items-start gap-3 justify-start">
               <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary text-primary-foreground"><Bot className="h-5 w-5"/></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-3 flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-card">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about stress, time management, etc."
            disabled={isPending}
            autoComplete='off'
          />
          <Button type="submit" size="icon" disabled={isPending || !input.trim()}>
            {isPending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
      </div>
    </div>
  );
}
