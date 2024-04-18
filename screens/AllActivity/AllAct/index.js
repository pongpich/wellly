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
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import "dayjs/locale/th";
import buddhistEra from "dayjs/plugin/buddhistEra";
dayjs.extend(buddhistEra);

export default function AllAct({ route }) {
  const navigate = useNavigation();
  const dataEvents = useSelector(({ getData }) => getData.event);
  const statusEvents = useSelector(({ getData }) => getData.status_event);
  const dataEventsUser = useSelector(({ getData }) => getData.event_user);
  const dataEventsWithOutRegis = dataEvents.filter(
    (item) => !dataEventsUser.some((val) => item.id == val.event_id)
  );

  const now = dayjs();

  return (
    <ScrollView>
      <View
        style={{
          flex: 1,
          padding: 16,
          paddingTop: 20,
        }}
      >
        {dataEventsWithOutRegis.map((item) => (
          <View key={item.id}>
            <Pressable
              onPress={() =>
                navigate.navigate("DetailsActivity", {
                  itemId: item.id,
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
                    opacity: 1,
                  }}
                  imageStyle={{
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                  }}
                  resizeMode="stretch"
                >
                  <View
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "flex-end",
                      padding: 16,
                    }}
                  >
                    {dayjs(now).diff(item.created_at, "day") <= 5 && (
                      <View
                        style={{
                          backgroundColor: "#D43A3A",
                          width: 50,
                          height: 32,
                          padding: 5,
                          borderRadius: 50,
                        }}
                      >
                        <Text
                          style={{
                            fontSize: 16,
                            fontFamily: "IBMPlexSansThai-Bold",
                            color: "white",
                            textAlign: "center",
                          }}
                        >
                          ใหม่
                        </Text>
                      </View>
                    )}
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
