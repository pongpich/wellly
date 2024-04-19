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
import Distance from "../../../assets/images/icon/Distance.png";
import Foot_step from "../../../assets/images/icon/Foot_step.png";
import SwipeButtonImg from "../../../assets/images/activity/Frame13754.png";
import SwipeButton from "rn-swipe-button";
import { useDispatch, useSelector } from "react-redux";
import { getEventActivityDetail } from "../../../redux/get";
import { Skeleton } from "@rneui/themed";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { addEventActivity } from "../../../redux/update";

export default function DetailsActivity({ route }) {
  const ScreenHeight = Dimensions.get("window").height;
  const itemId = route?.params?.itemId;
  const isRegis = route?.params?.isRegis;
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const dataEvent = useSelector(
    ({ getData }) => getData.exerciserActivityDetail || []
  );
  const dataUser = useSelector(({ authUser }) => authUser.user);

  const statusEvents = useSelector(
    ({ getData }) => getData.statusExerciserActivityDetail
  );
  const updateData = useSelector(({ updateData }) => updateData);
  const dataEventsUser = useSelector(({ getData }) => getData.event_user);
  const dataEventOfuser = dataEventsUser.filter(
    (item) => item.event_id == dataEvent[0]?.id
  );

  const [activeColor, setActiveColor] = React.useState("detail");
  const [dataReward, setDataReward] = React.useState(
    JSON.parse(dataEvent[0]?.reward || null)
  );
  const now = dayjs();
  const exipre = dayjs(dataEvent[0]?.end_date);
  const isExpireDate = now > exipre;

  const handleRegisterActivity = () => {
    try {
      dispatch(addEventActivity(dataEvent[0].id, dataUser.user_id, 0, 0));
      navigate.navigate("AllActivities", {
        isAlreadyRegis: true,
      });
    } catch (error) {
      return error;
    }
  };

  React.useEffect(() => {
    dispatch(getEventActivityDetail(itemId));
  }, [itemId]);

  React.useMemo(() => {
    if (!!route.params.isRegis) {
      setActiveColor("score");
    }
  }, [route.params]);

  const renderSwipImg = () => {
    return (
      <Image
        source={SwipeButtonImg}
        style={{ width: 72, height: 40, borderRadius: 32 }}
      />
    );
  };

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
    btnScore: {
      width: "auto",
      height: 27,
      backgroundColor: activeColor == "score" ? "#3762FC" : "#D7E0FE",
      borderRadius: 16,
      paddingHorizontal: 8,
      marginRight: 9,
    },
    txtScore: {
      fontSize: 16,
      color: activeColor == "score" ? "#FFFFFF" : "#3762FC",
      fontFamily: "IBMPlexSansThai-Bold",
      textAlign: "center",
    },
    btnRegis: {
      width: "100%",
      height: 48,
      backgroundColor: "#3762FC",
      borderRadius: 24,
      paddingVertical: 12,
      marginTop: 20,
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
    bottomView: {
      // width: "100%",
      width: Dimensions.get("window").width - 32,
      position: "absolute",
      bottom: 40,
    },
  });
  if (statusEvents == "loading" || dataEvent[0] == undefined) {
    return (
      <View style={styles.containerMain}>
        <Skeleton width={"100%"} height={211} />
        <View style={{ padding: 16 }}>
          <Skeleton width={"100%"} height={60} />
          <Skeleton width={"100%"} height={20} style={{ marginTop: 16 }} />
          <Skeleton width={"100%"} height={30} style={{ marginTop: 24 }} />
          <Skeleton
            width={"100%"}
            height={ScreenHeight / 2}
            style={{ marginTop: 16 }}
          />
        </View>
      </View>
    );
  }

  return (
    <ScrollView contentContainerStyle={styles.containerMain}>
      <ImageBackground
        source={{ uri: dataEvent[0].cover_Image }}
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
          {dataEvent[0].event_name}
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
              {dayjs(dataEvent[0].start_date).year() ==
              dayjs(dataEvent[0].end_date).year()
                ? `${dayjs(dataEvent[0].start_date)
                    .locale("th")
                    .format("DD MMM")} - ${dayjs(dataEvent[0].end_date)
                    .locale("th")
                    .format("DD MMM BBBB")}`
                : `${dayjs(dataEvent[0].start_date)
                    .locale("th")
                    .format("DD MMM BBBB")} - ${dayjs(dataEvent[0].end_date)
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
          {route.params.isRegis && (
            <TouchableOpacity
              style={styles.btnScore}
              onPress={() => setActiveColor("score")}
            >
              <Text style={styles.txtScore}>คะแนน</Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            style={styles.btnDetail}
            onPress={() => setActiveColor("detail")}
          >
            <Text style={styles.txtDetail}>รายละเอียด</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.btnAward}
            onPress={() => setActiveColor("award")}
          >
            <Text style={styles.txtAward}>รางวัล</Text>
          </TouchableOpacity>
        </View>

        {activeColor == "detail" ? (
          <View
            style={{
              height: ScreenHeight / 2,
            }}
          >
            <Text
              style={{ fontSize: 16, fontFamily: "IBMPlexSansThai-Regular" }}
            >
              {dataEvent[0].event_detail}
            </Text>

            {!isExpireDate && !isRegis && (
              <View
                style={{
                  position: "absolute",
                  bottom: 0,
                  width: "100%",
                }}
              >
                <TouchableOpacity
                  style={styles.btnRegis}
                  onPress={handleRegisterActivity}
                >
                  <Text style={styles.txtDetail}>ลงทะเบียน</Text>
                </TouchableOpacity>
              </View>
            )}
          </View>
        ) : null}

        {activeColor == "award"
          ? dataReward.map((item, i) => (
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  marginBottom: 24,
                }}
                key={i}
              >
                <View>
                  <Image
                    source={{ uri: item.image }}
                    style={{ width: 80, height: 80, marginRight: 16 }}
                    resizeMode="stretch"
                  />
                </View>

                <View
                  style={{
                    flex: 1,
                    display: "flex",
                  }}
                >
                  <View
                    style={{
                      display: "flex",
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
                        fontFamily: "IBMPlexSansThai-Regular",
                        fontSize: 12,
                      }}
                    >
                      {`${item.quantity} รางวัล`}
                    </Text>
                  </View>
                  <View style={{ marginTop: 8 }}>
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
                </View>
              </View>
            ))
          : null}

        {activeColor == "score" &&
        isRegis &&
        dataEventOfuser[0] != undefined ? (
          <View>
            <View>
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <Text
                  style={{ fontSize: 20, fontFamily: "IBMPlexSansThai-Bold" }}
                >
                  คะแนนของฉัน
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigate.navigate("TableScoreOfActivity", {
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
              <View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 14,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          height: 16,
                          width: 16,
                          zIndex: 1,
                          marginRight: 8,
                        }}
                        source={Foot_step}
                      />
                      <Text
                        style={{
                          color: "#3762FC",
                          fontFamily: "IBMPlexSansThai-Bold",
                          fontSize: 14,
                        }}
                      >
                        {dataEventOfuser[0].walk_step}
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: "#93ABC1",
                        fontFamily: "IBMPlexSansThai-Medium",
                        fontSize: 12,
                      }}
                    >
                      {dataEventOfuser[0].walkStepActivity} ก้าว
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={{
                        width: `${Math.ceil(
                          (dataEventOfuser[0].walk_step /
                            dataEventOfuser[0].walkStepActivity) *
                            100
                        )}%`,
                        maxWidth: "100%",
                        height: 16,
                        borderRadius: 16,
                        backgroundColor:
                          // #93ABC1
                          "#3762FC",
                      }}
                    />
                  </View>
                </View>
                <View>
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      marginTop: 14,
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <View
                      style={{
                        display: "flex",
                        flexDirection: "row",
                      }}
                    >
                      <Image
                        style={{
                          height: 16,
                          width: 16,
                          zIndex: 1,
                          marginRight: 8,
                        }}
                        source={Distance}
                      />
                      <Text
                        style={{
                          color: "#3762FC",
                          fontFamily: "IBMPlexSansThai-Bold",
                          fontSize: 14,
                        }}
                      >
                        {dataEventOfuser[0].distance}
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: "#93ABC1",
                        fontFamily: "IBMPlexSansThai-Medium",
                        fontSize: 12,
                      }}
                    >
                      {dataEventOfuser[0].distanceActivity} กิโลเมตร
                    </Text>
                  </View>
                  <View style={styles.progressBar}>
                    <View
                      style={{
                        width: `${Math.ceil(
                          (dataEventOfuser[0].distance /
                            dataEventOfuser[0].distanceActivity) *
                            100
                        )}%`,
                        maxWidth: "100%",
                        height: 16,
                        borderRadius: 16,
                        backgroundColor:
                          // #93ABC1
                          "#3762FC",
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        ) : null}
      </View>

      {activeColor == "score" && (
        <View style={[styles.bottomView, { marginRight: 32, marginLeft: 16 }]}>
          <SwipeButton
            containerStyles={{ borderRadius: 32 }}
            width={"auto"}
            height={52}
            onSwipeSuccess={() => navigate.navigate("StartTimerActivity")}
            shouldResetAfterSuccess={true}
            railBackgroundColor="#E5EEF9"
            railStyles={{
              borderRadius: 32,
              backgroundColor: "#E5EEF9",
              borderColor: "#E5EEF9",
              margin: 8,
            }}
            railBorderColor="#FFFFFF"
            title="เริ่มออกกำลังกาย"
            titleColor="#697D96"
            titleStyles={{ fontFamily: "IBMPlexSansThai-Bold", fontSize: 16 }}
            thumbIconBorderColor="#59CBE4"
            thumbIconWidth={102}
            thumbIconBackgroundColor="#59CBE4"
            thumbIconComponent={renderSwipImg}
          />
        </View>
      )}
    </ScrollView>
  );
}
