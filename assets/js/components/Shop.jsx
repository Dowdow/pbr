import React from 'react';

import shop_1 from '../../img/shop/shop_1.jpg';
import shop_2 from '../../img/shop/shop_2.jpg';
import shop_4 from '../../img/shop/shop_4.jpg';
import shop_5 from '../../img/shop/shop_5.jpg';
import shop_10 from '../../img/shop/shop_10.jpg';

const Shop = () => {
	const shopUrl = process.env.NODE_ENV === 'production' ? 'https://shop.painboudinrecord.fr' : 'http://shop.pbr.local';

	const handleClick = () => {
		window.open(shopUrl, '_blank').focus();
	}

	return (
		<div id="shop" className="shop">
			<div className="shop-slideshow" onClick={handleClick}>
				<img src={shop_1} alt="Shop Image 1" />
				<img src={shop_10} alt="Shop Image 2" />
				<img src={shop_4} alt="Shop Image 3" />
				<img src={shop_2} alt="Shop Image 4" />
				<img src={shop_5} alt="Shop Image 5" />
			</div>
			<div className="shop-link">
				<a href={shopUrl} target="_blank" rel="noopener">SHOP NOW</a>
			</div>
		</div>
	)
}

export default Shop;