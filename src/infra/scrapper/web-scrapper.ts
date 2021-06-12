import request from "request-promise-native";
import { CompanyFilters, ICompareCompanyWithItsPairsWebScrapper } from "../../data/ports/compare-company-with-its-pairs-use-case/index.js";
import { Company } from "../../domain/entities/index.js";
import { DebtIndicators, EfficiencyIndicators, GrowthIndicators, MarketIndicators, ProfitabilityIndicators, Ticker, ValuationIndicators } from "../../domain/value-objects/index.js";

export class WebScrapper implements ICompareCompanyWithItsPairsWebScrapper {

    public async getAllCompanies(filters: CompanyFilters): Promise<Company[]> {
        const rawResponse = await request.get(`https://statusinvest.com.br/category/advancedsearchresult?search=%7B%22Sector%22%3A%22${filters.sector.value}%22%2C%22SubSector%22%3A%22${filters.subSector.value}%22%2C%22Segment%22%3A%22${filters.segment.value}%22%2C%22my_range%22%3A%220%3B25%22%2C%22dy%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_L%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22peg_Ratio%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_VP%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_Ativo%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22margemBruta%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22margemEbit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22margemLiquida%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_Ebit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22eV_Ebit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22dividaLiquidaEbit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22dividaliquidaPatrimonioLiquido%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_SR%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_CapitalGiro%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_AtivoCirculante%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22roe%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22roic%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22roa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22liquidezCorrente%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22pl_Ativo%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22passivo_Ativo%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22giroAtivos%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22receitas_Cagr5%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22lucros_Cagr5%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22liquidezMediaDiaria%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22vpa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22lpa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22valorMercado%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%7D&CategoryType=1`);
        const companies = JSON.parse(rawResponse);
        return companies.map((company: any) => new Company(
            company.companyName, 
            Ticker.create(company.ticker),
            ValuationIndicators.create(
                company.dy,
                company.p_L,
                company.p_VP,
                company.p_Ativo
            ),
            DebtIndicators.create(
                company.dividaLiquidaEbit,
                company.dividaliquidaPatrimonioLiquido,
                company.pl_Ativo,
                company.passivo_Ativo,
                company.liquidezCorrente
            ),
            EfficiencyIndicators.create(
                company.margemBruta, 
                company.margemEbit, 
                company.margemLiquida
            ),
            ProfitabilityIndicators.create(
                company.roe,
                company.roa,
                company.roic,
                company.giroAtivos
            ),
            GrowthIndicators.create(
                company.receitas_Cagr5,
                company.lucros_Cagr5
            ),
            MarketIndicators.create(
                company.liquidezMediaDiaria,
                company.valorMercado
            )
        ));
    }
}