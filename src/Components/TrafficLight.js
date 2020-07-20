import React, { Component } from "react";
import TrafficLight from "react-trafficlight";

class TrafficLightContainer extends Component {
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

  render() {
    let status = "Inactive";
    const playChangeObj = this.props.playChangeObj;
    if (playChangeObj.redOn === true && playChangeObj.play === true) {
      status = "STOP";
    } else if (playChangeObj.yellowOn === true && playChangeObj.play === true) {
      status = "SLOW";
    } else if (playChangeObj.greenOn === true && playChangeObj.play === true) {
      status = "GO";
    }
    // console.log(
    //   `Light: R ${playChangeObj.redOn}, Y ${playChangeObj.yellowOn}, G ${playChangeObj.greenOn}`
    // );

    return (
      <div>
        <TrafficLight
          RedOn={playChangeObj.redOn}
          YellowOn={playChangeObj.yellowOn}
          GreenOn={playChangeObj.greenOn}
        />
        <div id="status">{status}</div>
      </div>
    );
  }
}

export default TrafficLightContainer;
