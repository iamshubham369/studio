import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { PeerChatInterface } from "@/components/peer-support/peer-chat-interface";

export default function PeerSupportPage() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle className="font-headline">Peer Support Chat</CardTitle>
        <CardDescription>
          Connect with another student for an anonymous and supportive conversation.
          <br />
          This is a safe space. Please be respectful and kind.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col">
        <PeerChatInterface />
      </CardContent>
    </Card>
  );
}
