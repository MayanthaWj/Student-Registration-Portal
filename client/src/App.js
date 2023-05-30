import "./App.css";
import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoggedIn: false,
    };
    this.loginButton = this.loginButton.bind(this);
  }
  loginButton() {
    this.setState({
      isLoggedIn: !this.state.isLoggedIn,
    });
  }
  render() {
    const isLoggedIn = this.state.isLoggedIn;
    return (
      <div className="App" >
        {isLoggedIn ? (
          <HomePage />
        ) : (
          <LoginPage loginHandler={this.loginButton} />
        )}
      </div>
    );
  }
}
export default App;
