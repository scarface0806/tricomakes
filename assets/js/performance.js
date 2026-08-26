(function () {
    "use strict";

    function onIdle(fn) {
        if ("requestIdleCallback" in window) {
            window.requestIdleCallback(fn, { timeout: 1500 });
            return;
        }
        window.setTimeout(fn, 1);
    }

    function optimizeImages() {
        var images = document.querySelectorAll("img");
        var seenPrimary = 0;
        var plan = [];

        // Read phase: gather everything up front so no measurement happens after a write.
        images.forEach(function (img) {
            var hasWidth = img.hasAttribute("width");
            var hasHeight = img.hasAttribute("height");
            var entry = {
                img: img,
                decoding: img.hasAttribute("decoding") ? null : "async",
                hasWidth: hasWidth,
                hasHeight: hasHeight,
                nw: 0,
                nh: 0,
                loading: null,
                fetchpriority: null,
                aspectRatio: null
            };

            if (!hasWidth || !hasHeight) {
                entry.nw = img.naturalWidth;
                entry.nh = img.naturalHeight;
                if (!img.style.aspectRatio) {
                    entry.aspectRatio = String(
                        entry.nw > 0 && entry.nh > 0 ? entry.nw / entry.nh : 16 / 9
                    );
                }
            }

            if (!img.hasAttribute("loading")) {
                var isPriority = img.getAttribute("fetchpriority") === "high";
                var isLogo = /logo/i.test(img.getAttribute("src") || "") || img.closest(".navbar-brand");

                if (isPriority || isLogo || seenPrimary < 2) {
                    entry.loading = "eager";
                    if (!img.hasAttribute("fetchpriority")) {
                        entry.fetchpriority = "high";
                    }
                    seenPrimary += 1;
                } else {
                    entry.loading = "lazy";
                }
            }

            plan.push(entry);
        });

        // Write phase: layout is invalidated once, not once per image.
        plan.forEach(function (entry) {
            var img = entry.img;

            if (entry.decoding) {
                img.setAttribute("decoding", entry.decoding);
            }
            if (entry.loading) {
                img.setAttribute("loading", entry.loading);
            }
            if (entry.fetchpriority) {
                img.setAttribute("fetchpriority", entry.fetchpriority);
            }
            if (entry.nw > 0 && entry.nh > 0) {
                if (!entry.hasWidth) {
                    img.setAttribute("width", String(entry.nw));
                }
                if (!entry.hasHeight) {
                    img.setAttribute("height", String(entry.nh));
                }
            }
            if (entry.aspectRatio !== null) {
                img.style.aspectRatio = entry.aspectRatio;
            }
        });
    }

    function optimizeIframes() {
        document.querySelectorAll("iframe").forEach(function (frame) {
            if (!frame.hasAttribute("loading")) {
                frame.setAttribute("loading", "lazy");
            }
            if (!frame.hasAttribute("referrerpolicy")) {
                frame.setAttribute("referrerpolicy", "strict-origin-when-cross-origin");
            }
            if (!frame.hasAttribute("title")) {
                frame.setAttribute("title", "Embedded content");
            }
        });
    }

    function prefetchInternalLinks() {
        if (!document.head) {
            return;
        }

        if (navigator.connection && navigator.connection.saveData) {
            return;
        }

        var links = document.querySelectorAll("a[href]");
        var seen = {};
        var count = 0;
        var maxPrefetch = 10;

        links.forEach(function (link) {
            if (count >= maxPrefetch) {
                return;
            }

            var href = link.getAttribute("href");
            if (!href || href.charAt(0) === "#" || href.indexOf("mailto:") === 0 || href.indexOf("tel:") === 0 || href.indexOf("javascript:") === 0) {
                return;
            }

            var url;
            try {
                url = new URL(href, window.location.href);
            } catch (_error) {
                return;
            }

            if (url.origin !== window.location.origin || url.pathname === window.location.pathname) {
                return;
            }

            if (seen[url.href]) {
                return;
            }

            seen[url.href] = true;
            var prefetch = document.createElement("link");
            prefetch.rel = "prefetch";
            prefetch.as = "document";
            prefetch.href = url.href;
            document.head.appendChild(prefetch);
            count += 1;
        });
    }

    function ensureMainLandmark() {
        if (document.querySelector("main")) {
            return;
        }

        var body = document.body;
        if (!body) {
            return;
        }

        var children = Array.prototype.slice.call(body.children);
        if (!children.length) {
            return;
        }

        var header = body.querySelector("header");
        var footer = body.querySelector("footer");
        var main = document.createElement("main");
        main.id = "main-content";

        var fragment = document.createDocumentFragment();
        var collecting = !header;
        children.forEach(function (node) {
            if (node === header) {
                collecting = true;
                return;
            }

            if (!collecting || node === footer) {
                return;
            }

            var tag = node.tagName ? node.tagName.toLowerCase() : "";
            if (tag === "script" || tag === "noscript") {
                return;
            }

            fragment.appendChild(node);
        });

        if (fragment.childNodes.length) {
            main.appendChild(fragment);
            if (footer && footer.parentNode === body) {
                body.insertBefore(main, footer);
            } else {
                body.appendChild(main);
            }
        }
    }

    function fixInteractiveLabels() {
        document.querySelectorAll("a, button, input[type='submit'], input[type='button']").forEach(function (el) {
            var text = (el.textContent || "").trim().replace(/\s+/g, " ");
            var valueText = (el.getAttribute("value") || "").trim();
            var label = text || valueText;

            if (el.tagName.toLowerCase() === "a" && !label) {
                var href = el.getAttribute("href") || "";
                if (/wa\.me|whatsapp/i.test(href)) {
                    label = "WhatsApp";
                } else if (/instagram\.com/i.test(href)) {
                    label = "Instagram";
                } else if (/linkedin\.com/i.test(href)) {
                    label = "LinkedIn";
                } else if (/facebook\.com/i.test(href)) {
                    label = "Facebook";
                } else if (href) {
                    label = "Open link";
                }
            }

            if (!label) {
                return;
            }

            var aria = el.getAttribute("aria-label");
            if (!aria || aria.trim().toLowerCase() !== label.toLowerCase()) {
                el.setAttribute("aria-label", label);
            }
        });
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", function () {
            optimizeImages();
            optimizeIframes();
            ensureMainLandmark();
            fixInteractiveLabels();
            onIdle(function () {
                document.documentElement.classList.add("perf-ready");
                prefetchInternalLinks();
            });
        });
    } else {
        optimizeImages();
        optimizeIframes();
        ensureMainLandmark();
        fixInteractiveLabels();
        onIdle(prefetchInternalLinks);
    }
})();
