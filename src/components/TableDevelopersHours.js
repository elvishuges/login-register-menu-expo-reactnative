import * as React from "react";
import { Text, ScrollView } from "react-native";
import { DataTable } from "react-native-paper";

const optionsPerPage = [0, 5, 10];

const TableDevelopersHours = (props) => {
  const { tableData } = props;
  const [page, setPage] = React.useState(0);
  const [itemsPerPage, setItemsPerPage] = React.useState(optionsPerPage[0]);

  const from = page * itemsPerPage;
  const to = Math.min((page + 1) * itemsPerPage, tableData.length);

  React.useEffect(() => {
    setPage(1);
  }, [itemsPerPage]);

  const formatStateToIcon = (state) => {
    return state ? <Text>Ativo</Text> : <Text>Desativo</Text>;
  };

  return (
    <DataTable style={{ height: 300 }}>
      <DataTable.Header>
        <DataTable.Title style={{ flex: 1.5 }}>Desenvolvedor</DataTable.Title>
        <DataTable.Title style={{ flex: 1.5 }}>Projeto</DataTable.Title>
        <DataTable.Title>Horas</DataTable.Title>
        <DataTable.Title>Estado</DataTable.Title>
      </DataTable.Header>
      <ScrollView>
        {tableData.map((data, i) => {
          return (
            <DataTable.Row style={{ borderBottomWidth: 0 }} key={i}>
              <DataTable.Cell style={{ flex: 1.5 }}>{data.user}</DataTable.Cell>
              <DataTable.Cell style={{ flex: 1.5 }}>
                {data.project}
              </DataTable.Cell>
              <DataTable.Cell>{data.hours}</DataTable.Cell>
              <DataTable.Cell>{formatStateToIcon(data.active)}</DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </ScrollView>

      <DataTable.Pagination
        page={page}
        numberOfPages={Math.ceil(tableData.length / itemsPerPage)}
        onPageChange={(page) => setPage(page)}
        label={`${from + 1}-${to} of ${tableData.length}`}
        optionsPerPage={5}
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        showFastPagination
        optionsLabel={"Rows per page"}
      />
    </DataTable>
  );
};

export default TableDevelopersHours;
