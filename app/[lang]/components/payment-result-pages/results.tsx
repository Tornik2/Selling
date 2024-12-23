'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import { CheckCircle } from 'lucide-react';

interface Dictionary {
  payment: {
    success: string;
  };
}

export function PaymentSuccess({ dictionary }: { dictionary: Dictionary }) {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  useEffect(() => {
    if (sessionId) {
      console.log('Successful payment:', sessionId);
    }
  }, [sessionId]);
  return (
    <main className="flex-1 flex items-center justify-center bg-white dark:bg-black">
      <div className="max-w-md w-full mx-auto text-center p-8">
        <CheckCircle className="mx-auto h-16 w-16 text-green-500" />
        <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-white">
          {dictionary.payment.success}
        </h1>
      </div>
    </main>
  );
}
