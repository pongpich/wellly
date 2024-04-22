import {
  View,
  Text,
  ScrollView,
  Image,
  ImageBackground,
  TouchableOpacity,
} from "react-native";
import * as React from "react";
import { DataTable } from "react-native-paper";
import AvartarImg from "../../../assets/images/activity/Group13719.png";
import Distance from "../../../assets/images/icon/Distance.png";
import Foot_step from "../../../assets/images/icon/Foot_step.png";
import Medallions from "../../../assets/images/activity/Medallions.png";
import BgRank from "../../../assets/images/activity/bg_ranking.png";
import RankGoldImg from "../../../assets/images/activity/Group481452.png";
import RankBronzeImg from "../../../assets/images/activity/Bronze.png";
import { LinearGradient } from "expo-linear-gradient";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getRankScoreEvent } from "../../../redux/get";
import { Skeleton } from "@rneui/themed";
import { numberWithComma, checkFistChar } from "../../../helpers/utils";

export default function TableRankDone({ route }) {
  const itemId = route?.params?.itemId;
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const dataScores = useSelector(
    ({ getData }) => getData.rank_event_score ?? []
  );
  const statusScore = useSelector(
    ({ getData }) => getData.status_rank_event_score
  );
  const dataScoresTopThree = dataScores
    .sort((a, b) => b.walk_step - a.walk_step)
    .slice(0, 3);
  React.useEffect(() => {
    dispatch(getRankScoreEvent(itemId));
  }, [itemId]);

  if (statusScore == "loading" || dataScores == undefined) {
    return (
      <View
        style={{
          backgroundColor: "white",
          paddingHorizontal: 16,
        }}
      >
        <View
          style={{
            paddingHorizontal: 25,
            flexDirection: "row",
          }}
        >
          <View style={{ flex: 1, alignItems: "center" }}>
            <Skeleton width={56} height={56} circle style={{ marginTop: 60 }} />
            <Skeleton width={80} height={80} style={{ marginTop: 10 }} />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Skeleton width={56} height={56} circle />
            <Skeleton width={80} height={140} style={{ marginTop: 10 }} />
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <Skeleton width={56} height={56} circle style={{ marginTop: 60 }} />
            <Skeleton width={80} height={80} style={{ marginTop: 10 }} />
          </View>
        </View>
        <Skeleton width={"100%"} height={"70%"} style={{ marginTop: 20 }} />
      </View>
    );
  }

  return (
    <View style={{ backgroundColor: "white" }}>
      <ImageBackground
        source={BgRank}
        style={{
          height: 200,
          marginBottom: 1,
          position: "relative",
          marginBottom: 95,
        }}
        resizeMode="stretch"
      >
        <View
          style={{ marginLeft: 16, position: "absolute", top: 62, zIndex: 10 }}
        >
          <TouchableOpacity onPress={() => navigation.goBack()}>
            <Image
              style={{ width: 24, height: 24 }}
              source={require("../../../assets/images/icon/caret.png")}
            />
          </TouchableOpacity>
        </View>

        <View
          style={{
            flexDirection: "row",
            padding: 25,
          }}
        >
          <View style={{ flex: 1, marginTop: 60, alignItems: "center" }}>
            <ImageBackground
              source={Medallions}
              style={{ width: 56, height: 56 }}
              resizeMode="stretch"
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Bold",
                    fontSize: 20,
                    marginTop: -8,
                    color: "white",
                  }}
                >
                  {checkFistChar(
                    dataScoresTopThree[1]?.display_name.split(" ")[0]
                  ) || ""}
                </Text>
              </View>
            </ImageBackground>
            <Text
              style={{
                fontFamily: "IBMPlexSansThai-Bold",
                fontSize: 16,
                marginTop: -15,
              }}
            >
              {dataScoresTopThree[1]?.display_name.split(" ")[0] || ""}
            </Text>
            <LinearGradient
              style={{
                width: 88,
                height: 117,
                padding: 7,
                marginTop: 18,
              }}
              colors={["#93A8C1CC", "#C2D2E700"]}
            >
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Bold",
                  fontSize: 24,
                  color: "white",
                  textAlign: "center",
                }}
              >
                2
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Foot_step}
                  style={{ width: 16, height: 16, marginRight: 2 }}
                />
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Regular",
                    fontSize: 14,
                  }}
                >
                  {numberWithComma(dataScoresTopThree[1]?.walk_step) || 0}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Distance}
                  style={{ width: 16, height: 16, marginRight: 2 }}
                />
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Regular",
                    fontSize: 14,
                  }}
                >
                  {numberWithComma(dataScoresTopThree[1]?.distance) || 0}
                </Text>
              </View>
            </LinearGradient>
          </View>
          <View style={{ flex: 1, alignItems: "center" }}>
            <ImageBackground
              source={RankGoldImg}
              style={{ width: 72, height: 72 }}
              resizeMode="stretch"
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Bold",
                    fontSize: 30,
                    color: "white",
                  }}
                >
                  {checkFistChar(
                    dataScoresTopThree[0]?.display_name.split(" ")[0]
                  ) || ""}
                </Text>
              </View>
            </ImageBackground>
            <Text
              style={{
                fontFamily: "IBMPlexSansThai-Bold",
                fontSize: 16,
              }}
            >
              {dataScoresTopThree[0]?.display_name.split(" ")[0] || ""}
            </Text>
            <LinearGradient
              style={{
                width: 88,
                height: 150,
                padding: 7,
                marginTop: 18,
              }}
              colors={["#D89E08CC", "#D89E0800"]}
            >
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Bold",
                  fontSize: 24,
                  color: "white",
                  textAlign: "center",
                }}
              >
                1
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Foot_step}
                  style={{ width: 16, height: 16, marginRight: 2 }}
                />
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Regular",
                    fontSize: 14,
                  }}
                >
                  {numberWithComma(dataScoresTopThree[0]?.walk_step) || 0}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Distance}
                  style={{ width: 16, height: 16, marginRight: 2 }}
                />
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Regular",
                    fontSize: 14,
                  }}
                >
                  {numberWithComma(dataScoresTopThree[0]?.distance) || 0}
                </Text>
              </View>
            </LinearGradient>
          </View>
          <View style={{ flex: 1, marginTop: 60, alignItems: "center" }}>
            <ImageBackground
              source={RankBronzeImg}
              style={{ width: 56, height: 56 }}
              resizeMode="stretch"
            >
              <View
                style={{
                  flex: 1,
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Bold",
                    fontSize: 20,
                    marginTop: -8,
                    color: "white",
                  }}
                >
                  {checkFistChar(
                    dataScoresTopThree[2]?.display_name.split(" ")[0]
                  ) || ""}
                </Text>
              </View>
            </ImageBackground>
            <Text
              style={{
                fontFamily: "IBMPlexSansThai-Bold",
                fontSize: 16,
                marginTop: -15,
              }}
            >
              {dataScoresTopThree[2]?.display_name.split(" ")[0] || ""}
            </Text>
            <LinearGradient
              style={{
                width: 88,
                height: 117,
                padding: 7,
                marginTop: 18,
              }}
              colors={["#DE9F83CC", "#EAD0B900"]}
            >
              <Text
                style={{
                  fontFamily: "IBMPlexSansThai-Bold",
                  fontSize: 24,
                  color: "white",
                  textAlign: "center",
                }}
              >
                3
              </Text>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Foot_step}
                  style={{ width: 16, height: 16, marginRight: 2 }}
                />
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Regular",
                    fontSize: 14,
                  }}
                >
                  {numberWithComma(dataScoresTopThree[2]?.walk_step) || 0}
                </Text>
              </View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Distance}
                  style={{ width: 16, height: 16, marginRight: 2 }}
                />
                <Text
                  style={{
                    fontFamily: "IBMPlexSansThai-Regular",
                    fontSize: 14,
                  }}
                >
                  {numberWithComma(dataScoresTopThree[2]?.distance) || 0}
                </Text>
              </View>
            </LinearGradient>
          </View>
        </View>
      </ImageBackground>

      <ScrollView
        contentContainerStyle={{
          shadowColor: "#000000",
          shadowOffset: {
            width: 0,
            height: 2,
          },
          shadowOpacity: 0.25,
          shadowRadius: 3.84,
          elevation: 5,
          borderTopLeftRadius: 16,
          borderTopRightRadius: 16,
          height: "100%",
          backgroundColor: "white",
          marginTop: 2,
        }}
      >
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
                        marginLeft: 8,
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
      </ScrollView>
    </View>
  );
}
