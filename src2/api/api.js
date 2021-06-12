import request from "request-promise-native";
import average from 'average';

// const options = {
//     selectedCompanyTickers: [ "GRND3" ],
//     sector: "2",
//     subSector: "13",
//     segment: "",
//     minPriceOverEarnings: 0.01,
//     maxPriceOverEarnings: 150,
//     minPriceOverNetPatromony: 0.01,
//     maxPriceOverNetPatromony: 20
//     minDailyAvgLiquidity: 500000
// }


export async function getCompaniesStatsAndAvgStatsComparison(options) {
    const companies = await getAllCompanies(options);
    const companiesInfo = companies.map(company => ({ ticker: company.ticker, name: company.companyName }));
    const selectedCompaniesStats = getSelectedCompaniesFromAllCompaniesRetrieved(companies, options);
    const stats = sanitizeAndNormalizeStatsFromAllCompanies(companies);
    const comparisons = calculateAverageStatsAndFormatResult(stats, selectedCompaniesStats)

    console.log('------ Resultado:')
    console.log(comparisons);
    return { comparisons, companiesInfo };
}

async function getAllCompanies(options) {
    console.log('------ Filtros aplicados para pesquisa de ações:');
    console.log(options);
    const companies = JSON.parse(await request.get(`https://statusinvest.com.br/category/advancedsearchresult?search=%7B%22Sector%22%3A%22${options.sector}%22%2C%22SubSector%22%3A%22${options.subSector}%22%2C%22Segment%22%3A%22${options.segment}%22%2C%22my_range%22%3A%220%3B25%22%2C%22dy%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_L%22%3A%7B%22Item1%22%3A${options.minPriceOverEarnings}%2C%22Item2%22%3A${options.maxPriceOverEarnings}%7D%2C%22peg_Ratio%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_VP%22%3A%7B%22Item1%22%3A${options.minPriceOverNetPatromony}%2C%22Item2%22%3A${options.maxPriceOverNetPatromony}%7D%2C%22p_Ativo%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22margemBruta%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22margemEbit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22margemLiquida%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_Ebit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22eV_Ebit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22dividaLiquidaEbit%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22dividaliquidaPatrimonioLiquido%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_SR%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_CapitalGiro%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22p_AtivoCirculante%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22roe%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22roic%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22roa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22liquidezCorrente%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22pl_Ativo%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22passivo_Ativo%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22giroAtivos%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22receitas_Cagr5%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22lucros_Cagr5%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22liquidezMediaDiaria%22%3A%7B%22Item1%22%3A${options.minDailyAvgLiquidity}%2C%22Item2%22%3Anull%7D%2C%22vpa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22lpa%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%2C%22valorMercado%22%3A%7B%22Item1%22%3Anull%2C%22Item2%22%3Anull%7D%7D&CategoryType=1`));
    console.log(`------ Companhias encontradas: ${companies.length}`);
    companies.forEach(company => console.log(company.ticker));
    return companies;
}

function getSelectedCompaniesFromAllCompaniesRetrieved(companies, options) {
    return options.selectedCompanyTickers.map(ticker => {
        if (ticker === '') {
            console.log(`------ Nenhuma companhia informada`);
            return { ticker: '(no ticker informed)' }
        }

        const selectedCompanyData = companies.find(company => company.ticker === ticker);
        if (!selectedCompanyData) {
            console.log(`------ Companhia ${ticker} não encontrada no setor/subsetor/segmento`);
            return { ticker: `${ticker} (not found)` }
        }
        return Object.assign({}, selectedCompanyData);
    });
}

function sanitizeAndNormalizeStatsFromAllCompanies(companies) {
    companies.forEach(company => {
        delete company.companyId;
        delete company.companyName;
        delete company.ticker;
    });

    const stats = companies.reduce((previousCompanyStats, company) =>
        Object.entries(company).reduce((previousStats, [statKey]) => 
            ({ ...previousStats, [statKey]: []}), 
            previousCompanyStats), 
        { });
    
    companies.forEach(company => {
        Object.entries(company).forEach(([statKey, statValue]) => {
            stats[statKey].push(statValue);
        });
    });

    return stats;
}

function calculateAverageStatsAndFormatResult(stats, selectedCompaniesStats) {
    return Object.entries(stats).reduce((previousComparisonsStats, [statKey, statValue]) => {
        const individualCompanies = selectedCompaniesStats.reduce((previousCompaniesData, companyData) => ({
            ...previousCompaniesData,
            [companyData.ticker]: round2(companyData[statKey])
        }), { });

        return {
            ...previousComparisonsStats,
            [statKey]: {
                ...individualCompanies,
                avg: round2(average(statValue)) 
            } 
        }
    }, { });
}

function round2(value) {
    return Math.round(value*100)/100;
}