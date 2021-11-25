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
    getViewParams(routeName) {
        let paramsForRender = [];
        if (routeName === Routes.Main) {
            paramsForRender = [this.#allFilms];
        } else if (routeName === Routes.Favourites) {
            paramsForRender = [this.#favouriteFilms];
        } else if (routeName === Routes.Film) {
            paramsForRender = [];
        }
        return paramsForRender;
    }

    async init() {
        this.#allFilms = await this.#service.getFilms();
        this.#allFilms.forEach((film) => console.log(film.getTitle()));
        this.#router.init();
    }
}