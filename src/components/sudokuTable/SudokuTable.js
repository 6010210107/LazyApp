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
import { newStartingBoard, fillPuzzle } from "../../controller/sudoku/puzzle";
// import { CustomCard } from "..";
/**
 * ---------------------------------------------------------
 *todo || Sudoku board.
 *todo || Create the 9*9 board ✔
 *todo || Generate the sudoku puzzle.  ✔
 *todo || Fill the puzzle into the board.  ✔
 *todo || Update value in field. [ ]
 *todo || Create the information area. [ ]
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
  const [curDifficulty, setDifficulty] = useState("Unset");
  let currentRef = useRef();
  let puzzleRef = useRef();
  let difficultyList = { Easy: 20, Medium: 30, Hard: 40, Expert: 50 };

  /**
   ** Check input is safe.
   */
  const isSafe = (row, col) => {
    let current = currentRef.current;
    let puzzle = puzzleRef.current;
    if (current[row][col] !== 0 && current[row][col] !== puzzle[2][row][col]) {
      return false;
    }
    return true;
  };

  /**
   ** Update the puzzle board.
   */
  const updateBoard = useCallback((position, targetVal) => {
    let current = currentRef.current;
    let newCurrent = current;
    let row = +position[0];
    let col = +position[1];
    let value = +targetVal;
    newCurrent[row][col] = value;
    current = newCurrent;
    setSudokuBoard(
      <SudokuBoard
        currentRef={currentRef}
        puzzleRef={puzzleRef}
        isSafe={isSafe}
        updateBoard={updateBoard}
      />
    );
  }, []);

  /**
   ** Generate the puzzle.
   */
  const initPuzzle = useCallback(
    async (holes) => {
      let puzzle_assets = await generatePuzzle(holes);
      puzzleRef.current = puzzle_assets;
      currentRef.current = JSON.parse(JSON.stringify(puzzle_assets[1]));
      setSudokuBoard(
        <SudokuBoard
          currentRef={currentRef}
          puzzleRef={puzzleRef}
          isSafe={isSafe}
          updateBoard={updateBoard}
        />
      );
    },
    [updateBoard]
  );

  /**
   * Initial state.
   */
  const [sudokuBoard, setSudokuBoard] = useState(
    <SudokuBoard
      currentRef={currentRef}
      puzzleRef={puzzleRef}
      isSafe={isSafe}
      updateBoard={updateBoard}
    />
  );

  useEffect(() => {
    initPuzzle();
  }, [initPuzzle]);

  /**
   * !JSX return
   */
  return (
    <div className="">
      <Row className="d-flex justify-content-around m-3 ">
        <Col xs={12} lg={3} className="mx-5">
          <Container className="d-flex justify-content-center">
            <CustomCard
              holes={difficultyList[curDifficulty]}
              difficulty={curDifficulty}
              button={
                <SudokuDropdown
                  setDifficulty={setDifficulty}
                  initPuzzle={initPuzzle}
                  difficulty={Object.keys(difficultyList)}
                  holes={Object.values(difficultyList)}
                  title={curDifficulty}
                />
              }
            />
          </Container>
        </Col>
        <Col xs={12} lg={7} className="d-flex m-2 justify-content-center ">
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
const generatePuzzle = (difficulty = 20) => {
  const sudoku = newStartingBoard(difficulty);

  return sudoku;
};

/**
 ** Render sudoku board.
 */
const SudokuBoard = ({ currentRef, puzzleRef, updateBoard, isSafe }) => {
  let current = currentRef.current;
  let puzzle = puzzleRef.current;
  return (
    current?.map((board, row) => (
      <tr key={`cell-${row}`}>
        {board.map((cell, col) => (
          <td
            key={`cell-${row}-${col}`}
            id={`cell-${row}-${col}`}
            className={`${
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
                current[row][col] === puzzle[1][row][col] &&
                current[row][col] !== 0
                  ? "guide-number"
                  : ""
              }${isSafe(row, col) ? "" : "not-safe"}`}
            />
          </td>
        ))}
      </tr>
    )) ??
    emptyPuzzle?.map((board, row) => (
      <tr key={`cell-${row}`}>
        {board.map((cell, col) => (
          <td key={`cell-${row}-${col}`} id={`cell-${row}-${col}`}>
            <input
              id={`${row}-${col}`}
              type="text"
              value={cell === 0 ? "" : cell}
              maxLength={1}
              autoComplete="off"
              placeholder=""
              onChange={(e) => {
                updateBoard(e.target.id.split("-"), e.target.value);
              }}
              className={` sudoku-input `}
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
      <Dropdown.ItemText>Select Difficulty</Dropdown.ItemText>
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

const CustomCard = ({ holes, difficulty, button }) => {
  return (
    <>
      <Card className="card-config">
        <Card.Body className="card-config-body">
          <div className="card-config-btn">{button}</div>
          <Card.Text> <span className="bold">Difficulty :</span>  {difficulty}</Card.Text>
          <Card.Text><span className="bold">Holes :</span>  {holes}</Card.Text>
        </Card.Body>
      </Card>
    </>
  );
};
