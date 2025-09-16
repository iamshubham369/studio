import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ChatInterface } from "@/components/chatbot/chat-interface";

export default function ChatbotPage() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">AI Support Chatbot</CardTitle>
        <CardDescription>
          Your friendly AI assistant for stress and time management tips.
          <br/>
          If you are in a crisis, please seek professional help immediately.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <ChatInterface />
      </CardContent>
    </Card>
  );
}
