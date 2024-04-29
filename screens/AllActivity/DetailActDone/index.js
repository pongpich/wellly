import {
  View,
  Text,
  Image,
  ImageBackground,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Dimensions,
} from "react-native";
import * as React from "react";
import Closebutton from "../../../assets/images/activity/Closebutton.png";
import { useNavigation } from "@react-navigation/native";
import dateIcon from "../../../assets/images/icon/dateIcon.png";
import AvartarImg from "../../../assets/images/activity/Group13719.png";
import { useDispatch, useSelector } from "react-redux";
import { getEventActivityDetail, getRankScoreEvent } from "../../../redux/get";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { checkFistChar } from "../../../helpers/utils";

export default function DetailsActivityDone({ route }) {
  const ScreenHeight = Dimensions.get("window").height;
  const itemId = route?.params?.itemId;
  const navigate = useNavigation();
  const dispatch = useDispatch();

  const [activeColor, setActiveColor] = React.useState("award");

  const dataEvents = useSelector(({ getData }) => getData.event);
  const dataEventDetail = dataEvents.filter((item) => item.id == itemId);
  // const dataEvent = useSelector(
  //   ({ getData }) => getData.exerciserActivityDetail
  // );
  const statusEvents = useSelector(
    ({ getData }) => getData.statusExerciserActivityDetail
  );
  const dataScores = useSelector(({ getData }) => getData.rank_event_score);
  const dataScoresTopThree =
    dataScores.sort((a, b) => b.walk_step - a.walk_step).slice(0, 3) ?? [];

  const [dataReward, setDataReward] = React.useState(
    JSON.parse(dataEventDetail[0]?.reward || null)
  );

  React.useEffect(() => {
    // dispatch(getEventActivityDetail(itemId));
    dispatch(getRankScoreEvent(itemId));
  }, [itemId]);

  const styles = StyleSheet.create({
    btnDetail: {
      width: "auto",
      height: 26,
      backgroundColor: activeColor == "detail" ? "#3762FC" : "#D7E0FE",
      borderRadius: 16,
      paddingHorizontal: 8,
      marginRight: 9,
    },
    txtDetail: {
      fontSize: 16,
      color: activeColor == "detail" ? "#FFFFFF" : "#3762FC",
      fontFamily: "IBMPlexSansThai-Bold",
      textAlign: "center",
    },
    btnAward: {
      width: "auto",
      height: 27,
      backgroundColor: activeColor == "award" ? "#3762FC" : "#D7E0FE",
      borderRadius: 16,
      paddingHorizontal: 8,
      marginRight: 9,
    },
    txtAward: {
      fontSize: 16,
      color: activeColor == "award" ? "#FFFFFF" : "#3762FC",
      fontFamily: "IBMPlexSansThai-Bold",
      textAlign: "center",
    },

    progressBar: {
      marginTop: 7,
      width: "100%",
      height: 16,
      backgroundColor: "#E5EEF9",
      borderRadius: 16,
      zIndex: 0,
    },

    containerMain: {
      flexGrow: 1,
      backgroundColor: "white",
      flexDirection: "column",
    },
  });

  if (statusEvents == "loading" || dataEventDetail[0] == undefined) {
    return <View style={styles.containerMain}></View>;
  }

  return (
    <ScrollView contentContainerStyle={styles.containerMain}>
      <ImageBackground
        source={{ uri: dataEventDetail[0].cover_Image }}
        style={{
          height: 211,
          width: "100%",
        }}
        resizeMode="stretch"
      >
        <TouchableOpacity onPress={() => navigate.goBack()}>
          <Image
            source={Closebutton}
            style={{ width: 32, height: 32, marginTop: 60, marginLeft: 16 }}
          />
        </TouchableOpacity>
      </ImageBackground>

      <View style={{ padding: 17 }}>
        <Text style={{ fontSize: 20, fontFamily: "IBMPlexSansThai-Bold" }}>
          {dataEventDetail[0].event_name}
        </Text>
        <View
          style={{
            marginTop: 14,
          }}
        >
          <View
            style={{
              flexDirection: "row",
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            <Image
              style={{
                height: 16,
                width: 16,
                zIndex: 1,
                marginRight: 8,
              }}
              source={dateIcon}
            />

            <Text
              style={{ fontSize: 14, fontFamily: "IBMPlexSansThai-Regular" }}
            >
              {dayjs(dataEventDetail[0].start_date).year() ==
              dayjs(dataEventDetail[0].end_date).year()
                ? `${dayjs(dataEventDetail[0].start_date)
                    .locale("th")
                    .format("DD MMM")} - ${dayjs(dataEventDetail[0].end_date)
                    .locale("th")
                    .format("DD MMM BBBB")}`
                : `${dayjs(dataEventDetail[0].start_date)
                    .locale("th")
                    .format("DD MMM BBBB")} - ${dayjs(
                    dataEventDetail[0].end_date
                  )
                    .locale("th")
                    .format("DD MMM BBBB")}`}
            </Text>
          </View>
        </View>

        <View
          style={{
            display: "flex",
            flexDirection: "row",
            marginTop: 24,
            marginBottom: 16,
          }}
        >
          <TouchableOpacity
            style={styles.btnAward}
            onPress={() => setActiveColor("award")}
          >
            <Text style={styles.txtAward}>ประกาศรางวัล</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.btnDetail}
            onPress={() => setActiveColor("detail")}
          >
            <Text style={styles.txtDetail}>รายละเอียด</Text>
          </TouchableOpacity>
        </View>

        {activeColor == "award" && (
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: 16,
            }}
          >
            <Text style={{ fontSize: 20, fontFamily: "IBMPlexSansThai-Bold" }}>
              ผู้ที่ได้รับรางวัล
            </Text>
            <TouchableOpacity
              onPress={() =>
                navigate.navigate("TableRankDone", {
                  itemId: itemId,
                })
              }
            >
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: "IBMPlexSansThai-Medium",
                  color: "#3762FC",
                }}
              >
                ตารางคะแนน
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {activeColor == "detail" ? (
          <View>
            <Text
              style={{ fontSize: 16, fontFamily: "IBMPlexSansThai-Regular" }}
            >
              {dataEventDetail[0].event_detail}
            </Text>
          </View>
        ) : null}

        {activeColor == "award"
          ? dataReward.map((item, i) => (
              <View
                style={{
                  marginBottom: 24,
                }}
                key={i}
              >
                <View
                  style={{
                    flex: 1,
                    flexDirection: "row",
                    justifyContent: "space-between",
                  }}
                >
                  <Text
                    style={{
                      color: "#2A323C",
                      fontFamily: "IBMPlexSansThai-Bold",
                      fontSize: 16,
                    }}
                  >
                    {`รางวัลที่ ${item.number}`}
                  </Text>
                  <Text
                    style={{
                      color: "#93A8C1",
                      fontFamily: "IBMPlexSansThai-Medium",
                      fontSize: 14,
                    }}
                  >
                    {`${item.quantity} รางวัล`}
                  </Text>
                </View>

                <View style={{ marginTop: 8, marginBottom: 8 }}>
                  <Text
                    style={{
                      color: "#697D96",
                      fontFamily: "IBMPlexSansThai-Regular",
                      fontSize: 16,
                    }}
                  >
                    {`${item.name}`}
                  </Text>
                </View>

                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: "100%", height: 343, marginRight: 16 }}
                  />
                </View>
                <View
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 16,
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
                      {i == 0
                        ? checkFistChar(dataScoresTopThree[0]?.display_name)
                        : ""}
                      {i == 1
                        ? checkFistChar(dataScoresTopThree[1]?.display_name)
                        : ""}
                      {i == 2
                        ? checkFistChar(dataScoresTopThree[2]?.display_name)
                        : ""}
                    </Text>
                  </View>
                  <Text
                    style={{
                      fontSize: 16,
                      fontFamily: "IBMPlexSansThai-Medium",
                    }}
                  >
                    {i == 0 ? dataScoresTopThree[0]?.display_name : ""}
                    {i == 1 ? dataScoresTopThree[1]?.display_name : ""}
                    {i == 2 ? dataScoresTopThree[2]?.display_name : ""}
                  </Text>
                </View>
              </View>
            ))
          : null}
      </View>
    </ScrollView>
  );
}
