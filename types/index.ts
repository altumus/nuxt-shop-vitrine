export type Product = {
	id: number;
	title: string;
	price: number;
	description: string;
	category: string;
	image: string;
};

export interface CartItem extends Product {
	quantity: number;
}

export type Category =
	| 'electronics'
	| 'jewelery'
	| "men's clothing"
	| "women's clothing";
