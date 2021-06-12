
export class DebtIndicators {

    private _netDebtOverEbit: number | null;
    private _netDebtOverNetPatrimony: number | null;
    private _netPatrimonyOverAssets: number | null;
    private _passivesOverAssets: number | null;
    private _currentLiquidity: number | null;

    private constructor(
            netDebtOverEbit: any, 
            netDebtOverNetPatrimony: any, 
            netPatrimonyOverAssets:any,
            passivesOverAssets: any,
            currentLiquidity: any) {
        if (netDebtOverEbit === null || netDebtOverEbit === undefined || typeof(netDebtOverEbit) !== 'number') {
            this._netDebtOverEbit = null;
        } else {
            this._netDebtOverEbit = netDebtOverEbit;
        }

        if (netDebtOverNetPatrimony === null || netDebtOverNetPatrimony === undefined || typeof(netDebtOverNetPatrimony) !== 'number') {
            this._netDebtOverNetPatrimony = null;
        } else {
            this._netDebtOverNetPatrimony = netDebtOverNetPatrimony;
        }

        if (netPatrimonyOverAssets === null || netPatrimonyOverAssets === undefined || typeof(netPatrimonyOverAssets) !== 'number') {
            this._netPatrimonyOverAssets = null;
        } else {
            this._netPatrimonyOverAssets = netPatrimonyOverAssets;
        }

        if (passivesOverAssets === null || passivesOverAssets === undefined || typeof(passivesOverAssets) !== 'number') {
            this._passivesOverAssets = null;
        } else {
            this._passivesOverAssets = passivesOverAssets;
        }

        if (currentLiquidity === null || currentLiquidity === undefined || typeof(currentLiquidity) !== 'number') {
            this._currentLiquidity = null;
        } else {
            this._currentLiquidity = currentLiquidity;
        }
    }

    static create(        
            netDebtOverEbit: any, 
            netDebtOverNetPatrimony: any, 
            netPatrimonyOverAssets:any,
            passivesOverAssets: any,
            currentLiquidity: any) {
        return new DebtIndicators(
            netDebtOverEbit, 
            netDebtOverNetPatrimony, 
            netPatrimonyOverAssets, 
            passivesOverAssets, 
            currentLiquidity
        );
    }

    get netDebtOverEbit() {
        return this._netDebtOverEbit
    }

    get netDebtOverNetPatrimony() {
        return this._netDebtOverNetPatrimony
    }

    get netPatrimonyOverAssets() {
        return this._netPatrimonyOverAssets
    }

    get passivesOverAssets() {
        return this._passivesOverAssets
    }

    get currentLiquidity() {
        return this._currentLiquidity
    }
}