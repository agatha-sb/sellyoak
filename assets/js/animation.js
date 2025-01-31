gsap.registerPlugin(ScrollTrigger);

function setupGSAPAnimations() {
  ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  gsap.globalTimeline.clear();

  if (window.innerWidth > 991) {
    // gsap.to("section[class^='oak__']", {
    //   ease: "none",
    //   scrollTrigger: {
    //     trigger: "body",
    //     start: "top top",
    //     end: "bottom true",
    //     scrub: true,
    //   },
    // });

    gsap.utils.toArray(".oak__marquee").forEach((section) => {
      const marquee1 = section.querySelector(".marquee-1");
      const marquee2 = section.querySelector(".marquee-2");

      ScrollTrigger.create({
        trigger: section,
        start: "top bottom",
        end: "bottom top",
        scrub: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          gsap.to(marquee1, {
            xPercent: -40 * progress,
            ease: "none",
            overwrite: true,
          });

          gsap.to(marquee2, {
            xPercent: 40 * progress,
            ease: "none",
            overwrite: true,
          });
        },
      });
    });

    gsap.utils.toArray(".stir-elem .stir img").forEach((stirImg) => {
      gsap.to(stirImg, {
        rotation: -15,
        ease: "power1.out",
        scrollTrigger: {
          trigger: stirImg,
          start: "top 80%",
          end: "bottom top",
          scrub: true,
        },
      });
    });

    gsap.utils.toArray(".oak__img-parallax").forEach((wrapper) => {
      gsap.fromTo(
        wrapper,
        { y: "-30px" },
        {
          y: "30px",
          scrollTrigger: {
            trigger: wrapper,
            scrub: true,
            start: "top bottom", // Start when the section enters the viewport
            end: "bottom top", // End when the section leaves the viewport
            snap: {
              snapTo: 0.5, // Smooth snapping for a seamless effect
              duration: 1,
              ease: "power4.inOut",
            },
          },
          ease: "none",
        }
      );
    });

    gsap.utils.toArray(".oak__element img").forEach((elem, i) => {
      let speed = elem.dataset.speed || (1 + i * 0.2); // Unique speed per image

      gsap.fromTo(
        elem,
        { yPercent: 40 * speed },  // Each image starts at a different position
        {
          yPercent: 0,  // Moves to neutral position independently
          rotation: -15,
          duration: 4,
          ease: "back",  // Subtle bounce
          scrollTrigger: {
            trigger: elem,  // Each image has its own trigger
            start: "top 100%",  // Begins animation as each enters viewport
            end: "top 20%",
            scrub: true,  // Smooth continuous animation
          },
        }
      );
    });

    // 02. Reveal Up: any element
    gsap.utils.toArray(".oak__reveal-up > *").forEach(function (elem) {
      ScrollTrigger.create({
        trigger: elem,
        start: "top 100%",
        end: "bottom 20%",
        onEnter: function () {
          gsap.fromTo(
            elem,
            { y: 100, autoAlpha: 0 },
            {
              duration: 1.25,
              y: 0,
              autoAlpha: 1,
              ease: "back",
              overwrite: "auto"
            }
          );
        },
      });
    });

    // 03. Reveal Images Left or Right: only images
    let revealContainers = document.querySelectorAll(".abin__img-reveal");
    revealContainers.forEach((container) => {
      let image = container.querySelector("img");
      let isFromRight = container.classList.contains("reveal-right");
      let tl = gsap.timeline({
        scrollTrigger: {
          trigger: container,
          toggleActions: "play reset play reset"
        }
      });

      tl.set(container, { autoAlpha: 1 });
      if (isFromRight) {
        tl.from(container, 1.5, {
          xPercent: 100,
          ease: Power2.out
        });
        tl.from(image, 1.5, {
          xPercent: -100,
          scale: 1.3,
          delay: -1.5,
          ease: Power2.out
        });
      } else {
        tl.from(container, 1.5, {
          xPercent: -100,
          ease: Power2.out
        });
        tl.from(image, 1.5, {
          xPercent: 100,
          scale: 1.3,
          delay: -1.5,
          ease: Power2.out
        });
      }
    });

    // 04. Slide Up or Slide In Text: only p tags
    function createScrollTrigger(triggerElement, timeline) {
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top bottom",
        onLeaveBack: () => {
          timeline.progress(0);
          timeline.pause();
        }
      });
      ScrollTrigger.create({
        trigger: triggerElement,
        start: "top 80%",
        onEnter: () => timeline.play()
      });
    }
    let wordsSlideRight = document.querySelectorAll(".words-slide-from-right p");
    wordsSlideRight.forEach(function (paragraph) {
      let tl = gsap.timeline({ paused: true });
      let words = new SplitType(paragraph, { types: "words, chars", tagName: "span" });
      tl.from(paragraph.querySelectorAll(".word"), {
        opacity: 0,
        x: "1em",
        duration: 0.6,
        ease: "power2.out",
        stagger: { amount: 0.2 }
      });
      createScrollTrigger(paragraph, tl);
    });
    let wordsSlideUp = document.querySelectorAll(".words-slide-up p, .words-slide-up > *");
    wordsSlideUp.forEach(function (paragraph) {
      let tl = gsap.timeline({ paused: true });
      let words = new SplitType(paragraph, { types: "words, chars", tagName: "span" });
      tl.from(paragraph.querySelectorAll(".word"), {
        opacity: 0,
        yPercent: 100,
        duration: 0.5,
        ease: "back.out(2)",
        stagger: { amount: 0.3 }
      });
      createScrollTrigger(paragraph, tl);
    });

  }
}
setupGSAPAnimations();
window.addEventListener("resize", setupGSAPAnimations);

// MAIN: Lenis Initialization
document.addEventListener('DOMContentLoaded', () => {
  const els = document.querySelectorAll(".ukiyo");
  els.forEach((el) => {
    const parallax = new Ukiyo(el);
  });
  const lenis = new Lenis({
    smooth: true,
    lerp: 0.1,
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
});