
export class EfficiencyIndicators {

    private _grossMargin: any;
    private _ebitMargin: any;
    private _netMargin: any;

    private constructor(grossMargin: any, ebitMargin: any, netMargin: any) {
        if (grossMargin === null || grossMargin === undefined || typeof(grossMargin) !== 'number') {
            this._grossMargin = null;
        } else {
            this._grossMargin = grossMargin;
        }

        if (ebitMargin === null || ebitMargin === undefined || typeof(ebitMargin) !== 'number') {
            this._ebitMargin = null;
        } else {
            this._ebitMargin = ebitMargin;
        }

        if (netMargin === null || netMargin === undefined || typeof(netMargin) !== 'number') {
            this._netMargin = null;
        } else {
            this._netMargin = netMargin;
        }
    }

    static create(grossMargin: any, ebitMargin: any, netMargin: any) {
        return new EfficiencyIndicators(grossMargin, ebitMargin, netMargin);
    }

    get grossMargin() {
        return this._grossMargin
    }

    get ebitMargin() {
        return this._ebitMargin
    }

    get netMargin() {
        return this._netMargin
    }
}