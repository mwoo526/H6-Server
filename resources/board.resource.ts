export class BoardResource{
    private userIndex;
    private category;
    private boardTitle;
    private boardContent;
    private count;

    constructor(boardData){
        this.setUserIndex(boardData.userIndex);
        this.setCategory(boardData.category);
        this.setBoardTitle(boardData.boardTitle);
        this.setBoardContent(boardData.boardContent);
    }

    getUserIndex(){
        return this.userIndex;
    }

    setUserIndex(userIndex){
        this.userIndex=userIndex;
    }

    getCategory(){
        return this.category;
    }

    setCategory(category){
        this.category=category;
    }

    getBoardTitle(){
        return this.boardTitle;
    }

    setBoardTitle(boardTitle){
        this.boardTitle=boardTitle;
    }

    getBoardContent(){
        return this.boardContent;
    }

    setBoardContent(boardContent){
        this.boardContent=boardContent;
    }

    getCount(){
        return this.count;
    }

    setCount(count){
        this.count=count;
    }

    getBoard(){
        let boardData : object = {
            userIndex : this.getUserIndex(),
            category : this.getCategory(),
            boardTitle : this.getBoardTitle(),
            boardContent : this.getBoardContent()
        };
        return boardData;
    }

}