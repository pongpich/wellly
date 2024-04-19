import { View, Text, ScrollView, Image } from "react-native";
import * as React from "react";
import { DataTable } from "react-native-paper";
import AvartarImg from "../../../assets/images/activity/Group13719.png";
import { useDispatch, useSelector } from "react-redux";
import { getRankScoreEvent } from "../../../redux/get";
import { Skeleton } from "@rneui/themed";
import { checkFistChar, numberWithComma } from "../../../helpers/utils";

export default function TableScoreOfActivity({ route }) {
  const itemId = route?.params?.itemId;
  const dispatch = useDispatch();
  const dataScores = useSelector(({ getData }) => getData.rank_event_score);
  const statusScore = useSelector(
    ({ getData }) => getData.status_rank_event_score
  );
  React.useEffect(() => {
    dispatch(getRankScoreEvent(itemId));
  }, [itemId]);

  if (statusScore == "loading" || dataScores == undefined) {
    return (
      <View
        style={{
          flexGrow: 1,
          backgroundColor: "white",
          flexDirection: "column",
          paddingHorizontal: 16,
        }}
      >
        <Skeleton width={"100%"} height={31} />
        <Skeleton width={"100%"} height={"90%"} style={{ marginTop: 16 }} />
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

          {dataScores
            .sort((a, b) => b.walk_step - a.walk_step)
            .map((item, i) => (
              <DataTable.Row style={{ borderBottomWidth: 0 }} key={item.id}>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "IBMPlexSansThai-Regular",
                      fontSize: 14,
                    }}
                  >
                    {i + 1}
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
                    <View
                      style={{
                        backgroundColor: "#3762FC",
                        borderRadius: 50,
                        width: 32,
                        height: 32,
                        marginRight: 8,
                      }}
                    >
                      <Text
                        style={{
                          color: "white",
                          fontFamily: "IBMPlexSansThai-Bold",
                          fontSize: 14,
                          textAlign: "center",
                          marginTop: 5,
                          marginBottom: 4,
                        }}
                      >
                        {checkFistChar(item.display_name.split(" ")[0])}
                      </Text>
                    </View>
                    <Text
                      style={{
                        fontFamily: "IBMPlexSansThai-Bold",
                        fontSize: 16,
                      }}
                    >
                      {item.display_name.split(" ")[0]}
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
                    {numberWithComma(item.walk_step)}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell style={{ flex: 1 }}>
                  <Text
                    style={{
                      fontFamily: "IBMPlexSansThai-Regular",
                      fontSize: 16,
                    }}
                  >
                    {numberWithComma(item.distance)}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            ))}
        </DataTable>
      </View>
    </ScrollView>
  );
}
