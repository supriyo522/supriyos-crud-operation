import React, { useState, useEffect } from "react";

const ScheduleForm = ({ onSave, onCancel, schedule }) => {
  console.log(schedule);
  const [title, setTitle] = useState(schedule ? schedule.title : "");
  const [description, setDescription] = useState(
    schedule ? schedule.description : ""
  );
  const [subject, setSubject] = useState(schedule ? schedule.Schedule : "");
  const [frequency, setFrequency] = useState(
    schedule ? schedule.frequency : "Daily"
  );
  const [repeat, setRepeat] = useState(schedule ? schedule.repeat : "");
  const [time, setTime] = useState(schedule ? schedule.time : "");

  useEffect(() => {
    // Reset repeat field when frequency changes
    setRepeat("");
  }, [frequency]);

  const handleSubmit = () => {
    const newSchedule = {
      title,
      description,
      subject,
      frequency,
      repeat,
      time,
    };

    onSave(newSchedule);
  };

  return (
    <div className="form-container">
      <label>Title:</label>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <br />
      <label>Description:</label>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <br />
      <label>Schedule:</label>
      <input
        type="text"
        value={schedule.Schedule}
        onChange={(e) => setSubject(e.target.value)}
      />
      <br />
      <label>Frequency:</label>
      <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
        <option value="Daily">Daily</option>
        <option value="Weekly">Weekly</option>
        <option value="Monthly">Monthly</option>
      </select>

      {frequency === "Weekly" && (
        <div>
          <label>Repeat:</label>
          {/* Render radio buttons for weekdays */}
          <div>
            {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
              <label key={day} className="weekday-label">
                <input
                  type="radio"
                  value={day}
                  checked={repeat === day}
                  onChange={(e) => setRepeat(e.target.value)}
                />
                {day}
              </label>
            ))}
          </div>
        </div>
      )}

      {frequency === "Monthly" && (
        <div>
          <label>Repeat:</label>
          <select value={repeat} onChange={(e) => setRepeat(e.target.value)}>
            <option value="firstMonday">First Monday</option>
            <option value="lastFriday">Last Friday</option>
          </select>
        </div>
      )}
      <br />
      <label>Time:</label>
      <select value={time} onChange={(e) => setTime(e.target.value)}>
        {[...Array(24)].map((_, index) => (
          <option
            key={index}
            value={`${index % 12 === 0 ? 12 : index % 12} ${
              index < 12 ? "AM" : "PM"
            }`}
          >
            {`${index % 12 === 0 ? 12 : index % 12} ${
              index < 12 ? "AM" : "PM"
            }`}
          </option>
        ))}
      </select>
      <br />
      <div className="button-container">
        <button onClick={onCancel}>Cancel</button>
        <button onClick={handleSubmit}>Done</button>
      </div>
    </div>
  );
};

export default ScheduleForm;
