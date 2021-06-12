
export class MarketIndicators {

    private _averageDailyLiquidity: any;
    private _marketValue: any;

    private constructor(averageDailyLiquidity: any, marketValue: any) {
        if (averageDailyLiquidity === null || averageDailyLiquidity === undefined || typeof(averageDailyLiquidity) !== 'number') {
            this._averageDailyLiquidity = null;
        } else {
            this._averageDailyLiquidity = averageDailyLiquidity;
        }

        if (marketValue === null || marketValue === undefined || typeof(marketValue) !== 'number') {
            this._marketValue = null;
        } else {
            this._marketValue = marketValue;
        }
    }

    static create(averageDailyLiquidity: any, marketValue: any) {
        return new MarketIndicators(averageDailyLiquidity, marketValue);
    }

    get averageDailyLiquidity() {
        return this._averageDailyLiquidity
    }

    get marketValue() {
        return this._marketValue
    }
}