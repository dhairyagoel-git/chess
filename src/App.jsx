import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function App() {
  const [activeIndex, setactiveIndex] = useState(null);
  const [checkIndex , setcheckIndex]=useState(null);
  const [currChance, setcurrChance] = useState("w");
  const [sequence, setSequence] = useState([]);
  const [PossibleMoves, setPossibleMoves] = useState([]);
  const [KingIndex, setKingIndex] = useState(null);
  const [capturedPeice, setcapturedPeice] = useState([]);
  const [isCheck, setisCheck] = useState(false);
  const [isMated, setisMated]=useState(false)
  const [KingsMoves, setKingsMoves] = useState([]);
  const [checkProtectors,setcheckProtectors]=useState([]);
  const [SelectPeiceToMoveKing , setSelectPeiceToMoveKing]=useState(false);
  const [Board, setBoard] = useState([
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ]);
  const [InitialBoard, setInitialBoard] = useState([
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ]);
  const [prevBoard, setprevBoard] = useState([
    ["♜", "♞", "♝", "♛", "♚", "♝", "♞", "♜"],
    ["♟", "♟", "♟", "♟", "♟", "♟", "♟", "♟"],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", ""],
    ["♙", "♙", "♙", "♙", "♙", "♙", "♙", "♙"],
    ["♖", "♘", "♗", "♕", "♔", "♗", "♘", "♖"],
  ]);
  const BlackPeice = [
    "♜",
    "♞",
    "♝",
    "♛",
    "♚",
    "♝",
    "♞",
    "♜",
    "♟",
    "♟",
    "♟",
    "♟",
    "♟",
    "♟",
    "♟",
    "♟",
  ];
  const WhitePeice = [
    "♖",
    "♘",
    "♗",
    "♕",
    "♔",
    "♗",
    "♘",
    "♖",
    "♙",
    "♙",
    "♙",
    "♙",
    "♙",
    "♙",
    "♙",
    "♙",
  ];
  useEffect(() => {
    isChecked();
    // isMated()
  }, [currChance]);

  const getPosition = (i, j) => {
    let Letter = String.fromCharCode(j + 65);
    let number = 8 - i;
    let Position = Letter + number;
    // console.log("Retrieved Position : ", Position);
    return Position;
  };
  const getPossibleMoves = (i, j, mode) => {
    const Piece = Board[i][j];
    const moves = [];
    // console.log(i, j);

    if (Piece == "♜" || Piece == "♖") {
      const Counter = Piece == "♜" ? [...WhitePeice] : [...BlackPeice];
      for (let k = j - 1; k >= 0; k--) {
        if (Board[i][k] != "") {
          if (Counter.includes(Board[i][k])) moves.push(i * 10 + k);
          break;
        }
        moves.push(i * 10 + k);
      }
      for (let k = j + 1; k < 8; k++) {
        if (Board[i][k] != "") {
          if (Counter.includes(Board[i][k])) moves.push(i * 10 + k);
          break;
        }
        moves.push(i * 10 + k);
      }
      for (let k = i - 1; k >= 0; k--) {
        if (Board[k][j] != "") {
          if (Counter.includes(Board[k][j])) moves.push(k * 10 + j);
          break;
        }
        moves.push(k * 10 + j);
      }
      for (let k = i + 1; k < 8; k++) {
        if (Board[k][j] != "") {
          if (Counter.includes(Board[k][j])) moves.push(k * 10 + j);
          break;
        }
        moves.push(k * 10 + j);
      }
    } else if (Piece == "♞" || Piece == "♘") {
      // console.log("Godha");
      const checkArr = Piece == "♞" ? [...BlackPeice] : [...WhitePeice];
      if (i + 2 < 8 && j + 1 < 8 && !checkArr.includes(Board[i + 2][j + 1])) {
        moves.push((i + 2) * 10 + (j + 1));
      }
      if (i + 1 < 8 && j + 2 < 8 && !checkArr.includes(Board[i + 1][j + 2])) {
        moves.push((i + 1) * 10 + (j + 2));
      }
      if (i - 1 >= 0 && j - 2 >= 0 && !checkArr.includes(Board[i - 1][j - 2])) {
        moves.push((i - 1) * 10 + (j - 2));
      }
      if (i + 1 < 8 && j - 2 >= 0 && !checkArr.includes(Board[i + 1][j - 2])) {
        moves.push((i + 1) * 10 + (j - 2));
      }
      if (i - 1 >= 0 && j + 2 < 8 && !checkArr.includes(Board[i - 1][j + 2])) {
        moves.push((i - 1) * 10 + (j + 2));
      }
      if (i - 2 >= 0 && j - 1 >= 0 && !checkArr.includes(Board[i - 2][j - 1])) {
        moves.push((i - 2) * 10 + (j - 1));
      }
      if (i + 2 < 8 && j - 1 >= 0 && !checkArr.includes(Board[i + 2][j - 1])) {
        moves.push((i + 2) * 10 + (j - 1));
      }
      if (i - 2 >= 0 && j + 1 < 8 && !checkArr.includes(Board[i - 2][j + 1])) {
        moves.push((i - 2) * 10 + (j + 1));
      }
      // console.log("Possible moves for ghodha are : ");
      // for (let l = 0; l < moves.length; l++) {
      //   console.log(moves[l]);
      // }
    } else if (Piece == "♝" || Piece == "♗") {
      // console.log("UUth");
      const checkArr = Piece == "♝" ? [...BlackPeice] : [...WhitePeice];
      var k1 = i + 1,
        k2 = j + 1;
      while (k1 < 8 && k2 < 8) {
        if (checkArr.includes(Board[k1][k2])) break;
        else if (Board[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1++;
        k2++;
      }
      (k1 = i - 1), (k2 = j + 1);
      while (k1 >= 0 && k2 < 8) {
        if (checkArr.includes(Board[k1][k2])) break;
        else if (Board[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1--;
        k2++;
      }
      (k1 = i - 1), (k2 = j - 1);
      while (k1 >= 0 && k2 >= 0) {
        if (checkArr.includes(Board[k1][k2])) break;
        else if (Board[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1--;
        k2--;
      }
      (k1 = i + 1), (k2 = j - 1);
      while (k1 < 8 && k2 >= 0) {
        if (checkArr.includes(Board[k1][k2])) break;
        else if (Board[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1++;
        k2--;
      }
    } else if (Piece == "♚" || Piece == "♔") {
      // console.log("Raja");
      const checkArr = Piece == "♚" ? [...BlackPeice] : [...WhitePeice];
      if (i + 1 < 8 && j + 1 < 8 && !checkArr.includes(Board[i + 1][j + 1]))
        moves.push((i + 1) * 10 + j + 1);
      if (j + 1 < 8 && !checkArr.includes(Board[i][j + 1]))
        moves.push(i * 10 + j + 1);
      if (i + 1 < 8 && !checkArr.includes(Board[i + 1][j]))
        moves.push((i + 1) * 10 + j);
      if (i - 1 >= 0 && j + 1 < 8 && !checkArr.includes(Board[i - 1][j + 1]))
        moves.push((i - 1) * 10 + j + 1);
      if (i + 1 < 8 && j - 1 >= 0 && !checkArr.includes(Board[i + 1][j - 1]))
        moves.push((i + 1) * 10 + j - 1);
      if (i - 1 >= 0 && j - 1 >= 0 && !checkArr.includes(Board[i - 1][j - 1]))
        moves.push((i - 1) * 10 + j - 1);
      if (i - 1 >= 0 && !checkArr.includes(Board[i - 1][j]))
        moves.push((i - 1) * 10 + j);
      if (j - 1 >= 0 && !checkArr.includes(Board[i][j - 1]))
        moves.push(i * 10 + j - 1);
    } else if (Piece == "♛" || Piece == "♕") {
      // console.log("Rani");
      const checkArr = Piece == "♛" ? [...BlackPeice] : [...WhitePeice];
      const Counter = Piece == "♛" ? [...WhitePeice] : [...BlackPeice];
      var k1 = i + 1,
        k2 = j + 1;
      while (k1 < 8 && k2 < 8) {
        if (checkArr.includes(Board[k1][k2])) break;
        else if (Board[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1++;
        k2++;
      }
      (k1 = i - 1), (k2 = j + 1);
      while (k1 >= 0 && k2 < 8) {
        if (checkArr.includes(Board[k1][k2])) break;
        else if (Board[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1--;
        k2++;
      }
      (k1 = i - 1), (k2 = j - 1);
      while (k1 >= 0 && k2 >= 0) {
        if (checkArr.includes(Board[k1][k2])) break;
        else if (Board[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1--;
        k2--;
      }
      (k1 = i + 1), (k2 = j - 1);
      while (k1 < 8 && k2 >= 0) {
        if (checkArr.includes(Board[k1][k2])) break;
        else if (Board[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1++;
        k2--;
      }
      for (let k = j - 1; k >= 0; k--) {
        if (Board[i][k] != "") {
          if (Counter.includes(Board[i][k])) moves.push(i * 10 + k);
          break;
        }
        moves.push(i * 10 + k);
      }
      for (let k = j + 1; k < 8; k++) {
        if (Board[i][k] != "") {
          if (Counter.includes(Board[i][k])) moves.push(i * 10 + k);
          break;
        }
        moves.push(i * 10 + k);
      }
      for (let k = i - 1; k >= 0; k--) {
        if (Board[k][j] != "") {
          if (Counter.includes(Board[k][j])) moves.push(k * 10 + j);
          break;
        }
        moves.push(k * 10 + j);
      }
      for (let k = i + 1; k < 8; k++) {
        if (Board[k][j] != "") {
          if (Counter.includes(Board[k][j])) moves.push(k * 10 + j);
          break;
        }
        moves.push(k * 10 + j);
      }
      // console.log("Possible moves for rani are : ");
      // for (let l = 0; l < moves.length; l++) {
      //   console.log(moves[l]);
      // }
    } else if (Piece == "♟" || Piece == "♙") {
      // console.log("Pyada");
      const color = Piece == "♟" ? "b" : "w";
      const CounterArray = Piece == "♟" ? [...WhitePeice] : [...BlackPeice];
      if (color == "b") {
        if (i + 1 < 8 && Board[i + 1][j] == "") moves.push((i + 1) * 10 + j);
        if (i == 1 && Board[i + 1][j] == "" && Board[i + 2][j] == "")
          moves.push((i + 2) * 10 + j);
        if (
          i + 1 < 8 &&
          j + 1 < 8 &&
          CounterArray.includes(Board[i + 1][j + 1])
        )
          moves.push((i + 1) * 10 + j + 1);
        if (
          i + 1 < 8 &&
          j - 1 >= 0 &&
          CounterArray.includes(Board[i + 1][j - 1])
        )
          moves.push((i + 1) * 10 + j - 1);
      }
      if (color == "w") {
        if (i - 1 >= 0 && Board[i - 1][j] == "") moves.push((i - 1) * 10 + j);
        if (i == 6 && Board[i - 1][j] == "" && Board[i - 2][j] == "")
          moves.push((i - 2) * 10 + j);
        if (
          i - 1 >= 0 &&
          j - 1 >= 0 &&
          CounterArray.includes(Board[i - 1][j - 1])
        )
          moves.push((i - 1) * 10 + j - 1);
        if (
          i - 1 >= 0 &&
          j + 1 < 8 &&
          CounterArray.includes(Board[i - 1][j + 1])
        )
          moves.push((i - 1) * 10 + j + 1);
      }
    }

    if (mode != "c") setPossibleMoves(moves);

    return moves;
  };
  function selectPeice(e, index) {
    e.stopPropagation();
    if(SelectPeiceToMoveKing){
      const i1 = Math.floor(KingIndex / 10);
      const j1 = KingIndex % 10;
      const i2 = Math.floor(index / 10);
      const j2 = index % 10;
      const TakenPeice = Board[i2][j2];
      const newBoard = [...Board];
      console.log(`Moving from ${i1} and ${j1} to ${i2} and ${j2}`)
      newBoard[i2][j2]=newBoard[i1][j1];
      newBoard[i1][j1]="";
      setisCheck(false);
      setSelectPeiceToMoveKing(false);
      setPossibleMoves([]);
      setcheckIndex(null);
      setKingIndex(null);
      setKingsMoves([]);
      if(Board[i2][j2]!="") {
        const Captured = [...capturedPeice];
        Captured.push(TakenPeice);
        setcapturedPeice(Captured);}
      const Position = getPosition(i2, j2);
      setSequence((prevArray) => [...prevArray, Position]);
      setprevBoard(Board);
      setBoard(newBoard);
      currChance == "w" ? setcurrChance("b") : setcurrChance("w");
      return;
    }
    if (isCheck) {
      const j1 = KingIndex % 10;
      const i1 = Math.floor(KingIndex / 10);
       if (currChance == "w" && Board[i1][j1] != "♔")
        toast.info("You have been checked Please move the king");
      else if (currChance == "b" && Board[i1][j1] != "♚")
        toast.info("You have been checked Please move the king");
      else
        setPossibleMoves(KingsMoves);
        setSelectPeiceToMoveKing(true);
        return;
    }

    if (activeIndex == null) {
      const j1 = index % 10;
      const i1 = Math.floor(index / 10);
      if (Board[i1][j1] == "") {
        console.log("The movement can't from on a space.");
        return;
      } else if (currChance == "w" && !WhitePeice.includes(Board[i1][j1])) {
        console.log("Select a white peice");
      } else if (currChance == "b" && !BlackPeice.includes(Board[i1][j1])) {
        console.log("Select a black peice");
      }
      else {
        setactiveIndex(index);
        console.log(`Focus installed on ${Board[i1][j1]}`);
        getPossibleMoves(i1, j1, "g");
      }
    } else {
      const j1 = activeIndex % 10;
      const i1 = Math.floor(activeIndex / 10);
      const j2 = index % 10;
      const i2 = Math.floor(index / 10);
      if (i1 == i2 && j1 == j2) {
        console.log("Can't move on the same block.");
        removeFocus();
        return;
      }

      if (currChance == "w" && WhitePeice.includes(Board[i2][j2])) {
        console.log("Cannot move to a white peice");
        removeFocus();
        setactiveIndex(index);
        getPossibleMoves(i2, j2, "g");
        return;
      } else if (currChance == "b" && BlackPeice.includes(Board[i2][j2])) {
        console.log("Cannot move to a black peice");
        removeFocus();
        setactiveIndex(index);
        getPossibleMoves(i2, j2, "g");
        return;
      }
      if (!PossibleMoves.includes(i2 * 10 + j2)) {
        console.log("Not a correct position for this peice");
        return;
      }
      const newBoard = Board.map((row) => [...row]);
      if (Board[i2][j2] == "") {
        console.log(`Moved ${Board[i1][j1]} to position ${i1},${j1}`);
        const peice = newBoard[i1][j1];
        newBoard[i1][j1] = newBoard[i2][j2];
        newBoard[i2][j2] = peice;
      } else {
        const TakenPeice = Board[i2][j2];
        newBoard[i2][j2] = newBoard[i1][j1];
        newBoard[i1][j1] = "";
        const Captured = [...capturedPeice];
        Captured.push(TakenPeice);
        setcapturedPeice(Captured);
        console.log(`${Board[i1][j1]} takes the peice ${Board[i2][j2]}`);
      }
      const Position = getPosition(i2, j2);
      setSequence((prevArray) => [...prevArray, Position]);
      setprevBoard(Board);
      setBoard(newBoard);
      setactiveIndex(null);
      setPossibleMoves([]);
      currChance == "w" ? setcurrChance("b") : setcurrChance("w");
      // isChecked(newBoard);
    }
  }

  function isChecked() {
    // console.log("isChecked is called");
    const CurrPeices = currChance == "w" ? [...BlackPeice] : [...WhitePeice];
    const MyPieces = currChance == "b" ? [...BlackPeice] : [...WhitePeice];

    const MyKing = currChance == "w" ? "♔" : "♚";
    let MyKingIndex;

    // console.log(`My king : ${MyKing}`);
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (Board[i][j] == MyKing) {
          MyKingIndex = i * 10 + j;
          // console.log("Setting my king index");
          break;
        }
      }
    }
    let isThereACheck = false;
    let peicesGivingCheck = [];
    // console.log(`My king index : ${MyKingIndex}`);
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (CurrPeices.includes(Board[i][j])) {
          const reachableSquares = getPossibleMoves(i, j, "c");

          if (reachableSquares.includes(MyKingIndex)) {
            isThereACheck = true;
            peicesGivingCheck.push(i * 10 + j);
          }
        }
      }
    }
    if (isThereACheck) {
      setKingIndex(MyKingIndex);
      // setcheckingPeices(peicesGivingCheck);
      setisCheck(isThereACheck);
      toast.info(`${currChance == "w" ? "white" : "black"} has been checked`);
      let KingMoves = getPossibleMoves(
        Math.floor(MyKingIndex / 10),
        MyKingIndex % 10,
        "c"
      );
      // console.log("Before", KingMoves);
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (CurrPeices.includes(Board[i][j])) {
            let ThreatningMoves = getPossibleMoves(i, j, "c");
            for (let k = 0; k < ThreatningMoves.length; k++) {
              if (KingMoves.includes(ThreatningMoves[k])) {
                KingMoves = KingMoves.filter((x) => x != ThreatningMoves[k]);
              }
            }
          }
        }
      }
      if(peicesGivingCheck.length==1){
        for(let i=0;i<8;i++){
          for(let j = 0;j<8;j++){
            if(MyPieces.includes(Board[i][j])){
              
            }
          }
        }
      }
      setKingsMoves(KingMoves);
      setcheckIndex(MyKingIndex);
      if(KingMoves.length == 0){
        toast.info(`${currChance == 'w' ? 'White' : 'Black'} has been mated`);
        
      }
    }
  }
  function canSaveCheck(Board,i,j){
    const moves = getPossibleMoves(i,j,'c');
    
  }
  function removeFocus() {
    if (activeIndex == null) return;
    setactiveIndex(null);
    setPossibleMoves([]);
    console.log("focus removed");
  }
  function setPrevState() {
    if (prevBoard.length != 0) {
      setBoard(prevBoard);
      setprevBoard([]);
      setcurrChance(currChance == "w" ? "b" : "w");
      const sq = [...sequence];
      sq.pop();
      setSequence(sq);
    }
  }
  function resetBoard() {
    setBoard(InitialBoard);
    setSequence([]);
    setcurrChance("w");
    setcapturedPeice([]);
  }
  return (
    <div className="flex-row ">
      <div className="border text-center w-16 rounded-md  m-auto mt-7">
        {currChance == "w" ? "White" : "Black"}
      </div>
      <div
        onClick={() => {
          removeFocus();
        }}
        className=" flex py-10  gap-10 justify-center w-screen "
      >
        <ul className=" w-40 rounded-md border p-4">
          {capturedPeice.map((ele, eleIndex) => {
            return <li key={eleIndex}>{ele}</li>;
          })}
        </ul>

        <ul className="gap-3 gap-y-0 grid grid-cols-8 ">
          {Board.map((row, rowIndex) =>
            row.map((peice, colIndex) => {
              let bgColor =
                (rowIndex + colIndex) % 2 === 0 ? "bg-white" : "bg-gray-500";
              if (activeIndex == rowIndex * 10 + colIndex)
                bgColor = "bg-gray-200";
              if( checkIndex == rowIndex *10 + colIndex)
                bgColor = "bg-red-300";
           
              
              return (
                <li
                  key={`${rowIndex}-${colIndex}`}
                  onClick={(e) => selectPeice(e, rowIndex * 10 + colIndex)}
                  className={`${
                    PossibleMoves.includes(rowIndex * 10 + colIndex)
                      ? `bg-gray-700`
                      : bgColor
                  }  rounded-md hover:bg-gray-300 h-14 w-14 border flex items-center cursor-pointer justify-center text-2xl`}
                >
                  {peice}
                </li>
              );
            })
          )}
        </ul>
        <div>
          <div className="flex gap-3">
            <button
              onClick={() => setPrevState()}
              className="border h-10 px-2 rounded-md cursor-pointer mb-5  hover:bg-gray-200"
            >
              Undo
            </button>
            <button
              onClick={() => resetBoard()}
              className="border h-10 px-2 rounded-md cursor-pointer mb-5  hover:bg-gray-200"
            >
              Reset
            </button>
          </div>
          <ul className="h-120 w-40 rounded-md border p-4">
            {sequence.map((ele, eleIndex) => {
              return <li key={eleIndex}>{ele}</li>;
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
