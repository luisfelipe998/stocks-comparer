export class Sector {

    private _value: String;

    private constructor(sector?: any) {
        if (sector === null || sector === undefined || typeof(sector) !== 'string') {
            this._value = '';
        } else {
            this._value = sector;
        }
    }

    static create(sector: any) {
        return new Sector(sector);
    }

    get value() {
        return this._value;
    }
}