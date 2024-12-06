'use client';

import { useRouter } from 'next/navigation';

const PaymentFailed = () => {
  const router = useRouter();

  const handleRetry = () => {
    router.push('/checkout'); // Redirect to the checkout page for retry
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-50">
      <div className="p-8 bg-white shadow-md rounded-lg max-w-md text-center">
        
        <img src="/custom_images/pay-failed.gif" alt="Payment Failed" className="mx-auto" />

        <h1 className="text-2xl font-semibold text-red-800 mt-4">Payment Failed</h1>
        <p className="text-gray-600 mt-2">
          Unfortunately, your transaction could not be completed. Please try again.
        </p>

        {/* <button
          onClick={handleRetry}
          className="mt-6 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 focus:ring focus:ring-red-200"
        >
          Retry Payment
        </button> */}
      </div>
    </div>
  );
};

export default PaymentFailed;
