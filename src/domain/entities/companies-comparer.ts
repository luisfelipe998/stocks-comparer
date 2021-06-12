import { Ticker } from "../value-objects/index.js";
import { Company } from "./index.js";

export type CompaniesComparison = {
    selectedCompany: Company,
    averageStatsCompany: Company
}

export class CompaniesComparer {

    private _selectedCompanyTicker: Ticker;
    private _companiesToCompare: Company[];


    constructor(selectedCompanyTicker: Ticker, companiesToCompare: Company[]) {
        this._selectedCompanyTicker = selectedCompanyTicker;
        this._companiesToCompare = companiesToCompare;
    }

    public isSelectedCompanyOnCompaniesToCompareList(): boolean {
        return this._companiesToCompare.find(company => company.ticker.value === this._selectedCompanyTicker.value) ? true : false;
    }

    public makeComparisonBetweenSelectedCompanyAndOthers(): CompaniesComparison {
        if(!this.isSelectedCompanyOnCompaniesToCompareList()) {
            throw new Error('Company selected not on list');
        }

        const selectedCompany = this._companiesToCompare
                .find(company => company.ticker.value === this._selectedCompanyTicker.value) as Company;
    
        const averageStatsCompany = this._companiesToCompare[1];

        console.log(selectedCompany)
        console.log(averageStatsCompany)
        return {
            selectedCompany,
            averageStatsCompany
        }
    }
}