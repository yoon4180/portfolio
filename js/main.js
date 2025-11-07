window.onload = () => {
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


    // 📍📍📍Portfolio 제목 타이핑📍📍📍
    const pSpan = document.querySelector(".p-style");
    const oSpan = document.querySelector(".o-style");

    const text = "Portfolio";
    const first = text[0];          // P
    const rest = text.slice(1);     // ortfolio

    let idx = 0;
    let isDeleting = false;

    function loop() {

        if (!isDeleting) {
            // ✅ 타이핑
            if (idx === 0) {
                pSpan.textContent = first;
                oSpan.textContent = "";
            } else {
                pSpan.textContent = first;
                oSpan.textContent = rest.slice(0, idx);
            }

            idx++;

            if (idx > rest.length) {
                isDeleting = true;
                setTimeout(loop, 1800); // 작성 후 멈추는 시간
                return;
            }

        } else {
            // ✅ 삭제
            if (idx <= 0) {
                pSpan.textContent = "";
                oSpan.textContent = "";
                isDeleting = false;
                idx = 0;
            } else {
                oSpan.textContent = rest.slice(0, idx);
                idx--;
            }
        }
        setTimeout(loop, isDeleting ? 120 : 200); // 삭제 시간 : 타이핑 시간
    }
    loop();


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

};//script end