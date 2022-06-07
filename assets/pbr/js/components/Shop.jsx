import React from 'react';

export default function Shop() {
  const shopUrl = process.env.NODE_ENV === 'production' ? 'https://shop.painboudinrecord.fr' : 'https://shop.pbr.local';

  const handleClick = () => {
    window.open(shopUrl, '_blank').focus();
  };

  return (
    <div id="shop" className="pt-24 pb-10 bg-skin-songs">
      <div className="relative h-96" onClick={handleClick} role="presentation">
        <img src="/images/shop/shop_1.jpg" alt="Shop 1" loading="lazy" className="absolute h-96 opacity-0 top-0 left-0 right-0 mx-auto animate-shop-0 object-cover" />
        <img src="/images/shop/shop_10.jpg" alt="Shop 2" loading="lazy" className="absolute h-96 opacity-0 top-0 left-0 right-0 mx-auto animate-shop-4 object-cover" />
        <img src="/images/shop/shop_4.jpg" alt="Shop 3" loading="lazy" className="absolute h-96 opacity-0 top-0 left-0 right-0 mx-auto animate-shop-8 object-cover" />
        <img src="/images/shop/shop_2.jpg" alt="Shop 4" loading="lazy" className="absolute h-96 opacity-0 top-0 left-0 right-0 mx-auto animate-shop-12 object-cover" />
        <img src="/images/shop/shop_5.jpg" alt="Shop 5" loading="lazy" className="absolute h-96 opacity-0 top-0 left-0 right-0 mx-auto animate-shop-16 object-cover" />
      </div>
      <div className="mt-5 text-center">
        <a href={shopUrl} target="_blank" rel="noopener noreferrer" className="text-4xl tracking-widest hover:underline">SHOP NOW</a>
      </div>
    </div>
  );
}
