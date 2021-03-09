

$(function() {

	const worksSlider = $('[data-slider="slick"]');

// Filter
	let filter = $("[data-filter]");

	filter.on("click", function(event) {
		event.preventDefault();

		let cat = $(this).data('filter');

		if(cat == 'all') {
			$("[data-cat]").removeClass('hide');
		} else {

			$("[data-cat]").each(function() {

				let workCat = $(this).data('cat');

				if(workCat != cat) {
					$(this).addClass('hide');
				} else {
					$(this).removeClass('hide');
				}
			});
		}
	});



	// Modal show /close

	const modalCall = $("[data-modal]");
	const modalClose = $("[data-close]");

	modalCall.on("click", function(event) {
		event.preventDefault();

		let $this = $(this);
		let modalId = $this.data('modal');

		$(modalId).addClass('show');
		$("body").addClass('no-scroll');

// анимация при вызове модального окна
		setTimeout(function() {
			$(modalId).find(".modal__dialog").css({
				transform:"rotateX(0)"
			});
		}, 200);

// чтобы настройки слайда работали точно
		worksSlider.slick("setPosition");
	});


modalClose.on("click", function(event) {
		event.preventDefault();

		let $this = $(this);
		let modalParent = $this.parents('.modal');

		modalParent.find(".modal__dialog").css({
			transform:"rotateX(90deg)"
		});

		setTimeout(function() {
		modalParent.removeClass('show');
		$("body").removeClass('no-scroll');
	}, 200);
});

// чтобы закрывалось окно после нажатия на затемненную часть экрана
$(".modal").on("click", function(event) {
	let $this = $(this);
		$this.find(".modal__dialog").css({
			transform:"rotateX(90deg)"
		});

		setTimeout(function() {
		$this.removeClass('show');
		$("body").removeClass('no-scroll');
	}, 200);
});

$(".modal__dialog").on("click", function(event) {
	event.stopPropagation();
});


// Slider https://kenwheeler.github.io/slick/

worksSlider.slick({
	infinite: true,
	slidesToShow: 1,
	slidesToScroll: 1, 
	fade: true,
	arrows: false,
	dots: true
});


$(".slickPrev").on("click", function(event) {
	event.preventDefault();
let curentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

	curentSlider.slick("slickPrev");
});

$(".slickNext").on("click", function(event) {
	event.preventDefault();

let curentSlider = $(this).parents('.modal').find('[data-slider="slick"]');

	curentSlider.slick("slickNext");
});



// Nav Burger

const navToggle = $("#navToggle");
const nav = $("#nav");

navToggle.on("click", function(event) {
	event.preventDefault();

	nav.toggleClass("show");

});

	// fixed header
	let header = $("#header");
let intro = $("#intro");

let introH = intro.innerHeight();
let scrollPos = $(window).scrollTop();

checkScroll(scrollPos, introH);

$(window).on("scroll resize", function() {
	introH = intro.innerHeight();
scrollPos = $(this).scrollTop();

checkScroll(scrollPos, introH);

});

function checkScroll(scrollPos, introH) {

	if(scrollPos >= introH) {
	header.addClass("fixed");
} else {
	header.removeClass("fixed");
}
}

// smooth scroll
$("[data-scroll]").on("click", function(event) {
	// отменяем стандартное поведение ссылки при клике ->
	event.preventDefault(); 
	let elementId = $(this).data('scroll'); 
	let elementOffset = $(elementId).offset().top;

	// чтобы после клика скрывалось бургер меню
	nav.removeClass("show");

	$("html, body").animate({
		// - 60  значение в пикселях, чтобы верхнее меню не перекрывало верх страницы
		scrollTop: elementOffset - 100
	}, 700);
});



});