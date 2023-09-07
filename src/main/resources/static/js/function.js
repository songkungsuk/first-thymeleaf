//---------------------------------div요소------------------------------------
const upKey = document.querySelector('#upKey');
const downKey = document.querySelector('#downKey');
const leftKey = document.querySelector('#leftKey');
const rightKey = document.querySelector('#rightKey');
const spaceKey = document.querySelector('#spaceKey');
const cKey = document.querySelector('#cKey');
const zKey = document.querySelector('#zKey');
const startBtn = document.querySelector('#startBtn');
//----------------------------------------------------------------------------
let tetrisBoard = []; //내가 조종할 테트리스
let stackedBoard = []; // 쌓인 테트리스 공간
let nextBlockBoard = []; // 다음에 보여줄 블럭
let stacked_height = 0; // 쌓여있는 테트리스중 가장 높이쌓인위치
let previoustMoveX = 0;
function tetrisBoardArray() {
    // 세로 29칸, 가로 12칸 테트리스 배열
    for (let height = 0; height < 29; height++) {
        tetrisBoard[height] = [];
        for (let width = 0; width < 12; width++) {
            tetrisBoard[height][width] = false; // 아직 아무것도 쌓인게 없어서 false
        }
    }
}

function stackedBoardArray() {
    // 세로 29칸, 가로 12칸 테트리스 배열
    for (let height = 0; height < 29; height++) {
        stackedBoard[height] = [];
        for (let width = 0; width < 12; width++) {
            stackedBoard[height][width] = false; // 아직 아무것도 쌓인게 없어서 false
        }
    }
}

function nextBlockBoardArray() {
    // 세로 20칸, 가로 10칸 테트리스 배열
    for (let height = 0; height < 20; height++) {
        nextBlockBoard[height] = [];
        for (let width = 0; width < 10; width++) {
            nextBlockBoard[height][width] = false; // 아직 아무것도 쌓인게 없어서 false
        }
    }
}

// 배열생성
tetrisBoardArray();
stackedBoardArray();
nextBlockBoardArray();

// 방식(Math)
function getRandomBlockIndex() {
    return Math.floor(Math.random() * 7); // 0부터 6까지의 숫자를 랜덤으로 반환
}
class NextBlock {
    constructor() {
        this.currentBlockIndex = this.getRandomBlockIndex();
    }

    getRandomBlockIndex() {
        return Math.floor(Math.random() * 7) + 1; // 1부터 7까지의 숫자를 랜덤으로 반환
    }

    getNextBlock() {
        this.currentBlockIndex = this.getRandomBlockIndex();
        return this.currentBlockIndex;
    }
}
const nextBlockGenerator = new NextBlock();
let blockIndex = [];
//블럭 7개 중복되지않게 뽑아내기
function makeRandBlockIndex() {
    //시작하기 버튼을 눌럿을때 해줌
    if (blockIndex.length == 0) {
        for (let i = 0; i < 7; i++) {
            let blockIndexNum = nextBlockGenerator.getNextBlock();
            if (blockIndex.includes(blockIndexNum)) {
                i--;
            } else {
                blockIndex.push(blockIndexNum);
            }

        }
    }

}

//1~7 숫자를 랜덤으로 생성된것에 따라 블럭을 골라서 리턴
function chooseBlock(num) {
    switch (num) {
        case 1:
            return blocks.blockTypeOne;
        case 2:
            return blocks.blockTypeTwo;
        case 3:
            return blocks.blockTypeThree;
        case 4:
            return blocks.blockTypeFour;
        case 5:
            return blocks.blcokTypeFive;
        case 6:
            return blocks.blockTypeSix;
        case 7:
            return blocks.blockTypeSeven;
    }
}
//1~7 숫자를 랜덤으로 생성된것에 따라 색깔을 골라서 리턴
function chooseColor(num) {
    switch (num) {
        case 1:
            context.fillStyle = '#a2ddf3';
            break;
        case 2:
            context.fillStyle = '#f3a2ca';
            break;
        case 3:
            context.fillStyle = '#a2f3db';
            break;
        case 4:
            context.fillStyle = '#56a6ff';
            break;
        case 5:
            context.fillStyle = '#f3c8a2';
            break;
        case 6:
            context.fillStyle = '#eaa2f3';
            break;
        case 7:
            context.fillStyle = '#a2a6f3';
            break;
    }
}
//1~7 숫자를 랜덤으로 생성된것에 따라 색깔을 골라서 리턴
function chooseNextBlockColor(num) {
    switch (num) {
        case 1:
            nextBlockContext.fillStyle = '#a2ddf3';
            break;
        case 2:
            nextBlockContext.fillStyle = '#f3a2ca';
            break;
        case 3:
            nextBlockContext.fillStyle = '#a2f3db';
            break;
        case 4:
            nextBlockContext.fillStyle = '#56a6ff';
            break;
        case 5:
            nextBlockContext.fillStyle = '#f3c8a2';
            break;
        case 6:
            nextBlockContext.fillStyle = '#eaa2f3';
            break;
        case 7:
            nextBlockContext.fillStyle = '#a2a6f3';
            break;
    }
}

