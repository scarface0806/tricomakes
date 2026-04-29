/* ===================================================================
    
    Author          : Valid Theme
    Template Name   : Antux - Personal Portfolio Template
    Version         : 1.0
    
* ================================================================= */
(function($) {
	"use strict";

	$(document).ready(function() {

		function createSuccessPopup() {
			if (document.querySelector('.trico-popup')) {
				return document.querySelector('.trico-popup');
			}

			var popup = document.createElement('div');
			popup.className = 'trico-popup';
			popup.setAttribute('aria-hidden', 'true');
			popup.innerHTML = [
				'<div class="trico-popup__backdrop" data-popup-close="true"></div>',
				'<div class="trico-popup__dialog" role="dialog" aria-modal="true" aria-labelledby="trico-popup-title">',
					'<button class="trico-popup__close" type="button" aria-label="Close popup" data-popup-close="true">&times;</button>',
					'<div class="trico-popup__badge"><i class="fas fa-check"></i></div>',
					'<p class="trico-popup__eyebrow">Trico Makes</p>',
					'<h3 id="trico-popup-title">Response Submitted</h3>',
					'<p class="trico-popup__text">Your response was submitted. We will get back to you shortly.</p>',
				'</div>'
			].join('');

			document.body.appendChild(popup);

			popup.addEventListener('click', function(event) {
				if (event.target.matches('[data-popup-close="true"]')) {
					popup.classList.remove('is-visible');
					popup.setAttribute('aria-hidden', 'true');
					document.body.classList.remove('popup-open');
				}
			});

			document.addEventListener('keydown', function(event) {
				if (event.key === 'Escape' && popup.classList.contains('is-visible')) {
					popup.classList.remove('is-visible');
					popup.setAttribute('aria-hidden', 'true');
					document.body.classList.remove('popup-open');
				}
			});

			return popup;
		}

		function showSuccessPopup() {
			var popup = createSuccessPopup();
			popup.classList.add('is-visible');
			popup.setAttribute('aria-hidden', 'false');
			document.body.classList.add('popup-open');
		}



		/* ==================================================
		    # Tooltip Init
		===============================================*/
		$('[data-toggle="tooltip"]').tooltip();


		/* ==================================================
		    # Youtube Video Init
		 ===============================================*/
		$('.player').mb_YTPlayer();


		/* ==================================================
		    # Wow Init
		 ===============================================*/
		var wow = new WOW({
			boxClass: 'wow', // animated element css class (default is wow)
			animateClass: 'animated', // animation css class (default is animated)
			offset: 0, // distance to the element when triggering the animation (default is 0)
			mobile: true, // trigger animations on mobile devices (default is true)
			live: true // act on asynchronously loaded content (default is true)
		});
		wow.init();


		/* ==================================================
		    # imagesLoaded active
		===============================================*/
		$('#gallery-masonary,.blog-masonry').imagesLoaded(function() {

			/* Filter menu */
			$('.mix-item-menu').on('click', 'button', function() {
				var filterValue = $(this).attr('data-filter');
				$grid.isotope({
					filter: filterValue
				});
			});

			/* filter menu active class  */
			$('.mix-item-menu button').on('click', function(event) {
				$(this).siblings('.active').removeClass('active');
				$(this).addClass('active');
				event.preventDefault();
			});

			/* Filter active */
			var $grid = $('#gallery-masonary').isotope({
				itemSelector: '.gallery-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.gallery-item',
				}
			});

			/* Filter active */
			$('.blog-masonry').isotope({
				itemSelector: '.blog-item',
				percentPosition: true,
				masonry: {
					columnWidth: '.blog-item',
				}
			});

		});


		/* ==================================================
		    # Magnific popup init
		 ===============================================*/
		$(".popup-link").magnificPopup({
			type: 'image',
			// other options
		});

		$(".popup-gallery").magnificPopup({
			type: 'image',
			gallery: {
				enabled: true
			},
			// other options
		});

		$('.magnific-mix-gallery').each(function() {
			var $container = $(this);
			var $imageLinks = $container.find('.item');

			var items = [];
			$imageLinks.each(function() {
				var $item = $(this);
				var type = 'image';
				if ($item.hasClass('magnific-iframe')) {
					type = 'iframe';
				}
				var magItem = {
					src: $item.attr('href'),
					type: type
				};
				magItem.title = $item.data('title');
				items.push(magItem);
			});

			$imageLinks.magnificPopup({
				mainClass: 'mfp-fade',
				items: items,
				gallery: {
					enabled: true,
					tPrev: $(this).data('prev-text'),
					tNext: $(this).data('next-text')
				},
				type: 'image',
				callbacks: {
					beforeOpen: function() {
						var index = $imageLinks.index(this.st.el);
						if (-1 !== index) {
							this.goTo(index);
						}
					}
				}
			});
		});


		/* ==================================================
		    # Fun Factor Init
		===============================================*/
		$('.timer').countTo();
		$('.fun-fact').appear(function() {
			$('.timer').countTo();
		}, {
			accY: -100
		});


		$(".service-style-one-item").hover(function() {
			$(this).addClass('active').parent().siblings().find('.service-style-one-item').removeClass('active');
		});

		/* ==================================================
            # Expertise Carousel
         ===============================================*/
		const expertiseCarousel = new Swiper(".expertise-carousel", {
			// Optional parameters
			loop: true,
			slidesPerView: 1,
			spaceBetween: 30,
			autoplay: true,
			speed: 1000,
			autoplay: {
				delay: 2000,
				disableOnInteraction: false,
			},
		});


		/* ==================================================
            # Testimonials Carousel
         ===============================================*/
		const testimonialOneCarousel = new Swiper(".testimonial-style-one-carousel", {
			// Optional parameters
			direction: "horizontal",
			loop: true,
			autoplay: true,
			// If we need pagination
			pagination: {
				el: '.swiper-pagination',
				type: 'bullets',
				clickable: true,
			},

			// Navigation arrows
			navigation: {
				nextEl: ".swiper-button-next",
				prevEl: ".swiper-button-prev"
			}

			// And if we need scrollbar
			/*scrollbar: {
            el: '.swiper-scrollbar',
          },*/
		});


		/* ==================================================
		    Circle Text
		================================================== */
		let circleTypeElm = $(".circle-text-item");
		if (circleTypeElm.length) {
			circleTypeElm.each(function() {
				let elm = $(this);
				let options = elm.data("circle-text-options");
				elm.circleType(
					"object" === typeof options ? options : JSON.parse(options)
				);
			});
		}


		/* ==================================================
		    GSAP Element Scroll Animation
		================================================== */

		let upDown_Scroll = document.querySelector(".upDownScrol");
		if (upDown_Scroll) {
			gsap.set(".upDownScrol", {
				yPercent: 105
			});

			gsap.to(".upDownScrol", {
				yPercent: -105,
				ease: "none",
				scrollTrigger: {
					trigger: ".upDownScrol",
					end: "bottom center",
					scrub: 1
				},
			});
		}

		/* ==================================================
		    Splite Text
		================================================== */
		let text_split = document.querySelector(".split-text");
		if (text_split) {
			const animEls = document.querySelectorAll('.split-text');
			animEls.forEach(el => {
				var splitEl = new SplitText(el, {
					type: "lines, words",
					linesClass: "line"
				});
				var splitTl = gsap.timeline({
					duration: 0,
					ease: 'power4',
					scrollTrigger: {
						trigger: el,
						start: 'top 90%'
					}
				});

				splitTl.from(splitEl.words, {
					yPercent: "100",
					stagger: 0.008,
				});

			});
		}

		/* ==================================================
		    Contact Form Validations
		================================================== */
		$('.contact-form').each(function() {
			var formInstance = $(this);
			var messageBox = formInstance.find('.alert-msg');
			var submitButton = formInstance.find('button[type="submit"]');
			var nameField = formInstance.find('[name="name"]');
			var emailField = formInstance.find('[name="email"]');
			var phoneField = formInstance.find('[name="phone"]');
			var serviceField = formInstance.find('[name="service"]');
			var commentsField = formInstance.find('[name="comments"]');

			function setFieldError(field, text) {
				field.closest('.form-group').find('.alert-error').text(text);
				field.addClass('is-invalid');
			}

			function clearFieldError(field) {
				field.closest('.form-group').find('.alert-error').text('');
				field.removeClass('is-invalid');
			}

			function validateField(field) {
				var fieldName = field.attr('name');
				var rawValue = field.val() || '';
				var value = rawValue.trim();

				clearFieldError(field);

				if (fieldName === 'name') {
					if (!value) {
						setFieldError(field, 'Name is required.');
						return false;
					}
					if (!/^[A-Za-z ]{2,60}$/.test(value)) {
						setFieldError(field, 'Enter a valid name.');
						return false;
					}
				}

				if (fieldName === 'email') {
					if (!value) {
						setFieldError(field, 'Email is required.');
						return false;
					}
					if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
						setFieldError(field, 'Enter a valid email address.');
						return false;
					}
				}

				if (fieldName === 'phone') {
					var digits = value.replace(/\D/g, '');
					if (!value) {
						setFieldError(field, 'Mobile number is required.');
						return false;
					}
					if (digits.length < 10 || digits.length > 15) {
						setFieldError(field, 'Enter a valid mobile number.');
						return false;
					}
				}

				if (fieldName === 'service') {
					if (!value) {
						setFieldError(field, 'Please select a service.');
						return false;
					}
				}

				if (fieldName === 'comments') {
					if (!value) {
						setFieldError(field, 'Message is required.');
						return false;
					}
					if (value.length < 10) {
						setFieldError(field, 'Message should be at least 10 characters.');
						return false;
					}
				}

				return true;
			}

			[nameField, emailField, phoneField, serviceField, commentsField].forEach(function(field) {
				field.on('input change blur', function() {
					validateField(field);
				});
			});

			formInstance.on('submit', function(event) {
				event.preventDefault();

				var isValid = [nameField, emailField, phoneField, serviceField, commentsField].every(function(field) {
					return validateField(field);
				});

				if (!isValid) {
					messageBox
						.text('Please fill all required fields correctly.')
						.addClass('alert-error')
						.slideDown('slow');
					return;
				}

				var action = formInstance.attr('action');
				var formData = new FormData(formInstance[0]);
				var comments = formInstance.find('[name="comments"]').val();

				if (comments && !formData.get('message')) {
					formData.append('message', comments);
				}

				messageBox.stop(true, true).hide().removeClass('alert-success alert-error');
				submitButton
					.after('<img src="assets/img/ajax-loader.gif" class="loader" />')
					.attr('disabled', 'disabled');

				fetch(action, {
					method: 'POST',
					body: formData,
					headers: {
						Accept: 'application/json'
					}
				})
					.then(function(response) {
						return response.json();
					})
					.then(function(data) {
						if (data.success) {
							messageBox
								.text('Your response was submitted.')
								.addClass('alert-success')
								.slideDown('slow');
							formInstance[0].reset();
							[nameField, emailField, phoneField, serviceField, commentsField].forEach(function(field) {
								clearFieldError(field);
							});
							showSuccessPopup();
							return;
						}

						throw new Error(data.message || 'Submission failed.');
					})
					.catch(function(error) {
						messageBox
							.text(error.message || 'Something went wrong. Please try again.')
							.addClass('alert-error')
							.slideDown('slow');
					})
					.finally(function() {
						formInstance.find('img.loader').fadeOut('slow', function() {
							$(this).remove();
						});
						submitButton.removeAttr('disabled');
					});
			});
		});


	}); // end document ready function

	/* ==================================================
	    Services View All Toggle
	================================================== */
	window.toggleServices = function() {
		const grid = document.getElementById('servicesGrid');
		const btn = document.getElementById('viewAllBtn');
		const cards = grid.querySelectorAll('[data-service-index]');
		
		if (btn.classList.contains('expanded')) {
			// Show Less
			btn.classList.remove('expanded');
			btn.innerHTML = '<span>View All Services</span><i class="fas fa-chevron-down"></i>';
			
			cards.forEach((card, index) => {
				if (index >= 6) {
					card.style.display = 'none';
				}
			});
		} else {
			// View All
			btn.classList.add('expanded');
			btn.innerHTML = '<span>Show Less</span><i class="fas fa-chevron-up"></i>';
			
			cards.forEach((card) => {
				card.style.display = 'flex';
			});
		}
	};


	$(window).scroll(function() {
		/* ==================================================
		    Background Zoom Init
		================================================== */
		let background_Zoom = document.querySelector("#js-hero");
		if (background_Zoom) {
			var scroll = $(window).scrollTop();
			$("#js-hero").css({
				width: (100 + scroll / 18) + "%"
			})
		}
	});



	// Preloader Js
	const svg = document.getElementById("preloaderSvg");
	const svgText = document.querySelector(
		".hero-section .intro_text svg text"
	);
	const tl = gsap.timeline({
		onComplete: startStrokeAnimation,
	});
	const curve = "M0 502S175 272 500 272s500 230 500 230V0H0Z";
	const flat = "M0 2S175 1 500 1s500 1 500 1V0H0Z";

	tl.to(".preloader-heading .load-text , .preloader-heading .cont", {
		delay: 1.5,
		y: -100,
		opacity: 0,
	});
	tl.to(svg, {
		duration: 0.5,
		attr: { d: curve },
		ease: "power2.easeIn",
	}).to(svg, {
		duration: 0.5,
		attr: { d: flat },
		ease: "power2.easeOut",
	});
	tl.to(".preloader", {
		y: -1500,
	});
	tl.to(".preloader", {
		zIndex: -1,
		display: "none",
	});

	function startStrokeAnimation() {
		if (svgText) {
			// Add a class or directly apply styles to trigger the stroke animation
			svgText.classList.add("animate-stroke");
		}
	}


})(jQuery); // End jQuery