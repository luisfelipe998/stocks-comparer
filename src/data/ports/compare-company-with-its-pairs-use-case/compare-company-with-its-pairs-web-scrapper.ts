import { Sector, Segment, SubSector } from "../../../domain/value-objects/index.js";

export interface ICompareCompanyWithItsPairsWebScrapper {
    getAllCompanies(filters: CompanyFilters): Promise<any[]>
}

export type CompanyFilters = {
    sector: Sector
    subSector: SubSector
    segment: Segment
}