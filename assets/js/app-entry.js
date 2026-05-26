(function () {
    "use strict";

    function hasAnySelector(selector) {
        try {
            return !!document.querySelector(selector);
        } catch (_error) {
            return false;
        }
    }

    function loadScript(src) {
        return new Promise(function (resolve, reject) {
            if (document.querySelector('script[src="' + src + '"]')) {
                resolve();
                return;
            }

            var script = document.createElement("script");
            script.src = src;
            script.defer = true;
            script.onload = function () {
                resolve();
            };
            script.onerror = function () {
                reject(new Error("Failed to load " + src));
            };
            document.body.appendChild(script);
        });
    }

    async function boot() {
        var loaders = [];

        if (hasAnySelector(".player")) {
            loaders.push("assets/js/YTPlayer.min.js");
        }

        if (hasAnySelector(".wow")) {
            loaders.push("assets/js/wow.min.js");
            if (!document.querySelector('link[href="assets/css/animate.min.css"]')) {
                var animCss = document.createElement("link");
                animCss.rel = "stylesheet";
                animCss.href = "assets/css/animate.min.css";
                document.head.appendChild(animCss);
            }
        }

        if (hasAnySelector("#gallery-masonary, .blog-masonry")) {
            loaders.push(
                "assets/js/imagesloaded.pkgd.min.js",
                "assets/js/isotope.pkgd.min.js"
            );
        }

        if (hasAnySelector(".popup-link, .popup-gallery, .magnific-mix-gallery")) {
            loaders.push("assets/js/magnific-popup.min.js");
            if (!document.querySelector('link[href="assets/css/magnific-popup.css"]')) {
                var popupCss = document.createElement("link");
                popupCss.rel = "stylesheet";
                popupCss.href = "assets/css/magnific-popup.css";
                document.head.appendChild(popupCss);
            }
        }

        if (hasAnySelector(".timer, .fun-fact")) {
            loaders.push(
                "assets/js/jquery.appear.js",
                "assets/js/jquery.waypoints.js",
                "assets/js/count-to.js"
            );
        }

        if (hasAnySelector(".expertise-carousel, .testimonial-style-one-carousel, .portfolio-single-carousel, .swiper")) {
            loaders.push("assets/js/swiper-bundle.min.js");
        }

        if (hasAnySelector(".split-text, .upDownScrol, .preloader, .hero-section")) {
            loaders.push("assets/js/gsap.js", "assets/js/ScrollTrigger.min.js", "assets/js/SplitText.min.js");
        }

        if (hasAnySelector(".circle-text-item")) {
            loaders.push("assets/js/jquery.lettering.min.js", "assets/js/jquery.circleType.js");
        }

        if (hasAnySelector(".typed, .cd-headline, .cd-words-wrapper")) {
            loaders.push("assets/js/typed.js");
        }

        if (hasAnySelector(".progress-bar, [data-progress]")) {
            loaders.push("assets/js/progress-bar.min.js");
        }

        // Keep easing for legacy animations where present.
        if (hasAnySelector(".banner-style-one-area, .services-style-one-area, .project-area")) {
            loaders.push("assets/js/jquery.easing.min.js");
        }

        var unique = [];
        var seen = {};
        loaders.forEach(function (src) {
            if (!seen[src]) {
                seen[src] = true;
                unique.push(src);
            }
        });

        var gsapOrdered = [
            "assets/js/gsap.js",
            "assets/js/ScrollTrigger.min.js",
            "assets/js/SplitText.min.js"
        ];

        var gsapChain = unique.filter(function (src) {
            return gsapOrdered.indexOf(src) !== -1;
        }).sort(function (a, b) {
            return gsapOrdered.indexOf(a) - gsapOrdered.indexOf(b);
        });

        var parallelVendors = unique.filter(function (src) {
            return gsapOrdered.indexOf(src) === -1;
        });

        // Load independent vendors concurrently to avoid long sequential waits.
        await Promise.allSettled(parallelVendors.map(function (src) {
            return loadScript(src);
        }));

        // Load GSAP-related files in order to preserve plugin dependencies.
        for (var i = 0; i < gsapChain.length; i += 1) {
            try {
                await loadScript(gsapChain[i]);
            } catch (_error) {
                // Continue boot; main.js has guards and fallback behavior.
            }
        }

        try {
            await loadScript("assets/js/main.js");
        } catch (_error) {
            // Main boot failed; no-op to avoid blocking page interactivity.
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", boot);
    } else {
        boot();
    }
})();
