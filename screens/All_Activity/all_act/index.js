import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Image,
  ImageBackground,
} from "react-native";
import React from "react";
import colors from "../../../constants/colors";
import dateIcon from "../../../assets/images/icon/dateIcon.png";
import Distance from "../../../assets/images/icon/Distance.png";
import Foot_step from "../../../assets/images/icon/Foot_step.png";
import banner from "../../../assets/images/activity/Frame13716.png";
import banner_done from "../../../assets/images/activity/banner_done.png";

export default function AllAct() {
  return (
    <View
      style={{
        flex: 1,
        padding: 16,
        paddingTop: 20,
      }}
    >
      {[1, 2, 3].map((item) => (
        <View>
          <Pressable>
            <View style={[styles.itemContainer]}>
              <ImageBackground
                source={banner}
                style={{
                  height: 193,
                  width: "100%",
                  marginRight: 8,
                  borderTopLeftRadius: 16,
                  borderTopRightRadius: 16,
                  opacity: 1,
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
                        fontWeight: "700",
                        color: "white",
                        textAlign: "center",
                      }}
                    >
                      ใหม่
                    </Text>
                  </View>
                </View>
              </ImageBackground>

              <View style={{ padding: 16 }}>
                <Text
                  style={{ fontWeight: "700", fontSize: 15.6, width: "100%" }}
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

                    <Text>1 ม.ค. - 30 ม.ค. 2566</Text>
                  </View>
                </View>

                {/* <View>
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
                          color: colors.persianBlue,
                          fontWeight: "700",
                          fontSize: 14,
                        }}
                      >
                        4000
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: colors.grey3,
                        fontWeight: "700",
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
                        backgroundColor:
                          // colors.grey3
                          colors.persianBlue,
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
                          color: colors.persianBlue,
                          fontWeight: "700",
                          fontSize: 14,
                        }}
                      >
                        400
                      </Text>
                    </View>

                    <Text
                      style={{
                        color: colors.grey3,
                        fontWeight: "700",
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
                        backgroundColor:
                          // colors.grey3
                          colors.persianBlue,
                      }}
                    />
                  </View>
                </View> */}
              </View>
            </View>
          </Pressable>
        </View>
      ))}
    </View>
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
