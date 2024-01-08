import React, { useState } from "react";
import ScheduleForm from "./ScheduleForm";
import ScheduleList from "./ScheduleList";
import schedulesData from "./data";

const App = () => {
  const [schedules, setSchedules] = useState(schedulesData);
  const [editSchedule, setEditSchedule] = useState(null);
  const [isFormVisible, setIsFormVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const handleAdd = () => {
    setEditSchedule(null);
    setIsFormVisible(true);
  };

  const handleEdit = (schedule) => {
    console.log("schedule", schedule);
    setEditSchedule(schedule);
    setIsFormVisible(true);
  };

  const handleDelete = (id) => {
    setSchedules(schedules.filter((schedule) => schedule.id !== id));
  };

  const handleSave = (newSchedule) => {
    if (editSchedule) {
      // Update schedule in the list
      setSchedules((prevSchedules) =>
        prevSchedules.map((schedule) =>
          schedule.id === editSchedule.id
            ? { ...schedule, ...newSchedule }
            : schedule
        )
      );
    } else {
      // Add new schedule to the list
      setSchedules((prevSchedules) => [
        ...prevSchedules,
        { id: prevSchedules.length + 1, ...newSchedule },
      ]);
    }

    setEditSchedule(null);
    setIsFormVisible(false);
  };

  const handleCancel = () => {
    setEditSchedule(null);
    setIsFormVisible(false);
  };

  const handleSearch = (event) => {
    // Perform search functionality here
    const searchTitles = event.target.value
      .toLowerCase()
      .split(",") // Split the search term by commas
      .map((term) => term.trim()); // Trim extra spaces from each term

    const filteredSchedules = schedulesData.filter((schedule) => {
      // Check if any of the search titles match the schedule's title
      return searchTitles.some((searchTitle) =>
        schedule.title.toLowerCase().includes(searchTitle)
      );
    });

    // Update the displayed schedules based on the search
    setSchedules(filteredSchedules);
  };

  // const handleSearch = (event) => {
  //   const searchTerm = event.target.value.toLowerCase().trim();

  //   // If search term is empty, reset to original schedules
  //   if (!searchTerm) {
  //     setSchedules([]);
  //     return;
  //   }

  //   // Filter schedules based on the search term
  //   const filteredSchedules = schedulesData.filter((schedule) =>
  //     schedule.title.toLowerCase().trim().includes(searchTerm)
  //   );

  //   // Update the displayed schedules based on the search
  //   setSchedules(filteredSchedules);
  // };

  return (
    <div className="container1">
      <div className="header-container">
        <input
          className="search-input"
          type="text"
          placeholder="Search..."
          // value={searchTerm}
          onChange={handleSearch}
        />
        <button className="add-button" onClick={handleAdd}>
          Add
        </button>
      </div>
      <div>
        <ScheduleList
          schedules={schedules}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      </div>
      {isFormVisible && (
        <div className="popover">
          <ScheduleForm
            onSave={handleSave}
            onCancel={handleCancel}
            schedule={editSchedule}
          />
        </div>
      )}
    </div>
  );
};

export default App;
