import prompts from 'prompts';
import { sectorChoices, subsectorChoices } from './index.js';

export async function askQuestions() {
    const tickerQuestion = {
        type: 'list',
        name: 'value',
        message: 'Digite os tickers',
        initial: '',
        separator: ','
    }
    const tickers = await prompts(tickerQuestion);

    const sectorQuestion = {
        type: 'select',
        name: 'value',
        message: 'Escolha um setor',
        choices: sectorChoices,
        initial: 0
    }
    const sectorId = await prompts(sectorQuestion);

    const subsectorQuestion = {
        type: 'select',
        name: 'value',
        message: 'Escolha um subsetor',
        choices: subsectorChoices[sectorId.value],
        initial: 0
    }
    const subSectorId = await prompts(subsectorQuestion);

    const sanitizeConfirmQuestion = {
        type: 'confirm',
        name: 'value',
        message: 'Remover empresas com prejuizo, com valor patrimonial negativo, com PL maior que 300 e com valor patrimonial maior que 20?',
        initial: true
      }
    const sanitizeConfirm = await prompts(sanitizeConfirmQuestion);

    const minLiquidityConfirmQuestion = {
        type: 'confirm',
        name: 'value',
        message: 'Remover empresas com liquidez diária média menor que 500k?',
        initial: true
      }
    const minLiquidityConfirm = await prompts(minLiquidityConfirmQuestion);

    return {
        selectedCompanyTickers: tickers.value,
        sector: sectorId.value,
        subSector: subSectorId.value,
        segment: "",
        minPriceOverEarnings: sanitizeConfirm.value ? 0.01 : null,
        maxPriceOverEarnings: sanitizeConfirm.value ? 300 : null,
        minPriceOverNetPatromony: sanitizeConfirm.value ? 0.01 : null,
        maxPriceOverNetPatromony: sanitizeConfirm.value ? 20 : null,
        minDailyAvgLiquidity: minLiquidityConfirm.value ? 500000 : null
    }
}

