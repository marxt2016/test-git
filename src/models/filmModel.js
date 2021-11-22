export class FilmModel {
    #poster
    #title
    #year
    #imdbID
    #isFavourite

    constructor(filmData) {
        this.#poster = filmData.Poster;
        this.#title = filmData.Title;
        this.#year = filmData.Year;
        this.#imdbID = filmData.imdbID;
        this.#isFavourite = false;
    }
    getPoster() {
        return this.#poster;
    }
    getTitle() {
        return this.#title;
    }
    getYear() {
        return this.#year;
    }
    getId() {
        return this.#imdbID;
    }
    getIsFavourite() {
        return this.#isFavourite;
    }
    setIsFavourite(isFavourite) {
        this.#isFavourite = isFavourite;
    }
}



