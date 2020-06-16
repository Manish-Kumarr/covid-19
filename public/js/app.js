const form = document.querySelector('form')
const locn = document.querySelector('input')
const country = document.querySelector('#country')
const confirmed = document.querySelector('#confirmed')
const recovered = document.querySelector('#recovered')
const deaths = document.querySelector('#deaths')
const tests = document.querySelector('#tests')
const population = document.querySelector('#population')
const formatter = new Intl.NumberFormat('en')

function isEmpty(obj) {
    for (var key in obj) {
        if (obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

fetch('/covid').then((response) => {
    response.json().then((data) => {
        if (data.conn) {
            // return console.log(data)
            const error = data.conn
            country.textContent = error
        }
        const arrLen = (data.data.response).length
        console.log(data.data.response)
    })
})

form.addEventListener('submit', (e) => {
    e.preventDefault()
    const loc = locn.value

    const fun = () => {
        const error = "Please Enter Location"
        // console.log({ error: error })
        country.textContent = error
        confirmed.textContent = ''
        recovered.textContent = ''
        deaths.textContent = ''
        tests.textContent = ''
        population.textContent = ''
    }

    if (loc === '') {
        return fun()
    } else {
        fetch('/covid?qs=country:' + loc).then((response) => {
            response.json().then((data) => {

                const d = (data.data.response[0])
                const e = (data.err)

                if (!isEmpty(e)) {
                    country.textContent = e.error
                    confirmed.textContent = ''
                    recovered.textContent = ''
                    deaths.textContent = ''
                    tests.textContent = ''
                    population.textContent = ''
                } else {
                    const coun = data.data.response[0].country
                    const tCases = (data.data.response[0].cases.total)
                    const rec = (data.data.response[0].cases.recovered)
                    const dea = (data.data.response[0].deaths.total)
                    const tTest = (data.data.response[0].tests.total)
                    const pop = (data.data.response[0].population)

                    country.textContent = "Country : " + coun
                    confirmed.textContent = "Total : " + formatter.format(tCases)
                    recovered.textContent = "Recovered : " + formatter.format(rec)
                    deaths.textContent = "Deaths : " + formatter.format(dea)
                    tests.textContent = "Tests : " + formatter.format(tTest)
                    population.textContent = "Population : " + formatter.format(pop)
                }
            })
        })
    }
})