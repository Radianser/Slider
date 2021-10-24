let games = [
	{'name':'ЗВЁЗДНЫЕ ВОЙНЫ Джедаи: Павший Орден™', 'price':'2499 руб.', 'image':'fallen_order.jpg', 'link':'https://store.steampowered.com/app/1172380/_/'},
	{'name':'Dishonored 2', 'price':'1299 руб.', 'image':'dishonored_2.jpg', 'link':'https://store.steampowered.com/app/403640/Dishonored_2/'},
	{'name':'Resident Evil 2', 'price':'1599 руб.', 'image':'resident_evil_2.jpg', 'link':'https://store.steampowered.com/app/883710/Resident_Evil_2/'},
	{'name':'Quantum Break', 'price':'699 руб.', 'image':'quantum_break.jpg', 'link':'https://store.steampowered.com/app/474960/Quantum_Break/'},
	{'name':'Destiny 2', 'price':'Бесплатно', 'image':'destiny_2.jpg', 'link':'https://store.steampowered.com/app/1085660/Destiny_2'},
	{'name':'Cyberpunk 2077', 'price':'1999 руб.', 'image':'cyberpunk_2077.jpg', 'link':'https://store.steampowered.com/app/1091500/Cyberpunk_2077/'},
	{'name':'Back 4 Blood', 'price':'1999 руб.', 'image':'back_4_blood.jpg', 'link':'https://store.steampowered.com/app/924970/Back_4_Blood/'},
	{'name':'Dead by Daylight', 'price':'549 руб.', 'image':'dead_by_daylight.jpg', 'link':'https://store.steampowered.com/app/381210/Dead_by_Daylight/'},
	{'name':'Apex Legends™', 'price':'Бесплатно', 'image':'apex_legends.jpg', 'link':'https://store.steampowered.com/app/1172470/Apex_Legends/'},
	{'name':'A Plague Tale: Innocence', 'price':'1599 руб.', 'image':'innocence.jpg', 'link':'https://store.steampowered.com/app/752590/A_Plague_Tale_Innocence/'},
	{'name':'Ведьмак 3: Дикая Охота', 'price':'1199 руб.', 'image':'the_witcher_3.jpg', 'link':'https://store.steampowered.com/app/292030/_3/'},
	{'name':'Need for Speed™ Payback', 'price':'1399 руб.', 'image':'need_for_speed.jpg', 'link':'https://store.steampowered.com/app/1262580/Need_for_Speed_Payback/'}
];
let step = 4;											//Количество карточек в слайде
let subarray = [];

let prev = document.querySelector('.prev');
let next = document.querySelector('.next');
let prevPagination = document.querySelector('.prev.pagination');
let nextPagination = document.querySelector('.next.pagination');
let slider_track = document.querySelector('#slider_track');
let carousel = document.querySelector('#carousel');

for (let i = 0; i < games.length; i += step) {							//Многомерный массив, в подмассивах которого лежит по 4 карточки
	subarray.push(games.slice(i, i + step));
}

for (let i = 0; i < subarray.length; i++) {							//Создаем нужное количество слайдов и карусель
	addSlide(i);
	addPage(i);
}
function addSlide(i) {										//Функция по созданию слайдов
	let slide = document.createElement('div');
	slide.setAttribute('class', 'slide');
	slide.dataset.number = i + 1;
	slider_track.appendChild(slide);
	return slider_track;
}
function addPage(i) {										//Функция по созданию карусели
	let page = document.createElement('div');
	let line = document.createElement('div');
	page.dataset.number = i + 1;
	line.classList.add('line');
	page.appendChild(line);
	carousel.appendChild(page);
	return carousel;
}

let lines = document.querySelectorAll('.line');							//Первые элементы (слайда и карусели) делаем активными по умолчанию
lines[0].classList.add('bold');
let slide = document.querySelectorAll('.slide');
slide[0].classList.add('active');

if (slide.length > 1) {										//Если у нас больше одного слайда, добавляем событие на кнопку "Пролистать вперед"
	next.addEventListener('click', goForward);
	nextPagination.addEventListener('click', goForward);
}

for (let i = 0; i < subarray.length; i++) {							//Заполняем наши слайды карточками товаров
	for (let j = 0; j < subarray[i].length; j++) {
		slide[i].appendChild(elementCreation(i,j));
	}
}
function elementCreation(i,j) {									//Функция по созданию карточек товаров
	let div = document.createElement('div');
	let img = document.createElement('img');
	let name = document.createElement('p');
	let platforms = document.createElement('div');
	let price = document.createElement('div');
	let basket = document.createElement('div');
	
	div.classList.add('good');
	div.addEventListener('click', function() {						//Навешиваем карточке ссылку для перехода
		window.open(subarray[i][j]['link'], "_blank");
	});
	
	platforms.classList.add('platforms');
	basket.classList.add('add_to_basket');
	basket.addEventListener('click', function(event) {					//Убираем ссылку с кнопки "Добавить в корзину"
		event.stopPropagation();
	});
	
	img.src = "images/" + subarray[i][j]['image'];						//Указываем путь к картинке товара
	img.loading = "lazy";									//Добавляем картинкам "ленивую загрузку"
	
	name.classList.add('cart_name');
	name.innerHTML = subarray[i][j]['name'];						//Добавляем карточке товара название
	
	price.classList.add('cart_price');
	price.innerHTML = subarray[i][j]['price'];						//Добавляем карточке товара цену
	
	div.appendChild(img);									//Собираем всю карточку товара
	div.appendChild(name);
	div.appendChild(platforms);
	div.appendChild(price);
	div.appendChild(basket);
	return div;
}

