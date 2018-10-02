export class ReportLogResource {
	private reportLogIndex;
	private userIndex;
	private boardIndex;
	private reportLogTitle;
	private reportLogContent;

	constructor(reportLogData) {
		this.setReportLogIndex(reportLogData.reportLogIndex);
		this.setUserIndex(reportLogData.userIndex);
		this.setBoardIndex(reportLogData.boardIndex);
		this.setReportLogTitle(reportLogData.reportLogTitle);
		this.setReportLogContent(reportLogData.reportLogContent);
	}

	getReportLogIndex() {
		return this.reportLogIndex;
	}

	setReportLogIndex(reportLogIndex) {
		this.reportLogIndex = reportLogIndex;
	}

	getUserIndex() {
		return this.userIndex;
	}

	setUserIndex(userIndex) {
		this.userIndex = userIndex;
	}

	getBoardIndex() {
		return this.boardIndex;
	}

	setBoardIndex(boardIndex) {
		this.boardIndex = boardIndex;
	}

	getReportLogTitle() {
		return this.reportLogTitle;
	}

	setReportLogTitle(reportLogTitle) {
		this.reportLogTitle = reportLogTitle;
	}

	getReportLogContent() {
		return this.reportLogContent;
	}

	setReportLogContent(reportLogContent) {
		return this.reportLogContent = reportLogContent;
	}

	getReportLog() {
		let reportLogResource: object = {
			reportLogIndex: this.getReportLogIndex(),
			userIndex: this.getUserIndex(),
			boardIndex: this.getBoardIndex(),
			reportLogTitle: this.getReportLogTitle(),
			reportLogContent: this.getReportLogContent()
		};
		return reportLogResource;
	}

}