
const urlRegex = new RegExp(/^http(s)?:\/\/.+\.com/gm);
const queryParamsRegex = new RegExp(/.*\?(.*)/gm);

document.onreadystatechange = function() {

    function getQueryParams(url) {
        const queryString = queryParamsRegex.exec(url)[1];

        return queryString.split('&').reduce((acc, exp) => {
            [key, value] = exp.split('=');
            acc[key] = value;
            return acc;
        }, {});
    }

    if (document.readyState === "complete") {
        browser.tabs.query({currentWindow: true,active: true}).then((t) => {
            var url = t[0].url;
            var queryParams = getQueryParams(url);
            console.log(queryParams);

            const currentCompany = queryParams["cmp"];

            const company = document.getElementById("company");

            company.value = currentCompany ?? "";

        });
    }
}

document.getElementById("submit-btn").addEventListener("click", function(e) {
    
    function createTableBrowserTab(dynamicsUrl) {
        const finopsUrl = dynamicsUrl.match(urlRegex)[0];
        const company = document.getElementById("company").value;
        const tableName = document.getElementById("tableName").value;
    
        console.log(finopsUrl);
        console.log(company);
        console.log(tableName);
    
        if (!finopsUrl || !company || !tableName) {
            return;
        }
    
        var urlTemplate = "{{finopsUrl}}/?cmp={{company}}&mi=SysTableBrowser&tableName={{tableName}}";
    
        urlTemplate = urlTemplate.replace("{{finopsUrl}}", finopsUrl)
                                 .replace("{{company}}", company)
                                 .replace("{{tableName}}", tableName);
    
        console.log(urlTemplate);
    
        browser.tabs.create({
            url: urlTemplate
        });
    }

    browser.tabs.query({currentWindow: true, active: true}).then((t) => {
        createTableBrowserTab(t[0].url);
    });
});