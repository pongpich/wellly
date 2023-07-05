import React, { Component } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Animated,
  Image,
  ImageBackground,
  Dimensions,
  Pressable,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import colors from "../../constants/colors";
import { getMonthActivityLog } from "../../redux/get";
import ComponentsStyle from "../../constants/components";
import { connect } from "react-redux";
import { withTranslation } from "react-i18next";
import RNPickerSelect from "react-native-picker-select";
import {
  calculateWeekInProgram,
  currentTimeActivity,
} from "../../helpers/utils";

//const data = Array.from({ length: 30 });
class ActHistoty extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      selected_month: 1,
      selected_year: 1,
      currYear: 1,
      currMonth: 1,
      selectedValue: "java",
      itemsYear2: [],
    };
  }

  selectYear(e) {
    const { currYear } = this.state;
    this.setState({
      selected_year: e,
    });

    if (e != currYear) {
      this.setState({
        selected_month: 1,
      });
    } else {
      const currDate = new Date();
      const currYear = currDate.getFullYear();
      const currMonth = currDate.getMonth() + 1; //ต้อง +1 เพราะ index เริ่มจาก 0
      this.setState({
        selected_month: currMonth,
      });
    }
  }

  selectMonth(e) {
    this.setState({
      selected_month: e,
    });
  }

  componentDidMount() {
    const { user } = this.props;

    //เมื่อเปิดหน้าเช็คเดือนและปีปัจจุบัน เพื่อโชว์เป็นของมูล Default ก่อนผู้ใช้กดเลือก
    const user_id = user && user.user_id;
    const currDate = new Date();
    const currYear = currDate.getFullYear();
    const currMonth = currDate.getMonth() + 1; //ต้อง +1 เพราะ index เริ่มจาก 0
    this.setState({
      selected_year: currYear,
      selected_month: currMonth,
      currYear: currYear,
      currMonth: currMonth,
    });
    this.props.getMonthActivityLog(user_id, currYear, currMonth);

    const itemsYear = []; // สร้าง array เพื่อเก็บ object ปี

    for (var year = currYear; year > currYear - 20; year--) {
      var buddhistYear = year + 543; // แปลงเป็นปี พ.ศ.
      itemsYear.push({ label: buddhistYear.toString(), value: year }); // เพิ่ม object ปีเข้าไปใน array
    }
    this.setState({
      itemsYear2: itemsYear,
    });
  }

  componentDidUpdate(prevProps, prevState) {
    const { user, status_month_act_log, month_act_log } = this.props;
    const { selected_year, selected_month } = this.state;
    const user_id = user && user.user_id;

    if (
      prevProps.status_month_act_log !== status_month_act_log &&
      status_month_act_log === "success"
    ) {
      this.setState({ data: month_act_log });
    }
    if (prevState.selected_year !== selected_year) {
      this.props.getMonthActivityLog(user_id, selected_year, selected_month);
    }
    if (prevState.selected_month !== selected_month) {
      this.props.getMonthActivityLog(user_id, selected_year, selected_month);
    }
  }
  noActivity() {
    return (
      <View
        style={{
          justifyContent: "center",
          alignItems: "center",
          white: "100%",
          height: "80%",
        }}
      >
        <Image
          style={{ height: 84, width: 120, marginLeft: 4 }}
          source={require("../../assets/images/exercise/Empty_State.png")}
        />
        <Text style={styles.imptyTextHead}>ยังไม่มีกิจกรรม</Text>
      </View>
    );
  }

  dropdown = () => {
    const { selected_year, currYear, itemsYear2 } = this.state;
    const { t } = this.props;
    if (itemsYear2.length > 0) {
      const items = itemsYear2;
      return (
        <RNPickerSelect
          Icon={() => {
            return (
              <Image
                style={{
                  height: 16,
                  width: 16,
                  marginRight: 10,
                  marginTop: 16,
                  zIndex: 1,
                }}
                source={require("../../assets/images/activity/Chevron.png")}
              />
            );
          }}
          style={{
            inputIOS: {
              height: 50,
              /* backgroundColor: '#fff', */
              borderRadius: 4,
              fontSize: 16,
              zIndex: 2,
              paddingLeft: 30,
              paddingRight: 30, // ปรับเพิ่มความกว้างของ input เพื่อให้รูปภาพ dropdown พอดีกับ input
            },
            inputAndroid: {
              height: 50,
              zIndex: 2,
              /*  backgroundColor: '#fff', */
              borderRadius: 4,
              fontSize: 16,
              paddingLeft: 20,
              paddingRight: 40, // ปรับเพิ่มความกว้างของ input เพื่อให้รูปภาพ dropdown พอดีกับ input
            },
          }}
          onValueChange={(value) => this.selectYear(value)}
          items={items}
          value={selected_year}
          useNativeAndroidPickerStyle={false}
          placeholder={{ label: `${t("select_year")}`, value: null }}
        />
      );
    }
  };

  render() {
    const { selected_year, selected_month, data, currYear, currMonth } =
      this.state;
    const { t } = this.props;

    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.marginBox}>
          <View style={[styles.rowView, { justifyContent: "space-between" }]}>
            <Text style={styles.missionHistory}>{t("mission_history")}</Text>
            <View style={[styles.rowView, { marginTop: 10 }]}>
              <TouchableWithoutFeedback
                onPress={() =>
                  this.setState({
                    selected_month: currMonth,
                    selected_year: currYear,
                  })
                }
              >
                <Text style={[styles.month, { marginRight: 4 }]}>
                  {t("this_month")}
                </Text>
              </TouchableWithoutFeedback>

              <View style={{ marginTop: -12 }}>{this.dropdown()}</View>

              {/*    <RNPickerSelect
                                Icon={() => {
                                    return <Image style={{ height: 16, width: 16, marginRight: 4, marginTop: 16 }} source={require('../../assets/images/activity/Chevron.png')} />;;
                                }}
                                style={{
                                    inputIOS: {
                                        height: 50,
                                        backgroundColor: '#fff',
                                        borderRadius: 4,
                                        fontSize: 16,
                                        paddingLeft: 10,
                                        paddingRight: 30, // ปรับเพิ่มความกว้างของ input เพื่อให้รูปภาพ dropdown พอดีกับ input
                                    },
                                    inputAndroid: {
                                        height: 50,
                                        backgroundColor: '#fff',
                                        borderRadius: 4,
                                        fontSize: 16,
                                        paddingLeft: 10,
                                        paddingRight: 100, // ปรับเพิ่มความกว้างของ input เพื่อให้รูปภาพ dropdown พอดีกับ input
                                    },
                                }}
                                useNativeAndroidPickerStyle={false}
                                placeholder={{ label: 'Select a value', value: null }}
                                onValueChange={(value) => console.log(value)}
                                items={[
                                    { label: 'Football', value: 'football' },
                                    { label: 'Baseball', value: 'baseball' },
                                    { label: 'Hockey', value: 'hockey' },
                                ]}
                            /> */}
            </View>
          </View>

          <ScrollView
            horizontal={true}
            showsVerticalScrollIndicator={false}
            showsHorizontalScrollIndicator={false}
            style={{ paddingBottom: 20 }}
          >
            <View style={[styles.rowView, { justifyContent: "flex-end" }]}>
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 1)) && (
                <Pressable
                  style={[
                    { width: "auto", paddingHorizontal: 8 },
                    selected_month === 1
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(1)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 1
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("jan")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 2)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 2
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(2)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 2
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("feb")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 3)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 3
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(3)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 3
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("mar")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 4)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 4
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(4)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 4
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("apr")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 5)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 5
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(5)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 5
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("may")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 6)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 6
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(6)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 6
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("jun")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 7)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 7
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(7)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 7
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("jul")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 8)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 8
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(8)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 8
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("aug")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 9)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 9
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(9)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 9
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("sep")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 10)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 10
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(10)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 10
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("oct")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 11)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 11
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(11)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 11
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("nov")}
                  </Text>
                </Pressable>
              )}
              {(selected_year < currYear ||
                (selected_year === currYear && currMonth >= 12)) && (
                <Pressable
                  style={[
                    { marginLeft: 8, paddingHorizontal: 8, width: "auto" },
                    selected_month === 12
                      ? styles.missionPre
                      : styles.programPre,
                  ]}
                  onPress={() => this.selectMonth(12)}
                >
                  <Text
                    style={[
                      styles.mission,
                      selected_month === 12
                        ? { color: colors.white }
                        : { color: colors.primary },
                    ]}
                  >
                    {t("dec")}
                  </Text>
                </Pressable>
              )}
            </View>
          </ScrollView>
        </View>
        <View>
          {data.length == 0 && this.noActivity()}
          <ScrollView showsVerticalScrollIndicator={false}>
            <View
              style={{
                marginTop: 20,
                marginBottom: 100,
                flex: 1,
              }}
            >
              {data &&
                data.map((item, i) => {
                  return (
                    <Pressable key={i + "tfb"}>
                      <View key={i} style={styles.row}>
                        <Image
                          style={styles.activityImage}
                          source={
                            item.intensity === "light_intensity"
                              ? require("../../assets/images/activity/Activitylow.png")
                              : item.intensity === "moderate_intensity"
                              ? require("../../assets/images/activity/Activitycenter.png")
                              : require("../../assets/images/activity/Activityhign.png")
                          }
                        />
                        <View style={styles.missionData}>
                          <Text style={styles.missionHead}>
                            {item.activity}
                          </Text>
                          <View style={styles.rowView}>
                            <Text style={styles.dateData}>
                              {currentTimeActivity(item.created_at)}
                            </Text>
                            <Text style={styles.li}>{"\u2B24" + " "}</Text>
                            <Text style={styles.dateData}>
                              {item.intensity === "light_intensity" &&
                                `${t("low_concentration")}`}
                              {item.intensity === "moderate_intensity" &&
                                `${t("moderate_concentration")}`}
                              {item.intensity === "vigorous_intensity" &&
                                `${t("hight_concentration")}`}
                            </Text>
                          </View>
                          <Text style={styles.timeData}>
                            {item.duration} {t("minute")}
                          </Text>
                          <View style={styles.rowView}>
                            <Image
                              style={{
                                height: 12,
                                width: 12,
                                marginTop: 5,
                                marginRight: 4,
                              }}
                              source={require("../../assets/images/activity/Note.png")}
                            />
                            <Text style={styles.editNote}>{item.note}</Text>
                          </View>
                        </View>
                        <View style={styles.viewIconRight}>
                          <Pressable>
                            <Image
                              style={{
                                height: 24,
                                width: 24,
                                zIndex: 1,
                                marginRight: 8,
                              }}
                              source={require("../../assets/images/icon/right.png")}
                            />
                          </Pressable>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
            </View>
          </ScrollView>
        </View>
      </SafeAreaView>
    );
  }
}
const deviceHeight = Math.round(Dimensions.get("window").height);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.grey7,
  },
  marginBox: {
    marginHorizontal: 16,
  },
  missionHistory: {
    fontSize: ComponentsStyle.fontSize24,
    color: colors.grey1,
    fontFamily: "IBMPlexSansThai-Bold",
    marginBottom: 16,
  },
  month: {
    fontFamily: "IBMPlexSansThai-Bold",
    fontSize: 16,
    color: colors.primary,
  },
  textyy: {
    fontFamily: "IBMPlexSansThai-Regular",
    fontSize: 16,
    color: colors.grey1,
  },
  rowView: {
    flexDirection: "row",
  },
  missionPre: {
    height: 37,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 100,
  },
  programPre: {
    height: 37,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.primarySecondary,
    borderRadius: 100,
  },
  mission: {
    fontFamily: "IBMPlexSansThai-Bold",
    fontSize: ComponentsStyle.fontSize16,
  },
  row: {
    position: "relative",
    height: "auto",
    marginBottom: 16,
    backgroundColor: colors.white,
    borderRadius: 16,
    flexDirection: "row",
    marginLeft: 16,
    marginRight: deviceHeight > 1023 ? 32 : 16,
  },
  activityImage: {
    width: 32,
    height: 32,
    marginTop: 16,
    marginLeft: 16,
  },
  missionData: {
    flexWrap: "nowrap",
    width: "75%",
    margin: 16,
  },
  missionHead: {
    fontSize: ComponentsStyle.fontSize16,
    fontFamily: "IBMPlexSansThai-Bold",
    color: colors.grey1,
  },
  dateData: {
    fontSize: 12,
    fontFamily: "IBMPlexSansThai-Regular",
    color: colors.grey3,
  },
  timeData: {
    fontFamily: "IBMPlexSansThai-Bold",
    fontSize: ComponentsStyle.fontSize20,
    color: colors.grey1,
  },
  li: {
    marginLeft: 4,
    marginRight: 4,
    marginTop: 6,
    fontSize: 5,
    color: colors.grey4,
  },
  editNote: {
    fontSize: 14,
    fontFamily: "IBMPlexSansThai-Regular",
    color: colors.grey2,
  },
  viewIconRight: {
    position: "absolute",
    width: "100%",
    height: "100%",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  imptyTextHead: {
    marginTop: 8,
    color: colors.grey2,
    fontSize: ComponentsStyle.fontSize16,
    fontFamily: "IBMPlexSansThai-Bold",
  },
});

const mapStateToProps = ({ authUser, getData }) => {
  const { user } = authUser;
  const { status_month_act_log, month_act_log } = getData;
  return { status_month_act_log, month_act_log, user };
};

const mapActionsToProps = { getMonthActivityLog };

export default connect(
  mapStateToProps,
  mapActionsToProps
)(withTranslation()(ActHistoty));
