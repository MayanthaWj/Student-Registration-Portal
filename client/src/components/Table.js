import React from "react";
import { Table, Button } from "react-bootstrap";
import axios from "axios";
import LocalStorage from "../helpers/index";
import Modal from "../components/Modal";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";

const accessToken = LocalStorage.get("accessToken");

class CourseTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      courseList: [],
      deleteId: "",
      isAddModal: false,
      isEditModal: false,
      course: null,
    };
    this.deleteCourse = this.deleteCourse.bind(this);
    this.editCourseName = this.editCourseName.bind(this);
    this.createCourse = this.createCourse.bind(this);
    this.updateCourseList = this.updateCourseList.bind(this);
    this.updateCourse = this.updateCourse.bind(this);
  }
  createCourse() {
    this.setState({
      isAddModal: !this.state.isAddModal,
    });
  }

  updateCourseList = (res) => {
    this.setState({
      courseList: [...this.state.courseList, res],
      isAddModal: false
    });
  };

  editCourseName(editingCourse) {
    this.setState({
      isEditModal: !this.state.isEditModal,
      course: editingCourse,
    });
  }

  updateCourse = (id, newCourseName) => {
    this.setState({
      courseList: this.state.courseList.map((course) => {
        return course.course_id === id ? {course_id: id, name: newCourseName } : course;
      }),
      isEditModal: false,
      course: null,
    });
  };

  async componentDidMount() {
    await axios
      .get("http://localhost:3001/courses", {
        headers: { "x-access-token": "Bearer " + accessToken },
      })
      .then((response) => {
        this.setState({
          courseList: response.data,
        });
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async deleteCourse(id) {
    await axios
      .delete(`http://localhost:3001/courses/delete/${id}`, {
        headers: { "x-access-token": "Bearer " + accessToken },
      })
      .then((response) => {
        this.setState({
          courseList: this.state.courseList.filter(
            (course) => course.course_id !== id
          ),
        });
        console.log("From delete API: ", response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  render() {
    const courseList = this.state.courseList;
    const isAddModal = this.state.isAddModal;
    const isEditModal = this.state.isEditModal;

    const table = (
      <div className="table" style={{ marginTop: "20px" }}>
        <Table striped bordered hover>
          <thead style={{ borderBottom: "2px solid grey" }}>
            <tr>
              <th>Course ID</th>
              <th>Course Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {courseList && courseList.length > 0
              ? courseList.map((course, index) => (
                  <tr key={index}>
                    <td>{course.course_id}</td>
                    <td>{course.name}</td>
                    <td>
                      <IconButton
                        aria-label="delete"
                        onClick={(e) => {
                          this.deleteCourse(course.course_id);
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                      <IconButton
                        aria-label="update"
                        onClick={(e) => {
                          this.editCourseName(course);
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </td>
                  </tr>
                ))
              : "Loading...."}
          </tbody>
        </Table>
      </div>
    );
    return (
      <div className="tablePageContent">
        <div
          className="addbutton"
          style={{ marginTop: "60px", textAlign: "right", marginRight: "30px" }}
        >
          <Button variant="primary" type="button" onClick={this.createCourse}>
            ADD-COURSE
          </Button>
        </div>

        {isAddModal && (
          <Modal
            handleClose={this.createCourse}
            handleCourseList={this.updateCourseList}
            selectTask={this.state.course}
          />
        )}

        {isEditModal && (
          <Modal
            handleClose={this.editCourseName}
            handleCourseList={this.updateCourse}
            selectTask={this.state.course}
          />
        )}
        {table}
      </div>
    );
  }
}

export default CourseTable;
