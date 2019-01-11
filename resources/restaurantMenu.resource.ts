export class RestaurantMenuResource {
	private restaurantIndex;
	private name;
	private price;
	private imageURL;

	constructor(restaurantMenuData) {
		this.setRestaurantIndex(restaurantMenuData.restaurantIndex);
		this.setName(restaurantMenuData.name);
		this.setPrice(restaurantMenuData.price);
		this.setImageUrl(restaurantMenuData.imageUrl);
	}

	getRestaurantIndex() {
		return this.restaurantIndex;
	}

	setRestaurantIndex(restaurantIndex) {
		this.restaurantIndex = restaurantIndex;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getPrice() {
		return this.price;
	}

	setPrice(price) {
		this.price = price;
	}

	getImageUrl() {
		return this.imageURL;
	}

	setImageUrl(imageUrl) {
		this.imageURL = imageUrl;
	}

	getRestaurantMenu() {
		let restaurantMenuData: object = {
			restaurantIndex: this.getRestaurantIndex(),
			name: this.getName(),
			price: this.getPrice(),
			imageUrl: this.getImageUrl()
		}
		return restaurantMenuData;
	}
}


