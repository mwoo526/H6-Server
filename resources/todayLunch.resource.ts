export class TodayLunchResource {
    private mainMenuImgUrl;
    private storeName;
    private storeLocation;
    private storeTel;
    private openingHours;
    private oneLineReview;
    private mapUrl;

    constructor(todayLunchData) {
        this.setMainMenuImgUrl(todayLunchData.mainMenuImgUrl);
        this.setStoreName(todayLunchData.storeName);
        this.setStoreLocation(todayLunchData.storeLocation);
        this.setStoreTel(todayLunchData.storeTel);
        this.setOpeningHours(todayLunchData.openingHours);
        this.setOneLineReview(todayLunchData.oneLineReview);
        this.setMapUrl(todayLunchData.mapUrl);
    }

    getMainMenuImgUrl() {
        return this.mainMenuImgUrl;
    }

    setMainMenuImgUrl(mainMenuImgUrl) {
        this.mainMenuImgUrl = mainMenuImgUrl;
    }

    getStoreName() {
        return this.storeName;
    }

    setStoreName(storeName) {
        this.storeName = storeName;
    }

    getStoreLocation() {
        return this.storeLocation;
    }

    setStoreLocation(storeLocation) {
        this.storeLocation = storeLocation;
    }

    getStoreTel() {
        return this.storeTel;
    }

    setStoreTel(storeTel) {
        this.storeTel = storeTel;
    }

    getOpeningHours() {
        return this.openingHours;
    }

    setOpeningHours(openingHours) {
        this.openingHours = openingHours;
    }

    getOneLineReview() {
        return this.oneLineReview;
    }

    setOneLineReview(oneLineReview) {
        this.oneLineReview = oneLineReview;
    }

    getMapUrl() {
        return this.mapUrl;
    }

    setMapUrl(mapUrl) {
        this.mapUrl = mapUrl;
    }

    getTodayLunch() {
        let todayLunchData: object = {
            mainMenuImgUrl: this.getMainMenuImgUrl(),
            storeName: this.getStoreName(),
            storeLocation: this.getStoreLocation(),
            storeTel: this.getStoreTel(),
            openingHours: this.getOpeningHours(),
            oneLineReview: this.getOneLineReview(),
            mapUrl: this.getMapUrl()
        };
        return todayLunchData;
    }
}

