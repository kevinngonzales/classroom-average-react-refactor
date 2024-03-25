import React from "react";
import "./App.css";





function App() {
  // ---------------------- states ---------------------
  //state to store inputs, initialize as object with three properties inside array
  const [input, setInput] = React.useState([
    { name: "", address: "", grade: 0 },
  ]);

  //state to store student information in an array, initialize as empty array
  const [students, setStudents] = React.useState([]);

  //state to store student grades independently, initialize as empty array
  const [grades, setGrades] = React.useState([]);

  //state to store average of student grades, initialize as empty string
  const [gradesAverage, setGradesAverage] = React.useState('');
  // -------------------- states ------------------------




  // -------------------- functions --------------------

// function to handle change within input fields, takes event as parameter
// destructure name and value from the event.target
// udpate state using setInput, provide a function as an argument
// function will preserve previous input and update state with [name]of input and the value 
// when change is detected in input field then this function will run
  function handleChange(e) {
    const { name, value } = e.target;
    setInput(function(prevInput) {
      return { ...prevInput, [name]: value }
    });
  }

// function to handle form submit, takes event as parameter
// e.preventDefault = prevent default behavior of event, in this case button which will prevent page from reloading when clicked
// if conditional statement to make sure that fields are not left blank, if it is then alert and return.
// call setStudents to update students state and provide a function as an argument
//function will take prevStudents as parameter and preserve prevStudent and will store input in students
// lastly call setInput and revert input as empty strings to reset input fields
//this function is called when form is submitted
  function handleSubmit(e) {
    e.preventDefault();
    if (!input.name || !input.address || !input.grade) {
      alert("Please fill all fields before submitting.");
      return;
    }
    setStudents(function (prevStudents) {
      return [...prevStudents, input];
    });
    setInput({ name: "", address: "", grade: "" });
  }

// function to reset the table, will just update state of students and grades average to empty array/string when called
  function resetTable() {
    setStudents([]);
    setGradesAverage("");
  }



// function to calculate average of student's grades
// declare variable grades and map through students and store just the grades property
//use parseInt to convert string to a number
// pass grades to setGrades to update state of grades, this holds grades array
// declare variable sum and use use reduce method on grades which will add values in array and return sum
// declare variable avg which takes sum and divides by grades.length, toFixed(2) to make sure number returned only has 2 digits after decimal point
// lastly, update avg gradesAverage state by calling setGradesAverage
  function handleCalcAvg() {
    const grades = students.map((students) => parseInt(students.grade));
    setGrades(grades);
    const sum = grades.reduce((acc, curr) => acc + curr, 0);
    const avg = (sum / grades.length).toFixed(2);
    setGradesAverage(avg);
  }

  // -------------------- functions ---------------------



  return (
    <>

<h1 className="title"> Classroom Average Calculator</h1>

<div className="container">
      <table className="table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Address</th>
            <th>Grade</th>
          </tr>
        </thead>

        <tbody>
          {/* map through students array and render them in a table */}
          {students.map((student, index) => (
            <tr key={index} className="newStudent">
              <td>{index + 1}</td>
              <td>{student.name}</td>
              <td>{student.address}</td>
              <td>{student.grade}</td>
            </tr>
          ))}
        </tbody>
      </table>


      <div className="avgGrade">
        {/* conditional render: if grades.length is greater than 0 then render gradesAverage */}
        <span>Average Grade:&nbsp;</span>
        {grades.length > 0 && <span> {gradesAverage} </span>}
      </div>
</div>

      <form className="form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={input.name || ""}
          onChange={handleChange}
        ></input>

        <input
          type="text"
          name="address"
          placeholder="Address"
          value={input.address || ""}
          onChange={handleChange}
        ></input>

        <input
          type="number"
          name="grade"
          placeholder="Grade"
          value={input.grade || ""}
          onChange={handleChange}
        ></input>

        <button type="submit">Submit</button>
      </form>

      <div className="buttonContainer">
      <button onClick={resetTable}>Reset Table</button>
      <button onClick={handleCalcAvg}>Calculate Average</button>
      </div>

    </>
  );
}

export default App;
