import Row from "./components/Row";
import { useRowStore } from "./store/useRowStore";

function App() {
  const { rows, addRow, result } = useRowStore((state) => ({
    rows: state.rows,
    addRow: state.addRow,
    result: state.result,
  }));

  return (
    <div className="min-h-screen flex border border-gray-400 justify-center items-center flex-col p-2 w-full">
      <button onClick={addRow} className="font-bold">
        Aggiungi Riga
      </button>
      {rows.map((row) => (
        <Row key={row.id} id={row.id} />
      ))}
      <div className="result">Risultato: {result}</div>
    </div>
  );
}

export default App;
