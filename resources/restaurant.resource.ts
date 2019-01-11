export class RestaurantResource {
	private restaurantImageUrl;
	private restaurantMenuImageUrl;
	private name;
	private address;
	private locationUrl;
	private tel;
	private openingHours;
	private review;

	constructor(restaurantData) {
		this.setRestaurantImageUrl(restaurantData.restaurantImageUrl);
		this.setRestaurantMenuImageUrl(restaurantData.restaurantMenuImageUrl);
		this.setName(restaurantData.name);
		this.setAddress(restaurantData.address);
		this.setLocationUrl(restaurantData.locationUrl);
		this.setTel(restaurantData.tel);
		this.setOpeningHours(restaurantData.openingHours);
		this.setReview(restaurantData.review);
	}

	getRestaurantImageUrl() {
		return this.restaurantImageUrl;
	}

	setRestaurantImageUrl(restaurantImageUrl) {
		this.restaurantImageUrl = restaurantImageUrl;
	}

	getRestaurantMenuImageUrl() {
		return this.restaurantMenuImageUrl;
	}

	setRestaurantMenuImageUrl(restaurantMenuImageUrl) {
		this.restaurantMenuImageUrl = restaurantMenuImageUrl;
	}

	getName() {
		return this.name;
	}

	setName(name) {
		this.name = name;
	}

	getAddress() {
		return this.address;
	}

	setAddress(address) {
		this.address = address;
	}

	getLocationUrl() {
		return this.locationUrl;
	}

	setLocationUrl(locationUrl) {
		this.locationUrl = locationUrl;
	}

	getTel() {
		return this.tel;
	}

	setTel(tel) {
		this.tel = tel;
	}

	getOpeningHours() {
		return this.openingHours;
	}

	setOpeningHours(openingHours) {
		this.openingHours = openingHours;
	}

	getReview() {
		return this.review;
	}

	setReview(review) {
		this.review = review;
	}

	getRestaurant() {
		let restaurantData: object = {
			restaurantImageUrl: this.getRestaurantImageUrl(),
			restaurantMenuImageUrl: this.getRestaurantMenuImageUrl(),
			name: this.getName(),
			address: this.getAddress(),
			locationUrl: this.getLocationUrl(),
			tel: this.getTel(),
			openingHours: this.getOpeningHours(),
			review: this.getReview()
		};
		return restaurantData;
	}
}

