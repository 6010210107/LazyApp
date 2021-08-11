import React, { useState } from "react";
import "./SudokuTable.css";
import { Button, Form, Row, Col, Container } from "react-bootstrap";
import {
  newStartingBoard,
} from "../../controller/sudoku/puzzle";
const SudokuTable = () => {
  /**
   * 1. set input value into board array
   * 2. Check duplicate value in the board --> row, col, box
   * 3.
   */

  const puzzle = newStartingBoard(30);
  const basePuzzle = JSON.parse(JSON.stringify(puzzle[1]));
  const currentPuzzle = JSON.parse(JSON.stringify(puzzle[1]));
  const solvedPuzzle = JSON.parse(JSON.stringify(puzzle[2]));
  const hints = [...puzzle[0]];

  const updateBoard = (position, targetVal) => {
    let row = +position[0];
    let col = +position[1];
    let value = +targetVal;
    currentPuzzle[row][col] = value;
    setSudokuBoard(renderTable);
  };

  const renderTable = () => {
    return currentPuzzle.map((puzzle, row) => (
      <tr key={`cell-${row}`}>
        {puzzle.map((cell, col) => (
          <td
            key={`cell-${row}-${col}`}
            id={`cell-${row}-${col}`}
            className={`${
              currentPuzzle[row][col] === basePuzzle[row][col] &&
              currentPuzzle[row][col] !== 0
                ? "guide-cell"
                : ""
            }`}
          >
            <input
              id={`${row}-${col}`}
              type="text"
              value={cell === 0 ? "" : cell}
              maxLength={1}
              autoComplete="off"
              disabled={
                currentPuzzle[row][col] === basePuzzle[row][col] &&
                currentPuzzle[row][col] !== 0
                  ? true
                  : false
              }
              placeholder=""
              onChange={(e) => {
                updateBoard(e.target.id.split("-"), e.target.value);
              }}
              className={`${
                currentPuzzle[row][col] === basePuzzle[row][col] &&
                currentPuzzle[row][col] !== 0
                  ? "guide-number"
                  : ""
              }`}
            />
          </td>
        ))}
      </tr>
    ));
  };

  const [sudokuBoard, setSudokuBoard] = useState(renderTable);

  return (
    <div className="table-container">
      <Row>
        <Col xs={12} md={2} className="mx-4">
          {/* <Form>
            <Form.Select size="lg">
              <option>Large select</option>
            </Form.Select>
          </Form> */}
          {/* <h4> Test </h4> */}
        </Col>
        <Col xs={12} md={8} className="d-flex justify-content-center m-2">
          <table>
            <tbody>{sudokuBoard}</tbody>
          </table>
        </Col>
      </Row>
    </div>
  );
};

export default SudokuTable;
