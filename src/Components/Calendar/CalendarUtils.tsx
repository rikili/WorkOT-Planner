export interface DateForm {
    month: number;
    date: number;
}

interface monthTranslate {
    month: number;
    yearDelta: number;
}

export const translateMonth = (inp: number):monthTranslate => {
    if (inp < 0) {
        return {
            month: 12 + inp + 1,
            yearDelta: -1
        };
    } else if (inp > 11) {
        return {
            month: inp - 12,
            yearDelta: 1
        };
    } else {
        return {
            month: inp,
            yearDelta: 0
        };
    }
};
