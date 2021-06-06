
const urlRegex = new RegExp(/^http(s)?:\/\/.+\.com/gm);

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