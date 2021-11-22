process.env.FILMS_API_KEY;
import { EnvData } from "../constants/envData";
import { FilmModel } from '../../models/filmModel';

export class FilmsService {

    static #DefaultSearchValue = 'Marvel';

    static #Urls = {
        Main: (searchByName = FilmsService.#DefaultSearchValue) => `https://www.omdbapi.com/?s=${searchByName}&apiKey=${EnvData.FilmsApiKey}`,
        FilmById: (filmId) => `https://www.omdbapi.com/?i=${filmId}&apiKey=${EnvData.FilmsApiKey}`,
    }

    async getFilms() {
        try {
            const response = await fetch(FilmsService.#Urls.Main());
            const data = await response.json();
            const filmModels = data.Search.map((filmData) => {
                return new FilmModel({
                    Poster: filmData.Poster,
                    Title: filmData.Title,
                    Year: filmData.Year,
                    imdbId: filmData.imdbId,
                });
            });
            console.log(filmModels);
            return filmModels;
        }
        catch (error) {
            return {
                error: error.message,
            }
        }
    }
}
