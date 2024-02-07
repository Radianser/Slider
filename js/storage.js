export class storage {
    games = [
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
        // {'name':'Need for Speed™ Payback', 'price':'1399 руб.', 'image':'need_for_speed.jpg', 'link':'https://store.steampowered.com/app/1262580/Need_for_Speed_Payback/'}
    ];

	gamesPerSlide;
    subdividedGamesData;
    prev;
    next;
    prevPagination;
    nextPagination;
    slider_container;
    slider_track;
    carousel;
	
	constructor(document) {
		this.gamesPerSlide = 4;
        this.subdividedGamesData = [];
        this.prev = document.querySelector('.prev');
        this.next = document.querySelector('.next');
        this.prevPagination = document.querySelector('.prev.pagination');
        this.nextPagination = document.querySelector('.next.pagination');
        this.slider_container = document.querySelector('#slider_container');
        this.slider_track = document.querySelector('#slider_track');
        this.carousel = document.querySelector('#carousel');
	}
}