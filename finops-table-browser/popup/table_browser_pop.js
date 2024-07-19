
let body = document.getElementsByTagName("body")[0];
let company = document.getElementById(ElementIds.COMPANY);
let tableName = document.getElementById(ElementIds.TABLE_NAME);

//#region    Event handlers

//#region   On Document Ready
document.onreadystatechange = onDocumentReady
/**
 * Function that performs operations when the document is ready 
 */
function onDocumentReady() {
    if (document.readyState === "complete") {
        if (isDark()) {
            document.getElementById(ElementIds.THEME_TOGGLE).click();
        }

        getCurrentTab(function(t) {
            var url = t[0].url;
            var queryParams = getQueryParams(url);

            company.value = queryParams["cmp"]
                ?? queryParams["company"]
                ?? "";
        });
    }
}
//#endregion   On Document Ready

//#region   Handle Submit
document.getElementById(ElementIds.SUBMIT_BUTTON)
    .addEventListener("click", handleSubmit);
/**
 * Handles the submit button event
 * @param {Event} event 
 */
function handleSubmit(event) {
    getCurrentTab(function (t) { 
        createTableBrowserTab(t[0].url);
    });
}
//#endregion   Handle Submit

//#region   Toggle Theme
document.getElementById(ElementIds.THEME_TOGGLE)
    .addEventListener("change", toggleTheme);
/**
 * Toggles the theme from light to dark or vice versa
 * @param {Event} event 
 */
function toggleTheme(event) {
    setDarkMode(event.target.checked);
}
//#endregion   Toggle Theme

//#endregion Event handlers

//#region    Functions

/**
 * Checks the URL and decide 
 * @param {string} dynamicsUrl The URL of the Dynamics ERP site
 * @returns 
 */
function createTableBrowserTab(dynamicsUrl) {
    const bcUrl = dynamicsUrl.match(Regex.BUSINESS_CENTRAL);

    const finopsUrl = dynamicsUrl.match(Regex.FINOPS);

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

    let keywords = FinanceAndOperations.Keywords;

    const companyValue = company.value;
    const tableNameValue = tableName.value;

    if (!finopsUrl || !companyValue || !tableNameValue) {
        return;
    }

    urlTemplate = FinanceAndOperations.URL_TEMPLATE
        .replace(keywords.FINOPS_URL, finopsUrl)
        .replace(keywords.COMPANY, companyValue)
        .replace(keywords.TABLE_NAME, tableNameValue);

    openUrlInNewTab(urlTemplate);
}

/**
 * Generates the url for the table browser based on the company and table id
 * @param {*} bcUrl The URL of the Business Central site
 * @returns 
 */
function createTableBrowserTabBC(bcUrl) {

    let keywords = BusinessCentral.Keywords;

    const companyValue = company.value;
    const tableNameValue = tableName.value;

    if (!bcUrl || !companyValue || !tableNameValue) {
        return;
    }

    urlTemplate = BusinessCentral.URL_TEMPLATE
        .replace(keywords.BC_URL, bcUrl)
        .replace(keywords.COMPANY, companyValue)
        .replace(keywords.TABLE_ID, tableNameValue);

    openUrlInNewTab(urlTemplate);
}

//#endregion Functions
