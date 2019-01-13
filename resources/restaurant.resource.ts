export class RestaurantResource {
	private restaurantCategoryIndex;
	private name;
	private address;
	private locationUrl;
	private tel;
	private openingHours;
	private review;

	constructor(restaurantData) {
		this.setRestaurantCategoryIndex(restaurantData.restaurantCategoryIndex);
		this.setName(restaurantData.name);
		this.setAddress(restaurantData.address);
		this.setLocationUrl(restaurantData.locationUrl);
		this.setTel(restaurantData.tel);
		this.setOpeningHours(restaurantData.openingHours);
		this.setReview(restaurantData.review);
	}

	getRestaurantCategoryIndex() {
		return this.restaurantCategoryIndex;
	}

	setRestaurantCategoryIndex(restaurantCategoryIndex) {
		this.restaurantCategoryIndex = restaurantCategoryIndex;
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
			restaurantCategoryIndex: this.getRestaurantCategoryIndex(),
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

