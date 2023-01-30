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

export function validate1(e) {
    return e;
}