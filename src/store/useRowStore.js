import { create } from "zustand";

export const useRowStore = create((set) => ({
  //Store della singola riga.
  rows: [],
  addRow: () =>
    set((state) => ({
      rows: [
        ...state.rows,
        { id: Date.now(), value: '', symbol: "+", disabled: false },
      ],
    })),

    removeRow: (id) => {
      set((state) => {
        const updateRows = state.rows.filter((row) => row.id !== id);
        const result = calculateResult(updateRows);
        return { rows: updateRows, result };
      });
    },
    
  updateRowValue: (id, value, symbol) => {
    if(value === 0 ){
      value = ''
    }
    set((state) => {
      const updateRows = state.rows.map((row) =>
        row.id === id ? { ...row, value, symbol } : row
      );
      const result = calculateResult(updateRows);
        return { rows: updateRows, result };
    });
  },

  disabledRow: (id) => {
    set((state) => {
      const updatedRows = state.rows.map((row) =>
        row.id === id ? { ...row, disabled: !row.disabled } : row
      );
      const result = calculateResult(updatedRows);
      return { rows: updatedRows, result };
    });
  },
}));

function calculateResult(rows) {
  return rows.reduce((acc, row) => (!row.disabled ? (row.symbol === '+' ? acc + row.value : acc - row.value) : acc),0);
}

//