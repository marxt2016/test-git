import { Routes } from '../core/constants/routes';
export class FilmsController {
    #service
    #router
    #allFilms
    #favouriteFilms

    constructor(router, service) {
        this.#router = router;
        this.#service = service;
        this.#allFilms = [];
        this.#favouriteFilms = [];

    }

    async getViewParams(routeName) {
        let paramsForRender = [];
        this.#allFilms = await this.#service.getFilms();
        if (routeName === Routes.Main) {
            paramsForRender = [this.#allFilms];
        } else if (routeName === Routes.Favourites) {
            this.#favouriteFilms = await this.#service.getFavouriteFilms();
            paramsForRender = [this.#favouriteFilms];
        } else if (routeName === Routes.Film) {
            paramsForRender = [];
        }
        return paramsForRender;
    }

    async handleFavouriteButtonClick(isFavourite, filmId) {
        if (isFavourite) {
            await this.#service.removeFilmFromFavourites(this.#allFilms, this.#favouriteFilms, filmId);
        } else {
            await this.#service.addFilmToFavourites(this.#allFilms, this.#favouriteFilms, filmId);
        }
        this.#favouriteFilms = await this.#service.getFavouriteFilms();

    }

    async init() {
        this.#router.init();
    }
}