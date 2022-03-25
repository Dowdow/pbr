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
    <div id="shop" className="shop">
      <div className="shop-slideshow" onClick={handleClick} role="presentation">
        <img src={shop1} alt="Shop 1" />
        <img src={shop10} alt="Shop 2" />
        <img src={shop4} alt="Shop 3" />
        <img src={shop2} alt="Shop 4" />
        <img src={shop5} alt="Shop 5" />
      </div>
      <div className="shop-link">
        <a href={shopUrl} target="_blank" rel="noopener noreferrer">SHOP NOW</a>
      </div>
    </div>
  );
}
