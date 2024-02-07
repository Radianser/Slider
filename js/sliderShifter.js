import {storage} from './storage.js';

export class sliderShifter extends storage {
	i = 0;
	swipeProps = {
		xStart: null,
		xEnd: null,
		minDist: 70,
		maxDist: 500,
		maxTime: 500,
		minTime: 30,
		time: 0
	};
	timer;

	constructor(document) {
		super(document);
	}
	
	//Находим все слайды
	#findSlides() {
		if(!this.slides) {
			let slides = document.querySelectorAll('.slide');
			this.slides = slides;
		}
	}

	//Функция, которая переключает слайдер вперед
	goForward() {
		this.#findSlides();
		let style = getComputedStyle(this.slider_container);
		if (this.slides[this.i] != this.slides[this.slides.length - 1]) {
			this.slides[this.i].classList.toggle('active');
			this.slider_track.style.transform += 'translateX(-' + style.width + ')';
			this.i++;
			this.slides[this.i].classList.toggle('active');
		}
		this.activePage();
	}

	//Функция, которая переключает слайдер назад
	goBackward() {				
		this.#findSlides();									                                    
		let style = getComputedStyle(this.slider_container);
		if (this.slides[this.i] != this.slides[0]) {
			this.slides[this.i].classList.toggle('active');
			this.slider_track.style.transform += 'translateX(' + style.width + ')';
			this.i--;
			this.slides[this.i].classList.toggle('active');
		}
		this.activePage();
	}

	//Функция, которая выделяет номер активного слайда
	activePage() {
		let active_slide = document.querySelector('.slide.active');
		let pages = document.querySelectorAll('#carousel > div');

		for (let page of pages) {
			page.firstElementChild.classList.remove('bold');
			if (active_slide.dataset.number == page.dataset.number) {
				page.firstElementChild.classList.add('bold');
			}
		}
	}

	//Функция переключения слайдов с помощью нумерации
	jumpTo(e) {
		this.#findSlides();
		let style = getComputedStyle(this.slider_container);
		let width = Number(style.width.slice(0, -2));
		let slide = document.querySelector('.slide.active');
		let element = e.target.closest('div.page');
		this.i = element.dataset.number;
		
		slide.classList.toggle('active');
		this.slides[this.i].classList.toggle('active');
		
		let diff = slide.dataset.number - element.dataset.number;
		this.slider_track.style.transform += 'translateX(' + diff * width + 'px)';
		this.activePage();
	}

	//Отслеживаем координату X первого касания
	touchStart(e) {
		this.swipeProps.xStart = e.touches[0].clientX;
		this.timer = setInterval(() => {
			this.swipeProps.time += 50;
		}, 50);
	}

	//Отслеживаем координату X последнего касания
	touchMove(e) {
		this.swipeProps.xEnd = e.touches[0].clientX;
	}

	//Обрабатываем полученные данные и запускаем свайп
	touchEnd(e) {
		clearInterval(this.timer);
		let xDiff = Math.abs(this.swipeProps.xStart - this.swipeProps.xEnd);

		if(xDiff > this.swipeProps.minDist && xDiff < this.swipeProps.maxDist) {
			if(this.swipeProps.time > this.swipeProps.minTime && this.swipeProps.time < this.swipeProps.maxTime) {
				if(this.swipeProps.xStart > this.swipeProps.xEnd) {
					this.goForward();
				} else {
					this.goBackward();
				}
			}
		}
		this.swipeProps.time = 0;
	}
}