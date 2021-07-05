export enum DateFormFlag {
    NA,
    Today
}

class DateForm {
    private _date: number;
    private _month: number;
    private _year: number;
    private _flag: DateFormFlag;

    constructor(date: number, month: number, year: number, flag: DateFormFlag) {
        this._date = date;
        this._month = month;
        this._year = year;
        this._flag = flag;
    }

    get date() {
        return this._date;
    };

    set date(inp: number) {
        if (inp < 1 || inp > 31) {
            return;
        }
        this._date = inp;
    };

    get month() {
        return this._month;
    };

    set month(inp: number) {
        if (inp < 0 || inp > 11) {
            return;
        }
        this._month = inp;
    };

    get year() {
        return this._year;
    };

    set year(inp: number) {
        this._year = inp;
    };

    get flag() {
        return this._flag;
    };

    set flag(inp: DateFormFlag) { // TODO: create enum flag types
        this._flag = inp;
    }

    formDayString(): string {
        const date = String(this._date);
        const month = String(this._month + 1);
        const year = String(this._year);
        return `${(month.length < 2) ? '0' + month : month}-${(date.length < 2) ? '0' + date : date}-${year.substring(2, 4)}`;
    }
};

export default DateForm;
