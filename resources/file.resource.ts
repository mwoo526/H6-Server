export class FileResource {
	private boardFileIndex;
	private boardIndex;
	private userIndex;
	private fileName;
	private filePath;
	private fileSize;
	private fileExtension;
	private downloadCount;

	constructor(fileData) {
		this.setboardFileIndex(fileData.boardFileIndex);
		this.setboardIndex(fileData.boardIndex);
		this.setuserIndex(fileData.userIndex);
		this.setFileName(fileData.fileName);
		this.setFilePath(fileData.filePath);
		this.setFileSize(fileData.fileSize);
		this.setFileExtension(fileData.fileExtension);
		this.setdownloadCount(fileData.downloadCount);

	}

	getboardFileIndex() {
		return this.boardFileIndex;
	}

	setboardFileIndex(boardFileIndex) {
		this.boardFileIndex = boardFileIndex;
	}

	getboardIndex() {
		return this.boardIndex;
	}

	setboardIndex(boardIndex) {
		this.boardIndex = boardIndex;
	}

	getuserIndex() {
		return this.userIndex;
	}

	setuserIndex(userIndex) {
		this.userIndex = userIndex;
	}

	getFileName() {
		return this.fileName;
	}

	setFileName(fileName) {
		this.fileName = fileName;
	}

	getFilePath() {
		return this.filePath;
	}

	setFilePath(filePath) {
		this.filePath = filePath;
	}

	getFileSize() {
		return this.fileSize;
	}

	setFileSize(fileSize) {
		this.fileSize = fileSize;
	}

	getFileExtension() {
		return this.fileExtension;
	}

	setFileExtension(fileExtension) {
		this.fileExtension = fileExtension;
	}

	getdownloadCount() {
		return this.downloadCount;
	}

	setdownloadCount(downloadCount) {
		this.downloadCount = downloadCount;
	}

	getFile() {
		let fileResource = {
			boardFileIndex: this.getboardFileIndex(),
			boardIndex: this.getboardIndex(),
			userIndex: this.getuserIndex(),
			fileName: this.getFileName(),
			filePath: this.getFilePath(),
			fileSize: this.getFileSize(),
			fileExtension: this.getFileExtension(),
			downloadCount: this.getdownloadCount()
		};
		return fileResource;
	}
}