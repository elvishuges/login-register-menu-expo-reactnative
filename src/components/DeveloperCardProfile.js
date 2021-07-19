import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");

export default function DeveloperCardProfile(props) {
  const { user } = props;
  return (
    <View style={styles.view}>
      <View
        style={{
          borderRadius: 10,
          overflow: "hidden",
        }}
      >
        <View style={{ width: "100%", paddingHorizontal: 5 }}>
          <Text style={{ color: "#fff" }}> {user.name}</Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
    backgroundColor: "#0088BB",
    width: width - 180,
    margin: 10,
    height: 100,
    borderRadius: 10,
    //paddingHorizontal : 30
  },
});
