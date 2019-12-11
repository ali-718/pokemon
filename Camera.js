import React, { Component } from "react";
import { Text, View } from "react-native";
import { Camera } from "expo-camera";
import * as FaceDetector from "expo-face-detector";
import * as Permissions from "expo-permissions";
import { Icon, Button } from "native-base";

export default class CameraComponent extends Component {
  state = {
    faceSquare: {}
  };

  render() {
    return (
      <View style={{ width: "100%", flex: 1 }}>
        {console.log(this.state.faceSquare)}
        <Camera
          type={Camera.Constants.Type.front}
          style={{ height: 300, width: "100%" }}
          onFacesDetected={res => {
            if (res.faces[0]) {
              this.setState({
                faceSquare: {
                  width: res.faces[0].bounds.size.width,
                  height: res.faces[0].bounds.size.height,
                  marginLeft: res.faces[0].bounds.origin.x,
                  marginTop: res.faces[0].bounds.origin.y,
                  smillingProbability: res.faces[0].smilingProbability
                }
              });
            }
            if (res.faces.length == 0) {
              this.setState({
                faceSquare: {}
              });
            }
            // else {
            //   this.setState({
            //     faceSquare: {}
            //   });
            // }
          }}
          faceDetectorSettings={{
            mode: FaceDetector.Constants.Mode.fast,
            detectLandmarks: FaceDetector.Constants.Landmarks.none,
            runClassifications: FaceDetector.Constants.Classifications.all,
            minDetectionInterval: 100,
            tracking: true
          }}
        >
          {Object.keys(this.state.faceSquare) ? (
            <View>
              <View
                style={{
                  borderWidth: 2,
                  borderColor:
                    this.state.faceSquare.smillingProbability > 0.7
                      ? "green"
                      : "red",
                  borderStyle: "solid",
                  width: this.state.faceSquare.width,
                  height: this.state.faceSquare.height,
                  marginLeft: this.state.faceSquare.marginLeft,
                  marginTop: this.state.faceSquare.marginTop
                }}
              ></View>
              {this.state.faceSquare.smillingProbability > 0.7 ? (
                <Button
                  style={{
                    backgroundColor: "#007AFF",
                    width: 60,
                    height: 50,
                    alignSelf: "center",
                    marginTop: 10
                  }}
                >
                  <Icon active name="smile" type="FontAwesome5" />
                </Button>
              ) : null}
            </View>
          ) : null}
        </Camera>

        <View style={{ width: "100%", flexDirection: "row", marginTop: 20 }}>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Happy</Text>
          </View>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>
              {this.state.faceSquare
                ? (this.state.faceSquare.smillingProbability * 100).toFixed(2)
                : 0}
              %
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", flexDirection: "row", marginTop: 20 }}>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Sad</Text>
          </View>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>
              {this.state.faceSquare
                ? (
                    Math.abs(this.state.faceSquare.smillingProbability - 1) *
                    100
                  ).toFixed(2)
                : 0}
              %
            </Text>
          </View>
        </View>
        <View style={{ width: "100%", flexDirection: "row", marginTop: 20 }}>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>Angry</Text>
          </View>
          <View style={{ width: "50%", alignItems: "center" }}>
            <Text style={{ fontSize: 20 }}>
              {this.state.faceSquare
                ? this.state.faceSquare.smillingProbability > 0.95
                  ? (
                      Math.abs(
                        this.state.faceSquare.smillingProbability - 0.9
                      ) * 100
                    ).toFixed(2)
                  : (
                      Math.abs(
                        this.state.faceSquare.smillingProbability - 0.7
                      ) * 100
                    ).toFixed(2)
                : 0}
              %
            </Text>
          </View>
        </View>
      </View>
    );
  }
}
