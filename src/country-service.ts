import { matchSorter } from "match-sorter"

export type RawCountry = {
    name: {
        common: string
        official: string
    },
    flag: string
    cca3: string
}
export type Country = {
    name: {
        common: string
        official: string
    },
    flag: string
    code: string
}

async function findCountries(query: string): Promise<Country[]> {
    const raw = await (await fetch("https://restcountries.com/v3.1/all")).json()
    const countries = raw.map((country: RawCountry) => ({
        name: country.name,
        flag: country.flag,
        code: country.cca3
    }))
    return matchSorter(countries, query, { keys: ["name.common", "name.official"] })
}

export default findCountries;