
'use client';

import dynamic from 'next/dynamic';

const FloatingChatbot = dynamic(() => import('@/components/chatbot/floating-chatbot').then(mod => mod.FloatingChatbot), { ssr: false });

export function ClientLayout() {
  return (
    <>
      <FloatingChatbot />
    </>
  );
}
