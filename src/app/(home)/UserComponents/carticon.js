'use client'


import React, { useEffect } from 'react';

import Link from "next/link";

const CartIcon = () => {


  return (
 

<div className="flex items-center relative mr-2">

  <Link href="/cart" className="p-2 bg-yellow-100 text-white rounded-full shadow-lg">
  <img src="/custom_images/shopping-cart.png" alt="cart" />
  </Link>

</div>


 
  );
};

export default CartIcon;
