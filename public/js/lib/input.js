var searchKeywords = ''
var zipCode

const updateKeywords = (keywords) => searchKeywords = keywords
const getKeywords = () => searchKeywords

const updateZipCode = (newZipCode) => zipCode = newZipCode
const getZipCode = () => zipCode

export {
    updateKeywords,
    updateZipCode,
    getKeywords,
    getZipCode
}
