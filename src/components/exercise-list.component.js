import React, { Component } from "react";
import Exercise from "./exercise.component";
import axios from "axios";

class ExercisesList extends Component {
  state = { exercises: [] };

  componentDidMount() {
    axios
      .get("http://localhost:5000/exercises/")
      .then((response) => {
        this.setState({ exercises: response.data });
      })
      .catch((error) => {
        console.log(error);
      });
  }

  deleteExercise = (id) => {
    axios.delete("http://localhost:5000/exercises/" + id).then((response) => {
      console.log(response.data);
    });

    this.setState({
      exercises: this.state.exercises.filter((el) => el._id !== id),
    });
  };

  render() {
    return (
      <div>
        <h3>Logged Exercises</h3>
        <table className="table">
          <thead className="thead-light">
            <tr>
              <th>Username</th>
              <th>Description</th>
              <th>Duration</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {this.state.exercises.map((currentexercise) => {
              return (
                <Exercise
                  exercise={currentexercise}
                  deleteExercise={this.deleteExercise}
                  key={currentexercise._id}
                />
              );
            })}
          </tbody>
        </table>
      </div>
    );
  }
}

export default ExercisesList;
