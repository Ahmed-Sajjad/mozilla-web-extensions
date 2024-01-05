
const ElementIds = {
    COMPANY: "company",
    TABLE_NAME: "tableName",
    THEME_TOGGLE: "theme-toggle",
    SUBMIT_BUTTON: "submit-btn"
}

const Regex = {
    URL: new RegExp(/^http(s)?:\/\/.+\.com/gm),
    BUSINESS_CENTRAL: new RegExp(/^http(s)?:\/\/businesscentral.+\.com\/.+\?/gm),
    FINOPS: new RegExp(/^http(s)?:\/\/(?!businesscentral).+\.dynamics\.com/gm),
    QUERY_PARAMS: new RegExp(/.*\?(.*)/gm)
}

const BusinessCentral = {
    URL_TEMPLATE: "{{bcUrl}}company={{company}}&table={{tableId}}",
    Keywords: {
        BC_URL: "{{bcUrl}}",
        COMPANY: "{{company}}",
        TABLE_ID: "{{tableId}}"
    }
}

const FinanceAndOperations = {
    URL_TEMPLATE: "{{finopsUrl}}/?cmp={{company}}&mi=SysTableBrowser&tableName={{tableName}}",
    Keywords: {
        FINOPS_URL: "{{finopsUrl}}",
        COMPANY: "{{company}}",
        TABLE_NAME: "{{tableName}}"
    }
}

