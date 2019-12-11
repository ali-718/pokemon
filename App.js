import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Camera from "./Camera";
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import Home from "./Home";
import * as Permissions from "expo-permissions";

const Stack = createStackNavigator(
  {
    Home: {
      screen: Home
    },
    Scan: {
      screen: Camera
    }
  },
  {
    headerMode: "none"
  }
);

const MainNav = createAppContainer(Stack);

export default class App extends React.Component {
  async componentDidMount() {
    const { status } = await Permissions.askAsync(Permissions.CAMERA);
    this.setState({ hasCameraPermission: status === "granted" });
  }

  render() {
    return <MainNav />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center"
  }
});
