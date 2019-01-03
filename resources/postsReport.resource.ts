export class PostsReportResource {
	private postsReportIndex;
	private userIndex;
	private postsIndex;
	private content;

	constructor(postsReportData) {
		this.setPostsReportIndex(postsReportData.postsReportIndex);
		this.setUserIndex(postsReportData.userIndex);
		this.setPostsIndex(postsReportData.postsIndex);
		this.setContent(postsReportData.content);
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

	getContent() {
		return this.content;
	}

	setContent(content) {
		this.content = content;
	}

	getPostsReport() {
		let postsReportResource: object = {
			postsReportIndex: this.getPostsReportIndex(),
			userIndex: this.getUserIndex(),
			postsIndex: this.getPostsIndex(),
			content: this.getContent()
		};
		return postsReportResource;
	}
}