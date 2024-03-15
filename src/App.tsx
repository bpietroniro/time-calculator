import { useState } from 'react'
import './App.css'

interface TimeObject {
  hours: number
  minutes: number
  seconds: number
}

interface TimeGroup extends TimeObject {
  id: number
}

type TimeFieldProps = {
  id: number
  onTimeChange: (id: number, time: TimeObject) => void
  autoFocus: boolean
}

const TimeField = ({ id, onTimeChange, autoFocus }: TimeFieldProps ) => {
  const [time, setTime] = useState<TimeObject>({hours: 0, minutes: 0, seconds: 0});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = {...time, [e.target.name]: parseInt(e.target.value, 10) || 0};
    setTime(newTime);
    onTimeChange(id, newTime);
  }

  return (
    <div className="time-field">
      <label htmlFor="hours">H:</label>
      <input type="number" name="hours" alt="hours" value={time.hours || ''} min="0" onChange={(e) => handleChange(e)} autoFocus={autoFocus} />
      <label htmlFor="minutes">M:</label>
      <input type="number" name="minutes" alt="minutes" value={time.minutes || ''} min="0" onChange={(e) => handleChange(e)} />
      <label htmlFor="seconds">S:</label>
      <input type="number" name="seconds" alt="seconds" value={time.seconds || ''} min="0" onChange={(e) => handleChange(e)} />
    </div>
  )
}

const App = () => {
  const [timeGroups, setTimeGroups] = useState<TimeGroup[]>([{id: 0, hours: 0, minutes: 0, seconds: 0}]);
  const [totalTime, setTotalTime] = useState<TimeObject>({hours: 0, minutes: 0, seconds: 0});
  const [nextId, setNextId] = useState(1);

  const calculateTotalTime = (groups: TimeGroup[]) => {
    const newTotals = groups.reduce((acc, t) => {
      acc.hours += t.hours;
      acc.minutes += t.minutes;
      acc.seconds += t.seconds;
      return acc;
    }, {hours: 0, minutes: 0, seconds: 0});

    newTotals.minutes += Math.floor(newTotals.seconds / 60);
    newTotals.seconds %= 60;
    newTotals.hours += Math.floor(newTotals.minutes / 60);
    newTotals.minutes %= 60;

    setTotalTime(newTotals);
  };

  const handleTimeChange = (id: number, newTime: TimeObject) => {
    const updatedTimeGroups = timeGroups.map(group => {
      return group.id === id ? {id, ...newTime} : group;
    });
    setTimeGroups(updatedTimeGroups);
    calculateTotalTime(updatedTimeGroups);
  };

  const createNewTimeField = () => {
    const id = nextId;
    setNextId(prev => prev + 1);
    setTimeGroups([...timeGroups, {id, hours: 0, minutes: 0, seconds: 0}])
  };

  const deleteTimeField = (id: number) => {
    console.log(`Deleting ${id}`);
    const updatedTimeGroups = timeGroups.filter(group => {
      return group.id !== id;
    });
    setTimeGroups(updatedTimeGroups);
    calculateTotalTime(updatedTimeGroups);
  };

  const formatTime = (time: TimeObject): string => {
    const formattedHours = time.hours.toString().padStart(2, '0');
    const formattedMinutes = time.minutes.toString().padStart(2, '0');
    const formattedSeconds = time.seconds.toString().padStart(2, '0');
    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
  }

  return (
    <div data-testid="App">
      <h1>Time Calculator</h1>
      <div className="all-time-fields">
      {timeGroups.map((group, index) => {
        return (
          <div className="time-field" key={group.id}>
            <TimeField id={group.id} onTimeChange={handleTimeChange} autoFocus={index === timeGroups.length - 1}/>
            <button onClick={() => deleteTimeField(group.id)}>Delete</button>
          </div>
        )
      })}
      </div>
      <button onClick={createNewTimeField}>Add another time input</button>
      <div className="card">
        <h2>Total</h2>
        <p>{formatTime(totalTime)}</p>
      </div>
    </div>
  );
}

export default App
