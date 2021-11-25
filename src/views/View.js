export class View {
    #root
    #handleFavouriteButtonClick


    constructor(root) {
        this.#root = root;
        this.#handleFavouriteButtonClick = null;
    }

    getRoot() {
        return this.#root;
    }

    getHandleFavouriteButtonClick() {
        return this.#handleFavouriteButtonClick;


    }

    setHandleFavouriteButtonClick(handleFavouriteButtonClick) {
        this.#handleFavouriteButtonClick = handleFavouriteButtonClick;
    }

    update() { }

    render() {

    }
}