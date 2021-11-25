export const getFilmById = ((films, filmId) => {
    return films.find((filmModel) => filmModel.getId() === filmId);
});


export const removeFilmById = (films, filmId) => {

    return films.filter((filmModel) => filmModel.getId() !== filmId);


}