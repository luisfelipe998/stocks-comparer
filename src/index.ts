import { CompareCompanyWithItsPairsUseCase } from "./data/use-cases/index.js";
import { WebScrapper } from "./infra/scrapper/index.js";



async function main() {
    const scrapper = new WebScrapper();
    const obj = new CompareCompanyWithItsPairsUseCase(scrapper);

    const comparison = await obj.run("GRND3", "2", "13", null);

    console.log(comparison)
}

main()


