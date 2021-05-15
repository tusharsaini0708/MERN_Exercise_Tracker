import React, { Component } from "react";
import axios from "axios";

class CreateUser extends Component {
  state = {
    username: "",
    previousUsers: [],
  };

  onChangeUsername = (e) => {
    this.setState({
      username: e.target.value,
    });
  };

  onSubmit = async (e) => {
    e.preventDefault();

    await axios.get("http://localhost:5000/users/").then((res) => {
      this.setState({ previousUsers: res.data.map((e) => e.username) });
    });

    const user = {
      username: this.state.username,
    };

    // console.log(this.state.previousUsers);
    // console.log(user.username);
    console.log(user);
    if (this.state.previousUsers.includes(user.username)) {
      alert("User already Exist");
      window.location.reload();
    } else {
      await axios
        .post("http://localhost:5000/users/add", user)
        .then((res) => console.log(res.data))
        .catch((error) => {
          console.log(error);
        });

      window.location = "/create";

      this.setState({
        username: "",
      });
    }
  };

  render() {
    return (
      <div>
        <h3>Create New User</h3>
        <form onSubmit={this.onSubmit}>
          <div className="form-group">
            <label>Username: </label>
            <input
              type="text"
              required
              className="form-control"
              value={this.state.username}
              onChange={this.onChangeUsername}
            />
          </div>
          <div className="form-group">
            <input
              type="submit"
              value="Create User"
              className="btn btn-primary"
            />
          </div>
        </form>
      </div>
    );
  }
}

export default CreateUser;
