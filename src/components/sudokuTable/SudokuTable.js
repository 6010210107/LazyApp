import React, { useState, useEffect, useCallback, useRef } from "react";
import "./SudokuTable.css";
import {
  Row,
  Col,
  Dropdown,
  DropdownButton,
  Container,
  Card,
} from "react-bootstrap";
import {
  newStartingBoard,
  fillPuzzle,
  validBoard,
} from "../../controller/sudoku/puzzle";
import { CustomBtn } from "..";
/**
 * ---------------------------------------------------------
 *todo || Sudoku board.
 *todo || Create the 9*9 board ✔
 *todo || Generate the sudoku puzzle.  ✔
 *todo || Fill the puzzle into the board.  ✔
 *todo || Update value in field. ✔
 *todo || Create an empty board. ✔
 *todo || Create the information area. ✔
 *todo || Prevent Error when no solution for empty board[ ]
 *todo || Change level. ✔
 * ----------------------------------------------------------
 */

const emptyPuzzle = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0],
];

/**
 * Main Component
 */
const SudokuTable = () => {
  const [curDifficulty, setDifficulty] = useState("FreeStyle");
  let isFreeStyleRef = useRef(true);
  let isSolvedRef = useRef(false);
  let currentRef = useRef(emptyPuzzle);
  let puzzleRef = useRef(emptyPuzzle);
  let warningRef = useRef(false);

  let difficultyList = {
    Easy: 20,
    Medium: 30,
    Hard: 40,
    Expert: 50,
    FreeStyle: 81,
  };

  /**
   ** Check input is safe.
   */
  const isSafe = (row, col) => {
    let current = currentRef.current;
    let puzzle = puzzleRef.current;
    let isSolved = isSolvedRef.current;
    let isFreeStyle = isFreeStyleRef.current;
    if (isFreeStyle) return false;

    if (
      current[row][col] !== 0 &&
      current[row][col] !== puzzle[2][row][col] &&
      !isSolved
    ) {
      return true;
    }

    return false;
  };

  /**
   ** Update the puzzle board.
   */
  const updateBoard = useCallback((position, targetVal, solveBoard) => {
    let current = currentRef.current;
    if (isNaN(targetVal)) return;

    if (solveBoard && !position && !targetVal) {
      isSolvedRef.current = true;
      const isSafe = validBoard(current);
      if (isSafe) {
        current = fillPuzzle(current);
      } else {
        warningRef.current = "No solution for this puzzle.";
      }
    } else {
      // setIsSolved(false)
      // isSolved = false;
      let newCurrent = current;
      let row = +position[0];
      let col = +position[1];
      let value = +targetVal;
      newCurrent[row][col] = value;
      current = newCurrent;
    }

    setSudokuBoard(
      <SudokuBoard
        currentRef={currentRef}
        puzzleRef={puzzleRef}
        isSafe={isSafe}
        updateBoard={updateBoard}
        isFreeStyleRef={isFreeStyleRef}
      />
    );
  }, []);

  /**
   ** Generate the puzzle.
   */
  const initPuzzle = useCallback(
    async (holes) => {
      if (holes !== 81) {
        let puzzle_assets = await generatePuzzle(holes, isFreeStyleRef);
        puzzleRef.current = puzzle_assets;
        currentRef.current =
          puzzle_assets !== 0
            ? JSON.parse(JSON.stringify(puzzle_assets[1]))
            : emptyPuzzle;
      } else {
        currentRef.current = JSON.parse(JSON.stringify(emptyPuzzle));
        puzzleRef.current = JSON.parse(JSON.stringify(emptyPuzzle));
      }
      setSudokuBoard(
        <SudokuBoard
          currentRef={currentRef}
          puzzleRef={puzzleRef}
          isSafe={isSafe}
          updateBoard={updateBoard}
          isFreeStyleRef={isFreeStyleRef}
        />
      );
    },
    [updateBoard]
  );

  /**
   ** Initial state.
   */
  const [sudokuBoard, setSudokuBoard] = useState(
    <SudokuBoard
      currentRef={currentRef}
      puzzleRef={puzzleRef}
      isSafe={isSafe}
      updateBoard={updateBoard}
      isFreeStyleRef={isFreeStyleRef}
    />
  );

  /**
   ** Solve board.
   */
  const solvBoard = async () => {
    updateBoard(null, null, true);
  };

  /**
   ** Set Difficulty
   */
  const configDifficulty = (difficulty) => {
    if (difficulty === "FreeStyle") {
      isFreeStyleRef.current = true;
      setDifficulty(difficulty);
    } else {
      isFreeStyleRef.current = false;
      warningRef.current = "";
      setDifficulty(difficulty);
    }
  };

  /**
   * Clear board.
   */
  const clearBoard = () => {
    if(!isFreeStyleRef.current) return

    currentRef.current = JSON.parse(JSON.stringify(emptyPuzzle));
    puzzleRef.current = JSON.parse(JSON.stringify(emptyPuzzle));

    setSudokuBoard(
      <SudokuBoard
        currentRef={currentRef}
        puzzleRef={puzzleRef}
        isSafe={isSafe}
        updateBoard={updateBoard}
        isFreeStyleRef={isFreeStyleRef}
      />
    );
  };

  /**
   ** Re-Render board
   */
  useEffect(() => {
    initPuzzle();
  }, [initPuzzle]);

  /**
   * !JSX return
   */
  return (
    <div className="">
      <Row className="d-flex justify-content-around m-3 ">
        <Col xs={12} lg={3} className="mx-5 my-2">
          {/* <Row></Row> */}
          <Container className="d-flex justify-content-center">
            <CustomCard
              holes={difficultyList[curDifficulty]}
              difficulty={curDifficulty}
              warningRef={warningRef}
              button={
                <SudokuDropdown
                  setDifficulty={configDifficulty}
                  initPuzzle={initPuzzle}
                  difficulty={Object.keys(difficultyList)}
                  holes={Object.values(difficultyList)}
                  title={curDifficulty}
                />
              }
            />
          </Container>
          <div className="d-flex justify-content-around m-3">
            <Row>
              <Col>
                <CustomBtn
                  btnVariant="primary"
                  btnText="Solve"
                  btnFn={solvBoard}
                />
              </Col>
              {isFreeStyleRef.current ? (
                <Col>
                  <CustomBtn
                    btnVariant="danger"
                    btnText="Clear"
                    btnFn={clearBoard}
                  />
                </Col>
              ) : (
                ""
              )}
            </Row>
          </div>
        </Col>
        <Col xs={12} lg={7} className="d-flex m-2 justify-content-center">
          <table className="sudoku-table">
            <tbody>{sudokuBoard}</tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default SudokuTable;

/**
 ** Generate the complete puzzle.
 */
const generatePuzzle = (difficulty = 10, isFreeStyleRef) => {
  let sudoku;
  if (isFreeStyleRef.current) {
    sudoku = 0;
  } else {
    sudoku = newStartingBoard(difficulty);
  }

  return sudoku;
};

/**
 ** Render sudoku board.
 */
const SudokuBoard = ({
  currentRef,
  puzzleRef,
  isFreeStyleRef,
  updateBoard,
  isSafe,
}) => {
  let current = currentRef.current;
  let puzzle = puzzleRef.current;
  let isFreeStyle = isFreeStyleRef.current;
  return (
    current.map((board, row) => (
      <tr key={`cell-${row}`}>
        {board.map((cell, col) => (
          <td
            key={`cell-${row}-${col}`}
            id={`cell-${row}-${col}`}
            className={`
            ${
              !isFreeStyle &&
              current[row][col] === puzzle[1][row][col] &&
              current[row][col] !== 0
                ? "guide-cell"
                : ""
            } `}
          >
            <input
              id={`${row}-${col}`}
              type="text"
              value={cell === 0 ? "" : cell}
              maxLength={1}
              autoComplete="off"
              disabled={
                !isFreeStyle &&
                current[row][col] === puzzle[1][row][col] &&
                current[row][col] !== 0
                  ? true
                  : false
              }
              placeholder=""
              onChange={(e) => {
                updateBoard(e.target.id.split("-"), e.target.value);
              }}
              className={` sudoku-input ${
                !isFreeStyle &&
                current[row][col] === puzzle[1][row][col] &&
                current[row][col] !== 0
                  ? "guide-number"
                  : ""
              }${isSafe(row, col) ? "not-safe" : ""}`}
            />
          </td>
        ))}
      </tr>
    )) 
      
  );
};

/**
 ** Dropdown
 */
const SudokuDropdown = ({
  setDifficulty,
  initPuzzle,
  difficulty,
  holes,
  title,
}) => {
  return (
    <DropdownButton title={"Select Difficulty"}>
      <Dropdown.ItemText className="bold">Select Difficulty</Dropdown.ItemText>
      {/* <Dropdown.Item as="button" onClick={() => beginPuzzle(81)}>
              Empty Puzzle
            </Dropdown.Item> */}
      {difficulty.map((item, index) => {
        return (
          <DropdownItem
            key={holes[index]}
            setDifficulty={setDifficulty}
            initPuzzle={initPuzzle}
            difficulty={item}
            holes={holes[index]}
          />
        );
      })}
    </DropdownButton>
  );
};

const DropdownItem = ({ setDifficulty, initPuzzle, difficulty, holes }) => {
  return (
    <Dropdown.Item
      as="button"
      onClick={() => {
        setDifficulty(difficulty);
        initPuzzle(holes);
      }}
    >
      {difficulty}
    </Dropdown.Item>
  );
};

/**
 ** CustomCard
 */
const CustomCard = ({ holes, difficulty, button, warningRef }) => {
  return (
    <>
      <Card className="card-config">
        <Card.Body className="card-config-body">
          <div className="card-config-btn">{button}</div>
          <Card.Text>
            {" "}
            <span className="bold">Difficulty :</span> {difficulty}
          </Card.Text>
          <Card.Text>
            <span className="bold">Holes :</span> {holes}
          </Card.Text>
          {warningRef.current ? (
            <Card.Text>{warningRef.current}</Card.Text>
          ) : (
            ""
          )}
        </Card.Body>
      </Card>
    </>
  );
};

/**
 ** CustomButton
 */

// const CustomButton = () =>{
//   return (
//     <button>Click me</button>
//   )
// }
