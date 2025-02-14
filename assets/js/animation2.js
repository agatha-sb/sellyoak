const leftColumn = document.querySelector(".oak__product-info-left");
  const rightColumn = document.querySelector(".oak__product-info-scroll");
  const items = document.querySelectorAll(".oak__product-info-scroll > li");
  const scrollableHeight = rightColumn.scrollHeight * 0.8; 

  // Pin the left side while the right side scrolls
  let tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".oak__product-info",
      start: "top 20%",
      end: `+=${scrollableHeight}px`, // End when the right side finishes scrolling
      pin: leftColumn,
      scrub: 1,
      marker: true,
    },
  });

  // Animate each list item in the right column
  items.forEach((item, index) => {
    tl.to(item, {
      opacity: 1,
      y: 0,
      ease: "power1.out",
      duration: 0.5,
    }).to(
      item,
      {
        // opacity: 0,
        y: -20,
        ease: "power1.in",
        duration: 0.5,
      },
      "+=1"
    );
  });




  