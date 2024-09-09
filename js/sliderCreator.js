import {storage} from './storage.js';
import {sliderShifter} from './sliderShifter.js';

let shifter = new sliderShifter(document);

export class sliderCreator extends storage {
	constructor(document) {
		super(document);
	}

	//Создаем многомерный массив, в подмассивах которого лежит по 4 карточки
	gamesSubdivision() {
		for (let i = 0; i < this.games.length; i += this.gamesPerSlide) {
			this.subdividedGamesData.push(this.games.slice(i, i + this.gamesPerSlide));
		}
	}

	//Создаем нужное количество слайдов и карусель
	slidesAndCarouselCreation() {
		for (let i = 0; i < this.subdividedGamesData.length; i++) {
			this.#addSlide(i);
			this.#addCarouselShifter(i);
		}
	}

	//Функция по созданию слайдов
	#addSlide(i) {
		let slide = document.createElement('div');
		slide.setAttribute('class', 'slide');
		slide.dataset.number = i;
		this.slider_track.appendChild(slide);
	}

	//Функция по созданию карусели
	#addCarouselShifter(i) {
		let page = document.createElement('div');
		let line = document.createElement('div');
		page.dataset.number = i;
		line.classList.add('line');
		page.classList.add('page');
		page.appendChild(line);
		this.carousel.appendChild(page);
	}

	//Первые элементы (слайда и карусели) делаем активными по умолчанию
	turnFirstSlideActive() {
		let lines = document.querySelectorAll('.line');
		lines[0].classList.add('bold');
		let slides = document.querySelectorAll('.slide');
		slides[0].classList.add('active');
		this.slides = slides;
	}

	//Добавляем обработчиков событий на все кнопки слайдера
	addButtonsEvents() {
		this.next.addEventListener('click', () => {shifter.goForward()});
		this.nextPagination.addEventListener('click', () => {shifter.goForward()});
		this.prev.addEventListener('click', () => {shifter.goBackward()});
		this.prevPagination.addEventListener('click', () => {shifter.goBackward()});

		let pages = document.querySelectorAll('#carousel > div');
		for (let page of pages) {
			page.addEventListener('click', (e) => {shifter.jumpTo(e)});
		}

		for (let slide of this.slides) {
			slide.addEventListener('touchstart', (e) => {shifter.touchStart(e)});
			slide.addEventListener('touchmove', (e) => {shifter.touchMove(e)});
			slide.addEventListener('touchend', (e) => {shifter.touchEnd(e)});
		}
	}

	//Заполняем наши слайды карточками товаров
	fillSlidesWithProductsCards() {
		for (let i = 0; i < this.subdividedGamesData.length; i++) {
			for (let j = 0; j < this.subdividedGamesData[i].length; j++) {
				this.slides[i].appendChild(this.#createProductCard(i,j));
			}
		}
		this.#adjustThirdCardOnNarrowScreens();
	}

	//Двигаем влево последнюю карточку в слайде, если их не набралось на 4 штуки (т.е. их 3)
	#adjustThirdCardOnNarrowScreens() {
		let screenWidth = window.screen.width;
		for (let slide of this.slides) {
			if (screenWidth >= 401 && screenWidth <= 800) {
				if (slide.childElementCount == 3) {
					slide.lastElementChild.style.transform = "translateX(calc(-50% - 8px))";
				}
			}
		}
	}

	//Функция по созданию карточек товаров
	#createProductCard(i,j) {										
		let card = document.createElement('div');
		let shade = document.createElement('div');
		let img = document.createElement('img');
		let name = document.createElement('p');
		let platforms = document.createElement('div');
		let price = document.createElement('div');
		let basket = document.createElement('div');
		let basket_img = document.createElement('div');
		
		card.classList.add('good');

		//Навешиваем карточке ссылку для перехода
		card.addEventListener('click', () => {
			window.open(this.subdividedGamesData[i][j]['link'], "_blank");
		});
		
		shade.classList.add('shade');
		platforms.classList.add('platforms');
		basket.classList.add('add_to_basket');
		basket_img.classList.add('basket_img');
		basket.appendChild(basket_img);

		//Убираем ссылку на страницу товара с кнопки "Добавить в корзину"
		basket.addEventListener('click', function(event) {
			event.stopPropagation();
		});
		
		img.src = "images/" + this.subdividedGamesData[i][j]['image'];
		img.loading = "lazy";
		
		name.classList.add('cart_name');
		name.innerHTML = this.subdividedGamesData[i][j]['name'];
		
		price.classList.add('cart_price');
		price.innerHTML = this.subdividedGamesData[i][j]['price'];
		
		card.appendChild(img);
		card.appendChild(shade);
		card.appendChild(name);
		card.appendChild(platforms);
		card.appendChild(price);
		card.appendChild(basket);

		return card;
	}
}