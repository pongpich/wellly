import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
  ScrollView,
} from "react-native";
import * as React from "react";
import colors from "../../../constants/colors";
import dateIcon from "../../../assets/images/icon/dateIcon.png";
import Distance from "../../../assets/images/icon/Distance.png";
import Foot_step from "../../../assets/images/icon/Foot_step.png";
import tick_icon from "../../../assets/images/icon/tick3x.png";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

export default function AllAct({ route }) {
  const navigate = useNavigation();
  const now = dayjs();

  const dataEvents = useSelector(({ getData }) => getData.event);
  const dataEventsUser = useSelector(({ getData }) => getData.event_user);

  const newDataEvents = dataEvents.map((item) => {
    const isRegis = dataEventsUser.some((val) => val.event_id == item.id);
    const filterData = dataEventsUser.filter((val) => val.event_id == item.id);
    const walk_step_user = filterData.length > 0 ? filterData[0].walk_step : 0;
    const distance_user = filterData.length > 0 ? filterData[0].distance : 0;
    return {
      ...item,
      isRegis,
      walk_step_user,
      distance_user,
    };
  });

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          padding: 16,
          paddingTop: 20,
        }}
      >
        {newDataEvents.map((item) => (
          <View key={item.id}>
            <Pressable
              onPress={() =>
                navigate.navigate("DetailsActivity", {
                  itemId: item.id,
                  isNavigateFromAllAct: true,
                })
              }
            >
              <View style={[styles.itemContainer]}>
                {now > dayjs(item.end_date) ? (
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
                ) : (
                  <Image
                    source={{ uri: item.cover_Image }}
                    style={{
                      height: 193,
                      width: "100%",
                      marginRight: 8,
                      borderTopLeftRadius: 16,
                      borderTopRightRadius: 16,
                      opacity: 1,
                    }}
                    resizeMode="stretch"
                  />
                )}

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
                          fontFamily: "IBMPlexSansThai-Regular",
                          fontSize: 14,
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

                  {item.isRegis ? (
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
                                color:
                                  now > dayjs(item.end_date)
                                    ? colors.grey3
                                    : item.criteria_walk_step == "false" ? colors.grey3 : colors.persianBlue,
                                fontFamily: "IBMPlexSansThai-Bold",
                                fontSize: 14,
                              }}
                            >
                              {item.walk_step_user}
                            </Text>
                          </View>

                          <Text
                            style={{
                              color: colors.grey3,
                              fontFamily: "IBMPlexSansThai-Medium",
                              fontSize: 12,
                            }}
                          >
                            {item.walk_step} ก้าว
                          </Text>
                        </View>
                        <View style={styles.progressBar}>
                          <View
                            style={{
                              width: `${Math.ceil(
                                (item.walk_step_user / item.walk_step) * 100
                              )}%`,
                              maxWidth: "100%",
                              height: 8,
                              borderRadius: 16,
                              backgroundColor:
                                now > dayjs(item.end_date)
                                  ? colors.grey3
                                  : item.criteria_walk_step == "false" ? colors.grey3 : colors.persianBlue,
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
                                color:
                                  now > dayjs(item.end_date)
                                    ? colors.grey3
                                    : item.criteria_walk_step == "false" ? colors.grey3 : colors.persianBlue,
                                fontFamily: "IBMPlexSansThai-Bold",
                                fontSize: 14,
                              }}
                            >
                              {item.distance_user}
                            </Text>
                          </View>

                          <Text
                            style={{
                              color: colors.grey3,
                              fontFamily: "IBMPlexSansThai-Medium",
                              fontSize: 12,
                            }}
                          >
                            {item.distance} กิโลเมตร
                          </Text>
                        </View>
                        <View style={styles.progressBar}>
                          <View
                            style={{
                              width: `${Math.ceil(
                                (item.distance_user / item.distance) * 100
                              )}%`,
                              maxWidth: "100%",
                              height: 8,
                              borderRadius: 16,
                              backgroundColor:
                                now > dayjs(item.end_date)
                                  ? colors.grey3
                                  : item.criteria_walk_step == "false" ? colors.grey3 : colors.persianBlue,
                            }}
                          />
                        </View>
                      </View>
                    </View>
                  ) : null}
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
    maxWidth: 393,
    height: "auto",
    backgroundColor: "#ffffff",
    borderRadius: 16,
    marginBottom: 24,
    shadowColor: "#171717",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
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
