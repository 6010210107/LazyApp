import React from "react";
import { SudokuTable, Header } from "../../components";

import './Sudoku.css'
const Sudoku = () => {
  return (
    <div className="content-container ">
      <Header contentHeader={"Sudoku"}/>
      <div className="content-puzzle  ">
        <SudokuTable />
      </div>
    </div>
  );
};

export default Sudoku;
