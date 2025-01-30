

// ************************************************* //
// * +++++++++++ Fancybox Gallery ++++++++++++ * //
// ************************************************* //

Fancybox.bind('[data-fancybox="gallery-1"]', {
  caption: function (fancybox, slide) {
    const figurecaption = slide.triggerEl?.querySelector(".tab-caption");
    return figurecaption ? figurecaption.innerHTML : slide.caption || "";
  },
});

// ************************************************* //
// * +++++++++++++ Swiper Js ++++++++++++++ * //
// ************************************************* //

var heroThumbSwiper = new Swiper(".oak__hero-thumb-swiper", {
  // spaceBetween: 10,
  slidesPerView: 4,
  watchSlidesProgress: true,
  allowTouchMove: false,
  watchOverflow: true,
});
const progress = document.querySelector('.autoplay-progress');
var heroSwiper = new Swiper(".oak__hero-swiper", {
  // spaceBetween: 10,
  autoplay: {
    delay: 10000,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination", 
    type: 'bullets',
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  // on: {
  //   init: function () {
  //     progress.classList.remove("animate");
  //     progress.classList.add("animate");
  //   },
  //   slideChangeTransitionStart: function () {
  //     progress.classList.remove("animate");
  //   },
  //   slideChangeTransitionEnd: function () {
  //     progress.classList.add("animate");
  //   }
  // },
  thumbs: {
    swiper: heroThumbSwiper,
  },
});

var productSwiper = new Swiper(".oak__products-swiper", {
  // spaceBetween: 10,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false
  },
  pagination: {
    el: ".swiper-pagination", 
    type: 'bullets',
    clickable: true,
  },
  navigation: {
    nextEl: ".swiper-button-next-product",
    prevEl: ".swiper-button-prev-product",
  },
  breakpoints: {
    0: {
      slidesPerView: 1,
    },
    1024: {
      slidesPerView: 3,
    }
  }
});


const videoContainer = document.getElementById("oakVideoWrap");
const playButton = document.getElementById("oakPlayBtn");

videoContainer.addEventListener("mousemove", function (event) {
	const containerRect = videoContainer.getBoundingClientRect();
	const mouseX = event.clientX - containerRect.left;
	const mouseY = event.clientY - containerRect.top;

	const buttonWidth = playButton.offsetWidth;
	const buttonHeight = playButton.offsetHeight;
	const buttonX = mouseX - buttonWidth / 2;
	const buttonY = mouseY - buttonHeight / 2;

	const maxButtonX = containerRect.width - buttonWidth;
	const maxButtonY = containerRect.height - buttonHeight;
	playButton.style.left = Math.min(Math.max(buttonX, 0), maxButtonX) + "px";
	playButton.style.top = Math.min(Math.max(buttonY, 0), maxButtonY) + "px";
});

videoContainer.addEventListener("mouseleave", function () {
	setTimeout(function () {
		playButton.style.left = "50%";
		playButton.style.top = "50%";
		playButton.style.transform = "translate(-50%, -50%) scale(1)";
		playButton.style.transition = "all 0.3s ease-out";
	}, 50);
});

videoContainer.addEventListener("mouseover", function () {
	playButton.style.transition = "transform ease-out 0.3s";
	playButton.style.transform = "scale(1.2)";
});

const video = document.getElementById("oakVideoItem");

videoContainer.addEventListener("mouseenter", function () {
	if (!video.paused) {
		playButton.style.opacity = "1";
	}
});

videoContainer.addEventListener("mouseleave", function () {
	if (!video.paused) {
		playButton.style.opacity = "0";
		playButton.style.transition = "opacity ease 1s";
	}
});

videoContainer.addEventListener("click", function () {
	if (video.paused) {
		video.play();
		playButton.innerHTML =
			'<span class="pause-icon">Pause</span>';
	} else {
		video.pause();
		playButton.innerHTML =
			'<span class="play-icon">Play</span>';
	}
});

video.addEventListener("ended", function () {
	playButton.innerHTML =
		'<span class="play-icon">Play</span>';
	playButton.style.opacity = "1";
});