slide = document.querySelectorAll('.slide');
let screenWidth = window.screen.width;								//Двигаем влево последнюю карточку в слайде, если их не набралось на 4 штуки (т.е. их 3)
for (let s of slide) {
	if (screenWidth >= 401 && screenWidth <= 800) {						//Данный код полезен только для опереденного размера экрана
		if (s.childElementCount == 3) {
			s.lastElementChild.style.transform = "translateX(calc(-50% - 8px))";
		}
	}
}

let i = 0;											//Счетчик переключения слайдов
function goForward() {										//Функция, которая переключает слайдер вперед
	let slider_container = document.querySelector('#slider_container');
	let slide = document.querySelectorAll('.slide');
	let style = getComputedStyle(slider_container);
	
	if (slide[i] == slide[slide.length - 1]) {						//Если это последний слайд, то убираем переключения вперед
		next.removeEventListener('click', goForward);
		nextPagination.removeEventListener('click', goForward);
	} else {										//Если это не последний слайд, то двигаем слайдер на ширину контейнера
		slide[i].classList.toggle('active');
		slider_track.style.transform += 'translateX(-' + style.width + ')';
		i++;
		slide[i].classList.toggle('active');
		
		prev.addEventListener('click', goBackward);					//Добавляем функцию переключения назад, на случай если мы только что переключились с 1 слайда на 2
		prevPagination.addEventListener('click', goBackward);				//(Функцию переключения назад изначально не задается)
	}
	activePage();
}

function goBackward() {										//Функция, которая переключает слайдер назад
	let slider_container = document.querySelector('#slider_container');
	let slide = document.querySelectorAll('.slide');
	let style = getComputedStyle(slider_container);
	
	if (slide[i] == slide[0]) {								//Если это первый слайд, то убираем переключения назад
		prev.removeEventListener('click', goBackward);
		prevPagination.removeEventListener('click', goBackward);
	} else {										//Если это не первый слайд, то двигаем слайдер на ширину контейнера
		slide[i].classList.toggle('active');
		slider_track.style.transform += 'translateX(' + style.width + ')';
		i--;
		slide[i].classList.toggle('active');
		
		next.addEventListener('click', goForward);					//Добавляем функцию переключения вперед, на случай если мы только что переключились с последнего слайда на предпоследний
		nextPagination.addEventListener('click', goForward);
	}
	activePage();
}

function activePage() {										//Функция, которая выделяет номер активного слайда
	let active_slide = document.querySelector('.slide.active');
	let pages = document.querySelectorAll('#carousel > div');
	
	for (let page of pages) {
		page.firstElementChild.classList.remove('bold');				//Убираем с первого элемента по умолчанию установленный стиль
		if (active_slide.dataset.number == page.dataset.number) {
			page.firstElementChild.classList.add('bold');				//Добавляем стиль странице соответствующей номеру активного слайда
		}
	}
}

let pages = document.querySelectorAll('#carousel > div');
for (let page of pages) {									//Навешиваем функцию переключения слайдов с помощью нумерации
	page.addEventListener('click', jumpTo);
}

function jumpTo() {										//Функция переключения слайдов с помощью нумерации
	let slider_container = document.querySelector('#slider_container');
	let slider_track = document.querySelector('#slider_track');
	let slide = document.querySelector('.slide.active');
	let slides = document.querySelectorAll('.slide');
	let pages = document.querySelectorAll('#carousel > div');
	let style = getComputedStyle(slider_container);
	let width = Number(style.width.slice(0, -2));
	
	i = this.dataset.number - 1;								//Задаем счетчику значение нового активного слайда
	
	for (let k = 0; k < pages.length; k++) {						//Если активная страница не является первой или последней, навешиваем на стрелочки все события переключения
		if (this != pages[0] && this != pages[pages.length - 1]) {
			prev.addEventListener('click', goBackward);
			prevPagination.addEventListener('click', goBackward);
			next.addEventListener('click', goForward);
			nextPagination.addEventListener('click', goForward);
		}
		if (this == pages[0]) {								//Если активная страница является первой страницой, навешиваем стрелочкам все события переключения вперед и убираем назад
			prev.removeEventListener('click', goBackward);
			prevPagination.removeEventListener('click', goBackward);
			next.addEventListener('click', goForward);
			nextPagination.addEventListener('click', goForward);
		}
		if (this == pages[pages.length - 1]) {						//Если активная страница является последней страницой, навешиваем стрелочкам все события переключения назад и убираем вперед
			prev.addEventListener('click', goBackward);
			prevPagination.addEventListener('click', goBackward);
			next.removeEventListener('click', goForward);
			nextPagination.removeEventListener('click', goForward);
		}
	}
	
	for (let j = 0; j < slides.length; j++) {		
		slides[j].classList.remove('active');						//Убираем класс 'active' у всех слайдов
	}
	slides[i].classList.add('active');							//Устанавливаем класс 'active' новому активному слайду
	
	let diff = slide.dataset.number - this.dataset.number;					//Разница между атрибутом 'number' старого слайда и атрибутом 'number' выбранного номера страницы
	slider_track.style.transform += 'translateX(' + diff * width + 'px)';			//Двигаем слайдер на ширину контейнера умноженную на разницу атрибутов 'number'
	activePage();
}