//키이벤트
function handleKeyPress(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            if (move_x > 0 - controll_x_min) { //블록의 x 최소좌표가 1인경우 왼쪽으로 한번더 밀어줘야함..
                if (move_x != 0) { // move_x 가 0이 되면 블록의 왼쪽에는 아무것도없어서 실행이안되게됨
                    for (let i = 0; i < block_h.length; i++) { //블럭개수가 4개이므로 4번반복하겠죠..?
                        if (stackedBoard[block_h[i]][block_w[i] - 1]) { //블럭의 현재좌표 왼쪽에 쌓인블럭이 있다면?
                            can_move = false; //움직이지 않는다.
                        }
                    }
                }

                if (can_move) { //움직일수있으면 ? 움직인다 ..
                    move_x--; //왼쪽으로갈땐 -- 
                }

                can_move = true; //그리고 다시원래대로 돌림.
            }
            leftKey.style.backgroundColor = '#f0f0f0';
            break;
        case 39: // Right arrow
            if (move_x < widthBlockCount - (controll_x + 1)) { //블록은 x좌표가 0부터 그리는데 블록의 오른쪽최대좌표가 3이라면  오른쪽 블록 최대개수에서 왼쪽으로 3번떨어져야겠죠 ? 근데 배열은 0부터 시작하니까 블록의 최대좌표가 2일때는 +1해주고! 그려주면 화면을빠져나오지않습니다.
                for (let i = 0; i < block_h.length; i++) { //블럭개수가 4개이므로 4번반복하겠죠..?
                    if (stackedBoard[block_h[i]][block_w[i] + 1]) { //블럭의 현재좌표 오른쪽에 쌓인블럭이 있다면?
                        can_move = false; //움직이지 않는다.
                    }
                }
                if (can_move) { //움직일수있으면 ? 움직인다 ..!
                    move_x++; //오른쪽으로갈땐 ++
                }
                can_move = true; //키이벤트가 끝나면 원래대로 돌려요!
            }
            rightKey.style.backgroundColor = '#f0f0f0';
            break;
        case 40: // Down arrow
            if (move_y < 26) {
                // 맨 밑에 닿으면 안 내려가게 하려고
                // 맨밑으로 갔을때
                if (move_y == heightBlockCount - (controll_y + 1)) { //블럭이 바닥으로 갔을때
                    //블럭의 높낮이에 따라서 블럭을올려주거나 낮춰줌 controll_y 값이 달라짐
                    for (let i = 0; i < randomBlock[0].length; i++) {
                        let w = randomBlock[rotate_num][i][0] + move_x; // x 좌표
                        let h = randomBlock[rotate_num][i][1] + move_y; // y 좌표
                        stackedBoard[h][w] = true;
                    }
                    getRandAndInitMoveY();
                } else {
                    move_y++; //내려갈때는 y가 늘어가야되므로 y++
                }

            }
            downKey.style.backgroundColor = '#f0f0f0';
            break;
        case 38: // Up arrow
            // 위 방향키가 안 눌린 상태면 눌린 상태로 바꾸고, 눌린 상태면 slowDown() 실행해서 느려지게 함
            if (!isUpKeyPressed) {
                isUpKeyPressed = true;
                // 0.2초마다 1칸씩 내려가게 함
                let interval = setInterval(function () {
                    if (isUpKeyPressed) {
                        move_y--;
                    } else {
                        clearInterval(interval);
                    }
                }, 200); // 더 천천히 하거나 빠르게 할거면 이거 숫자 바꾸면 됨
            }
            upKey.style.backgroundColor = '#f0f0f0';
            break;
        case 90: // 'z' key
            rotate--;
            zKey.style.backgroundColor = '#f0f0f0';
            break;
        case 67: // 'c' key
            rotate++;
            cKey.style.backgroundColor = '#f0f0f0';
            break;
        case 16: // Shift key
            // 블록 저장 기능 추가
            break;
        case 32: // Space bar
            // 바로 떨어지게 하기 기능 추가
            spaceKey.style.backgroundColor = '#f0f0f0';
            check_stacked();
            player.play(drop);
            if (!(move_y > heightBlockCount - (controll_y + 1 + stacked_height + 1))) { // 테트리스 전체 높이에서 블럭의 최대길이와 가장높이쌓인것을 빼서 그게 블럭의 위치보다 낮지 않으면 실행 move_y는 계속증가한다
                move_y = heightBlockCount - (controll_y + 1 + stacked_height + 3); //+3은 위치조절해줄려고 했음 빼주는 숫자가 커질수록 블럭이 위로올라감
            }
            break;
        case 66: //b 버튼
            player._stop(bgm);
            break;
    }
}
//키업
function handleKeyUp(event) {
    switch (event.keyCode) {
        case 37: // Left arrow
            leftKey.style.backgroundColor = 'gray';
            break;
        case 39: // Right arrow
            rightKey.style.backgroundColor = 'gray';
            break;
        case 40: // Down arrow
            downKey.style.backgroundColor = 'gray';
            break;
        case 38: // Up arrow
            upKey.style.backgroundColor = 'gray';
            break;
        case 90: // 'z' key
            zKey.style.backgroundColor = 'gray';
            break;
        case 67: // 'c' key
            cKey.style.backgroundColor = 'gray';
            break;
        case 16: // Shift key
            // 블록 저장 기능 추가
            break;
        case 32: // Space bar
            spaceKey.style.backgroundColor = 'gray';
            break;
    }
}
//--------------------------------------------------------------------------------------------------------------
//초기화
function initCanvas() {
    // 배경 그리기
    context.fillStyle = "black"; //캔버스 블럭 색깔 종류
    for (let h = 0; h < heightBlockCount; h++) {
        //가로세로 블럭수만큼 캔버스에 블럭그려넣기
        for (let w = 0; w < widthBlockCount; w++) {
            context.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}
//블럭색칠
function drawBlock(h, w) {
    //원하는 블럭에 색칠하기
    tetrisBoard[h][w] = true;

}
// 조종할 블럭과 쌓인 블럭을 그려주는 함수
function drawBlocks() {
    //배열이 ture인지 false인지 확인하여 블록의 유무정함
    for (let h = 0; h < heightBlockCount; h++) {
        for (let w = 0; w < widthBlockCount; w++) {
            if (tetrisBoard[h][w]) {
                //내가 움직이는것
                // context.fillStyle = "yellow";
                chooseColor(blockIndex[0]);
            } else if (stackedBoard[h][w]) {
                //쌓인블록
                context.fillStyle = "#c3c3c3";
            } else {
                context.fillStyle = "black";
            }
            context.fillRect(borderWidth * w + blocksize * w, borderWidth * h + blocksize * h, blocksize, blocksize);
        }
    }
}
//다음 블럭 보여주는것
function initNextBlockCanvas() {
    // 배경 그리기
    nextBlockContext.fillStyle = "black"; //캔버스 블럭 색깔 종류
    for (let h = 0; h < nextheightBlockCount; h++) {
        //가로세로 블럭수만큼 캔버스에 블럭그려넣기
        for (let w = 0; w < nextwidthBlockCount; w++) {
            nextBlockContext.fillRect(0, 0, canvas.width, canvas.height);
        }
    }
}
//다음에 보여줄 블력 그리기
function drawNextBlock() {
    chooseNextBlockColor(blockIndex[1]);
    chooseColor()
    for (let h = 0; h < nextheightBlockCount; h++) {
        for (let w = 0; w < nextwidthBlockCount; w++) {
            if (nextBlockBoard[h][w]) {
                nextBlockContext.fillRect(nextBoarderWidth * h + nextBlocksize * h, nextBoarderWidth * w + nextBlocksize * w, nextBlocksize, nextBlocksize);
            }
        }
    }
}
//블력그리기
function drawNextBlockOne(x, y) {
    if (blockIndex[1] == 4) {
        nextBlockBoard[x + 2][y + 3] = true; //ㅁ 모양일때 가운데로 안가가지고 이렇게했습니다
    } else {
        nextBlockBoard[x + 1][y + 3] = true; // 그외는 다이렇게 무지성 하드코딩;;
    }
}
// 블럭보여주기
function showNextBlock() {
    for (let i = 0; i < chooseBlock(blockIndex[1]).length; i++) {
        let x = chooseBlock(blockIndex[1])[0][i][0]; // x 좌표
        let y = chooseBlock(blockIndex[1])[0][i][1]; // y 좌표
        drawNextBlockOne(x, y);
    }
    drawNextBlock();
    nextBlockBoard.length = 0;
    nextBlockBoardArray();
}
//블럭 인덱스 배열에 미리 넣어주면서 새로 나올블록도 나오게 해줌 
function getRandAndInitMoveY() {
    // blockIndex.push(nextBlockGenerator.getNextBlock()); //랜덤수 생성해서 인덱스 배열에 넣기
    if (blockIndex.length == 2) {
        for (let i = 0; i < 5; i++) { //블럭 5개 중복되지않게 뽑아내기
            let blockIndexNum = nextBlockGenerator.getNextBlock();
            if (blockIndex.includes(blockIndexNum)) {
                i--;
            } else {
                blockIndex.push(blockIndexNum);
            }

        }
    }
    blockIndex.shift(); // 배열의 첫번째 요소 제거
    randomBlock = chooseBlock(blockIndex[0]); //랜덤블록은 첫번째를 제거한 1번째 인덱스가 되는것
    move_y = 0;
}

// 블럭 없에고 점수 올리기
function getBlockScore() {
    for (let h = 0; h < heightBlockCount; h++) {
        countTrue = 0; //버그 테스트용
        for (let w = 0; w < widthBlockCount; w++) {
            if (stackedBoard[h][w]) {
                //해당하는 블럭이 채워져있으면
                countTrue++; //한줄에있는 블럭개수는늘어난다
                if (countTrue === widthBlockCount) {
                    countTrue = 0; //이걸 바로해줘야 다음줄에 1칸이비워져있어도 안내려감 이걸밑으로해버리면 밑의 로직을수행하면서 countTrue가 widthBlockCount와 동일하게 되면서 지워진다
                    // x축(width)이 전부 채워지면 widthBlockCount는 12가 됨
                    for (let z = 0; z < widthBlockCount; z++) {
                        //z를 x좌표(width라고 생각하면 이해할수있음
                        stackedBoard[h][z] = false; //블럭없엠
                        for (let j = h; j > 0; j--) {
                            //j를 y좌표(height)라고 생각하기 y좌표는 클수록 아래 작을수록 위라서 j--로했음
                            stackedBoard[j][z] = stackedBoard[j - 1][z]; //위에있는 블럭들 다 아래로 끌어옴 -1 인이유는 y축이 아래로 갈수록 증가하기 때문에 위에있는배열은 수가작다
                        }
                    }
                    stacked_height = 0; //제일 높이쌓인위치 초기화 인터벌마다 체크해줘서 다시 숫자가 변할것임
                    score += 1000; // 점수올리기
                    player.play(clearLine); //효과음 재생
                    document.querySelector("#score").innerHTML = score;// 점수적어줌

                }
            } else {
                countTrue = 0;
                continue;
            }
        }
    }
}

//제일 높이 쌓여있는 블럭의 높이를 저장하는 함수
function check_stacked() {
    for (let w = 0; w < widthBlockCount; w++) {
        for (let h = 0; h < heightBlockCount; h++) {
            if (stackedBoard[h][w]) {
                stacked_number++;
            }
        }
        if (stacked_height < stacked_number) { //제일 높이쌓여있는 블럭이 계산된 블럭보다 작을경우대입
            stacked_height = stacked_number;
        }
        stacked_number = 0;
    }
}



