import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  ActivityIndicator,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
const { width } = Dimensions.get("window");

import UserContext from "../contexts/user.context";
import DispatchContext from "../contexts/dispatch.context";
import DeveloperCardProfile from "../components/DeveloperCardProfile";
import TableDevelopersHours from "../components/TableDevelopersHours";

export default function Users() {
  const [users, setUsers] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [loadingUsers, setLoadingUsers] = useState(true);

  const dispatch = React.useContext(DispatchContext);
  const { getAllUsers, getAllHours, getAllProjects } =
    React.useContext(UserContext);

  useEffect(() => {
    async function fetchAPI() {
      let responseUsers = await getAllUsers(dispatch);
      let responseHours = await getAllHours(dispatch);
      let responseProjects = await getAllProjects(dispatch);

      formatDataTableRows(responseHours, responseUsers, responseProjects);
      setLoadingUsers(false);
      setUsers(responseUsers);
    }

    fetchAPI();
  }, []);
  const formatDataTableRows = (hours, users, projects) => {
    let dataTableRows = [];
    hours.forEach((hour) => {
      let project = projects.find((project) => project._id === hour.project);
      let user = users.find((user) => user._id === hour.user);

      if (project) {
        let tableElement = {
          project: project.name,
          hours: hour.hours,
          day: hour.day,
          user: user ? user.name : "--",
          active: project.active,
        };
        dataTableRows.push(tableElement);
      }
    });
    console.log("result itens", dataTableRows);

    setTableData(dataTableRows);
  };
  return (
    <View style={styles.container}>
      <Text style={styles.titleProject}>Desenvolvedores:</Text>
      <View style={styles.viewScroll}>
        <ScrollView
          horizontal={true}
          decelerationRate={0}
          snapToInterval={width - 60}
          snapToAlignment={"center"}
        >
          {loadingUsers && (
            <ActivityIndicator
              style={styles.activator}
              animating={loadingUsers}
              style={[{ height: 80 }]}
              color="#C00"
              size="large"
              hidesWhenStopped={false}
            />
          )}
          {users.map((user, i) => {
            return <DeveloperCardProfile key={user._id} user={user} />;
          })}
        </ScrollView>
      </View>
      <Text style={styles.titleProject}>Detalhes de projeto:</Text>
      <ScrollView style={styles.scrollView}>
        <TableDevelopersHours tableData={tableData} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: 0,
    paddingHorizontal: 3,
  },
  scrollView: {
    flexGrow: 1,
  },
  viewScroll: {
    height: "25%",
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  scrollView: {
    flexGrow: 1,
  },
  titleProject: {
    fontSize: 15,
    paddingHorizontal: 5,
    paddingTop: 10,
  },
  activator: {
    alignItems: "center",
  },
});
