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
}

function TimeField({ id, onTimeChange }: TimeFieldProps ) {
  const [time, setTime] = useState<TimeObject>({hours: 0, minutes: 0, seconds: 0});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newTime = {...time, [e.target.name]: parseInt(e.target.value, 10) || 0};
    setTime(newTime);
    onTimeChange(id, newTime);
  }

  return (
    <div key={id}>
      <input type="number" name="hours" value={time.hours} onChange={(e) => handleChange(e)} />
      <input type="number" name="minutes" value={time.minutes} onChange={(e) => handleChange(e)} />
      <input type="number" name="seconds" value={time.seconds} onChange={(e) => handleChange(e)} />
    </div>
  )
}

function App() {
  const [timeGroups, setTimeGroups] = useState<TimeGroup[]>([{id: 0, hours: 0, minutes: 0, seconds: 0}]);
  const [totalTime, setTotalTime] = useState<TimeObject>({hours: 0, minutes: 0, seconds: 0});
  const [nextId, setNextId] = useState(1);

  const calculateTotalTime = (groups: TimeGroup[]) => {
    const newTotal = groups.reduce((acc, t) => {
      acc.hours += t.hours;
      acc.minutes += t.minutes;
      acc.seconds += t.seconds;
      return acc;
    }, {hours: 0, minutes: 0, seconds: 0});

    setTotalTime(newTotal);
  };

  const handleTimeChange = (id: number, newTime: TimeObject) => {
    const updatedTimeGroups = timeGroups.map(group => {
      return group.id === id ? {id, ...newTime} : group;
    });
    setTimeGroups(updatedTimeGroups);
    calculateTotalTime(updatedTimeGroups);
  };

  // TODO
  const createNewTimeField = () => {
    const id = nextId;
    setNextId(prev => prev + 1);
    setTimeGroups([...timeGroups, {id, hours: 0, minutes: 0, seconds: 0}])
  };

  return (
    <>
      <h1>Time Calculator</h1>
      {timeGroups.map(group => {
        return <TimeField id={group.id} onTimeChange={handleTimeChange} />
      })}
      <button onClick={createNewTimeField}>Add another time input</button>
      <p>Total hours: {totalTime.hours}</p>
      <p>Total minutes: {totalTime.minutes}</p>
      <p>Total seconds: {totalTime.seconds}</p>
      <div className="card">
      </div>
    </>
  );
}

export default App
