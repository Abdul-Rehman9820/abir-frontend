
'use client'

import { useRouter } from 'next/navigation';

const PaymentSuccess = () => {
  const router = useRouter();

  const handleRedirect = () => {
    router.push('/my-account');
  };

  return (
    <div className="flex items-center justify-center min-h-screen abirBG_Lite">
      <div className="p-8 bg-white shadow-md rounded-lg max-w-md text-center">
 
        <img src="/custom_images/pay-success.gif" alt="img" className='mx-auto'/>
 
        <h1 className="text-2xl font-semibold text-gray-800 mt-4">Payment Successful</h1>
        <p className="text-gray-600 mt-2">
          Thank you for your purchase! Your transaction was successful.
        </p>
        <button
          onClick={handleRedirect}
          className="mt-6 px-4 py-2 abirBG text-white rounded-lg hover:bg-green-600 focus:ring focus:ring-green-200"
        >
          My Account
        </button>
      </div>
    </div>
  );
};

export default PaymentSuccess;
