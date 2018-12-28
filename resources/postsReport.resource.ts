export class PostsReportResource {
	private postsReportIndex;
	private userIndex;
	private postsIndex;
	private contents;

	constructor(postsReportData) {
		this.setPostsReportIndex(postsReportData.postsReportIndex);
		this.setUserIndex(postsReportData.userIndex);
		this.setPostsIndex(postsReportData.postsIndex);
		this.setContents(postsReportData.contents);
	}

	getPostsReportIndex() {
		return this.postsReportIndex;
	}

	setPostsReportIndex(postsReportIndex) {
		this.postsReportIndex = postsReportIndex;
	}

	getUserIndex() {
		return this.userIndex;
	}

	setUserIndex(userIndex) {
		this.userIndex = userIndex;
	}

	getPostsIndex() {
		return this.postsIndex;
	}

	setPostsIndex(postsIndex) {
		this.postsIndex = postsIndex;
	}

	getContents() {
		return this.contents;
	}

	setContents(contents) {
		this.contents = contents;
	}

	getPostsReport() {
		let postsReportResource: object = {
			postsReportIndex: this.getPostsReportIndex(),
			userIndex: this.getUserIndex(),
			postsIndex: this.getPostsIndex(),
			contents: this.getContents()
		};
		return postsReportResource;
	}
}