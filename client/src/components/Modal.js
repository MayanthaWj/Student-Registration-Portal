import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import axios from "axios";
import LocalStorage from "../helpers/index";

const accessToken = LocalStorage.get("accessToken");

class taskViewModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      course_id: "",
      name: "",
      newCourseName: "",
    };
    this.handleChange = this.handleChange.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
  }

  handleChange(changeObject) {
    this.setState(changeObject);
  }

  async createCourse(event) {
    event.preventDefault();
    await axios
      .post(
        "http://localhost:3001/courses/insert",
        {
          course_id: this.state.course_id,
          name: this.state.name,
        },
        {
          headers: { "x-access-token": "Bearer " + accessToken },
        }
      )
      .then((response) => {
        console.log(response);
        this.props.handleCourseList(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async updateCourse() {
    let id = this.props.selectTask.course_id;
    let newName = this.state.newCourseName;

    await axios
      .put(`http://localhost:3001/courses/update/${id}`, {
        name: newName,
      },
      {
        headers: { "x-access-token": "Bearer " + accessToken },
      }
      )
      .then((response) => {
        this.props.handleCourseList(id, newName);
      })
      .catch((err) => {
        alert(err);
      });
  }

  render() {
    const courseAddView = (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicCourseId">
          <Form.Label>Course ID</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter courseID"
            value={this.state.course_id}
            onChange={(e) => this.handleChange({ course_id: e.target.value })}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicCourseName">
          <Form.Label>Course Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter courseName"
            value={this.state.name}
            onChange={(e) => this.handleChange({ name: e.target.value })}
          />
        </Form.Group>
      </Form>
    );

    const courseUpdateView = (
      <Form>
        <Form.Group className="mb-3" controlId="formBasicCourseName">
          <Form.Label> New Course-Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter courseName"
            value={this.state.newCourseName}
            onChange={(e) =>
              this.handleChange({ newCourseName: e.target.value })
            }
          />
        </Form.Group>
      </Form>
    );
    const selectTask = this.props.selectTask;
    let title = "Add Course";
    let buttonFunction = this.createCourse;
    let modalBody = courseAddView;

    if (selectTask) {
      title = "Update Course";
      modalBody = courseUpdateView;
      buttonFunction = this.updateCourse;
    }

    return (
      <Modal.Dialog>
        <Modal.Header closeButton onClick={this.props.handleClose}>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>{modalBody}</Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.props.handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={buttonFunction}>
            Save changes
          </Button>
        </Modal.Footer>
      </Modal.Dialog>
    );
  }
}
export default taskViewModal;
