import React from 'react';

import shop_1 from '../../img/shop/shop_1.jpg';
import shop_2 from '../../img/shop/shop_2.jpg';
import shop_4 from '../../img/shop/shop_4.jpg';
import shop_5 from '../../img/shop/shop_5.jpg';
import shop_6 from '../../img/shop/shop_6.jpg';
import shop_10 from '../../img/shop/shop_10.jpg';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart } from '@fortawesome/free-solid-svg-icons';

const Shop = () => {
	return (
		<div className="shop">
			<h2 className="shop-title">SHOP</h2>
			<div className="shop-slideshow">
				<img src={shop_1} alt="" />
				<img src={shop_6} alt="" />
				<img src={shop_10} alt="" />
			</div>
			<div className="shop-link">
				<a href={process.env.NODE_ENV === 'production' ? 'https://shop.painboudinrecord.fr' : 'http://shop.pbr.local'} target="_blank" rel="noopener"><FontAwesomeIcon icon={faShoppingCart} /> Go to the shop</a>
			</div>
			<div className="shop-slideshow">
				<img src={shop_4} alt="" />
				<img src={shop_2} alt="" />
				<img src={shop_5} alt="" />
			</div>
		</div>
	)
}

export default Shop;