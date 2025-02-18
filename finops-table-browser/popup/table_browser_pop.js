
const urlRegex = new RegExp(/^http(s)?:\/\/.+\.com/gm);
const queryParamsRegex = new RegExp(/.*\?(.*)/gm);

let body = document.getElementsByTagName("body")[0];
let visitedPages = [];

document.onreadystatechange = function () {

    function getQueryParams(url) {
        const queryString = queryParamsRegex.exec(url)[1];

        return queryString.split('&').reduce((acc, exp) => {
            [key, value] = exp.split('=');
            acc[key] = value;
            return acc;
        }, {});
    }

    if (document.readyState === "complete") {
        browser.tabs.query({ currentWindow: true, active: true }).then((t) => {
            var url = t[0].url;
            var queryParams = getQueryParams(url);

            const currentCompany = queryParams["cmp"];

            const company = document.getElementById("company");

            company.value = currentCompany ?? "";

        });
    }
}

document.getElementById("submit-btn").addEventListener("click", function (e) {

    function createTableBrowserTab(dynamicsUrl) {
        const finopsUrl = dynamicsUrl.match(urlRegex)[0];
        const company = document.getElementById("company").value;
        const tableName = document.getElementById("tableName").value;

        if (!finopsUrl || !company || !tableName) {
            return;
        }

        var urlTemplate = "{{finopsUrl}}/?cmp={{company}}&mi=SysTableBrowser&tableName={{tableName}}";

        urlTemplate = urlTemplate.replace("{{finopsUrl}}", finopsUrl)
            .replace("{{company}}", company)
            .replace("{{tableName}}", tableName);

        browser.tabs.create({
            url: urlTemplate
        });
    }

    browser.tabs.query({ currentWindow: true, active: true }).then((t) => {
        createTableBrowserTab(t[0].url);
    });
});

document.getElementById("theme-toggle").addEventListener("change", function (e) {
    let isDark = e.target.checked;
    console.log(isDark);
    isDark ? body.setAttribute("data-theme", "dark") : body.removeAttribute("data-theme");
});

document.getElementById("tableName").addEventListener("keypress", function (event) {

    /// Trigger the click event on enter press  
    if (event.key === 'Enter') {

        if (visitedPages.length > 5) {
            visitedPages.shift();
        }

        visitedPages.push(document.getElementById("tableName").value);
        localStorage.setItem("visitedPages", JSON.stringify(visitedPages));
        updateRecentList();
        document.getElementById("submit-btn").click();
    }
});

document.addEventListener('DOMContentLoaded', function () {
    updateRecentList();   
});

function updateRecentList() {
    const dataList = document.getElementById('tableNames');

    let pages = localStorage.getItem("visitedPages");

    console.log(pages);
    if (pages !== null) {
        visitedPages = JSON.parse(pages);

        dataList.innerHTML = '';

        visitedPages.reverse();
        // Populate datalist with new options
        visitedPages.forEach(function (name) {
            const option = document.createElement('option');
            option.value = name;
            dataList.appendChild(option);
        });
        visitedPages.reverse();
    }
}