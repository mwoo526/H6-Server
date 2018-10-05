export class BoardReplyResource {
	private boardIndex;
	private userIndex;
	private boardReplyContent;
	private parent;

	constructor(boardReplyData) {
		this.setBoardIndex(boardReplyData.boardIndex);
		this.setUserIndex(boardReplyData.userIndex);
		this.setBoardReplyContent(boardReplyData.boardReplyContent);
		this.setParent(boardReplyData.parent);

	}

	getBoardIndex() {
		return this.boardIndex;
	}

	setBoardIndex(boardIndex) {
		this.boardIndex = boardIndex;
	}

	getUserIndex() {
		return this.userIndex;
	}

	setUserIndex(userIndex) {
		this.userIndex = userIndex;
	}

	getBoardReplyContent() {
		return this.boardReplyContent;
	}

	setBoardReplyContent(boardReplyContent) {
		this.boardReplyContent = boardReplyContent;
	}

	getParent() {
		return this.parent;
	}

	setParent(parent) {
		this.parent = parent;
	}

	getBoardReplyData() {
		let boardReplyData = {
			boardIndex: this.getBoardIndex(),
			userIndex: this.getUserIndex(),
			boardReplyContent: this.getBoardReplyContent(),
			parent: this.getParent()
		};
		return boardReplyData;
	}

}
