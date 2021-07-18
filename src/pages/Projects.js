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
import CardProject from "../components/CardProject";

//import Card

import UserContext from "../contexts/user.context";
import DispatchContext from "../contexts/dispatch.context";

const Projects = ({ navigation }) => {
  const [activeProjects, setActiveProjects] = useState([]);
  const [deactivateProjects, setDeactivateProjects] = useState([]);
  const [loadingProjects, setLoadingProjects] = useState(true);

  const dispatch = React.useContext(DispatchContext);
  const { getAllProjects } = React.useContext(UserContext);

  useEffect(() => {
    async function fetchAPI() {
      let response = await getAllProjects(dispatch);
      const actives = response.filter((project) => project.active);
      const deactives = response.filter((project) => !project.active);
      setActiveProjects(actives);
      setDeactivateProjects(deactives);
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

      {!loadingProjects && (
        <SafeAreaView style={styles.container}>
          <Text style={styles.titleProject}>
            Projetos ativos: {activeProjects.length}
          </Text>
          <View style={styles.cardsList}>
            {activeProjects.map((project, i) => {
              return <CardProject key={project._id} project={project} />;
            })}
          </View>

          <Text style={styles.titleProject}>
            Projetos desativos: {deactivateProjects.length}
          </Text>
          <View style={styles.cardsList}>
            {deactivateProjects.map((project, i) => {
              return <CardProject key={project._id} project={project} />;
            })}
          </View>
        </SafeAreaView>
      )}
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
  cardsList: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  paragraph: {
    fontSize: 15,
    fontWeight: "bold",
    textAlign: "center",
    padding: 10,
  },
  row: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  titleProject: {
    fontSize: 15,
    paddingHorizontal: 5,
  },
});
