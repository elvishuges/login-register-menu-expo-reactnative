import React, { useEffect, useState } from "react";
// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  ActivityIndicator,
  StatusBar,
} from "react-native";

//import Card
import { Card } from "react-native-paper";

import UserContext from "../contexts/user.context";

const Projects = ({ navigation }) => {
  const [projects, setProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);
  const { getAllProjects } = React.useContext(UserContext);
  useEffect(() => {
    async function fetchAPI() {
      let response = await getAllProjects();
      setProjects(response);
      setLoadingProjects(false);
    }

    fetchAPI();
  }, []);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#009387" barStyle="light-content" />
      {loadingProjects && (
        <ActivityIndicator
          animating={loadingProjects}
          style={[{ height: 80 }]}
          color="#C00"
          size="large"
          hidesWhenStopped={false}
        />
      )}

      <SafeAreaView style={styles.container}>
        {projects.map((project, i) => {
          return (
            <View key={project._id} style={styles.view}>
              <Card style={styles.card}>
                <Text
                  style={[
                    styles.paragraph,
                    {
                      color: project.active ? "red" : "black",
                    },
                  ]}
                >
                  {project.name}
                </Text>
              </Card>
            </View>
          );
        })}
      </SafeAreaView>
    </View>
  );
};

export default Projects;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 10,
    backgroundColor: "#ecf0f1",
  },
  view: {
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  paragraph: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
});
