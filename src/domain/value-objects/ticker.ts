export class Ticker {

    private _value: String;

    private constructor(ticker?: any) {
        if (ticker === null || ticker === undefined || typeof(ticker) !== 'string') {
            throw new Error('ticker must be received');
        } else if (!new RegExp('^[A-Z]{4}[0-9]{1,2}$').test(ticker))
            throw new Error('ticker not formatted correctly');
        else {
            this._value = ticker;
        }
    }

    static create(ticker: any) {
        return new Ticker(ticker);
    }

    get value() {
        return this._value;
    }
}