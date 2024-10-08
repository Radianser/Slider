import {sliderCreator} from './js/sliderCreator.js';

let creator = new sliderCreator(document);

//Создаем многомерный массив, в подмассивах которого лежит по 4 карточки
creator.createSubdividedItemsArray();

//Создаем нужное количество слайдов и карусель
creator.createSlidesAndCarousel();

//Первые элементы (слайда и карусели) делаем активными по умолчанию
creator.turnFirstSlideActive();

//Добавляем обработчиков событий на все кнопки слайдера
creator.addButtonsEvents();

//Заполняем наши слайды карточками товаров
creator.fillSlidesWithProductsCards();
