import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  Dimensions,
  ImageBackground,
} from "react-native";
import { BackgroundImage } from "react-native-elements/dist/config";
const { width } = Dimensions.get("window");

export default function DeveloperCardProfile(props) {
  const { user, imageUrl } = props;
  return (
    <View style={styles.view}>
      <View style={{ height: "100%", width: "100%" }}>
        <BackgroundImage
          source={user.imageUrl}
          resizeMode="cover"
          style={styles.image}
        >
          <Text style={styles.textView}>{user.name}</Text>
        </BackgroundImage>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  view: {
    marginTop: 10,
    backgroundColor: "#0088BB",
    width: width - 180,
    margin: 5,
    height: 100,
    borderRadius: 10,
    //paddingHorizontal : 30
  },
  image: {
    flex: 1,
    width: "100%",
    borderRadius: 10,
    overflow: "hidden",
    borderWidth: 3,
  },
  textView: {
    color: "#fff",
    paddingHorizontal: 5,
  },
});
