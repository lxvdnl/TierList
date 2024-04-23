// #region handle horizontal scrolling of label without following link

const scrollableDivs = document.querySelectorAll(".horizontalScrollDiv");
scrollableDivs.forEach((scrollableDiv) => {
  let isDown = false;
  let startX;
  let scrollLeft;
  let isScrolling = false;

  scrollableDiv.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - scrollableDiv.offsetLeft;
    scrollLeft = scrollableDiv.scrollLeft;
  });

  scrollableDiv.addEventListener("mouseup", () => {
    isDown = false;
    scrollableDiv.classList.remove("active");
    if (isScrolling) {
      setTimeout(() => {
        isScrolling = false;
      }, 100);
    }
  });

  scrollableDiv.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    isScrolling = true;
    const x = e.pageX - scrollableDiv.offsetLeft;
    const walk = (x - startX) * 2;
    scrollableDiv.scrollLeft = scrollLeft - walk;
    scrollableDiv.classList.add("active");
  });

  scrollableDiv.addEventListener("mouseleave", () => {
    isDown = false;
    scrollableDiv.classList.remove("active");
  });

  scrollableDiv.addEventListener("click", (e) => {
    if (isScrolling) {
      e.preventDefault();
    }
  });
});

// #endregion
