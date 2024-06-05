import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
  ImageBackground,
  Dimensions,
} from "react-native";
import React from "react";
import colors from "../../../constants/colors";
import dateIcon from "../../../assets/images/icon/dateIcon.png";
import Distance from "../../../assets/images/icon/Distance.png";
import Foot_step from "../../../assets/images/icon/Foot_step.png";
import NotAct from "../../../assets/images/activity/NotAct.png";
import Checked from "../../../assets/images/activity/Checked.png";
import { Snackbar } from "react-native-paper";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { getEventUser } from "../../../redux/get";
import tick_icon from "../../../assets/images/icon/tick3x.png";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

export default function AlreadyRegistered() {
  const navigate = useNavigation();
  const dispatch = useDispatch();
  const screenHeight = Dimensions.get("window").height;
  const userId = useSelector(({ authUser }) => authUser.user.user_id);
  const dataEventsUser = useSelector(({ getData }) => getData.event_user);
  const updateData = useSelector(({ updateData }) => updateData);
  const [visible, setVisible] = React.useState(false);

  const now = dayjs();

  const onToggleSnackBar = () => setVisible(!visible);

  const onDismissSnackBar = () => setVisible(false);

  React.useEffect(() => {
    dispatch(getEventUser(userId));
  }, [userId, updateData.statusInsertEventActivity]);

  return (
    <ScrollView
      contentContainerStyle={{
        minHeight: "80%",
      }}
    >
      <View
        style={{
          flex: 1,
          padding: 16,
          paddingTop: 20,
        }}
      >
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
        {dataEventsUser.map((item, i) => (
          <View key={i}>
            <Pressable
              onPress={() => {
                navigate.navigate("DetailsActivity", {
                  itemId: item.event_id,
                  isRegis: true,
                });
              }}
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
                            color:
                              now > dayjs(item.end_date)
                                ? colors.grey3
                                : item.criteria_walk_step == "false" ? colors.grey3 : colors.persianBlue,
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
                                : item.criteria_distance == "false" ? colors.grey3 : colors.persianBlue,
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
                          maxWidth: "100%",
                          height: 8,
                          borderRadius: 16,
                          backgroundColor:
                            now > dayjs(item.end_date)
                              ? colors.grey3
                              : item.criteria_distance == "false" ? colors.grey3 : colors.persianBlue,
                        }}
                      />
                    </View>
                  </View>
                </View>
              </View>
            </Pressable>
          </View>
        ))}

        {updateData.statusInsertEventActivity == "loading" && (
          <View
            style={{
              width: "100%",
              height: 20,
              position: "absolute",
              top:
                screenHeight > 700 ? screenHeight / 1.35 : screenHeight / 1.45,
              left: 16,
            }}
          >
            <Snackbar
              visible={true}
              onDismiss={onDismissSnackBar}
              action={{
                label: "",
                onPress: () => {
                  console.log("press test");
                },
              }}
              style={{
                backgroundColor: "white",
                borderRadius: 8,
              }}
            >
              <View
                style={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={Checked}
                  style={{ width: 24, height: 24, marginRight: 8 }}
                />
                <Text style={{ fontFamily: "IBMPlexSansThai-Medium" }}>
                  ลงทะเบียนสำเร็จ
                </Text>
              </View>
            </Snackbar>
          </View>
        )}
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
