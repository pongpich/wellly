import React, { Component } from 'react';
import { View, StyleSheet, Pressable, Image, Text, Dimensions } from 'react-native';
import ComponentsStyle from '../../constants/components';
import colors from '../../constants/colors';
import { getNutritionKnowledge, getNutritionKnowledgeActivity, resetStatusNutrionKuoeledeActivty } from "../../redux/get";
import { insertNutritionKnowledgeActivity } from "../../redux/update";
import { connect } from 'react-redux';
import i18next from 'i18next';




class Gn4 extends Component {


    constructor(props) {
        super(props);
        this.state = {
            nutrition_knowledge: null,
            dataMassage: null,
            loading: true,
            error: false,
            nutrition_knowledge_Act: null,
            statusMess: false,
            assess_behavior: null,
            score: null
        };
    }

    handleLoad = () => {
        this.setState({ loading: false });
    };

    handleError = () => {
        this.setState({ loading: false, error: true });
    };


    componentDidMount() {
        const { user } = this.props;

        this.setState({ dataMassage: null })
        this.props.resetStatusNutrionKuoeledeActivty();
        this.props.getNutritionKnowledge();
        this.props.getNutritionKnowledgeActivity(user && user.user_id);
    }

    componentDidUpdate(prevProps, prevState) {
        const { statusNutritionKnowledge, nutritionKnowledge, statusNutritionKnowledgeActivity, nutritionKnowledgeActivity, statusInsertNutritionKnowledgeActivity, user } = this.props;
        const { nutrition_knowledge, dataMassage, sums } = this.state;

        if (prevProps.statusNutritionKnowledge !== statusNutritionKnowledge && statusNutritionKnowledge === "success") {
            this.setState({
                nutrition_knowledge: nutritionKnowledge && JSON.parse(nutritionKnowledge[0].knowledge_eng),
                assess_behavior: nutritionKnowledge && JSON.parse(nutritionKnowledge[0].assess_behavior_eng),
                statusMess: false,

            })
        }

        if ((prevProps.statusInsertNutritionKnowledgeActivity !== statusInsertNutritionKnowledgeActivity) && (statusInsertNutritionKnowledgeActivity === "success")) {
            this.props.getNutritionKnowledgeActivity(user && user.user_id)
        }


        if ((prevProps.statusNutritionKnowledgeActivity !== statusNutritionKnowledgeActivity) && (statusNutritionKnowledgeActivity === "success")) {
            if (nutritionKnowledgeActivity.length > 0) {
                this.setState({

                    nutrition_knowledge_Act: nutritionKnowledgeActivity && JSON.parse(nutritionKnowledgeActivity[0].knowledge),
                    score: nutritionKnowledgeActivity && JSON.parse(nutritionKnowledgeActivity[0].score),
                    dataMassage: nutritionKnowledgeActivity && JSON.parse(nutritionKnowledgeActivity[0].assess_knowledge),
                })
            }
        }

    }



    renderImg(mission_id, img_index, size = 'md') {
        const imgUrl = `https://wellly.s3.ap-southeast-1.amazonaws.com/knowledge/knowledge/${mission_id}/eng/${mission_id}_${img_index}.png`
        const { loading, error } = this.state;
        return (
            <View style={{ justifyContent: "center", alignItems: "center" }}>
                <View style={(size === 'md') ? styles.boxImage : styles.boxImage2}>
                    {
                        loading &&
                        <Image
                            style={{
                                width: "100%",
                                height: "100%",
                            }}
                            source={require('../../assets/images/icon/ImageArticle.png')}
                            resizeMode='stretch'
                        />}
                    {error && <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        source={require('../../assets/images/icon/ImageArticle.png')}
                        resizeMode='stretch'
                    />}
                    <Image
                        style={{
                            width: "100%",
                            height: "100%",
                        }}
                        onLoad={this.handleLoad}
                        onError={this.handleError}
                        source={{ uri: imgUrl }}
                        resizeMode='stretch'
                    />
                </View>
            </View>
        )
    }

