import { View, Text, ScrollView, Image } from "react-native";
import * as React from "react";
import { DataTable } from "react-native-paper";
import AvartarImg from "../../../assets/images/activity/Group13719.png";

export default function TableScoreOfActivity({ route }) {
  const itemId = route.params.itemId;

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "white",
        height: "100%",
        padding: 16,
      }}
    >
      <View>
        <Text style={{ fontWeight: "700", fontSize: 24, color: "#2A323C" }}>
          ตารางคะแนน
        </Text>
        <DataTable>
          <DataTable.Header style={{ borderBottomWidth: 0 }}>
            <DataTable.Title />

            <DataTable.Title>ชื่อ</DataTable.Title>
            <DataTable.Title numeric>ก้าวเดิน</DataTable.Title>
            <DataTable.Title numeric>ระยะทาง</DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={{ borderBottomWidth: 0 }}>
            <DataTable.Cell style={{ flex: 1 }}>1</DataTable.Cell>
            <DataTable.Cell style={{ flex: 3 }}>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={AvartarImg}
                  style={{ width: 32, height: 32, marginRight: 6 }}
                />
                <Text>Sorawit Kri.</Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1.5 }}>320,023</DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>980</DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </ScrollView>
  );
}
