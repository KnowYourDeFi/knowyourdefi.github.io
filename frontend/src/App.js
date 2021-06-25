import React from 'react';
import './App.scss';
import './bootstrap.css';
import logo from './logo.png';
import LiquityInfo from './liquity/LiquityInfo';
import Profile from './profile/Profile';

const Page = Object.freeze({ "liquity": 1, "profile": 2 })

class App extends React.Component {

  state = {
    page: Page.liquity,
  }

  page() {
    switch (this.state.page) {
      case Page.liquity:
      default:
        return <LiquityInfo />
      case Page.profile:
        return <Profile />
    }
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <img className="app-logo" src={logo} alt={logo} onClick={() => { this.setState({ page: Page.liquity }) }}></img>
          <div className="app-profile" onClick={() => { this.setState({ page: Page.profile }) }}>Profile</div>
        </header>

        <div className="app-body">
          {this.page()}
        </div>
      </div>
    );
  }
}

export default App;
