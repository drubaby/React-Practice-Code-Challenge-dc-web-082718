import React, { Component } from "react";
import SushiContainer from "./containers/SushiContainer";
import Table from "./containers/Table";

// Endpoint!
const API = "http://localhost:3000/sushis";

// sushi is properly received from server
// only 4 sushi are rendered at a time
//clicking more sushi button produces a new set of four
// customers are automatically charged when they eat sushi (in table comp)
// customers cant eat any more sushi when they're out of money

class App extends Component {
  constructor() {
    super();
    this.state = {
      sushiPageCounter: 1,
      sushiList: [],
      wallet: 100,
      eatenSushi: []
    };
  }

  componentDidMount() {
    this.fetchNewSushi();
  }

  handleSushiEaten = sushi => {
    if (sushi.price <= this.state.wallet) {
      this.setState({
        eatenSushi: [...this.state.eatenSushi, sushi],
        wallet: this.state.wallet - sushi.price
      });
    }
  };

  handleMoreButton = () => {
    console.log("clicked it");
    this.setState(
      { sushiPageCounter: this.state.sushiPageCounter + 1 },
      this.fetchNewSushi
    );
  };

  fetchNewSushi = () => {
    fetch(API.concat(`?_page=${this.state.sushiPageCounter}&_limit=4`))
      .then(r => r.json())
      .then(sushis => {
        this.setState({ sushiList: sushis });
      });
  };

  render() {
    return (
      <div className="app">
        <SushiContainer
          sushiList={this.state.sushiList}
          handleMoreButton={this.handleMoreButton}
          handleSushiEaten={this.handleSushiEaten}
          eatenSushi={this.state.eatenSushi}
        />
        <Table wallet={this.state.wallet} eatenSushi={this.state.eatenSushi} />
      </div>
    );
  }
}

export default App;
