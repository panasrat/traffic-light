import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
//import TrafficLightContainer from "./TrafficLight";

class FormContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      countDown: 0,
      redOn: true,
      yellowOn: false,
      greenOn: false,
      redLight: 0,
      greenLight: 0,
    };
  }

  handleChange = (event) => {
    event.preventDefault();
    const name = event.target.name;
    const value = event.target.value;
    this.setState({ [name]: value });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const { inputObj } = this.props;
    inputObj({
      play: this.state.play,
      redLightTime: this.state.redLight,
      greenLightTime: this.state.greenLight,
    });
    this.setState({
      play: !this.state.play,
    });
    // if (this.state.play === true) {
    //   console.log("True");
    //   this.setState({
    //     redOn: this.state.redOn,
    //     yellowOn: this.state.yellowOn,
    //     greenOn: this.state.greenOn,
    //   });
    // } else if (this.state.play === false) {
    //   console.log("False");
    // }
    this.handleSubmitButton();
    //this.handleCountDown();
  };

  handleSubmitButton = () => {
    //console.log("Clicked");
    const playValue = this.props.playChangeObj.play;
    const submitButton = document.getElementById("playPauseBtn");
    if (playValue === false) {
      //console.log("Change to clicked");
      submitButton.classList.remove("btn-primary");
      submitButton.classList.add("btn-secondary");
    } else if (playValue === true) {
      //console.log("Change to unclicked");
      submitButton.classList.remove("btn-secondary");
      submitButton.classList.add("btn-primary");
    }
  };

  handleReset = (event) => {
    event.preventDefault();
    const { resetObj } = this.props;
    resetObj({
      redLight: 0,
      greenLight: 0,
      countDown: "-",
      redOn: false,
      yellowOn: false,
      greenOn: false,
    });
    this.setState({
      play: false,
      countDown: 0,
      redOn: false,
      yellowOn: false,
      greenOn: false,
      redLight: 0,
      greenLight: 0,
    });
    //console.log(`Reset state done ${this.state.play}`);
    //this.handleResetTrafficLight();
  };

  handleResetTrafficLight = () => {
    const { resetObj } = this.props;
    resetObj({
      play: false,
      redLightTime: 0,
      greenLightTime: 0,
    });
    //console.log(resetObj.play);
  };

  render() {
    const redLightTime = this.state.redLight;
    const greenLightTime = this.state.greenLight;
    const playValue = this.props.playChangeObj.play;
    let playOrPause = "Play";
    if (this.state.play === true) {
      playOrPause = "Pause";
    }
    // console.log(playValue);
    return (
      <div>
        <h1>Traffic Light Controller</h1>

        <form onSubmit={this.handleSubmit} onReset={this.handleReset}>
          <div className="form-group">
            <label step="1" className="col-3">
              Red
            </label>
            <input
              name="redLight"
              type="number"
              min="0"
              className="col-4"
              value={redLightTime}
              onChange={this.handleChange}
              disabled={playValue}
            ></input>
          </div>
          <div className="form-group">
            <label step="1" className="col-3">
              Green
            </label>
            <input
              name="greenLight"
              type="number"
              min="0"
              className="col-4"
              value={greenLightTime}
              onChange={this.handleChange}
              disabled={playValue}
            ></input>
          </div>
          <div className="form-group">
            <div className="btn-group offset-3 " role="group">
              <button
                id="playPauseBtn"
                type="submit"
                className="btn btn-primary"
              >
                {playOrPause}
              </button>
              <button
                type="reset"
                className="btn btn-warning"
                disabled={playValue}
              >
                Reset
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default FormContainer;
