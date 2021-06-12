
export class ValuationIndicators {

    private _dividendYield: any;
    private _priceOverEarnings: any;
    private _priceOverNetPatrimony: any;
    private _priceOverAssets: any

    private constructor(dividendYield: any, priceOverEarnings: any, priceOverNetPatrimony: any, priceOverAssets: any) {
        if (dividendYield === null || dividendYield === undefined || typeof(dividendYield) !== 'number') {
            this._dividendYield = null;
        } else {
            this._dividendYield = dividendYield;
        }

        if (priceOverEarnings === null || priceOverEarnings === undefined || typeof(priceOverEarnings) !== 'number') {
            this._priceOverEarnings = null;
        } else {
            this._priceOverEarnings = priceOverEarnings;
        }

        if (priceOverNetPatrimony === null || priceOverNetPatrimony === undefined || typeof(priceOverNetPatrimony) !== 'number') {
            this._priceOverNetPatrimony = null;
        } else {
            this._priceOverNetPatrimony = priceOverNetPatrimony;
        }

        if (priceOverAssets === null || priceOverAssets === undefined || typeof(priceOverAssets) !== 'number') {
            this._priceOverAssets = null;
        } else {
            this._priceOverAssets = priceOverAssets;
        }
    }

    static create(dividendYield: any, priceOverEarnings: any, priceOverNetPatrimony: any, priceOverAssets: any) {
        return new ValuationIndicators(dividendYield, priceOverEarnings, priceOverNetPatrimony, priceOverAssets);
    }

    get dividendYield() {
        return this._dividendYield
    }

    get priceOverEarnings() {
        return this._priceOverEarnings
    }

    get priceOverNetPatrimony() {
        return this._priceOverNetPatrimony
    }

    get priceOverAssets() {
        return this._priceOverAssets
    }
}