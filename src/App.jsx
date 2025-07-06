import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
export default function App() {
  const [activeIndex, setactiveIndex] = useState(null);
  const [checkIndex, setcheckIndex] = useState(null);
  const [currChance, setcurrChance] = useState("w");
  const [sequence, setSequence] = useState([]);
  const [PossibleMoves, setPossibleMoves] = useState([]);
  const [KingIndex, setKingIndex] = useState(null);
  const [capturedPeice, setcapturedPeice] = useState([]);
  const [capturedPeicesPrev, setcapturedPeicePrev] = useState([]);
  const [isCheck, setisCheck] = useState(false);
  const [isMated, setisMated] = useState(false);
  const [KingsMoves, setKingsMoves] = useState([]);
  const [checkProtectors, setcheckProtectors] = useState([]);
  const [checkProtectorsMoves, setcheckProtectorsMoves] = useState([]);
  const [SelectPeiceToMoveKing, setSelectPeiceToMoveKing] = useState(false);
  // const [history,sethistory]=useState([]);
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
  const getPossibleMoves = (i, j,mode, ChessBoard = Board) => {
    const Piece = ChessBoard[i][j];
    const moves = [];
    // console.log(i, j);

    if (Piece == "♜" || Piece == "♖") {
      const Counter = Piece == "♜" ? [...WhitePeice] : [...BlackPeice];
      for (let k = j - 1; k >= 0; k--) {
        if (ChessBoard[i][k] != "") {
          if (Counter.includes(ChessBoard[i][k])) moves.push(i * 10 + k);
          break;
        }
        moves.push(i * 10 + k);
      }
      for (let k = j + 1; k < 8; k++) {
        if (ChessBoard[i][k] != "") {
          if (Counter.includes(ChessBoard[i][k])) moves.push(i * 10 + k);
          break;
        }
        moves.push(i * 10 + k);
      }
      for (let k = i - 1; k >= 0; k--) {
        if (ChessBoard[k][j] != "") {
          if (Counter.includes(ChessBoard[k][j])) moves.push(k * 10 + j);
          break;
        }
        moves.push(k * 10 + j);
      }
      for (let k = i + 1; k < 8; k++) {
        if (ChessBoard[k][j] != "") {
          if (Counter.includes(ChessBoard[k][j])) moves.push(k * 10 + j);
          break;
        }
        moves.push(k * 10 + j);
      }
    } else if (Piece == "♞" || Piece == "♘") {
      // console.log("Godha");
      const checkArr = Piece == "♞" ? [...BlackPeice] : [...WhitePeice];
      if (
        i + 2 < 8 &&
        j + 1 < 8 &&
        !checkArr.includes(ChessBoard[i + 2][j + 1])
      ) {
        moves.push((i + 2) * 10 + (j + 1));
      }
      if (
        i + 1 < 8 &&
        j + 2 < 8 &&
        !checkArr.includes(ChessBoard[i + 1][j + 2])
      ) {
        moves.push((i + 1) * 10 + (j + 2));
      }
      if (
        i - 1 >= 0 &&
        j - 2 >= 0 &&
        !checkArr.includes(ChessBoard[i - 1][j - 2])
      ) {
        moves.push((i - 1) * 10 + (j - 2));
      }
      if (
        i + 1 < 8 &&
        j - 2 >= 0 &&
        !checkArr.includes(ChessBoard[i + 1][j - 2])
      ) {
        moves.push((i + 1) * 10 + (j - 2));
      }
      if (
        i - 1 >= 0 &&
        j + 2 < 8 &&
        !checkArr.includes(ChessBoard[i - 1][j + 2])
      ) {
        moves.push((i - 1) * 10 + (j + 2));
      }
      if (
        i - 2 >= 0 &&
        j - 1 >= 0 &&
        !checkArr.includes(ChessBoard[i - 2][j - 1])
      ) {
        moves.push((i - 2) * 10 + (j - 1));
      }
      if (
        i + 2 < 8 &&
        j - 1 >= 0 &&
        !checkArr.includes(ChessBoard[i + 2][j - 1])
      ) {
        moves.push((i + 2) * 10 + (j - 1));
      }
      if (
        i - 2 >= 0 &&
        j + 1 < 8 &&
        !checkArr.includes(ChessBoard[i - 2][j + 1])
      ) {
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
        if (checkArr.includes(ChessBoard[k1][k2])) break;
        else if (ChessBoard[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1++;
        k2++;
      }
      (k1 = i - 1), (k2 = j + 1);
      while (k1 >= 0 && k2 < 8) {
        if (checkArr.includes(ChessBoard[k1][k2])) break;
        else if (ChessBoard[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1--;
        k2++;
      }
      (k1 = i - 1), (k2 = j - 1);
      while (k1 >= 0 && k2 >= 0) {
        if (checkArr.includes(ChessBoard[k1][k2])) break;
        else if (ChessBoard[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1--;
        k2--;
      }
      (k1 = i + 1), (k2 = j - 1);
      while (k1 < 8 && k2 >= 0) {
        if (checkArr.includes(ChessBoard[k1][k2])) break;
        else if (ChessBoard[k1][k2] == "") moves.push(k1 * 10 + k2);
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
      if (
        i + 1 < 8 &&
        j + 1 < 8 &&
        !checkArr.includes(ChessBoard[i + 1][j + 1])
      )
        moves.push((i + 1) * 10 + j + 1);
      if (j + 1 < 8 && !checkArr.includes(ChessBoard[i][j + 1]))
        moves.push(i * 10 + j + 1);
      if (i + 1 < 8 && !checkArr.includes(ChessBoard[i + 1][j]))
        moves.push((i + 1) * 10 + j);
      if (
        i - 1 >= 0 &&
        j + 1 < 8 &&
        !checkArr.includes(ChessBoard[i - 1][j + 1])
      )
        moves.push((i - 1) * 10 + j + 1);
      if (
        i + 1 < 8 &&
        j - 1 >= 0 &&
        !checkArr.includes(ChessBoard[i + 1][j - 1])
      )
        moves.push((i + 1) * 10 + j - 1);
      if (
        i - 1 >= 0 &&
        j - 1 >= 0 &&
        !checkArr.includes(ChessBoard[i - 1][j - 1])
      )
        moves.push((i - 1) * 10 + j - 1);
      if (i - 1 >= 0 && !checkArr.includes(ChessBoard[i - 1][j]))
        moves.push((i - 1) * 10 + j);
      if (j - 1 >= 0 && !checkArr.includes(ChessBoard[i][j - 1]))
        moves.push(i * 10 + j - 1);
    } else if (Piece == "♛" || Piece == "♕") {
      // console.log("Rani");
      const checkArr = Piece == "♛" ? [...BlackPeice] : [...WhitePeice];
      const Counter = Piece == "♛" ? [...WhitePeice] : [...BlackPeice];
      var k1 = i + 1,
        k2 = j + 1;
      while (k1 < 8 && k2 < 8) {
        if (checkArr.includes(ChessBoard[k1][k2])) break;
        else if (ChessBoard[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1++;
        k2++;
      }
      (k1 = i - 1), (k2 = j + 1);
      while (k1 >= 0 && k2 < 8) {
        if (checkArr.includes(ChessBoard[k1][k2])) break;
        else if (ChessBoard[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1--;
        k2++;
      }
      (k1 = i - 1), (k2 = j - 1);
      while (k1 >= 0 && k2 >= 0) {
        if (checkArr.includes(ChessBoard[k1][k2])) break;
        else if (ChessBoard[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1--;
        k2--;
      }
      (k1 = i + 1), (k2 = j - 1);
      while (k1 < 8 && k2 >= 0) {
        if (checkArr.includes(ChessBoard[k1][k2])) break;
        else if (ChessBoard[k1][k2] == "") moves.push(k1 * 10 + k2);
        else {
          moves.push(k1 * 10 + k2);
          break;
        }
        k1++;
        k2--;
      }
      for (let k = j - 1; k >= 0; k--) {
        if (ChessBoard[i][k] != "") {
          if (Counter.includes(ChessBoard[i][k])) moves.push(i * 10 + k);
          break;
        }
        moves.push(i * 10 + k);
      }
      for (let k = j + 1; k < 8; k++) {
        if (ChessBoard[i][k] != "") {
          if (Counter.includes(ChessBoard[i][k])) moves.push(i * 10 + k);
          break;
        }
        moves.push(i * 10 + k);
      }
      for (let k = i - 1; k >= 0; k--) {
        if (ChessBoard[k][j] != "") {
          if (Counter.includes(ChessBoard[k][j])) moves.push(k * 10 + j);
          break;
        }
        moves.push(k * 10 + j);
      }
      for (let k = i + 1; k < 8; k++) {
        if (ChessBoard[k][j] != "") {
          if (Counter.includes(ChessBoard[k][j])) moves.push(k * 10 + j);
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
        if (i + 1 < 8 && ChessBoard[i + 1][j] == "")
          moves.push((i + 1) * 10 + j);
        if (i == 1 && ChessBoard[i + 1][j] == "" && ChessBoard[i + 2][j] == "")
          moves.push((i + 2) * 10 + j);
        if (
          i + 1 < 8 &&
          j + 1 < 8 &&
          CounterArray.includes(ChessBoard[i + 1][j + 1])
        )
          moves.push((i + 1) * 10 + j + 1);
        if (
          i + 1 < 8 &&
          j - 1 >= 0 &&
          CounterArray.includes(ChessBoard[i + 1][j - 1])
        )
          moves.push((i + 1) * 10 + j - 1);
      }
      if (color == "w") {
        if (i - 1 >= 0 && ChessBoard[i - 1][j] == "")
          moves.push((i - 1) * 10 + j);
        if (i == 6 && ChessBoard[i - 1][j] == "" && ChessBoard[i - 2][j] == "")
          moves.push((i - 2) * 10 + j);
        if (
          i - 1 >= 0 &&
          j - 1 >= 0 &&
          CounterArray.includes(ChessBoard[i - 1][j - 1])
        )
          moves.push((i - 1) * 10 + j - 1);
        if (
          i - 1 >= 0 &&
          j + 1 < 8 &&
          CounterArray.includes(ChessBoard[i - 1][j + 1])
        )
          moves.push((i - 1) * 10 + j + 1);
      }
    }

    if (mode != "c") setPossibleMoves(moves);

    return moves;
  };
  function selectPeice(e, index) {
    e.stopPropagation();
    if (SelectPeiceToMoveKing) {
      let i1, j1;
      if (activeIndex != null) {
        i1 = Math.floor(activeIndex / 10);
        j1 = activeIndex % 10;
      } else {
        i1 = Math.floor(KingIndex / 10);
        j1 = KingIndex % 10;
      }
      const i2 = Math.floor(index / 10);
      const j2 = index % 10;
      if (activeIndex != null && index == KingIndex) {
        setPossibleMoves(KingsMoves);
        setactiveIndex(null);
        return;
      } else if (
        activeIndex == null &&
        checkProtectors.some((obj) => obj.start == i2 * 10 + j2)
      ) {
        const ob = checkProtectors.find((obj) => obj.start == i1 * 10 + j1);
        setPossibleMoves([ob.end]);
        setactiveIndex(i2 * 10 + j2);
        return;
      }
      if ((i1 == i2 && j1 == j2) || !PossibleMoves.includes(index)) {
        setSelectPeiceToMoveKing(false);
        setactiveIndex(null);
        setPossibleMoves([]);
        return;
      }
      const TakenPeice = Board[i2][j2];
      const newBoard = [...Board];
      console.log(`Moving from ${i1} and ${j1} to ${i2} and ${j2}`);
      newBoard[i2][j2] = newBoard[i1][j1];
      newBoard[i1][j1] = "";
      setisCheck(false);
      setSelectPeiceToMoveKing(false);
      setPossibleMoves([]);
      setcheckIndex(null);
      // setKingIndex(null);
      setKingsMoves([]);
      if (Board[i2][j2] != "") {
        const Captured = [...capturedPeice];
        Captured.push(TakenPeice);
        setcapturedPeice(Captured);
      }
      const Position = getPosition(i2, j2);
      setSequence((prevArray) => [...prevArray, Position]);
      setprevBoard(Board);
      setBoard(newBoard);
      currChance == "w" ? setcurrChance("b") : setcurrChance("w");
      return;
    }
    if (isCheck) {
      const j1 = index % 10;
      const i1 = Math.floor(index / 10);
      console.log(checkProtectors, i1 * 10 + j1, index);
      console.log(checkProtectors.some((obj) => obj.start == i1 * 10 + j1));

      if (checkProtectors.some((obj) => obj.start == i1 * 10 + j1)) {
        const ob = checkProtectors.find((obj) => obj.start == i1 * 10 + j1);
        setPossibleMoves([ob.end]);
        console.log(ob.end);
        console.log("You have selected : ", ob);
        setactiveIndex(index);
        setSelectPeiceToMoveKing(true);
      } else if (i1 * 10 + j1 == KingIndex) {
        setPossibleMoves(KingsMoves);
        setSelectPeiceToMoveKing(true);
      }
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
      } else {
        setactiveIndex(index);
        console.log(`Focus installed on ${Board[i1][j1]}`);
        getPossibleMoves(i1, j1, "g");
        // getLegalMoves(i1,j1,'g');
        
        
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
        // getLegalMoves(i2,j2,'g');
        return;
      } else if (currChance == "b" && BlackPeice.includes(Board[i2][j2])) {
        console.log("Cannot move to a black peice");
        removeFocus();
        setactiveIndex(index);
        getPossibleMoves(i2, j2, "g");
        // getLegalMoves(i2,j2,'g');
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
        setcapturedPeicePrev(capturedPeice);
      } else {
        const TakenPeice = Board[i2][j2];
        newBoard[i2][j2] = newBoard[i1][j1];
        newBoard[i1][j1] = "";
        const Captured = [...capturedPeice];
        Captured.push(TakenPeice);
        setcapturedPeicePrev(capturedPeice);
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
          // const reachableSquares = getLegalMoves(i, j, "c");

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
      // let KingMoves = getLegalMoves(
      //   Math.floor(MyKingIndex / 10),
      //   MyKingIndex % 10,
      //   "c"
      // );
      // console.log("Before", KingMoves);
      for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
          if (CurrPeices.includes(Board[i][j])) {
            let ThreatningMoves = getPossibleMoves(i, j, "c");
            // let ThreatningMoves = getLegalMoves(i, j, "c");
            for (let k = 0; k < ThreatningMoves.length; k++) {
              if (KingMoves.includes(ThreatningMoves[k])) {
                KingMoves = KingMoves.filter((x) => x != ThreatningMoves[k]);
              }
            }
          }
        }
      }
      setKingsMoves(KingMoves);
      setcheckIndex(MyKingIndex);
      const checkProtect = [];
      if (peicesGivingCheck.length == 1) {
        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (MyPieces.includes(Board[i][j])) {
              const MovesToSimulate = getPossibleMoves(i, j, "c");
              // const MovesToSimulate = getLegalMoves(i, j, "c");
              if (MovesToSimulate.length > 0) {
                for (let k = 0; k < MovesToSimulate.length; k++) {
                  if (
                    canSaveCheck(
                      Board.map((row) => [...row]),
                      i,
                      j,
                      MovesToSimulate[k],
                      peicesGivingCheck[0],
                      MyKingIndex
                    )
                  ) {
                    console.log(
                      `to save check Piece : ${Board[i][j]} , Move : ${MovesToSimulate[k]}`
                    );
                    checkProtect.push({
                      start: i * 10 + j,
                      end: MovesToSimulate[k],
                    });
                  }
                }
              }
            }
          }
        }
      }
      setcheckProtectors(checkProtect);
      if (KingMoves.length == 0 && checkProtect.length == 0) {
        toast.info(`${currChance == "w" ? "White" : "Black"} has been mated`);
        setisMated(true);
        setisCheck(false);
      }
    }
  }
  function canSaveCheck(
    TempBoard,
    i,
    j,
    ToMoveIndex,
    peiceGivingCheck,
    KingIdx
  ) {
    const i2 = Math.floor(ToMoveIndex / 10);
    const j2 = ToMoveIndex % 10;
    const King = currChance == "w" ? "♔" : "♚";
    if (Board[i][j] == King) return false;
    const temp = TempBoard[i][j];
    TempBoard[i][j] = TempBoard[i2][j2];
    TempBoard[i2][j2] = temp;
    const i3 = Math.floor(peiceGivingCheck / 10);
    const j3 = peiceGivingCheck % 10;
    const moves = getPossibleMoves(i3, j3, "c", TempBoard);
    // const moves = getLegalMoves(i3, j3, "c", TempBoard);
    if (moves.includes(KingIdx)) return false;
    else return true;
  }
  function getLegalMoves(i, j, mode) {
    const moves = getPossibleMoves(i, j);

    let filteredMoves = moves.filter((value) => isBoardInCheck(i, j, value));
    if (mode != "c") setPossibleMoves(filteredMoves);
    return filteredMoves;
  }
  function isBoardInCheck(i, j, value) {
    const OppPeices = currChance == "b" ? [...WhitePeice] : [...BlackPeice];
    let tempArr = Board.map((side) => [...side]);
    const i2 = Math.floor(value / 10);
    const j2 = value % 10;
    tempArr[i2][j2] = tempArr[i][j];
    tempArr[i][j] = "";
    for (let a = 0; a < 8; a++) {
      for (let b = 0; b < 8; b++) {
        if (OppPeices.includes(tempArr[a][b])) {
          const move = getPossibleMoves(a, b,tempArr);
          if (move.includes(KingIndex)) {
            return false;
          }
        }
      }
    }
    return true;
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
      setcapturedPeice(capturedPeicesPrev);
      setcapturedPeicePrev([]);
      setcurrChance(currChance == "w" ? "b" : "w");
      const sq = [...sequence];
      sq.pop();
      setSequence(sq);
    }
  }
  function resetBoard() {
    setBoard(InitialBoard);
    setSequence([]);
    setPossibleMoves([]);
    setcurrChance("w");
    setisCheck(false);
    setcheckIndex(null);
    setKingIndex(null);
    setisMated(false);
    setKingsMoves([]);
    setSelectPeiceToMoveKing([]);
    setcapturedPeice([]);
  }
  return (
    <>
      {isMated && (
        <div className="fixed inset-0  bg-opacity-40 z-50 flex items-center justify-center">
          <div className="bg-white px-6 py-4 rounded-md shadow-md text-center max-w-sm w-full mx-4">
            <h2 className="text-xl font-semibold mb-2">
              {currChance === "w" ? "White" : "Black"} has been mated!
            </h2>
            <button
              onClick={() => {
                setisMated(false);
                resetBoard();
              }}
              className="mt-4 bg-gray-800 text-white px-4 py-2 rounded-md hover:bg-gray-400 transition"
            >
              Close
            </button>
          </div>
        </div>
      )}

      <div className="flex flex-col items-center px-4">
        <div className="border text-center w-20 rounded-md mt-7">
          {currChance === "w" ? "White" : "Black"}
        </div>

        <div
          onClick={() => {
            removeFocus();
          }}
          className="flex flex-col md:flex-row gap-6 py-6 justify-center items-center w-full"
        >
          {/* Captured Pieces */}
          <ul className="w-full md:w-40 rounded-md flex  p-4 max-h-60 overflow-auto">
            {capturedPeice.map((ele, eleIndex) => (
              <li key={eleIndex}>{ele}</li>
            ))}
          </ul>

          {/* Chess Board */}
          <ul className="grid grid-cols-8 gap-1">
            {Board.map((row, rowIndex) =>
              row.map((peice, colIndex) => {
                let bgColor =
                  (rowIndex + colIndex) % 2 === 0 ? "bg-white" : "bg-gray-500";
                if (activeIndex === rowIndex * 10 + colIndex)
                  bgColor = "bg-gray-200";
                if (checkIndex === rowIndex * 10 + colIndex)
                  bgColor = "bg-red-300";

                return (
                  <li
                    key={`${rowIndex}-${colIndex}`}
                    onClick={(e) => selectPeice(e, rowIndex * 10 + colIndex)}
                    className={`${
                      PossibleMoves.includes(rowIndex * 10 + colIndex)
                        ? `bg-gray-700`
                        : bgColor
                    } rounded-md hover:bg-gray-300 h-10 w-10 sm:h-12 sm:w-12 md:h-14 md:w-14 border flex items-center justify-center cursor-pointer text-xl sm:text-2xl`}
                  >
                    {peice}
                  </li>
                );
              })
            )}
          </ul>

          {/* Side Panel */}
          <div className="flex flex-col items-center md:items-start">
            <div className="flex gap-3 mb-4">
              <button
                onClick={() => setPrevState()}
                className="border h-10 px-3 rounded-md hover:bg-gray-200"
              >
                Undo
              </button>
              <button
                onClick={() => resetBoard()}
                className="border h-10 px-3 rounded-md hover:bg-gray-200"
              >
                Reset
              </button>
            </div>

            <ul className="w-full md:w-40 rounded-md border p-4 max-h-60 overflow-auto">
              {Array.from(
                { length: Math.ceil(sequence.length / 2) },
                (_, index) => (
                  <li key={index} className="flex justify-between">
                    <span>{sequence[2 * index] || ""}</span>
                    <span>{sequence[2 * index + 1] || ""}</span>
                  </li>
                )
              )}
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}
