
export class ProfitabilityIndicators {

    private _roe: any;
    private _roa: any;
    private _roic: any;
    private _workingAssets: any;

    private constructor(roe: any, roa: any, roic: any, workingAssets: any) {
        if (roe === null || roe === undefined || typeof(roe) !== 'number') {
            this._roe = null;
        } else {
            this._roe = roe;
        }

        if (roa === null || roa === undefined || typeof(roa) !== 'number') {
            this._roa = null;
        } else {
            this._roa = roa;
        }

        if (roic === null || roic === undefined || typeof(roic) !== 'number') {
            this._roic = null;
        } else {
            this._roic = roic;
        }
        
        if (workingAssets === null || workingAssets === undefined || typeof(workingAssets) !== 'number') {
            this._workingAssets = null;
        } else {
            this._workingAssets = workingAssets;
        }
    }

    static create(roe: any, roa: any, roic: any, workingAssets: any) {
        return new ProfitabilityIndicators(roe, roa, roic, workingAssets);
    }

    get roe() {
        return this._roe
    }

    get roa() {
        return this._roa
    }

    get roic() {
        return this._roic
    }

    get workingAssets() {
        return this._workingAssets
    }
}