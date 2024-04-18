import { View, Text, ScrollView, Image } from "react-native";
import * as React from "react";
import { DataTable } from "react-native-paper";
import AvartarImg from "../../../assets/images/activity/Group13719.png";
import { useDispatch, useSelector } from "react-redux";
import { getRankScoreEvent } from "../../../redux/get";
import { Skeleton } from "@rneui/themed";

export default function TableScoreOfActivity({ route }) {
  const itemId = route.params.itemId;
  const dispatch = useDispatch();
  const dataScores = useSelector(({ getData }) => getData.rank_event_score);
  const statusScore = useSelector(
    ({ getData }) => getData.status_rank_event_score
  );
  console.log("statusScore", statusScore);
  React.useEffect(() => {
    dispatch(getRankScoreEvent(itemId));
  }, [itemId]);

  if (statusScore !== "loading" || dataScores == undefined) {
    return (
      <View
        style={{
          flexGrow: 1,
          backgroundColor: "white",
          flexDirection: "column",
        }}
      >
        <Skeleton width={"100%"} height={211} />
        <View style={{ padding: 16 }}>
          <Skeleton width={"100%"} height={60} />
          <Skeleton width={"100%"} height={20} style={{ marginTop: 16 }} />
          <Skeleton width={"100%"} height={30} style={{ marginTop: 24 }} />
          <Skeleton width={"100%"} style={{ marginTop: 16 }} />
        </View>
      </View>
    );
  }

  return (
    <ScrollView
      contentContainerStyle={{
        backgroundColor: "white",
        height: "100%",
        padding: 16,
        paddingTop: 0,
      }}
    >
      <View>
        <Text
          style={{
            fontFamily: "IBMPlexSansThai-Bold",
            fontSize: 24,
            color: "#2A323C",
          }}
        >
          ตารางคะแนน
        </Text>

        <DataTable>
          <DataTable.Header style={{ borderBottomWidth: 0 }}>
            <DataTable.Title />

            <DataTable.Title>
              <Text
                style={{ fontFamily: "IBMPlexSansThai-Medium", fontSize: 14 }}
              >
                ชื่อ
              </Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text
                style={{ fontFamily: "IBMPlexSansThai-Medium", fontSize: 14 }}
              >
                ก้าวเดิน
              </Text>
            </DataTable.Title>
            <DataTable.Title numeric>
              <Text
                style={{ fontFamily: "IBMPlexSansThai-Medium", fontSize: 14 }}
              >
                ระยะทาง
              </Text>
            </DataTable.Title>
          </DataTable.Header>

          <DataTable.Row style={{ borderBottomWidth: 0 }}>
            <DataTable.Cell style={{ flex: 1 }}>
              <Text
                style={{ fontFamily: "IBMPlexSansThai-Regular", fontSize: 14 }}
              >
                1
              </Text>
            </DataTable.Cell>
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
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Bold",
                    fontSize: 16,
                  }}
                >
                  Sorawit Kri.
                </Text>
              </View>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1.5 }}>
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Regular",
                  fontSize: 16,
                }}
              >
                320,023
              </Text>
            </DataTable.Cell>
            <DataTable.Cell style={{ flex: 1 }}>
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Regular",
                  fontSize: 16,
                }}
              >
                980
              </Text>
            </DataTable.Cell>
          </DataTable.Row>
        </DataTable>
      </View>
    </ScrollView>
  );
}
