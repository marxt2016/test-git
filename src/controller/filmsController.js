
export class FilmsController {
    #service
    #router

    constructor(router, service) {
        this.#router = router;
        this.#service = service;

    }

    async init() {
        const films = await this.#service.getFilms();
        this.#router.init();
        films.forEach((film) => console.log(film.getTitle()));
    }
}