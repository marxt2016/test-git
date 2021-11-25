import { renderFilmComponent } from '../core/components/filmComponent';
import { Routes } from '../core/constants/routes';
import { View } from './View';

export class FavouritesView extends View {

    #handleFavouriteButtonClick

    static #Text = {
        SeeAllFilms: 'Open Films',
        HeaderText: 'Favourites',
    }

    render(favouriteFilmModels = []) {
        const container = document.createElement('div');
        container.className = 'favorites-container';

        const titleHTML = document.createElement('h1');
        titleHTML.className = 'film-cards-container__title';
        titleHTML.textContent = FavouritesView.#Text.HeaderText;

        const linksBlock = document.createElement('div');
        linksBlock.className = 'film-cards-container__links-block';

        const allFilmsLink = document.createElement('a');
        allFilmsLink.className = 'film-cards-container__link-button link-button';
        allFilmsLink.textContent = FavouritesView.#Text.SeeAllFilms;
        allFilmsLink.href = `#${Routes.Main}`;

        linksBlock.append(allFilmsLink);

        const filmsContainer = document.createElement('div');
        filmsContainer.className = 'film-cards-container';

        favouriteFilmModels.forEach((filmModel) => {
            const filmHTML = renderFilmComponent(
                {
                    filmModel,
                    handleFavouriteButtonClick: this.#handleFavouriteButtonClick,
                });
            filmsContainer.append(filmHTML);
        })
        container.append(titleHTML, linksBlock, filmsContainer);
        this.getRoot().append(container);

    }
}