import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
} from "react-native";
import * as React from "react";
import colors from "../../../constants/colors";
import dateIcon from "../../../assets/images/icon/dateIcon.png";
import Distance from "../../../assets/images/icon/Distance.png";
import Foot_step from "../../../assets/images/icon/Foot_step.png";
import tick_icon from "../../../assets/images/icon/tick3x.png";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import { getEventUser } from "../../../redux/get";
import NotAct from "../../../assets/images/activity/NotAct.png";

export default function DoneActivity() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const dataEventsUser = useSelector(({ getData }) => getData.event_user);
  const userId = useSelector(({ authUser }) => authUser.user.user_id);

  const now = dayjs();

  React.useEffect(() => {
    dispatch(getEventUser(userId));
  }, [userId]);

  return (
    <ScrollView
      contentContainerStyle={{
        padding: 16,
        paddingTop: 0,
        backgroundColor: "white",
        height: "100%",
      }}
    >
      <Text
        style={{
          fontSize: 24,
          fontFamily: "IBMPlexSansThai-Bold",
          color: "#2A323C",
        }}
      >
        กิจกรรมที่จบแล้ว
      </Text>

      {dataEventsUser.length == 0 && (
        <View
          style={{
            flex: 1,
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              height: 113,
              width: 327,
            }}
            resizeMode="stretch"
            source={NotAct}
          />
        </View>
      )}

      <View
        style={{
          flex: 1,
          paddingTop: 20,
        }}
      >
        {dataEventsUser
          .filter((item) => now > dayjs(item.end_date))
          .map((item, i) => (
            <View key={i}>
              <Pressable
                onPress={() =>
                  navigate.navigate("DetailsActivityDone", {
                    itemId: item.event_id,
                    isRegis: true,
                  })
                }
              >
                <View style={[styles.itemContainer]}>
                  <ImageBackground
                    source={{ uri: item.cover_Image }}
                    style={{
                      height: 193,
                      width: "100%",
                      marginRight: 8,
                    }}
                    imageStyle={{
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                    }}
                    resizeMode="stretch"
                  >
                    <View
                      style={{
                        flex: 1,
                        justifyContent: "center",
                        alignItems: "center",
                        height: "100%",
                        width: "100%",
                        position: "absolute",
                        backgroundColor: "rgba(34, 185, 103, 0.8)",
                        borderTopLeftRadius: 16,
                        borderTopRightRadius: 16,
                      }}
                    >
                      <Image
                        source={tick_icon}
                        style={{ width: 40, height: 40 }}
                      />
                    </View>
                  </ImageBackground>

                  <View style={{ padding: 16 }}>
                    <Text
                      style={{
                        fontFamily: "IBMPlexSansThai-Bold",
                        fontSize: 15.6,
                        width: "100%",
                      }}
                    >
                      {item.event_name.slice(0, 75) + "..."}
                    </Text>

                    <View style={styles.boxEv}>
                      <View style={styles.boxRow}>
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
                          style={{
                            fontSize: 14,
                            fontFamily: "IBMPlexSansThai-Regular",
                          }}
                        >
                          {dayjs(item.start_date).year() ==
                          dayjs(item.end_date).year()
                            ? `${dayjs(item.start_date)
                                .locale("th")
                                .format("DD MMM")} - ${dayjs(item.end_date)
                                .locale("th")
                                .format("DD MMM BBBB")}`
                            : `${dayjs(item.start_date)
                                .locale("th")
                                .format("DD MMM BBBB")} - ${dayjs(item.end_date)
                                .locale("th")
                                .format("DD MMM BBBB")}`}
                        </Text>
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
                            source={Foot_step}
                          />
                          <Text
                            style={{
                              color: colors.grey3,
                              fontFamily: "IBMPlexSansThai-Bold",
                              fontSize: 14,
                            }}
                          >
                            {item.walk_step}
                          </Text>
                        </View>

                        <Text
                          style={{
                            color: colors.grey3,
                            fontFamily: "IBMPlexSansThai-Medium",
                            fontSize: 12,
                          }}
                        >
                          {item.walkStepActivity} ก้าว
                        </Text>
                      </View>
                      <View style={styles.progressBar}>
                        <View
                          style={{
                            width: `${Math.ceil(
                              (item.walk_step / item.walkStepActivity) * 100
                            )}%`,
                            maxWidth: "100%",
                            height: 8,
                            borderRadius: 16,
                            backgroundColor: colors.grey3,
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
                              color: colors.grey3,
                              fontFamily: "IBMPlexSansThai-Bold",
                              fontSize: 14,
                            }}
                          >
                            {item.distance}
                          </Text>
                        </View>

                        <Text
                          style={{
                            color: colors.grey3,
                            fontFamily: "IBMPlexSansThai-Medium",
                            fontSize: 12,
                          }}
                        >
                          {item.distanceActivity} กิโลเมตร
                        </Text>
                      </View>
                      <View style={styles.progressBar}>
                        <View
                          style={{
                            width: `${Math.ceil(
                              (item.distance / item.distanceActivity) * 100
                            )}%`,
                            height: 8,
                            maxWidth: "100%",
                            borderRadius: 16,
                            backgroundColor: colors.grey3,
                          }}
                        />
                      </View>
                    </View>
                  </View>
                </View>
              </Pressable>
            </View>
          ))}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  itemContainer: {
    width: "100%",
    height: "auto",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },

  boxEv: {
    marginTop: 14,
  },

  boxRow: {
    flexDirection: "row",
    position: "relative",
    display: "flex",
    alignItems: "center",
  },

  progressBar: {
    marginTop: 7,
    width: "100%",
    height: 8,
    backgroundColor: colors.grey6,
    borderRadius: 16,
    zIndex: 0,
  },
});
