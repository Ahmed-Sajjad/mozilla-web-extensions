
const urlRegex = new RegExp(/^http(s)?:\/\/.+\.com/gm);
const queryParamsRegex = new RegExp(/.*\?(.*)/gm);

let body      = document.getElementsByTagName("body")[0];
let company   = document.getElementById("company");
let tableName = document.getElementById("tableName");

//#region    Event handlers
document.onreadystatechange = onDocumentReady

document.getElementById("submit-btn").addEventListener("click", handleSubmit);

document.getElementById("theme-toggle").addEventListener("change", toggleTheme);
//#endregion Event handlers

//#region    Functions
/**
 * Generates the url for the table browser based on the company and table name
 * @param {string} dynamicsUrl The URL of the Finance and Operations (D365) site
 * @returns 
 */
 function createTableBrowserTab(dynamicsUrl) {
    const finopsUrl         = dynamicsUrl.match(urlRegex)[0];
    const companyValue      = company.value;
    const tableNameValue    = tableName.value;

    if (!finopsUrl || !company || !tableName) return;

    var urlTemplate = "{{finopsUrl}}/?cmp={{company}}&mi=SysTableBrowser&tableName={{tableName}}";

    urlTemplate = urlTemplate.replace("{{finopsUrl}}", finopsUrl)
                             .replace("{{company}}", companyValue)
                             .replace("{{tableName}}", tableNameValue);

    browser.tabs.create({ url: urlTemplate });
}

/**
 * Extracts the query params from the provided url
 * @param {string} url 
 * @returns 
 */
function getQueryParams(url) {
    const queryString = queryParamsRegex.exec(url)[1];

    return queryString.split('&').reduce((acc, exp) => {
        [key, value] = exp.split('=');
        acc[key] = value;
        return acc;
    }, {});
}

/**
 * Handles the submit button event
 * @param {Event} event 
 */
function handleSubmit(event) {
    browser.tabs.query({ currentWindow: true, active: true })
                .then((t) => createTableBrowserTab(t[0].url));
}

/**
 * Function that performs operations when the document is ready 
 */
 function onDocumentReady() {
    if (document.readyState === "complete")
    {
        browser.tabs.query({ currentWindow: true,active: true }).then((t) => {
            var url = t[0].url;
            var queryParams = getQueryParams(url);

            const currentCompany = queryParams["cmp"];

            company.value = currentCompany ?? "";
        });
    }
}

/**
 * Toggles the theme from light to dark or vice versa
 * @param {Event} event 
 */
function toggleTheme(event) {
    let isDark = event.target.checked; 
    
    isDark ? body.setAttribute("data-theme", "dark") : body.removeAttribute("data-theme");
}
//#endregion Functions
