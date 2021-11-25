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
    // #renderFilmHTML(filmModel) {
    //     const container = document.createElement('div');
    //     container.className = 'film-card';
    //     const titleHTML = document.createElement('span');
    //     titleHTML.className = 'film-card__title';
    //     titleHTML.textContent = filmModel.getTitle();

    //     const imageHTML = document.createElement('img');
    //     imageHTML.src = filmModel.getPoster();
    //     imageHTML.className = 'film-card__poster';
    //     imageHTML.alt = filmModel.getTitle();

    //     const yearHTML = document.createElement('span');
    //     yearHTML.className = 'film-card__year';
    //     yearHTML.textContent = filmModel.getYear();

    //     const actionButton = document.createElement('button');
    //     actionButton.className = 'film-card__button';
    //     const actionButtonImg = document.createElement('img');
    //     actionButtonImg.className = 'film-card__button-img';

    //     if (filmModel.getIsFavourite()) {
    //         actionButtonImg.src = inFavouritesImage;
    //     } else {
    //         actionButtonImg.src = notFavouritesImage;
    //     }
    //     actionButton.append(actionButtonImg);

    //     container.append(titleHTML, imageHTML, yearHTML, actionButton);
    //     return container
    // }


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
            const filmHTML = renderFilmComponent({ filmModel });
            filmsContainer.append(filmHTML);
        })

        container.append(titleHTML, favButtonContainer, filmsContainer);

        this.getRoot().append(container);

    }
}