import { Ticker, ValuationIndicators, EfficiencyIndicators, DebtIndicators, GrowthIndicators, ProfitabilityIndicators, MarketIndicators } from "../value-objects/index.js";

export class Company {

    private _name: string;
    private _ticker: Ticker;
    private _valuationIndicators: ValuationIndicators;
    private _debtIndicators: DebtIndicators;
    private _efficiencyIndicators: EfficiencyIndicators;
    private _profitabilityIndicators: ProfitabilityIndicators;
    private _growthIndicators: GrowthIndicators;
    private _marketIndicators: MarketIndicators;

    constructor(
            name: string, 
            ticker: Ticker, 
            valuationIndicators: ValuationIndicators,
            debtIndicators: DebtIndicators,
            efficiencyIndicators: EfficiencyIndicators,
            profitabilityIndicators: ProfitabilityIndicators,
            growthIndicators: GrowthIndicators,
            marketIndicators: MarketIndicators
        ) {
        this._name = name ?? null;
        this._ticker = ticker ?? null;
        this._valuationIndicators = valuationIndicators ?? null;
        this._debtIndicators = debtIndicators ?? null;
        this._efficiencyIndicators = efficiencyIndicators ?? null;
        this._profitabilityIndicators = profitabilityIndicators ?? null;
        this._growthIndicators = growthIndicators ?? null;
        this._marketIndicators = marketIndicators ?? null;
    }

    get name() {
        return this._name
    }

    get ticker() {
        return this._ticker
    }

    get valuationIndicators() {
        return this._valuationIndicators
    }

    get debtIndicators() {
        return this._debtIndicators
    }

    get efficiencyIndicators() {
        return this._efficiencyIndicators
    }

    get profitabilityIndicators() {
        return this._profitabilityIndicators
    }

    get growthIndicators() {
        return this._growthIndicators
    }

    get marketIndicators() {
        return this._marketIndicators
    }
}