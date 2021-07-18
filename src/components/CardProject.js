import React from "react";
import { Card } from "react-native-paper";
import { Text, View, StyleSheet } from "react-native";

export default function CardProject(props) {
  const { project } = props;
  return (
    <View style={styles.view}>
      <Card
        style={project.active ? styles.activeProject : styles.deactiveProject}
      >
        <Text style={[styles.paragraph]}>{project.name}</Text>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
  },
  view: {
    paddingHorizontal: 5,
    paddingVertical: 5,
  },
  paragraph: {
    fontSize: 15,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  activeProject: {
    backgroundColor: "#3CB371",
  },
  deactiveProject: {
    backgroundColor: "#F25D5B",
  },
});
