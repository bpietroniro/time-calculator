import { useState } from 'react'
import './App.css'


function NumericInput({ onChange }: { onChange: (value: number) => void }) {
  const [input, setInput] = useState(0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = Number(e.target.value);
    setInput(newValue);
    onChange(newValue);
  };
  return (
    <input type="number" value={input} onChange={(e) => handleChange(e)} />
  );
}

function App() {
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const handleHourChange = (value: number) => {
    setTotalHours(value);
  };

  const handleMinuteChange = (value: number) => {
    setTotalMinutes(value);
  };

  const handleSecondChange = (value: number) => {
    setTotalSeconds(value);
  };

  return (
    <>
      <h1>Time Calculator</h1>
      <div>
        <NumericInput onChange={handleHourChange} />
        <NumericInput onChange={handleMinuteChange} />
        <NumericInput onChange={handleSecondChange} />
      </div>
      {/* <button onClick={handleAddInput}>Add Input</button> */}
      <p>Total hours: {totalHours}</p>
      <p>Total minutes: {totalMinutes}</p>
      <p>Total seconds: {totalSeconds}</p>
      <div className="card">
      </div>
    </>
  );
}

export default App
