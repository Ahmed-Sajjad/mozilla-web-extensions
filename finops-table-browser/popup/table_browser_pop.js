document.getElementById("submit-btn").addEventListener("click", function(e) {
    
    browser.tabs.query({currentWindow: true, active: true}).then((t) => {
        const finopsUrl = t[0].url;
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
    });
});