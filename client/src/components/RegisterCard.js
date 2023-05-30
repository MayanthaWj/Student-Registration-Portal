import React from "react";
import { Button, Form, Card } from "react-bootstrap";
import axios from "axios";


class RegisterCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  async createUser(event) {
    //event.preventDefault();

    await axios
      .post("http://localhost:3001/createUser", {
        name: this.state.name,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response);
        alert("User Successfully Created ")
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {

    return (
      <div className="registerCard">
        <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Sign Up</Card.Title>
          <Form>
            <Form.Group
              className="mb-3"
              controlId="formBasicEmail"
              style={{ textAlign: "left" }}
            >
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter userName"
                value={this.state.name}
                onChange={(e) => this.handleChange({ name: e.target.value })}
              />
            </Form.Group>

            <Form.Group
              className="mb-3"
              controlId="formBasicPassword"
              style={{ textAlign: "left" }}
            >
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={this.state.password}
                onChange={(e) =>
                  this.handleChange({ password: e.target.value })
                }
              />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              className="submitButton"
              onClick={(e) => {
                this.createUser(e);
              }}
            >
              Submit
            </Button>
          </Form>
        </Card.Body>
      </Card>
      </div>
    );
  }
}

export default RegisterCard;
