
window.addEventListener('load', async (event) => {
    const rawResponse = await fetch('http://localhost:3000/backend/sectors');
    const sectors = await rawResponse.json();
    const sectorSelect = document.getElementById('sectorSelect');
    sectors.forEach(sector => {
        sectorSelect.innerHTML += `<option value=${sector.value}>${sector.title}</option>`
    }); 
});

document.getElementById('sectorSelect').addEventListener('click', async (event) => {
    event.preventDefault();
    const rawResponse = await fetch('http://localhost:3000/backend/subsectors');
    const subsectors = await rawResponse.json();

    const sectorSelectValue = document.getElementById('sectorSelect').value;
    const subsectorSelect = document.getElementById('subsectorSelect');
    subsectorSelect.innerHTML = '<option value="" selected>Choose a subsector...</option>';
    subsectors[sectorSelectValue].forEach(subsector => {
        subsectorSelect.innerHTML += `<option value=${subsector.value}>${subsector.title}</option>`
    });
});


document.getElementById('searchButton').addEventListener('click', async (event) => {
    event.preventDefault();

    const tickersInput = document.getElementById('tickersInput').value;
    const sectorInput = document.getElementById('sectorSelect').value;
    const subsectorInput = document.getElementById('subsectorSelect').value;
    const segmentInput = document.getElementById('segmentSelect').value;
    const negativePlFlagInput = document.getElementById('negativePlCheck').checked;
    const highPlFlagInput = document.getElementById('highPlCheck').checked;
    const liquidityFlagInput = document.getElementById('liquidityCheck').checked;

    const options = {
        selectedCompanyTickers: tickersInput.split(',').map(ticker => ticker.trim().toUpperCase()),
        sector: sectorInput,
        subSector: subsectorInput,
        segment: segmentInput,
        minPriceOverEarnings: negativePlFlagInput ? 0.01 : null,
        maxPriceOverEarnings: highPlFlagInput ? 300 : null,
        minPriceOverNetPatromony: negativePlFlagInput ? 0.01 : null,
        maxPriceOverNetPatromony: highPlFlagInput ? 20 : null,
        minDailyAvgLiquidity: liquidityFlagInput ? 500000 : null
    }

    const rawResponse = await fetch('http://localhost:3000/backend/comparison', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(options)
    });
    const { comparisons, companiesInfo, error } = await rawResponse.json();

    const comparisonContainer = document.getElementById('comparisonContainer');
    if (comparisonContainer) {
        document.getElementById('mainContainer').removeChild(comparisonContainer);
    }

    if (error) {
        const div = document.createElement('div');
        div.className = 'container';
        div.style = "padding: 10px; margin-top: 30px; border-radius: 20px; border: 2px solid; border-color: #ccc;";
        div.id = 'comparisonContainer';
        div.innerHTML = `<span>${error}</span>`
        document.getElementById('mainContainer').appendChild(div);
        return;
    }

    const div = document.createElement('div');
    div.className = 'container';
    div.style = "padding: 10px; margin-top: 30px; border-radius: 20px; border: 2px solid; border-color: #ccc;";
    div.id = 'comparisonContainer';
    div.innerHTML = `
        <h5>Comparison (${companiesInfo.length} companies considered)</h5>
        <table class="table table-striped">
            <thead>
            <tr>
                <th style="position: sticky; top: 0; background: #CCC" scope="col">Indicator</th>
                ${Object.entries(Object.entries(comparisons)[0][1]).map(([key]) => (`<th style="position: sticky; top: 0; background: #CCC" scope="col">${key}</th>`))}
            </tr>
            </thead>
            <tbody>
            ${Object.entries(comparisons).map(([comparisonKey]) => (`
                <tr>
                    <th scope="row">${comparisonKey}</th>
                    ${Object.entries(comparisons[comparisonKey]).map(([_, value]) => (`<td>${value ? value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","): '-'}</td>`))}
                </tr>
            `))}
            </tbody>
        </table>
        <br></br>
        <h5>Companies considered</h5>
        <table class="table table-striped">
            <thead>
            <tr>
                <th scope="col">#</th>
                <th scope="col">Ticker</th>
                <th scope="col">Company</th>
            </tr>
            </thead>
            <tbody>
            ${companiesInfo.map((companyInfo, index) => (`
                <tr>
                    <th scope="row">${index + 1}</th>
                    <td>${companyInfo.ticker}</td>
                    <td>${companyInfo.name}</td>
                </tr>
            `))}
            </tbody>
        </table>
    `;

    document.getElementById('mainContainer').appendChild(div);
})