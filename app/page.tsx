'use client';

import { useAuth, useUser } from '@clerk/nextjs';
import Loading from './components/ui/loading';
import Link from 'next/link';

export default function Home() {

  const { isSignedIn, isLoaded } = useAuth();
  const { user } = useUser();

  if(!isLoaded) return <Loading />;

  if(isSignedIn) {
    return (
      <>
        <div className="flex flex-col items-center justify-center min-h-screen py-2">
          <h1 className="text-3xl font-bold underline">User is Signed In.</h1>

          <h2 className='text-lg'>Hey {user?.firstName}!</h2>
          <div className='flex flex-col gap-4 mt-4'>
            <span className='flex border-2 rounded-md p-2 bg-orange-300'><Link href="/analyze">Analyze Document</Link></span>
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      <div className="flex flex-col items-center justify-center min-h-screen py-2">
        <h1 className="text-3xl font-bold underline">
          LegalAI
        </h1>
        <p className="text-lg">Welcome to LegalAI, your AI-powered legal assistant.</p>
        <p className="text-md">Get started by asking a legal question or uploading a document.</p>
      </div>
    </>
  );
}
