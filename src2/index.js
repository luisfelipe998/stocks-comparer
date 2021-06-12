import { askQuestions } from './choices/index.js';
import { getCompaniesStatsAndAvgStatsComparison } from './api/index.js';


async function main() {
    const options = await askQuestions();
    const comparisons = await getCompaniesStatsAndAvgStatsComparison(options);
}


main()
