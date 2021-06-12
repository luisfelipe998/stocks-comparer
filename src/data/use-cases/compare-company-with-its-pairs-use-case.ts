import { CompaniesComparer } from "../../domain/entities/index.js";
import { Sector, Segment, SubSector, Ticker } from "../../domain/value-objects/index.js";
import { ICompareCompanyWithItsPairsWebScrapper } from "../ports/compare-company-with-its-pairs-use-case/index.js";

export class CompareCompanyWithItsPairsUseCase {
    constructor(private webScrapper: ICompareCompanyWithItsPairsWebScrapper) {

    }

    async run(companyTickerToCompare1: any, sector1?: any, subSector1?: any, segment1?: any) {
        const companyTickerToCompare = Ticker.create(companyTickerToCompare1);
        const sector = Sector.create(sector1);
        const subSector = SubSector.create(subSector1);
        const segment = Segment.create(segment1);

        const companies = await this.webScrapper.getAllCompanies({ sector, subSector, segment });
        const companiesComparer = new CompaniesComparer(companyTickerToCompare, companies);

        if (!companiesComparer.isSelectedCompanyOnCompaniesToCompareList()) {
            return "Comparison failure"
        } 

        return companiesComparer.makeComparisonBetweenSelectedCompanyAndOthers();
        
    }
}