    onSelected(indexType, index, chonice, score) {

        const { nutrition_knowledge } = this.state;

        nutrition_knowledge.forEach((item, i) => {
            if (item.indexType === indexType) {
                item.data.forEach((question, j) => {
                    if (j === index - 1) {
                        question.selected = chonice;
                    }
                });
            }
        });
        this.setState({
            nutrition_knowledge: nutrition_knowledge
        })

    }

    onAssessBehavior() {
        const { nutrition_knowledge } = this.state;
        const { nutritionKnowledge, user } = this.props;
        const assess_behavior = nutritionKnowledge && JSON.parse(nutritionKnowledge[0].assess_behavior)
        let dataArr = []
        nutrition_knowledge.map((item, i) => {
            if (item.indexType === i + 1) {
                let data = item.data;
                let arr = [];
                data.map((value, k) => {
                    var choice = [value.choice]
                    /* console.log(value.selected); */
                    choice.map((chonices, k) => {
                        if (value.selected == "a") {
                            arr.push(chonices.a.score)
                        }
                        if (value.selected == "b") {
                            arr.push(chonices.b.score)
                        }
                        if (value.selected == "c") {
                            arr.push(chonices.c.score)
                        }
                    })
                })
                dataArr[i] = arr

            }
        })
        let sums = dataArr.map((arr) => arr.reduce((sum, val) => sum + val, 0));
        const dataMassage = [];
        assess_behavior && assess_behavior.map((item, i) => {
            if (item.indexType === i + 1) {
                let data = item.data;
                let dataMess = data.filter((value, l) => {
                    if ((sums[item.indexType - 1] >= value.minScore) && (sums[item.indexType - 1] <= value.maxScore)) {
                        return value.message;
                    }
                });
                /*   console.log(dataMassage); */
                if (dataMess.length > 0) {
                    dataMassage[i] =
                    {
                        "type": item.type,
                        "message": dataMess[0].message
                    }
                }



            }
        })

        if (dataMassage.length > 0) {
            this.setState({
                dataMassage: dataMassage,

            })
            this.props.insertNutritionKnowledgeActivity(user && user.user_id, nutrition_knowledge, { "score": sums }, dataMassage)
        }



    }


    filterItem(indexType, index) { //เช็คว่าอันไหนมีติ๊กถูกเพื่อแสดงผล

        const { nutrition_knowledge_Act } = this.state;
        const desiredIndexType = indexType;
        const desiredIndex = index;

        // filter หาค่าของแต่ละ Type แต่ละ Index
        const filteredData = nutrition_knowledge_Act && nutrition_knowledge_Act.filter(items => items.indexType === desiredIndexType && items.data.some(d => {
            if (d.index === desiredIndex) {
                return d.selected;
            }
        }));

        // map เข้าไปเพื่อดึงค่าเฉพาะตัวที่มีเช็คถูก
        const selectedValues = filteredData && filteredData.map(item => item.data.find(d => d.index === desiredIndex).selected);
        const selectedValue = selectedValues && selectedValues[0];

        return selectedValue
    }


    filterItemAssess_behavior(score, desiredIndexType) {
        const { assess_behavior } = this.state;
        const filteredData = assess_behavior && assess_behavior.reduce((result, items) => {
            if (items.indexType === desiredIndexType && items.data.some(d => score >= d.minScore && score <= d.maxScore)) {
                result.push([items.type, items.data.filter(d => score >= d.minScore && score <= d.maxScore).map(d => d.message)]);
            }
            return result;
        }, []);
        return filteredData
    }



