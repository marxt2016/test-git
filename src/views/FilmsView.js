import { View } from './View';
import { Routes } from '../core/constants/routes';
//import { filmModel } from '../models/filmModel';
import inFavouritesImage from '../assets/icons/heart-outlined.png';
import notFavouritesImage from '../assets/icons/heart.png';
import { renderFilmComponent } from '../core/components/filmComponent';

export class FilmsView extends View {
    static #Text = {
        SeeFavouriteFilms: 'Open Favourites',
        HeaderText: 'ALL films',
    }

    #renderSeeFavouritesButton() {
        const container = document.createElement('div');
        container.className = 'film-cards-container__links-block';
        const seeFavouritesButton = document.createElement('a');
        seeFavouritesButton.className = 'film-cards-container__link-button link-button';
        seeFavouritesButton.textContent = FilmsView.#Text.SeeFavouriteFilms;
        seeFavouritesButton.href = `#${Routes.Favourites}`;
        container.append(seeFavouritesButton);
        return container;
    }

    render(filmModels = []) {
        const container = document.createElement('div');
        container.className = 'films-container';

        const titleHTML = document.createElement('h1');
        titleHTML.className = 'film-cards-container__title';
        titleHTML.textContent = FilmsView.#Text.HeaderText;

        const favButtonContainer = this.#renderSeeFavouritesButton();

        const filmsContainer = document.createElement('div');
        filmsContainer.className = 'film-cards-container';


        filmModels.forEach((filmModel) => {
            const filmHTML = renderFilmComponent(
                {
                    filmModel,
                    handleFavouriteButtonClick: this.getHandleFavouriteButtonClick(),
                });
            filmsContainer.append(filmHTML);
        })

        container.append(titleHTML, favButtonContainer, filmsContainer);

        this.getRoot().append(container);

    }
}