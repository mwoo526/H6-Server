export class ReportBoardResource {
    private reportBoardIndex;
    private userIndex;
    private boardIndex;
    private reportBoardTitle;
    private reportBoardContent;

    constructor(reportBoardData) {
        this.setReportBoardIndex(reportBoardData.reportBoardIndex);
        this.setUserIndex(reportBoardData.userIndex);
        this.setBoardIndex(reportBoardData.boardIndex);
        this.setReportBoardTitle(reportBoardData.reportBoardTitle);
        this.setReportBoardContent(reportBoardData.reportBoardContent);
    }

    getReportBoardIndex() { return this.reportBoardIndex; }
    setReportBoardIndex(reportBoardIndex) { this.reportBoardIndex = reportBoardIndex; }

    getUserIndex() { return this.userIndex; }
    setUserIndex(userIndex) { this.userIndex = userIndex; }

    getBoardIndex() { return this.boardIndex; }
    setBoardIndex(boardIndex) { this.boardIndex = boardIndex; }

    getReportBoardTitle() { return this.reportBoardTitle; }
    setReportBoardTitle(reportBoardTitle) { this.reportBoardTitle = reportBoardTitle; }

    getReportBoardContent() { return this.reportBoardContent; }
    setReportBoardContent(reportBoardContent) { return this.reportBoardContent = reportBoardContent; }

    getReportBoard() {
        let reportBoardResource: object = {
            reportBoardIndex: this.getReportBoardIndex(),
            userIndex: this.getUserIndex(),
            boardIndex: this.getBoardIndex(),
            reportBoardTitle: this.getReportBoardTitle(),
            reportBoardContent: this.getReportBoardContent()
        };
        return reportBoardResource;
    }

}