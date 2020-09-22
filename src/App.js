import React, { Component } from 'react';
import Particles from 'react-particles-js';
import Navigation from './components/Navigation/Navigation';
import SignIn from './components/SignIn/SignIn';
import Register from './components/Register/Register';
import Logo from './components/Logo/Logo';
import ImageLinkForm from './components/ImageLinkForm/ImageLinkForm';
import Rank from './components/Rank/Rank';
import PlantCard from './components/PlantCard/PlantCard';

import './App.css';

const fetch = require('node-fetch');



// Sets params for React particles
const particlesOptions = {
  particles: {
    number: {
      value: 60,
      density: {
        enable: true,
        value_area: 800
      }
    }
  }
};

// declare Initial State
const initialState = {
  input: '',
  searchTerm: '',
  route: 'signin',
  isSignedIn: false,
  showPlantCard: false,
  isOpen: false,
  userToken: '',
  user: {
    id: '',
    name: '',
    email: '',
    entries: 0,
    joined: ''
  },
  plantData: {
    common_name: '',
    scientific_name: '',
    family: '',
    image_url: '',
    genus: '',
    year: ''
  }
};
// App
class App extends Component {
  constructor() {
    super();
    this.state = initialState;
  }

  // GetToken

  getToken = () => {
    fetch('https://pacific-shore-35638.herokuapp.com/token')
      .then(response => response.json())
      .then(data => {
        this.setState({ userToken: data.token });
      })
      .catch(err => console.log('Can not resolve token'));
  };

  // Load User
  loadUser = (data) => {
    this.getToken();
    this.setState({
      user: {
        id: data.id,
        name: data.name,
        email: data.email,
        entries: data.entries,
        joined: data.joined
      }
    });
  };

  // Search Input Change
  onInputChange = (event) => {
    this.setState({ searchTerm: event.target.value });
  };

  // Button Submit input
  onButtonSubmit = () => {
    this.showComponent();
    this.showPlants();
  };
  // Show Plant Card
  showComponent() {
    this.setState({ showPlantCard: true });
  }
  // Close Plant Card
  hideComponent() {
    this.setState({ showPlantCard: false });
  }
  onHideCard = () => {
    this.hideComponent();
  };

  // Show Plants Function
  showPlants = () => {
    if (this.state.searchTerm === '') {
      alert('Having trouble finding this one... try something different!');
    } else {
      (async () => {
        const response = await fetch(`https://trefle.io/api/v1/plants/search?token=${this.state.userToken}&q=${this.state.searchTerm}`);

        const plantData = await response.json();
        console.log(plantData);

        if (plantData.data[0] !== undefined) {
          this.setState({ plantData: plantData.data[0] });
        } else {
          alert("Could not find what you were looking for... Try again!");
        }
      })();
    }
  };

  // App Route Change
  onRouteChange = (route) => {
    if (route === 'signout') {
      this.setState(initialState);
    } else if (route === 'home') {
      this.setState({ isSignedIn: true });
    }
    this.setState({ route: route });
  };
  render() {
    const { isSignedIn, route, showPlantCard, plantData, user } = this.state;
    return (
      <div className="App" >
        <Particles
          className='particles'
          params={
            particlesOptions
          } />
        <Navigation
          isSignedIn={isSignedIn}
          onRouteChange={this.onRouteChange} />
        { route === 'home'
          ? <div>
            <Logo />
            <Rank
              name={user.name}
              entries={user.entries} />
            <ImageLinkForm
              onInputChange={this.onInputChange}
              onButtonSubmit={this.onButtonSubmit} />

            {showPlantCard && <PlantCard
              onHideCard={this.onHideCard}
              common_name={plantData.common_name}
              family={plantData.family}
              image_url={plantData.image_url}
              scientific_name={plantData.scientific_name}
              genus={plantData.genus}
              year={plantData.year} />}
          </div>
          : (
            route === 'signin'
              ? <SignIn
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} />

              : <Register
                loadUser={this.loadUser}
                onRouteChange={this.onRouteChange} />
          )
        }
      </div >
    );
  }
}

export default App;
