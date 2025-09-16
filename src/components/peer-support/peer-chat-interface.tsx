'use client';

import { useState, useRef, useEffect, useTransition } from 'react';
import { Send, User, Users, Loader2, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { findNewPeer, sendPeerMessage } from '@/app/peer-support/actions';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: number;
  role: 'user' | 'peer';
  text: string;
}

export function PeerChatInterface() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSending, startSendingTransition] = useTransition();
  const [isFindingPeer, startFindingPeerTransition] = useTransition();
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);
  
  useEffect(() => {
    setMessages([{ id: Date.now(), role: 'peer', text: "You've been connected with a peer. Feel free to share what's on your mind." }]);
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isSending) return;

    const userMessage: Message = { id: Date.now(), role: 'user', text: input };
    setMessages(prev => [...prev, userMessage]);
    const messageToSend = input;
    setInput('');

    startSendingTransition(async () => {
      // Simulate sending a message and getting a reply
      await new Promise(resolve => setTimeout(resolve, 800));
      const result = await sendPeerMessage(messageToSend);
      if (result.success) {
        const peerMessage: Message = { id: Date.now() + 1, role: 'peer', text: result.response! };
        setMessages(prev => [...prev, peerMessage]);
      } else {
        const errorMessage: Message = { id: Date.now() + 1, role: 'peer', text: result.error! };
        setMessages(prev => [...prev, errorMessage]);
      }
    });
  };

  const handleFindNewPeer = () => {
    startFindingPeerTransition(async () => {
        const result = await findNewPeer();
        if(result.success) {
            setMessages([{ id: Date.now(), role: 'peer', text: result.message! }]);
            toast({
                title: 'New Peer Connected',
                description: 'You can start a new conversation.',
            });
        } else {
            toast({
                title: 'Error',
                description: result.error,
                variant: 'destructive'
            })
        }
    })
  }

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
              {message.role === 'peer' && (
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary text-secondary-foreground"><Users className="h-5 w-5"/></AvatarFallback>
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
          {isSending && (
            <div className="flex items-start gap-3 justify-start">
               <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-secondary text-secondary-foreground"><Users className="h-5 w-5"/></AvatarFallback>
                </Avatar>
                <div className="bg-muted rounded-lg px-4 py-3 flex items-center">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                </div>
            </div>
          )}
        </div>
      </ScrollArea>
      <div className="border-t p-4 bg-card space-y-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isSending || isFindingPeer}
            autoComplete='off'
          />
          <Button type="submit" size="icon" disabled={isSending || isFindingPeer || !input.trim()}>
            {isSending ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
          </Button>
        </form>
        <Button onClick={handleFindNewPeer} variant="outline" className="w-full" disabled={isFindingPeer || isSending}>
            {isFindingPeer ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
            Find a New Peer
        </Button>
      </div>
    </div>
  );
}
