import React, { Component } from "react";
import { Text, View, SafeAreaView, StatusBar, Button } from "react-native";

export default class Home extends Component {
  render() {
    return (
      <SafeAreaView
        style={{
          marginTop: StatusBar.currentHeight,
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          flex: 1
        }}
      >
        <Button
          title="Scan Face"
          onPress={() => this.props.navigation.navigate("Scan")}
        />
        <View style={{ marginTop: 20 }} />
        <Button title="Listen Songs" />
      </SafeAreaView>
    );
  }
}
