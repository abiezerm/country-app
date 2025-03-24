import { Country } from "../types/country.type";
import { RestCountry } from "../types/rest-countries.type";

export class CountryMapper {
    static toCountry(restCountry: RestCountry): Country {
        return {
            capital: restCountry?.capital?.join(', '),
            cca2: restCountry.cca2,
            flag: restCountry.flag,
            flagSvg: restCountry.flags.svg,
            name: restCountry.name.common,
            population: restCountry.population,
            region: restCountry.region,
            subregion: restCountry.subregion,
        };
    }

    static toCountries(restCountries: RestCountry[]): Country[] {
        return restCountries.map(CountryMapper.toCountry);
    }
}
