process.env.FILMS_API_KEY;
import { EnvData } from "../constants/envData";
import { FilmModel } from '../../models/filmModel';
//import { StorageKeys } from "../constants/storageKeys";

export class FilmsService {

    static #DefaultSearchValue = 'Marvel';

    static #Urls = {
        Main: (searchByName = FilmsService.#DefaultSearchValue) => `https://www.omdbapi.com/?s=${searchByName}&apiKey=${EnvData.FilmsApiKey}`,
        FilmById: (filmId) => `https://www.omdbapi.com/?i=${filmId}&apiKey=${EnvData.FilmsApiKey}`,
    }

    #storage
    constructor() {
        this.#storage = window.localStorage;
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
            return filmModels;
        }
        catch (error) {
            return {
                error: error.message,
            };
        };
    };

    getFavouriteFilms() {
        return new Promise((resolve) => {
            const localStorageData =
                this.#storage.getItem('Favourites');
            const favFilms = JSON.parse(localStorageData) || [];
            resolve(favFilms);
        });
    };

    saveFilms(favourites = []) {
        return new Promise((resolve) => {
            const stringifyFavFilms = JSON.stringify(favourites);
            this.#storage.setItem('Favourites', stringifyFavFilms);
            resolve();
        });
    };

    async addFilmToFavourites(allFilms, favourites, filmId) {
        const targetFilm = allFilms.find((filmModel) => filmModel.getId() === filmId);
        if (targetFilm) {
            targetFilm.setIsFavourite(true);
            const finalFavouritesFilms = favourites.concat(targetFilm);
            await this.saveFilms(finalFavouritesFilms);
        }
    }
    async removeFilmFromFavourites(allFilms, favourites, filmId) {
        const targetFilm = allFilms.find((filmModel) => filmModel.getId() === filmId);
        if (targetFilm) {
            targetFilm.setIsFavourite(false);
            const finalFavouritesFilms = favourites.filter((filmModel) => filmModel.getId() !== targetFilm.getId());
            await this.saveFilms(finalFavouritesFilms);
        }

    }
}
