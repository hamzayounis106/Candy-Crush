import React, { useState, useEffect } from "react";
import "./index.css";
function App() {
  const width = 8;
  const [threeRowNeglater, setThreeRowNeglater] = useState([]);
  const [fourRowNeglater, setFourRowNeglater] = useState([]);
  const [candyBeingDragged, setCandyBeingDragged] = useState(null);
  const [candyBeingReplaced, setCandyBeingReplaced] = useState(null);
  const [dragging, setDragging] = useState(false);
  const [score, setScore] = useState(0);
  const candies = [
    "candy1",
    "candy2",
    "candy3",
    "candy4",
    "candy5",
    "candy6",
    "candy7",
    "candy8",
  ];
  const [candyArrangement, setCandyArrangement] = useState([]);

  const createArrangement = () => {
    let tempArray = [];
    for (let i = 0; i < width * width; i++) {
      const randomCandy = Math.floor(Math.random() * candies.length);
      tempArray.push(candies[randomCandy]);
    }

    setCandyArrangement(tempArray);
  };

  const columnFourMatch = () => {
    for (let i = 0; i < 39; i++) {
      const checkPoints = [i, i + width, i + width * 2, i + width * 3];
      const decidedColor = candyArrangement[i];
      if (
        decidedColor !== null &&
        checkPoints.every((e) => candyArrangement[e] === decidedColor)
      ) {
        checkPoints.forEach((e) => (candyArrangement[e] = null));
        return true;
      }
    }
    return false;
  };

  const columnThreeMatch = () => {
    for (let i = 0; i <= 47; i++) {
      const checkPoints = [i, i + width, i + width * 2];
      const decidedColor = candyArrangement[i];
      if (
        decidedColor !== null &&
        checkPoints.every((e) => candyArrangement[e] === decidedColor)
      ) {
        checkPoints.forEach((e) => (candyArrangement[e] = null));
        return true;
      }
    }
    return false;
  };

  const rowThreeMatch = (threeRowNeglater) => {
    for (let i = 0; i <= 63; i++) {
      const checkPoints = [i, i + 1, i + 2];
      const decidedColor = candyArrangement[i];

      if (
        !threeRowNeglater.includes(i) &&
        decidedColor !== null &&
        checkPoints.every((e) => candyArrangement[e] === decidedColor)
      ) {
        checkPoints.forEach((e) => (candyArrangement[e] = null));
        return true;
      }
    }
    return false;
  };

  const rowFourMatch = (fourRowNeglater) => {
    for (let i = 0; i <= 63; i++) {
      const checkPoints = [i, i + 1, i + 2, i + 3];
      const decidedColor = candyArrangement[i];

      if (
        !fourRowNeglater.includes(i) &&
        decidedColor !== null &&
        checkPoints.every((e) => candyArrangement[e] === decidedColor)
      ) {
        checkPoints.forEach((e) => (candyArrangement[e] = null));
        return true;
      }
    }
    return false;
  };

  const moveIntoSquareBelow = () => {
    // Apply gravity to move candies down
    for (let i = 0; i < 64 - width; i++) {
      const Firstrow = [0, 1, 2, 3, 4, 5, 6, 7];
      const isFirstRow = Firstrow.includes(i);
      if (isFirstRow && candyArrangement[i] == null) {
        const randomNumber = Math.floor(Math.random() * candies.length);
        candyArrangement[i] = candies[randomNumber];
      }

      if (candyArrangement[i + width] == null) {
        candyArrangement[i + width] = candyArrangement[i];
        candyArrangement[i] = null;
      }
    }
  };

  const dragStart = (e) => {
    setDragging(true);
    setCandyBeingDragged(e.target);
  };

  const dragDrop = (e) => {
    setCandyBeingReplaced(e.target);
  };

  const dragEnd = (e) => {
    let candyBeingDraggedID = parseInt(
      candyBeingDragged.getAttribute("data-id")
    );

    let candyBeingReplacedID = parseInt(
      candyBeingReplaced.getAttribute("data-id")
    );

    const BeingDragedSrc = candyBeingDragged.getAttribute("src");
    const BeingReplacedSrc = candyBeingReplaced.getAttribute("src");
    const regex = /\/(.*?)\.png/;
    const matchD = BeingDragedSrc.match(regex);
    const matchR = BeingReplacedSrc.match(regex);

    // Calculate valid moves
    const validMoves = [
      candyBeingDraggedID - 1,
      candyBeingDraggedID - width,
      candyBeingDraggedID + 1,
      candyBeingDraggedID + width,
    ];

    const isMoveValid = validMoves.includes(candyBeingReplacedID);

    if (isMoveValid) {
      // Swap the candies
      candyArrangement[candyBeingReplacedID] = matchD[1];
      candyArrangement[candyBeingDraggedID] = matchR[1];

      const isFourColumn = columnFourMatch();
      const isThreeColumn = columnThreeMatch();
      const isThreeRow = rowThreeMatch(threeRowNeglater);
      const isFourRow = rowFourMatch(fourRowNeglater);

      if (isFourColumn || isFourRow) {
        setScore(score + 4);
      }
      if (isThreeColumn || isThreeRow) {
        setScore(score + 3);
      }

      if (
        isFourColumn || isThreeColumn || isThreeRow || isFourRow
      ) {
        setCandyArrangement([...candyArrangement]);
      } else {
        // Revert the swap if no match is found
        candyArrangement[candyBeingReplacedID] = matchR[1];
        candyArrangement[candyBeingDraggedID] = matchD[1];
        setCandyArrangement([...candyArrangement]);
      }
    } else {
      // If move is not valid, revert back to original position
      candyArrangement[candyBeingReplacedID] = matchR[1];
      candyArrangement[candyBeingDraggedID] = matchD[1];
      setCandyArrangement([...candyArrangement]);
    }

    setDragging(false);
  };


  useEffect(() => {
    const timer = setInterval(() => {
      columnFourMatch();
      rowFourMatch(fourRowNeglater);
      columnThreeMatch();
      rowThreeMatch(threeRowNeglater);
      moveIntoSquareBelow();

      setCandyArrangement([...candyArrangement]);
    }, 100);
    return () => clearInterval(timer);
  }, [
    columnFourMatch,
    rowFourMatch,
    columnThreeMatch,
    rowThreeMatch,
    candyArrangement,
  ]);

  useEffect(() => {
    createArrangement();
    let newThreeRowNeglater = [];
    let newFourRowNeglater = [];
    for (let i = 6; i <= 63; i += 8) {
      newThreeRowNeglater.push(i);
    }
    for (let i = 7; i <= 63; i += 8) {
      newThreeRowNeglater.push(i);
    }
    setThreeRowNeglater(newThreeRowNeglater);

    for (let i = 4; i <= 63; i += 8) {
      newFourRowNeglater.push(i);
    }
    setFourRowNeglater([...newThreeRowNeglater, ...newFourRowNeglater]);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen bg-red-500 mainbg">
      <p className="pt-3 text-2xl font-semibold text-zinc-950">Score: {score}</p>
      <div className="w-auto max-h-[90vh] overflow-auto bg-slate-100 rounded-lg p-2 m-3 grid grid-cols-8 grid-rows-8">
        {candyArrangement.map((candy, i) => {
          return (
            <img
              draggable="true"
              onDragStart={dragStart}
              onDragEnd={dragEnd}
              onDrop={dragDrop}
              onDragOver={(e) => e.preventDefault()}
              onDragEnter={(e) => e.preventDefault()}
              onDragLeave={(e) => e.preventDefault()}
              data-id={i}
              className={`w-full h-full p-1 ${dragging ? "scale-110" : ""}`}
              key={i}
              src={`./${candy}.png`}
              onError={(e) =>
                (e.target.src =
                  "data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs=")
              }
            />
          );
        })}
      </div>

      <button
        className="p-2 px-4 mb-2 rounded-md bg-zinc-950 text-slate-100"
        onClick={() => {
          createArrangement();
        }}
      >
        Reset Boad
      </button>
    </div>
  );
}

export default App;
