import { useState, useMemo } from "react";
import "./App.css";

interface TimeObject {
  hours: number;
  minutes: number;
  seconds: number;
}

interface TimeGroup extends TimeObject {
  id: number;
}

type TimeFieldProps = {
  id: number;
  onTimeChange: (id: number, time: TimeObject) => void;
  onDelete: (id: number) => void;
  autoFocus: boolean;
};

const TimeField = ({
  id,
  onTimeChange,
  onDelete,
  autoFocus,
}: TimeFieldProps) => {
  const [time, setTime] = useState<TimeObject>({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = {
      ...time,
      [e.target.name]: parseInt(e.target.value, 10) || 0,
    };
    setTime(newTime);
    onTimeChange(id, newTime);
  };

  return (
    <>
      <td>
        <input
          type="number"
          name="hours"
          alt="hours"
          value={time.hours || ""}
          min="0"
          onChange={(e) => handleChange(e)}
          autoFocus={autoFocus}
        />
      </td>
      <td>
        <input
          type="number"
          name="minutes"
          alt="minutes"
          value={time.minutes || ""}
          min="0"
          onChange={(e) => handleChange(e)}
        />
      </td>
      <td>
        <input
          type="number"
          name="seconds"
          alt="seconds"
          value={time.seconds || ""}
          min="0"
          onChange={(e) => handleChange(e)}
        />
      </td>
      <td>
        <button
          aria-label="delete"
          className="delete"
          onClick={() => onDelete(id)}
        >
          <i className="fa fa-trash"></i>
        </button>
      </td>
    </>
  );
};

const App = () => {
  const [timeGroups, setTimeGroups] = useState<TimeGroup[]>([
    { id: 0, hours: 0, minutes: 0, seconds: 0 },
  ]);
  const [totalTime, setTotalTime] = useState(0);
  const [nextId, setNextId] = useState(1);
  const [speed, setSpeed] = useState(1.0);

  const calculateTotalTime = (groups: TimeGroup[]) => {
    const newTotal = groups.reduce((acc, t) => {
      acc += t.hours * 3600;
      acc += t.minutes * 60;
      acc += t.seconds;
      return acc;
    }, 0);

    setTotalTime(newTotal);
  };

  const adjustAndDisplayTime = useMemo(() => {
    const adjustedSeconds = Math.round(totalTime / speed);

    const hours = Math.floor(adjustedSeconds / 3600);
    const minutes = Math.floor((adjustedSeconds % 3600) / 60);
    const seconds = adjustedSeconds % 60;

    const formattedHours = hours.toString().padStart(2, "0");
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }, [totalTime, speed]);

  const handleTimeChange = (id: number, newTime: TimeObject) => {
    const updatedTimeGroups = timeGroups.map((group) => {
      return group.id === id ? { id, ...newTime } : group;
    });
    setTimeGroups(updatedTimeGroups);
    calculateTotalTime(updatedTimeGroups);
  };

  const handleSpeedChange = (newSpeed: number) => {
    setSpeed(newSpeed);
  };

  const createNewTimeField = () => {
    const id = nextId;
    setNextId((prev) => prev + 1);
    setTimeGroups([...timeGroups, { id, hours: 0, minutes: 0, seconds: 0 }]);
  };

  const deleteTimeField = (id: number) => {
    console.log(`Deleting ${id}`);
    const updatedTimeGroups = timeGroups.filter((group) => {
      return group.id !== id;
    });
    setTimeGroups(updatedTimeGroups);
    calculateTotalTime(updatedTimeGroups);
  };

  return (
    <div data-testid="App">
      <h1 className="gradient-text">Time Calculator</h1>
      <div className="all-time-fields">
        <table>
          <thead>
            <tr>
              <th scope="col" aria-label="hours">
                H
              </th>
              <th scope="col" aria-label="minutes">
                M
              </th>
              <th scope="col" aria-label="seconds">
                S
              </th>
              <th scope="col"></th>
            </tr>
          </thead>
          <tbody>
            {timeGroups.map((group, index) => {
              return (
                <tr className="time-field-container" key={group.id}>
                  <TimeField
                    id={group.id}
                    onTimeChange={handleTimeChange}
                    onDelete={deleteTimeField}
                    autoFocus={index === timeGroups.length - 1}
                  />
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button className="golden" onClick={createNewTimeField}>
        Add another time input
      </button>
      <div>
        <div className="radio-group">
          <span>Speed:</span>
          <input
            type="radio"
            id="option-0.5"
            name="multiplier"
            value={0.5}
            checked={speed === 0.5}
            onChange={() => handleSpeedChange(0.5)}
          />
          <label htmlFor="option-0.5">0.5x</label>
          <input
            type="radio"
            id="option-0.75"
            name="multiplier"
            value={0.75}
            checked={speed === 0.75}
            onChange={() => handleSpeedChange(0.75)}
          />
          <label htmlFor="option-0.75">0.75x</label>
          <input
            type="radio"
            id="option-1.0"
            name="multiplier"
            value={1.0}
            checked={speed === 1.0}
            onChange={() => handleSpeedChange(1.0)}
          />
          <label htmlFor="option-1.0">1.0x</label>
          <input
            type="radio"
            id="option-1.25"
            name="multiplier"
            value={1.25}
            checked={speed === 1.25}
            onChange={() => handleSpeedChange(1.25)}
          />
          <label htmlFor="option-1.25">1.25x</label>
          <input
            type="radio"
            id="option-1.5"
            name="multiplier"
            value={1.5}
            checked={speed === 1.5}
            onChange={() => handleSpeedChange(1.5)}
          />
          <label htmlFor="option-1.5">1.5x</label>
          <input
            type="radio"
            id="option-1.75"
            name="multiplier"
            value={1.75}
            checked={speed === 1.75}
            onChange={() => handleSpeedChange(1.75)}
          />
          <label htmlFor="option-1.75">1.75x</label>
          <input
            type="radio"
            id="option-2.0"
            name="multiplier"
            value={2.0}
            checked={speed === 2.0}
            onChange={() => handleSpeedChange(2.0)}
          />
          <label htmlFor="option-2.0">2.0x</label>
        </div>
        <h2 className="melon">Total:</h2>
        <p id="total-time">{adjustAndDisplayTime}</p>
      </div>
    </div>
  );
};

export default App;
