export class BoardReplyResource {
	private boardIndex;
	private userIndex;
	private boardReplyContent;

	constructor(boardReplyData) {
		this.setBoardIndex(boardReplyData.boardIndex);
		this.setUserIndex(boardReplyData.userIndex);
		this.setBoardReplyContent(boardReplyData.boardReplyContent);
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

	getBoardReplyData() {
		let boardReplyData = {
			boardIndex: this.getBoardIndex(),
			userIndex: this.getUserIndex(),
			boardReplyContent: this.getBoardReplyContent()
		};
		return boardReplyData;
	}

}
