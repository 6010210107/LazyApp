import React from "react";
import { SudokuTable } from "../../components";

import './Sudoku.css'
const Sudoku = () => {
  return (
    <div className="content-container">
      <div className="content-header">
        <h1>Sudoku</h1>
      </div>
      <div className="content-puzzle">
        <SudokuTable />
      </div>
    </div>
  );
};

export default Sudoku;
