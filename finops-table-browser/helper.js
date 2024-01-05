
/**
 * Indicates whether the system theme is dark or not
 * @returns Boolean value. True if dark
 */
function isDark() {
    return window.matchMedia && 
           window.matchMedia('(prefers-color-scheme: dark)')
                 .matches;
}

/**
 * Set or Remove the Dark theme on the popup
 * @param {boolean} isDark Boolean value indicating whether
 *  to turn dark mode on/off
 * @returns 
 */
function setDarkMode(isDark) {
    return isDark 
         ? body.setAttribute("data-theme", "dark") 
         : body.removeAttribute("data-theme");
}

/**
 * Extracts the query params from the provided url
 * @param {string} url 
 * @returns Object containing each query param in 
 * the url and it's value
 */
function getQueryParams(url) {
    const queryString = Regex.QUERY_PARAMS.exec(url)[1];

    return queryString.split('&').reduce((acc, exp) => {
        [key, value] = exp.split('=');
        acc[key] = value;
        return acc;
    }, {});
}