import React from 'react';

import shop1 from '../../img/shop/shop_1.jpg';
import shop2 from '../../img/shop/shop_2.jpg';
import shop4 from '../../img/shop/shop_4.jpg';
import shop5 from '../../img/shop/shop_5.jpg';
import shop10 from '../../img/shop/shop_10.jpg';

export default function Shop() {
  const shopUrl = process.env.NODE_ENV === 'production' ? 'https://shop.painboudinrecord.fr' : 'https://shop.pbr.local';

  const handleClick = () => {
    window.open(shopUrl, '_blank').focus();
  };

  return (
    <div id="shop" className="pt-24 pb-10">
      <div className="relative h-96" onClick={handleClick} role="presentation">
        <img src={shop1} alt="Shop 1" className="absolute h-96 opacity-0 top-0 left-0 right-0 mx-auto animate-shop-0 object-cover" />
        <img src={shop10} alt="Shop 2" className="absolute h-96 opacity-0 top-0 left-0 right-0 mx-auto animate-shop-4 object-cover" />
        <img src={shop4} alt="Shop 3" className="absolute h-96 opacity-0 top-0 left-0 right-0 mx-auto animate-shop-8 object-cover" />
        <img src={shop2} alt="Shop 4" className="absolute h-96 opacity-0 top-0 left-0 right-0 mx-auto animate-shop-12 object-cover" />
        <img src={shop5} alt="Shop 5" className="absolute h-96 opacity-0 top-0 left-0 right-0 mx-auto animate-shop-16 object-cover" />
      </div>
      <div className="mt-5 text-center">
        <a href={shopUrl} target="_blank" rel="noopener noreferrer" className="text-4xl tracking-widest hover:underline">SHOP NOW</a>
      </div>
    </div>
  );
}
