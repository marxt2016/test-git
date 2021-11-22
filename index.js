console.log('__Start Movies Project__');
import { FilmsController } from './src/controller/filmsController';
import { Router } from './src/core/router/router';
import { FilmsService } from './src/core/service/filmsService';
import { FilmsView } from './src/views/FilmsView';
import { FilmView } from './src/views/FilmView';
import { FavouritesView } from './src/views/FavouritesView';
import { Routes } from './src/core/constants/routes';

const routes = {
    [Routes.Main]: FilmsView,
    [Routes.Favourites]: FavouritesView,
    [Routes.Film]: FilmView,

}

const root = document.getElementById('root');
const router = new Router(routes, root);
const filmsService = new FilmsService();
const controller = new FilmsController(router, filmsService);
router.setController(controller);

controller.init();

