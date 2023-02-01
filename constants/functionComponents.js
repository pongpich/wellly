export function validatePersonalAge(age) {
    // อยุ
    if ((age === null) || (age === "null")) {

        return { statusAge: false, statusTextAge: 0 }
    } else if ((age < 1)) {
        return { statusAge: false, statusTextAge: 0 }
    } else if ((age < 18) || (age > 65)) {
        return { statusAge: false, statusTextAge: 1 }
    } else {
        return { statusAge: true, statusTextAge: null }
    }
}

export function validatePersonalWeight(weight) {
    if ((weight === null) || (weight === "")) {
        return { statusWeight: false, statusTextWeight: 0 }
    } else if (weight < 1) {
        return { statusWeight: false, statusTextWeight: 0 }
    } else if ((weight < 30) || (weight > 250)) {
        return { statusWeight: false, statusTextWeight: 1 }
    } else {
        return { statusWeight: true, statusTextWeight: null }
    }
}

export function validatePersonalHeight(height) {

    if ((height === null) || (height === "")) {
        return { statusHeight: false, statusTextHeight: 0 }
    } else if (height < 1) {
        return { statusHeight: false, statusTextHeight: 0 }
    } else if ((height < 99) || (height > 281)) {
        return { statusHeight: false, statusTextHeight: 1 }
    } else {
        return { statusHeight: true, statusTextHeight: null }
    }
}

export function validateMgDL(mgDL) {
    if ((mgDL < 4) || (mgDL > 1000)) {
        return { statusMdDl: false, statusTextmg_dL: false }

    } else {
        return { statusMdDl: true, statusTextmg_dL: true }
    }
}

export function validateMg(mg) {
    if ((mg < 3.5) || (mg > 19)) {
        return { statusMg: false, statusTextMg: false }

    } else {
        return { statusMg: true, statusTextMg: true }
    }
}

export function validateBpm(bpm) {
    if ((bpm < 40) || (bpm > 160)) {
        return { statusBpm: false, statusTextBpm: false }

    } else {
        return { statusBpm: true, statusTextBpm: true }
    }
}

export function validateMmHGS(mmHGS) {
    if ((mmHGS < 40) || (mmHGS > 190)) {
        return { statusTextMmHG1: false, statusMmGH1: false }

    } else {
        return { statusTextMmHG1: true, statusMmGH1: true }
    }
}

export function validateMmHGD(mmHGD) {
    if ((mmHGD < 40) || (mmHGD > 170)) {
        return { statusMmGH2: false, statusTextMmHG2: false }

    } else {
        return { statusMmGH2: true, statusTextMmHG2: true }
    }
}

export function statusFpg(mgDL) {
    if (mgDL <= 100) {
        return { fpg: "N" }
    } else if ((mgDL >= 101) && (mgDL <= 125)) {
        return { fpg: "Pre" }
    } else {
        return { fpg: "Y" }
    }
}

export function statusHba1c(mg) {
    if (mg <= 5.7) {
        return { hba1c: "N" }
    } else if ((mg >= 5.8) && (mg <= 6.4)) {
        return { hba1c: "Pre" }

    } else {
        return { hba1c: "Y" }
    }
}

export function statusSbp(mmHGS) {
    if (mmHGS <= 129) {
        return { sbp: "N" }
    } else {
        return { sbp: "Y" }
    }
}
export function statusDbp(mmHGD) {
    if (mmHGD <= 84) {
        return { dbp: "N" }
    } else if (mmHGD >= 85) {
        return { dbp: "Y" }
    }
}
export function statusExercise(exer) {
    if (exer === "ประจำ") {
        return { exercise: "Y" }
    } else {
        return { exercise: "N" }
    }
}
export function statusDiabetes(fpg, hba1c) {
    if ((fpg === "N") && (hba1c === "N")) {
        return { diabetes: "N" }
    } else if ((fpg === "Pre") && (hba1c === "Pre")) {
        return { diabetes: "Pre" }
    } else if ((fpg === "Pre") && (hba1c === "Y")) {
        return { diabetes: "Y" }
    } else if ((fpg === "Y") && (hba1c === "Pre")) {
        return { diabetes: "Y" }
    } else if ((fpg === "N") && (hba1c === "Pre")) {
        return { diabetes: "Pre" }
    } else if ((fpg === "Pre") && (hba1c === "N")) {
        return { diabetes: "Pre" }
    } else if ((fpg === "N") && (hba1c === "Y")) {
        return { diabetes: "Y" }
    } else if ((fpg === "Y") && (hba1c === "N")) {
        return { diabetes: "Y" }
    } else if ((fpg === "Y") && (hba1c === "Y")) {
        return { diabetes: "Y" }
    }
}
export function statusHypertension(sbp, dbp) {
    if ((sbp === "N") && (dbp === "N")) {
        return { hypertension: "N" }
    } else {
        return { hypertension: "Y" }
    }
}

export function statusResultsUser(diabetes, hypertension, exercise) {
    if ((diabetes === "N") && (hypertension === "N")) {  //A1 & A2
        return { resultsUser: "A1" }
    } else if ((diabetes === "Pre") && (hypertension === "N") && (exercise === "N")) { //B1 
        return { resultsUser: "B1" }
    } else if ((diabetes === "Pre") && (hypertension === "Y") && (exercise === "N")) { // B2
        return { resultsUser: "B2" }
    } else if ((diabetes === "Pre") && (hypertension === "N") && (exercise === "Y")) { // B3
        return { resultsUser: "B1" }
    } else if ((diabetes === "Pre") && (hypertension === "Y") && (exercise === "Y")) { // B4
        return { resultsUser: "B2" }
    } else if ((diabetes === "Y") && (hypertension === "N") && (exercise === "N")) { //C1
        return { resultsUser: "C1" }
    } else if ((diabetes === "Y") && (hypertension === "Y") && (exercise === "N")) { //C2
        return { resultsUser: "C2" }
    } else if ((diabetes === "Y") && (hypertension === "N") && (exercise === "Y")) { // C3
        return { resultsUser: "C1" }
    } else if ((diabetes === "Y") && (hypertension === "Y") && (exercise === "Y")) { // C4
        return { resultsUser: "C2" }
    } else if ((diabetes === "N") && (hypertension === "Y") && (exercise === "N")) { //D1
        return { resultsUser: "D1" }
    } else if ((diabetes === "N") && (hypertension === "Y") && (exercise === "Y")) { //D1
        return { resultsUser: "D1" }
    }
}
