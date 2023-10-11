import React from "react";
import { useRowStore } from "../store/useRowStore";
import "../App.css";

function Row({ id }) {
  const { rows, updateRowValue, removeRow, disabledRow } = useRowStore(
    (state) => ({
      rows: state.rows,
      updateRowValue: state.updateRowValue,
      removeRow: state.removeRow,
      disabledRow: state.disabledRow,
    })
  );

  const row = rows.find((row) => row.id === id);
  if (!row) return null;

  const symbolValueChange = (e) => {
    const newSymbol = e.target.value;
    updateRowValue(id, row.value, newSymbol);
  };

  const handleValueChange = (e) => {
    const newValue = parseFloat(e.target.value);
    if (isNaN(newValue)) {
      updateRowValue(id, 0, row.symbol);
    }else {
      updateRowValue(id, newValue, row.symbol);
    }
  };

  return (
    <div className="max-w-2xl flex space-x-2 mx-auto p-4 border border-gray-300 rounded my-2">
      <select
        value={row.symbol}
        onChange={symbolValueChange}
        className="mr-2 border border-gray-300 rounded p-1"
      >
        <option value="+">+</option>
        <option value="-">-</option>
      </select>
      <input
        type="number"
        value={row.value}
        onChange={handleValueChange}
        disabled={row.disabled ? true : false}
        className="border border-gray-300 rounded p-1 flex-grow outline-none"
      />
      <div className="space-x-2">
        <button
          className="bg-red-400 rounded p-2 text-white font-bold"
          onClick={() => removeRow(id)}
        >
          Rimuovi
        </button>
        <button
          className={`p-2 rounded ${
            row.disabled
              ? "bg-gray-200 font-bold"
              : "border border-1 font-semibold"
          }`}
          onClick={() => disabledRow(id)}
        >
          {row.disabled ? "Abilita" : "Disabilita"}
        </button>
      </div>
    </div>
  );
}

export default Row;
