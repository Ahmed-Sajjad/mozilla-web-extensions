
const urlRegex = new RegExp(/^http(s)?:\/\/.+\.com/gm);

const bcRegex = new RegExp(/^http(s)?:\/\/businesscentral.+\.com\/.+\?/gm);
const finOpsRegex = new RegExp(/^http(s)?:\/\/(?!businesscentral).+\.dynamics\.com/gm);

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
 * Checks the URL and decide 
 * @param {string} dynamicsUrl The URL of the Dynamics ERP site
 * @returns 
 */
 function createTableBrowserTab(dynamicsUrl) {
    const bcUrl = dynamicsUrl.match(bcRegex);

    const finopsUrl = dynamicsUrl.match(finOpsRegex);

    if (finopsUrl !== null && finopsUrl !== undefined) {
        return createTableBrowserTabFinOps(finopsUrl[0]);
    }
    else if (bcUrl !== null && bcUrl !== undefined) {
        return createTableBrowserTabBC(bcUrl[0]);
    }
}

/**
 * Generates the url for the table browser based on the company and table name
 * @param {*} finopsUrl The URL of the Finance and Operations (D365) site
 * @returns 
 */
function createTableBrowserTabFinOps(finopsUrl) {
    //const finopsUrl         = dynamicsUrl.match(urlRegex)[0];
    const companyValue      = company.value;
    const tableNameValue    = tableName.value;

    if (!finopsUrl || !companyValue || !tableNameValue) {
        return;
    }

    var urlTemplate = "{{finopsUrl}}/?cmp={{company}}&mi=SysTableBrowser&tableName={{tableName}}";

    urlTemplate = urlTemplate.replace("{{finopsUrl}}", finopsUrl)
                             .replace("{{company}}", companyValue)
                             .replace("{{tableName}}", tableNameValue);

    browser.tabs.create({ url: urlTemplate });
}

function createTableBrowserTabBC(bcUrl) {
    //const finopsUrl         = dynamicsUrl.match(urlRegex)[0];
    const companyValue      = company.value;
    const tableNameValue    = tableName.value;

    if (!bcUrl || !companyValue || !tableNameValue) {
        return;
    }

    var urlTemplate = "{{bcUrl}}company={{company}}&table={{tableId}}";

    urlTemplate = urlTemplate.replace("{{bcUrl}}", bcUrl)
                             .replace("{{company}}", companyValue)
                             .replace("{{tableId}}", tableNameValue);

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
        // console.log(window.matchMedia);
        // console.log(window.matchMedia('(prefers-color-scheme: dark)'));
        // console.log(window.matchMedia('(prefers-color-scheme: dark)').matches);
        const isDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (isDark) {
            document.getElementById("theme-toggle").click();
        }

        browser.tabs.query({ currentWindow: true,active: true }).then((t) => {
            var url = t[0].url;
            var queryParams = getQueryParams(url);

            company.value = queryParams["cmp"] ?? queryParams["company"] ?? "";
        });
    }
}

/**
 * Toggles the theme from light to dark or vice versa
 * @param {Event} event 
 */
function toggleTheme(event) {
    setDarkMode(event.target.checked);
}

function setDarkMode(isDark) {
    isDark ? body.setAttribute("data-theme", "dark") : body.removeAttribute("data-theme");
}
//#endregion Functions
