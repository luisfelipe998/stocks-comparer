
export class GrowthIndicators {

    private _revenue5yearCAGR: any;
    private _profit5yearCAGR: any;

    private constructor(revenue5yearCAGR: any, profit5yearCAGR: any) {
        if (revenue5yearCAGR === null || revenue5yearCAGR === undefined || typeof(revenue5yearCAGR) !== 'number') {
            this._revenue5yearCAGR = null;
        } else {
            this._revenue5yearCAGR = revenue5yearCAGR;
        }

        if (profit5yearCAGR === null || profit5yearCAGR === undefined || typeof(profit5yearCAGR) !== 'number') {
            this._profit5yearCAGR = null;
        } else {
            this._profit5yearCAGR = profit5yearCAGR;
        }
    }

    static create(revenue5yearCAGR: any, profit5yearCAGR: any) {
        return new GrowthIndicators(revenue5yearCAGR, profit5yearCAGR);
    }

    get revenue5yearCAGR() {
        return this._revenue5yearCAGR
    }

    get profit5yearCAGR() {
        return this._profit5yearCAGR
    }
}