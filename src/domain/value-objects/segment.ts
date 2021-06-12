export class Segment {

    private _value: String;

    private constructor(segment: any) {
        if (segment === null || segment === undefined || typeof(segment) !== 'string') {
            this._value = '';
        } else {
            this._value = segment;
        }
    }

    static create(segment: any) {
        return new Segment(segment);
    }

    get value() {
        return this._value;
    }
}