import React from "react";
import { Col, Row, Button, Form, Card } from "react-bootstrap";
//import LoginCard from "../components/LoginCard";
//import RegisterCard from "../components/RegisterCard";
import axios from "axios";
import LocalStorage from "../helpers/index";

class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isShow: false,
      name: "",
      password: "",
    };
    this.togglebutton = this.togglebutton.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.createUser = this.createUser.bind(this);
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  async loginControl(event) {
    event.preventDefault();
    await axios
      .post("http://localhost:3001/login", {
        name: this.state.name,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response.data);
        LocalStorage.set("accessToken", response.data.accessToken);
        this.props.loginHandler();
      })
      .catch((err) => {
        alert("Wrong user name & password combination! ");
        console.log(err);
      });
  }

  async createUser(event) {
    event.preventDefault();
    await axios
      .post("http://localhost:3001/createUser", {
        name: this.state.name,
        password: this.state.password,
      })
      .then((response) => {
        console.log(response);
        alert("User Successfully Created ");
      })
      .catch((err) => {
        console.log(err);
      });
  }

  togglebutton() {
    this.setState({
      isShow: !this.state.isShow,
    });
  }

  render() {
    const isShow = this.state.isShow;
    let buttonText;

    if (isShow) {
      buttonText = "Login";
    } else {
      buttonText = "Register";
    }
    const loginCard = (
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Sign In</Card.Title>
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
                this.loginControl(e);
              }}
            >
              Login
            </Button>
          </Form>
        </Card.Body>
      </Card>
    );
    const registerCard = (
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
    );
    return (
      <div >
        <div
          style={{
            marginTop: "150px",
          }}
        >
          <Row>
            <Col md={{ span: 6, offset: 3 }}>
              <Row>
                <Col md={{ span: 6, offset: 3 }}>
                  {isShow ? <div>{registerCard}</div> : <div>{loginCard}</div>}
                </Col>
              </Row>
            </Col>
          </Row>
          <span>
            Click here to:
            <Button variant="link" onClick={this.togglebutton}>
              {buttonText}
            </Button>{" "}
          </span>
        </div>
      </div>
    );
  }
}
export default LoginPage;
