import React, { Component } from "react";
import TrafficLightContainer from "./TrafficLight";
import FormContainer from "./Form";
import "bootstrap/dist/css/bootstrap.min.css";
import "../App.css";

class TrafficBox extends Component {
  constructor(props) {
    super(props);
    this.state = {
      play: false,
      countDown: "-",
      redOn: false,
      yellowOn: false,
      greenOn: false,
      redLightTime: 0,
      yellowLightTime: 3,
      greenLightTime: 0,
    };
  }

  handleInputObj = (inputObj) => {
    // console.log(`Form sent play '${inputObj.play}'`);
    // console.log(`Box toggle play to '${!inputObj.play}'`);
    this.setState(
      {
        play: !inputObj.play,
        redLightTime: inputObj.redLightTime,
        greenLightTime: inputObj.greenLightTime,
      },
      () => {
        this.mainFunction();
      }
    );
  };

  handleResetObj = (resetObj) => {
    // console.log(
    //   `Box Reset: R ${resetObj.redOn}, Y ${resetObj.yellowOn}, G ${resetObj.greenOn}`
    // );
    this.setState({
      redLightTime: resetObj.redLight,
      greenLightTime: resetObj.greenLight,
      countDown: resetObj.countDown,
      redOn: resetObj.redOn,
      yellowOn: resetObj.yellowOn,
      greenOn: resetObj.greenOn,
    });
  };

  mainFunction = () => {
    const redLightTime = this.state.redLightTime * 1000;
    const yellowLightTime = 3 * 1000;
    const greenLightTime = this.state.greenLightTime * 1000;

    this.clearAllTimeoutAndInterval();

    if (this.state.play) {
      console.log("loop start");

      if (
        /* CHECK IF IT'S STARTED YET */
        this.state.redOn === false &&
        this.state.yellowOn === false &&
        this.state.greenOn === false
      ) {
        if (this.state.play) {
          this.setState(
            {
              redOn: true,
            },
            () => {
              this.mainFunction();
            }
          );
        }
      } else if (
        /* IT'S RED NOW */
        this.state.redOn === true &&
        this.state.yellowOn === false &&
        this.state.greenOn === false
      ) {
        this.setState(
          {
            countDown: this.state.redLightTime,
          },
          () => {
            if (this.state.play) {
              this.watchRed = setInterval(() => {
                this.setState({ countDown: this.state.countDown - 1 });
              }, 1000);
              this.watchRedTimeout = setTimeout(() => {
                if (this.state.play) {
                  this.setState(
                    {
                      redOn: false,
                      greenOn: true,
                    },
                    () => {
                      this.mainFunction();
                    }
                  );
                }
                clearInterval(this.watchRed);
              }, redLightTime);
            } else {
              clearInterval(this.watchRed);
            }
          }
        );
      } else if (
        /* IT'S GREEN NOW */
        this.state.redOn === false &&
        this.state.yellowOn === false &&
        this.state.greenOn === true
      ) {
        this.setState(
          {
            countDown: this.state.greenLightTime,
          },
          () => {
            if (this.state.play) {
              this.watchGreen = setInterval(() => {
                this.setState({ countDown: this.state.countDown - 1 });
              }, 1000);
              this.watchGreenTimeout = setTimeout(() => {
                if (this.state.play) {
                  this.setState(
                    {
                      greenOn: false,
                      yellowOn: true,
                    },
                    () => {
                      this.mainFunction();
                    }
                  );
                }
                clearInterval(this.watchGreen);
              }, greenLightTime);
            } else {
              clearInterval(this.watchGreen);
            }
          }
        );
      } else if (
        /* IT'S YELLOW NOW */
        this.state.redOn === false &&
        this.state.yellowOn === true &&
        this.state.greenOn === false
      ) {
        this.setState(
          {
            countDown: this.state.yellowLightTime,
          },
          () => {
            if (this.state.play) {
              this.watchYellow = setInterval(() => {
                this.setState({ countDown: this.state.countDown - 1 });
              }, 1000);
              this.watchYellowTimeout = setTimeout(() => {
                if (this.state.play) {
                  this.setState(
                    {
                      yellowOn: false,
                      redOn: true,
                    },
                    () => {
                      this.mainFunction();
                    }
                  );
                }
                clearInterval(this.watchYellow);
              }, yellowLightTime);
            } else {
              clearInterval(this.watchYellow);
            }
          }
        );
      } else {
        console.log("bug");
      }
    } else {
      this.setState({
        countDown: "-",
      });
    }
  };

  clearAllTimeoutAndInterval = () => {
    clearTimeout(this.watchRedTimeout);
    clearTimeout(this.watchGreenTimeout);
    clearTimeout(this.watchYellowTimeout);
    clearInterval(this.watchRed);
    clearInterval(this.watchGreen);
    clearInterval(this.watchYellow);
  };

  render() {
    // const redLightTime = this.state.redLightTime * 1000;
    // const yellowLightTime = 3 * 1000;
    // const greenLightTime = this.state.greenLightTime * 1000;
    const { countDown } = this.state;
    // console.log(
    //   `Red: ${this.state.redLightTime}, Green: ${this.state.greenLightTime}`
    // );

    return (
      <div className="trafficbox">
        <h3 className="col-3">Time: {countDown}</h3>
        <TrafficLightContainer className="col-3" playChangeObj={this.state} />
        <FormContainer
          className="col-6"
          inputObj={this.handleInputObj}
          resetObj={this.handleResetObj}
          playChangeObj={this.state}
        />
      </div>
    );
  }
}

export default TrafficBox;
