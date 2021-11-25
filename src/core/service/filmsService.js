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
    static #converFilmModelToFilm(filmModels = []) {
        return filmModels.map((filmModel) => {
            return {
                Poster: filmModel.getPoster(),
                Title: filmModel.getTitle(),
                Year: filmModel.getYear(),
                imdbID: filmModel.getId(),
                isFavourite: filmModel.getIsFavourite(),
            };
        })
    }

    static #converFilmToFilmModel(films) {
        return films.map((filmData) => {
            return new FilmModel({
                Poster: filmData.Poster,
                Title: filmData.Title,
                Year: filmData.Year,
                imdbID: filmData.imdbID,
                isFavourite: !!filmData.isFavourite,
            });
        });
    }

    #storage
    constructor() {
        this.#storage = window.localStorage;
    }

    async getFilms() {
        try {
            const response = await fetch(FilmsService.#Urls.Main());
            const data = await response.json();
            const filmModels = FilmsService.#converFilmToFilmModel(data.Search);
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
            resolve(FilmsService.#converFilmToFilmModel(favFilms));
        });
    };

    saveFilms(favourites = []) {
        return new Promise((resolve) => {
            const convertedFavourites = FilmsService.#converFilmModelToFilm(favourites);
            const stringifyFavFilms = JSON.stringify(convertedFavourites);
            this.#storage.setItem('Favourites', stringifyFavFilms);
            resolve();
        });
    };

    async addFilmToFavourites(allFilms, favourites, filmId) {
        const targetFilm = allFilms.find((filmModel) => filmModel.getId() === filmId);
        if (targetFilm) {
            targetFilm.setIsFavourite(true);
            const finalFavouritesFilms = [...favourites, targetFilm];
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
