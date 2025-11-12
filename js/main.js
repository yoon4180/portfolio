window.onload = () => {
    // 📍📍📍커서 변경📍📍📍
    $(window).on('mousemove', function (e) {
        let mouseX = e.pageX;
        let mouseY = e.pageY;

        //console.log(mouseX)
        //console.log(mouseY)
        $('.cursor').css({
            'left': mouseX,
            'top': mouseY
        });
    });

    //섹션2,4만 hover로 바뀌게
    $('#section2, #section4').on('mouseenter', function () {
        $('.cursor').addClass('hover')
    });

    $('#section2, #section4').on('mouseleave', function () {
        $('.cursor').removeClass('hover')
    });



    // 📍📍📍내비게이션📍📍📍
    class NavigationEffect {
        constructor(navigation) {
            this.navigation = navigation;
            this.anchors = this.navigation.querySelectorAll("a");
            this.initialD = "M 10,90 Q 100,90 190,90";
            this.hoverD = "M 10,90 Q 100,125 190,90";
            this.activeD = "M 10,90 Q 100,32 190,90";
            this.ease = "elastic.out(1.4, 0.3)";

            this.anchors.forEach((anchor) => {
                anchor.addEventListener("pointerenter", (e) => {
                    this.animateTo(this.hoverD, anchor);
                });

                anchor.addEventListener("pointerleave", () => {
                    this.animateTo(this.initialD, anchor);
                });

                anchor.addEventListener("click", (e) => {
                    this.handlePrevious();
                    this.handleCurrent(anchor);
                    e.preventDefault();
                });
            });
        }

        animateTo(d, anchor, duration = 1) {
            if (anchor.classList.contains("active")) return;
            const path = anchor.querySelector("path");
            gsap.killTweensOf(path);
            gsap.to(path, {
                attr: { d },
                ease: this.ease,
                duration
            });
        }

        handleCurrent(anchor) {
            this.animateTo(this.activeD, anchor);
            anchor.classList.toggle("active");
        }

        handlePrevious() {
            const previous = document.querySelector(".active");
            if (previous) {
                previous.classList.toggle("active");
                this.animateTo(this.initialD, previous);
            }
        }
    }
    new NavigationEffect(document.querySelector("nav"));



    // 📍📍 공용 타이핑 함수 📍📍
    function typeLoop(pTarget, oTarget, text, stay = 1800, typeSpeed = 200, delSpeed = 120) {
        const first = text[0];
        const rest = text.slice(1);

        let idx = 0;
        let isDeleting = false;

        function loop() {
            if (!isDeleting) {
                if (idx === 0) {
                    pTarget.textContent = first;
                    oTarget.textContent = "";
                } else {
                    pTarget.textContent = first;
                    oTarget.textContent = rest.slice(0, idx);
                }
                idx++;

                if (idx > rest.length) {
                    isDeleting = true;
                    setTimeout(loop, stay);
                    return;
                }

            } else {
                if (idx <= 0) {
                    pTarget.textContent = "";
                    oTarget.textContent = "";
                    isDeleting = false;
                    idx = 0;
                } else {
                    oTarget.textContent = rest.slice(0, idx);
                    idx--;
                }
            }

            setTimeout(loop, isDeleting ? delSpeed : typeSpeed);
        }

        loop();
    }

    // ✅ Portfolio
    const p1 = document.querySelector(".p-style");
    const o1 = document.querySelector(".o-style");
    if (p1 && o1) {
        typeLoop(p1, o1, "Portfolio");
    }

    // ✅ Contact
    const p2 = document.querySelector(".p-style-footer");
    const o2 = document.querySelector(".o-style-footer");
    if (p2 && o2) {
        typeLoop(p2, o2, "Contact");
    }



    // 📍📍📍섹션 1 스크롤 효과📍📍📍
    function animateFrom(elem, direction) {
        direction = direction || 1;
        var x = 0,
            y = direction * 100;
        if (elem.classList.contains("gs_reveal_fromLeft")) {
            x = -100;
            y = 0;
        } else if (elem.classList.contains("gs_reveal_fromRight")) {
            x = 100;
            y = 0;
        }
        elem.style.transform = "translate(" + x + "px, " + y + "px)";
        elem.style.opacity = "0";
        gsap.fromTo(elem, { x: x, y: y, autoAlpha: 0 }, {
            duration: 1.25,
            x: 0,
            y: 0,
            autoAlpha: 1,
            ease: "expo",
            overwrite: "auto"
        });
    }

    function hide(elem) {
        gsap.set(elem, { autoAlpha: 0 });
    }

    gsap.utils.toArray(".gs_reveal").forEach(function (elem) {
        hide(elem); // assure that the element is hidden when scrolled into view

        ScrollTrigger.create({
            trigger: elem,
            // markers: true,
            onEnter: function () { animateFrom(elem) },
            onEnterBack: function () { animateFrom(elem, -1) },
            onLeave: function () { hide(elem) } // assure that the element is hidden when scrolled into view
        });
    });



    // 📍📍📍내비 이동📍📍📍
    const navLinks = document.querySelectorAll("nav a");

    navLinks.forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();

            const targetId = link.getAttribute("href").replace("#", "");
            const targetElem = document.getElementById(targetId);

            if (targetElem) {
                targetElem.scrollIntoView({ behavior: "smooth" });
            }
        });
    });


    // 📍📍📍팬시박스📍📍📍
    Fancybox.bind("[data-fancybox]", {
        // Your custom options
    });
}