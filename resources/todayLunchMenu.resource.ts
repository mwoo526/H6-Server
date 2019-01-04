export class TodayLunchMenuResource {
    private todayLunchIndex;
    private menu;
    private price;
    private imgURL;

    constructor(todayLunchMenuData) {
        this.setTodayLunchIndex(todayLunchMenuData.todayLunchIndex);
        this.setMenu(todayLunchMenuData.menu);
        this.setPrice(todayLunchMenuData.price);
        this.setImgUrl(todayLunchMenuData.imgUrl);
    }

    getTodayLunchIndex() {
        return this.todayLunchIndex;
    }

    setTodayLunchIndex(todayLunchIndex) {
        this.todayLunchIndex = todayLunchIndex;
    }

    getMenu() {
        return this.menu;
    }

    setMenu(menu) {
        this.menu = menu;
    }

    getPrice() {
        return this.price;
    }

    setPrice(price) {
        this.price = price;
    }

    getImgUrl() {
        return this.imgURL;
    }

    setImgUrl(imgUrl) {
        this.imgURL = imgUrl;
    }

    getTodayLunchMenu() {
        let todayLunchMenuData: object = {
            todayLunchIndex: this.getTodayLunchIndex(),
            menu: this.getMenu(),
            price: this.getPrice(),
            imgUrl: this.getImgUrl()
        }
        return todayLunchMenuData;
    }
}