    render() {

        const { nutrition_knowledge, dataMassage, nutrition_knowledge_Act, statusMess, assess_behavior, score } = this.state;

        return (
            <View style={styles.scrollViewbox} >
                {
                    this.renderImg('GN4', 1)
                }
                <Text style={styles.content} >
                    {'\n'}
                    Diet is one of the factors contributing to the development of non-communicable diseases (NCDs) such as diabetes, high blood pressure, and high cholesterol. Adjusting your eating habits then helps avoid the risk of developing certain diseases.{'\n'}
                    {'\n'}
                    Let’s see your eating habits!
                </Text>

                {
                    nutrition_knowledge && nutrition_knowledge.map((item, i) => {
                        /*  console.log("item", item.data); */
                        return (
                            <>
                                <Text style={styles.textHead} key={"nk" + i}>{item.type}</Text>
                                {
                                    item && item.data.map((value, j) => {
                                        var choice = [value.choice]

                                        /*  console.log("value", value.index); */

                                        const selectedValue = this.filterItem(item.indexType, value.index);


                                        return (
                                            <>
                                                <Text style={styles.content} key={"ch" + j}>{value.question}</Text>
                                                {
                                                    choice && choice.map((chonices, k) => {
                                                        return (
                                                            <View key={"k" + k}>
                                                                <View style={{ flexDirection: "row", paddingRight: 16, paddingLeft: 24, marginTop: 16 }} key={"k1" + k}>
                                                                    <Pressable onPress={() => dataMassage === null && this.onSelected(item.indexType, value.index, "a", chonices.a.score)} >
                                                                        <Image style={{ width: 24, height: 24 }} source={selectedValue === "a" ? require('../../assets/images/icon/radioButtonActive.png') : require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                    </Pressable>
                                                                    <Text style={[styles.textChoice, value.selected === "a" && { color: colors.positive1 }]}>{chonices.a.answer}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", paddingRight: 16, paddingLeft: 24, marginTop: 16 }} key={"k2" + k}>
                                                                    <Pressable onPress={() => dataMassage === null && this.onSelected(item.indexType, value.index, "b", chonices.b.score)} >
                                                                        <Image style={{ width: 24, height: 24 }} source={selectedValue === "b" ? require('../../assets/images/icon/radioButtonActive.png') : require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                    </Pressable>
                                                                    <Text style={[styles.textChoice, value.selected === "b" && { color: colors.positive1 }]}>{chonices.b.answer}</Text>
                                                                </View>
                                                                <View style={{ flexDirection: "row", paddingRight: 16, paddingLeft: 24, marginTop: 16 }} key={"k3" + k}>
                                                                    <Pressable onPress={() => dataMassage === null && this.onSelected(item.indexType, value.index, "c", chonices.c.score)} >
                                                                        <Image style={{ width: 24, height: 24 }} source={selectedValue === "c" ? require('../../assets/images/icon/radioButtonActive.png') : require('../../assets/images/icon/radioButtonSelection.png')} />
                                                                    </Pressable>
                                                                    <Text style={[styles.textChoice, selectedValue === "c" && { color: colors.positive1 }]}>{chonices.c.answer}</Text>
                                                                </View>

                                                            </View>
                                                        )
                                                    })
                                                }
                                            </>
                                        )
                                    })
                                }
                            </>
                        )
                    })
                }

                {

                    nutrition_knowledge &&
                        nutrition_knowledge_Act === null ?
                        <Pressable onPress={() => this.onAssessBehavior()} >
                            <View style={[ComponentsStyle.button, { marginTop: 32 }]} >
                                <Text style={ComponentsStyle.textButton}>
                                    ประเมินพฤติกรรม
                                </Text>
                            </View>
                        </Pressable> :
                        <Pressable >
                            <View style={[ComponentsStyle.buttonGrey, { marginTop: 32 }]} >
                                <Text style={ComponentsStyle.textButtonGrey}>
                                    ประเมินพฤติกรรม
                                </Text>
                            </View>
                        </Pressable>
                }

                {
                    assess_behavior && <Text style={styles.messageHead}>ผลการประเมิน</Text>
                }

                {
                    score && score.score.map((item, i) => {

                        const AssessMassage = this.filterItemAssess_behavior(item, i + 1);
                        return (
                            <View key={"l" + i}>

                                <Text style={styles.textHead}>{AssessMassage && AssessMassage[0][0]}</Text>
                                <Text style={styles.textMessage}>{AssessMassage && AssessMassage[0]}</Text>
                            </View>
                        )

                    })



                }
                {/*   <Text style={styles.textHead}>เป็นคน...หวานแค่ไหน ? ?</Text>
                <Text style={styles.content}>1. ดื่มน้ำเปล่า กาแฟดำ ชาไม่ใส่น้ำตาล โซดา</Text>
                <View style={{ flexDirection: "row", paddingRight: 16, paddingLeft: 24, marginTop: 16 }}>
                    <Image source={require('../../assets/images/icon/radioButtonSelection.png')} />
                    <Text style={styles.textChoice}>ทุกวัน/เกือบทุกวัน</Text>
                </View> */}
                {/*   {
                    this.renderImg('GN4', 2, 'lg')
                }
                {
                    this.renderImg('GN4', 3, 'lg')
                }
                {
                    this.renderImg('GN4', 4, 'lg')
                } */}
                <View style={[styles.areaViewText, { marginTop: 30, marginBottom: 40 }]}>
                    <Text style={{
                        color: colors.grey1,
                        fontSize: ComponentsStyle.fontSize16,
                        fontFamily: "IBMPlexSansThai-Regular",
                        textAlign: "center"
                    }}>{'Ref. (อ้างอิง)'}</Text>
                    <Text style={{
                        color: colors.grey1,
                        fontSize: ComponentsStyle.fontSize16,
                        fontFamily: "IBMPlexSansThai-Regular",
                        textAlign: "center"
                    }}>{`Campbell , B. (2021). NSCA's guide to sport and exercise nutrition, 2nd edition.`}</Text>
                </View>
            </View >
        )
    }
}
const deviceHeight = Math.round(Dimensions.get('window').height);


const styles = StyleSheet.create({
    scrollViewbox: {
        marginTop: 0,
        marginBottom: 50,
        justifyContent: "center"

    },
    title: {
        marginTop: 24,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,

    },
    content: {
        marginTop: 32,
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1
    },
    textHead: {
        marginTop: 32,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: "#000000"
    },
    textChoice: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey3,
        marginLeft: 8,

    },
    textMessage: {
        fontFamily: "IBMPlexSansThai-Regular",
        fontSize: ComponentsStyle.fontSize16,
        color: colors.grey1,
    },
    boxImage: {
        marginTop: 32,
        width: (deviceHeight > 1023) ? "100%" : 343,
        height: (deviceHeight > 1023) ? 400 : 208
    },
    boxImage2: {
        marginTop: 32,
        width: (deviceHeight > 1023) ? "100%" : 343,
        height: (deviceHeight > 1023) ? 1100 : 350,
    },
    messageHead: {
        textAlign: "center",
        marginTop: 72,
        fontFamily: "IBMPlexSansThai-Bold",
        fontSize: ComponentsStyle.fontSize16,
        color: "#000000"
    }
})



const mapStateToProps = ({ getData, authUser, updateData }) => {
    const { statusNutritionKnowledge, nutritionKnowledge, statusNutritionKnowledgeActivity, nutritionKnowledgeActivity } = getData;
    const { user, statusUpdateDisplayName } = authUser;
    const { statusInsertNutritionKnowledgeActivity } = updateData;


    return { statusNutritionKnowledge, nutritionKnowledge, user, statusUpdateDisplayName, statusNutritionKnowledgeActivity, nutritionKnowledgeActivity, statusInsertNutritionKnowledgeActivity };
};

const mapActionsToProps = { getNutritionKnowledge, getNutritionKnowledgeActivity, insertNutritionKnowledgeActivity, resetStatusNutrionKuoeledeActivty };


export default connect(
    mapStateToProps,
    mapActionsToProps
)(Gn4);

