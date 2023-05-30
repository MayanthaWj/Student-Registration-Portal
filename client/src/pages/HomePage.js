import React from "react";
import NavBar from "../components/Navbar";
import CourseTable from "../components/Table";

class HomePage extends React.Component {
  render() {
    return (
      <div className="homePage">
        <NavBar />
        <CourseTable />
      </div>
    );
  }
}
export default HomePage;


