import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ScrollView,
} from "react-native";
import * as React from "react";
import colors from "../../../constants/colors";
import dateIcon from "../../../assets/images/icon/dateIcon.png";
import Distance from "../../../assets/images/icon/Distance.png";
import Foot_step from "../../../assets/images/icon/Foot_step.png";
import banner_done from "../../../assets/images/activity/Frame13717.png";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

export default function DoneActivity() {
  const navigate = useNavigation();
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

      <View
        style={{
          flex: 1,
          paddingTop: 20,
        }}
      >
        {[1].map((item) => (
          <View>
            <Pressable
              onPress={() =>
                navigate.navigate("DetailsActivityDone", {
                  itemId: 86,
                  isRegis: true,
                })
              }
            >
              <View style={[styles.itemContainer]}>
                <Image
                  source={banner_done}
                  style={{
                    height: 193,
                    width: "100%",
                    marginRight: 8,
                    borderTopLeftRadius: 16,
                    borderTopRightRadius: 16,
                    opacity: 1,
                  }}
                  resizeMode="cover"
                />

                <View style={{ padding: 16 }}>
                  <Text
                    style={{
                      fontFamily: "IBMPlexSansThai-Bold",
                      fontSize: 15.6,
                      width: "100%",
                    }}
                  >
                    วิ่งเก็บระยะทางมาราธอน 10 ชั่วโมง ประจำปี 2566 ของ ABC...
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
                        1 ม.ค. - 30 ม.ค. 2566
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
                          4000
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: colors.grey3,
                          fontFamily: "IBMPlexSansThai-Medium",
                          fontSize: 12,
                        }}
                      >
                        400,000 ก้าว
                      </Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View
                        style={{
                          width: 65,
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
                          400
                        </Text>
                      </View>

                      <Text
                        style={{
                          color: colors.grey3,
                          fontFamily: "IBMPlexSansThai-Medium",
                          fontSize: 12,
                        }}
                      >
                        1,000 กิโลเมตร
                      </Text>
                    </View>
                    <View style={styles.progressBar}>
                      <View
                        style={{
                          width: 65,
                          maxWidth: "100%",
                          height: 8,
                          borderRadius: 16,
                          backgroundColor: colors.grey3,
                        }}
                      />
                    </View>
                    <TouchableOpacity style={{ marginTop: 16 }}>
                      <Text
                        style={{
                          textAlign: "center",
                          fontSize: 16,
                          fontFamily: "IBMPlexSansThai-Bold",
                          color: "#3762FC",
                        }}
                      >
                        ดูผลคะแนน
                      </Text>
                    </TouchableOpacity>
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
