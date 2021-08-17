import React, { useState, useEffect, useCallback, useRef } from "react";
import "./SudokuTable.css";
import {
  Button,
  Form,
  Row,
  Col,
  Dropdown,
  DropdownButton,
} from "react-bootstrap";
import { newStartingBoard, fillPuzzle } from "../../controller/sudoku/puzzle";

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

const SudokuTable = () => {
  const [difficulty, setDifficulty] = useState("Select Difficulty");
  let currentRef = useRef();
  let puzzleRef = useRef();

  /**
   * Check input is safe.
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
   * Generate the puzzle.
   */
  // const beginPuzzle = async (holes = 20) => {
  //   let current = currentRef.current
  //   let puzzle = puzzleRef.current
  //   let puzzle_assets = await generatePuzzle(holes);
  //   puzzle = puzzle_assets;
  //   current = JSON.parse(JSON.stringify(puzzle_assets[1]));
  //   setSudokuBoard(renderTable);
  //   return true;
  // };

  const initPuzzle = useCallback(async (holes) => {
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
  }, []);
  /**
   * Update the puzzle board.
   */
  const updateBoard = (position, targetVal) => {
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
  };



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

  return (
    <div>
      <Row className="d-flex justify-content-around m-3 w-100">
        <Col xs={12} md={4} className="d-flex flex-wrap">
          <DropdownButton title={difficulty}>
            <Dropdown.ItemText>Select Difficulty</Dropdown.ItemText>
            {/* <Dropdown.Item as="button" onClick={() => beginPuzzle(81)}>
              Empty Puzzle
            </Dropdown.Item> */}
            <Dropdown.Item
              as="button"
              onClick={() => {
                setDifficulty("Easy");
                initPuzzle(25);
              }}
            >
              Easy
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setDifficulty("Medium");
                initPuzzle(40);
              }}
            >
              Medium
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setDifficulty("Hard");
                initPuzzle(50);
              }}
            >
              Hard
            </Dropdown.Item>
            <Dropdown.Item
              as="button"
              onClick={() => {
                setDifficulty("Expert");
                initPuzzle(60);
              }}
            >
              Expert
            </Dropdown.Item>
          </DropdownButton>
        </Col>
        <Col xs={12} md={6} className="d-flex justify-content-center">
          <table>
            <tbody>{sudokuBoard}</tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default SudokuTable;

const generatePuzzle = (difficulty = 20) => {
  const sudoku = newStartingBoard(difficulty);

  return sudoku;
};

/**
 * Render sudoku board.
 */
const SudokuBoard = ({currentRef, puzzleRef, updateBoard, isSafe}) => {
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
