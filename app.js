
// search
$(searchCountry =  () => {
    $("#searchBtn").on('click', async() => {
        const searchString = $("#searchInp").val().toLowerCase()
        const results = await $.ajax({url: `https://restcountries.com/v3.1/name/${searchString}`})
        calcSum(results)
        createTable1(results)
        createTable2(results)
        createTable3(results)
    })
})

// calculate sum + average
const calcSum = (listOfObj) => {
    let sum = 0
    for(let i in listOfObj){
        sum += listOfObj[i].population
    }
    $("#totalCountries").html(numberWithCommas(listOfObj.length))
    $("#totalPop").html(numberWithCommas(sum))
    $("#avgPop").html(numberWithCommas((sum/listOfObj.length).toFixed(0)))
}

// create table1
const createTable1 = (listOfObj) => {
    $("#table1").empty()
    $("#table1").append(`<tr><th>Country Name</th><th>Number of citizens</th><th>Flag</th><th>area(Sq.Km.)</th></tr>`)
    for(let i in listOfObj){
        $("#table1").append(`<tr><td>${listOfObj[i].name.common}</td><td>${numberWithCommas(listOfObj[i].population)}</td><td><img src=${listOfObj[i].flags.png}></td><td>${numberWithCommas(listOfObj[i].area)}</td></tr>`)
    }
}

// create table2
const createTable2 = (listOfObj) => {
    $("#table2").empty()
    $("#table2").append(`<tr><th>Region</th><th>Number of countries</th></tr>`)
    let regions = []
    for(let i in listOfObj){
        regions.push(listOfObj[i].region)
    }
    const countOccurrences = arr => arr.reduce((prev,curr) => (prev[curr] = ++prev[curr] || 1,prev),{})
    const regionsObj = countOccurrences(regions)
    for(let prop in regionsObj){
        $("#table2").append(`<tr><td>${prop}</td><td>${numberWithCommas(regionsObj[prop])}</td></tr>`)
    }
}

// create table 3
const createTable3 = (listOfObj) => {
    $("#table3").empty()
    $("#table3").append(`<tr><th>Currency Symbol</th><th>Number of countries</th></tr>`)
    let currencies = []
    for(let i in listOfObj){
        for(let prop in listOfObj[i].currencies){
            currencies.push(prop)
        }
    }
    const countOccurrences = arr => arr.reduce((prev,curr) => (prev[curr] = ++prev[curr] || 1,prev),{})
    const currenciesObj = countOccurrences(currencies)
    for(let prop in currenciesObj){
        $("#table3").append(`<tr><td>${prop}</td><td>${numberWithCommas(currenciesObj[prop])}</td></tr>`)
    }
}
// add commas to  numbers
function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


