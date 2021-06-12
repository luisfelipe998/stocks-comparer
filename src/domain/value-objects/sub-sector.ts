export class SubSector {

    private _value: String;

    private constructor(subSector: any) {
        if (subSector === null || subSector === undefined || typeof(subSector) !== 'string') {
            this._value = '';
        } else {
            this._value = subSector;
        }
    }

    static create(subSector: any) {
        return new SubSector(subSector);
    }

    get value() {
        return this._value;
    }
}