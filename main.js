function searchText() {
    const userText = document.getElementById('textInput').value;
    
    if (!userText) {
        document.getElementById('results').innerHTML = '<p class="no-data">Please type some text first.</p>';
        return;
    }

    const searchPatterns = {
        emails: /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}/g,
        phones: /\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}/g,
        websites: /https?:\/\/[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}[\/\w\-._~:?#[\]@!$&'()*+,;=%]*/g,
        money: /\$\d{1,3}(,\d{3})*(\.\d{2})?/g
    };

    let foundData = {};
    let totalItems = 0;

    for (let dataType in searchPatterns) {
        const results = userText.match(searchPatterns[dataType]) || [];
        if (results.length > 0) {
            foundData[dataType] = results;
            totalItems += results.length;
        }
    }

    displayResults(foundData, totalItems);
}

function displayResults(data, count) {
    const resultsDiv = document.getElementById('results');
    
    if (count === 0) {
        resultsDiv.innerHTML = '<div class="found-data"><h3>No data found</h3></div>';
        return;
    }

    let output = `<div class="summary"><h3>Found ${count} items</h3></div>`;
    
    for (let type in data) {
        const typeName = getDataTypeName(type);
        
        output += `<div class="data-type">
                      <h4>${typeName} (${data[type].length})</h4>
                      <ul>`;
        
        data[type].forEach(item => {
            output += `<li>${item}</li>`;
        });
        
        output += `</ul></div>`;
    }
    
    resultsDiv.innerHTML = output;
}

function getDataTypeName(type) {
    const typeNames = {
        emails: 'Email Addresses',
        phones: 'Phone Numbers',
        websites: 'URLs',
        money: 'Currency amount',
    };
    return typeNames[type];
}
function clearTextBox() {
    document.getElementById('textInput').value = '';
    document.getElementById('results').innerHTML = '';
}