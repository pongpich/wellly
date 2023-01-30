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

    /*  if ((weight === null) || (weight === "")) {
         this.setState({
             statusWeight: false,
             statusTextWeight: 0
         })
     } else if (weight < 0) {
         this.setState({
             statusWeight: false,
             statusTextWeight: 0
         })
     } else if ((weight < 30) || (weight > 250)) {
         this.setState({
             statusWeight: false,
             statusTextWeight: 1
         })
     } else {
         this.setState({
             statusWeight: true,
             statusTextWeight: null
         })
     }
 
     if ((height === null) || (height === "")) {
         this.setState({
             statusHeight: false,
             statusTextHeight: 0
         })
     } else if (height == 1) {
         this.setState({
             statusHeight: false,
             statusTextHeight: 0
         })
     } else if ((height < 99) || (height > 281)) {
         this.setState({
             statusHeight: false,
             statusTextHeight: 1
         })
     } else {
         this.setState({
             statusHeight: true,
             statusTextHeight: null
         })
     } */
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

    /*if ((height === null) || (height === "")) {
        this.setState({
            statusHeight: false,
            statusTextHeight: 0
        })
    } else if (height == 1) {
        this.setState({
            statusHeight: false,
            statusTextHeight: 0
        })
    } else if ((height < 99) || (height > 281)) {
        this.setState({
            statusHeight: false,
            statusTextHeight: 1
        })
    } else {
        this.setState({
            statusHeight: true,
            statusTextHeight: null
        })
    } */
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