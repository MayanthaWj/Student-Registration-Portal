import React from "react";
import { Button, Form, Card } from "react-bootstrap";
import LocalStorage from "../helpers/index";
import axios from "axios";
import HomePage from "../pages/LoginPage";

class LoginCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      password: "",
      isLoggedIn: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this.loginControl = this.loginControl.bind(this);
  }

  async loginControl(event) {
    //event.preventDefault();
    await axios
      .post("http://localhost:3001/login", {
        name: this.state.name,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response.data);
        LocalStorage.set("accessToken", response.data.accessToken);
        this.setState({
          isLoggedIn: !this.state.isLoggedIn,
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  render() {
    const isLoggedIn = this.state.isLoggedIn;
    const loginCard = (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
          <Form>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>User Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter userName"
                value={this.state.name}
                onChange={(e) => this.handleChange({ name: e.target.value })}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
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
                this.loginControl(e);
              }}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );

    return (
      <div>
        {isLoggedIn ? (
          <div className="myHomePage">
            <HomePage />
          </div>
        ) : (
          <div className="loginCard"> {loginCard} </div>
        )}
      </div>
    );
  }
}

export default LoginCard;
