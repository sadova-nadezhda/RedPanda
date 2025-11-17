window.addEventListener("load", function () {
  (() => {
    const header = document.querySelector(".header");
    const menu = document.querySelector(".menu");
    const burger = document.querySelector(".burger");
    const closeBtn = document.querySelector(".menu-mobs__close");
    const body = document.body;

    if (!header) return;

    const CLASS_ACTIVE = "menu-active";
    const CLASS_SCROLLED = "scrolled";
    const CLASS_SCROLL_DOWN = "scroll-down";

    // ——— helpers ————————————————————————————
    const isOpen = () => header.classList.contains(CLASS_ACTIVE);

    const openMenu = () => {
      header.classList.add(CLASS_ACTIVE);
      body.classList.add(CLASS_ACTIVE);
      if (burger) burger.setAttribute("aria-expanded", "true");
      if (menu) menu.setAttribute("aria-hidden", "false");
    };

    const closeMenu = () => {
      header.classList.remove(CLASS_ACTIVE);
      body.classList.remove(CLASS_ACTIVE);
      if (burger) burger.setAttribute("aria-expanded", "false");
      if (menu) menu.setAttribute("aria-hidden", "true");
    };

    // ——— бургер / закрытие ——————————————————
    burger?.addEventListener("click", (e) => {
      e.preventDefault();
      openMenu();
    });

    closeBtn?.addEventListener("click", (e) => {
      e.preventDefault();
      closeMenu();
    });

    // закрываем по клику на ссылки меню
    document
      .querySelectorAll(".menu__nav-link")
      .forEach((link) => link.addEventListener("click", () => closeMenu()));

    // ——— клик вне .menu для закрытия —————————
    // используем pointerdown чтобы сработать раньше focus/click
    document.addEventListener(
      "pointerdown",
      (e) => {
        if (!isOpen()) return; // меню закрыто — ничего не делаем
        const target = e.target;
        if (!menu) return;

        // не закрываем, если клик внутри меню или по бургеру
        if (menu.contains(target) || burger?.contains(target)) return;

        closeMenu();
      },
      { capture: true } // чтобы отловить даже если внутри есть стопперы
    );

    // ——— закрытие по Esc ————————————————
    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && isOpen()) closeMenu();
    });

    // ——— поведение хедера при скролле ———————
    const raf =
      window.requestAnimationFrame ||
      window.webkitRequestAnimationFrame ||
      window.mozRequestAnimationFrame ||
      ((cb) => setTimeout(cb, 1000 / 60));

    let lastScroll = window.scrollY;
    const DELTA = 10;
    const hideAfter = header.offsetHeight;

    function checkScroll() {
      const cur = window.scrollY;

      // страница не вверху
      if (cur > 0) header.classList.add(CLASS_SCROLLED);
      else header.classList.remove(CLASS_SCROLLED);

      // направление скролла
      if (Math.abs(cur - lastScroll) > DELTA) {
        if (cur > lastScroll && cur > hideAfter) {
          header.classList.add(CLASS_SCROLL_DOWN);
        } else {
          header.classList.remove(CLASS_SCROLL_DOWN);
        }
        lastScroll = cur;
      }
    }

    window.addEventListener("scroll", () => raf(checkScroll), {
      passive: true,
    });
    checkScroll(); // при загрузке

    // ARIA — на всякий случай, если HTML не проставлен
    burger?.setAttribute("aria-controls", menu?.id || "menu");
    burger?.setAttribute("aria-expanded", "false");
    if (menu && !menu.id) menu.id = "menu";
    menu?.setAttribute("aria-hidden", "true");
  })();

  // SUBMENU
  const menuParents = document.querySelectorAll(".menu-nav__parent");

  if (menuParents) {
    menuParents.forEach((parent) => {
      parent.addEventListener("mouseenter", () => {
        parent.classList.add("active");
      });
      parent.addEventListener("mouseleave", () => {
        parent.classList.remove("active");
      });

      // --- первый пункт выпадашки ---
      const dropdown =
        parent.querySelector(".submenu");
      const firstItem =
        dropdown?.querySelector(
          "a, button, [role='menuitem'], [tabindex]:not([tabindex='-1'])"
        ) || null;

      if (firstItem) {
        firstItem.addEventListener("mouseenter", () => {
          parent.classList.add("grey");
        });
        firstItem.addEventListener("mouseleave", () => {
          parent.classList.remove("grey");
        });

        firstItem.addEventListener("focus", () => {
          parent.classList.add("grey");
        }, true);
        firstItem.addEventListener("blur", () => {
          parent.classList.remove("grey");
        }, true);
      }
    });
  }

  const mobileWidget = document.querySelector(".mobile-widget");

  if (mobileWidget) {
    const mobileWidgetCaller = mobileWidget.querySelector(
      ".mobile-widget__caller"
    );

    const links = mobileWidget.querySelectorAll(
      ".mobile-widget__box .mobile-widget__link"
    );

    mobileWidgetCaller.addEventListener("click", () => {
      mobileWidget.classList.toggle("active");

      // Если активен — запускаем анимацию появления
      if (mobileWidget.classList.contains("active")) {
        links.forEach((link, index) => {
          setTimeout(() => {
            link.classList.add("active");
          }, index * 150); // задержка между элементами (150 мс)
        });
      } else {
        // Если выключен — убираем все active сразу
        links.forEach((link) => link.classList.remove("active"));
      }
    });
  }

  // Swiper

  var trustSwiper = new Swiper(".trustSwiper", {
    loop: true,
    navigation: {
      nextEl: ".trust-next",
      prevEl: ".trust-prev",
    },
    pagination: {
      el: ".trust-pagination",
      type: "fraction",
    },
  });

  var reviewsSwiper = new Swiper(".reviewsSwiper", {
    loop: true,
    effect: "fade",
    navigation: {
      nextEl: ".reviews-next",
      prevEl: ".reviews-prev",
    },
    pagination: {
      el: ".reviews-pagination",
      type: "fraction",
    },
  });

  var designSwiper = new Swiper(".designSwiper", {
    pagination: {
      el: ".design-pagination",
    },
  });

  var historySwiper = new Swiper(".historySwiper", {
    spaceBetween: 0,
    slidesPerView: 3,
    watchSlidesProgress: true,
    breakpoints: {
      768: {
        slidesPerView: 5,
      }
    }
  });
  var historySwiper2 = new Swiper(".historySwiper2", {
    spaceBetween: 16,
    autoHeight: true,
    // navigation: {
    //   nextEl: ".history-next",
    //   prevEl: ".history-prev",
    // },
    thumbs: {
      swiper: historySwiper,
    },
  });

  // History

  document.querySelectorAll('.history__cards').forEach(cardsContainer => {
    const cards = cardsContainer.querySelectorAll('.history__card');

    cards.forEach(card => {
      card.addEventListener('click', () => {
        cards.forEach(c => c.classList.remove('active'));
        card.classList.add('active');
      });
    });
  });

  // Stages

  const items = document.querySelectorAll('.stages__item');

  items.forEach(item => {
    item.addEventListener('click', () => {
      items.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // Accordion

  const AccItems = document.querySelectorAll(".accordion__item");

  AccItems.forEach((item) => {
    item.addEventListener("click", function () {
      AccItems.forEach((el) => {
        if (el !== item) {
          el.classList.remove("active");
          const body = el.querySelector(".accordion__body");
          body.style.maxHeight = null;
        }
      });

      this.classList.toggle("active");
      const accBody = this.querySelector(".accordion__body");

      if (this.classList.contains("active")) {
        accBody.style.maxHeight = accBody.scrollHeight + "px";
      } else {
        accBody.style.maxHeight = null;
      }
    });
  });

  // Interactive Image

  const images = document.querySelectorAll(".interactive-image");

  images.forEach(img => {
    const container = img.parentElement; // .stock-card__img

    container.style.perspective = "1000px";

    container.addEventListener("mousemove", (e) => {
      const rect = container.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const halfW = rect.width / 2;
      const halfH = rect.height / 2;

      const rotateX = ((y - halfH) / halfH) * 10;
      const rotateY = -((x - halfW) / halfW) * 10;

      img.style.transform =
        `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05) translateZ(0)`;
    });

    container.addEventListener("mouseleave", () => {
      img.style.transform =
        `rotateX(0) rotateY(0) scale(1) translateZ(0)`;
    });
  });

  // Widjet

   const fab = document.querySelector(".fab-container");
  if (!fab) return;

  // Колонка с дополнительными кнопками
  const listContainer = fab.querySelector(".flex");
  if (!listContainer) return;

  // Все "дочерние" .group внутри колонки — это 4 экшн-кнопки
  const actionRows = Array.from(
    listContainer.querySelectorAll(".group")
  );

  const mainButton = fab.querySelector(".fab-main");
  if (!mainButton) return;

  const mainGroup = mainButton.closest(".group");
  const mainTooltipSpan = mainGroup?.querySelector(".fab-tooltip span");

  let isOpen = false;
  const transitionDuration = 200;

  actionRows.forEach((row, index) => {
    row.style.display = "none";
    row.style.opacity = "0";
    row.style.transform = "translateY(10px)";
    row.style.transition = "opacity 0.2s ease, transform 0.2s ease";
  });

  function setOpen(open) {
    isOpen = open;

    actionRows.forEach((row) => {
      if (open) {
        row.style.display = "flex";
        requestAnimationFrame(() => {
          row.style.opacity = "1";
          row.style.transform = "translateY(0)";
        });
      } else {
        row.style.opacity = "0";
        row.style.transform = "translateY(10px)";
        setTimeout(() => {
          if (!isOpen) {
            row.style.display = "none";
          }
        }, transitionDuration);
      }
    });

    if (mainTooltipSpan) {
      mainTooltipSpan.textContent = open
        ? "Закрыть"
        : "Связаться с нами";
    }
  }

  setOpen(false);

  mainButton.addEventListener("click", () => {
    setOpen(!isOpen);
  });

  const requestRow = actionRows[0];
  if (requestRow) {
    const requestBtn = requestRow.querySelector("button.fab-item");
    if (requestBtn) {
      requestBtn.addEventListener("click", () => {
        if (typeof window.openCalculationFormPopup === "function") {
          window.openCalculationFormPopup();
        }
        setOpen(false);
      });
    }
  }

  // Pallete

  const pantoneColors = [{
      name: "PANTONE 100 C",
      hex: "#F4EC6A",
      rgb: "244, 236, 106",
      cmyk: "4, 0, 65, 0"
  }, {
      name: "PANTONE 101 C",
      hex: "#F9EB77",
      rgb: "249, 235, 119",
      cmyk: "2, 1, 62, 0"
  }, {
      name: "PANTONE 102 C",
      hex: "#FBE100",
      rgb: "251, 225, 0",
      cmyk: "1, 9, 100, 0"
  }, {
      name: "PANTONE Yellow C",
      hex: "#FEDD00",
      rgb: "254, 221, 0",
      cmyk: "0, 11, 100, 0"
  }, {
      name: "PANTONE 103 C",
      hex: "#E9CD00",
      rgb: "233, 205, 0",
      cmyk: "7, 14, 100, 1"
  }, {
      name: "PANTONE 104 C",
      hex: "#D6B900",
      rgb: "214, 185, 0",
      cmyk: "14, 21, 100, 3"
  }, {
      name: "PANTONE 105 C",
      hex: "#C7A800",
      rgb: "199, 168, 0",
      cmyk: "21, 29, 100, 7"
  }, {
      name: "PANTONE 106 C",
      hex: "#F9E467",
      rgb: "249, 228, 103",
      cmyk: "2, 8, 70, 0"
  }, {
      name: "PANTONE 107 C",
      hex: "#FBE122",
      rgb: "251, 225, 34",
      cmyk: "1, 10, 95, 0"
  }, {
      name: "PANTONE 108 C",
      hex: "#FDD900",
      rgb: "253, 217, 0",
      cmyk: "0, 13, 100, 0"
  }, {
      name: "PANTONE 109 C",
      hex: "#FFD100",
      rgb: "255, 209, 0",
      cmyk: "0, 18, 100, 0"
  }, {
      name: "PANTONE 110 C",
      hex: "#EAB900",
      rgb: "234, 185, 0",
      cmyk: "7, 24, 100, 1"
  }, {
      name: "PANTONE 111 C",
      hex: "#D9A900",
      rgb: "217, 169, 0",
      cmyk: "13, 30, 100, 2"
  }, {
      name: "PANTONE 112 C",
      hex: "#C39500",
      rgb: "195, 149, 0",
      cmyk: "21, 37, 100, 8"
  }, {
      name: "PANTONE 113 C",
      hex: "#FFD95A",
      rgb: "255, 217, 90",
      cmyk: "0, 15, 75, 0"
  }, {
      name: "PANTONE 114 C",
      hex: "#FFD447",
      rgb: "255, 212, 71",
      cmyk: "0, 17, 80, 0"
  }, {
      name: "PANTONE 115 C",
      hex: "#FFCD00",
      rgb: "255, 205, 0",
      cmyk: "0, 20, 100, 0"
  }, {
      name: "PANTONE 116 C",
      hex: "#FFC700",
      rgb: "255, 199, 0",
      cmyk: "0, 23, 100, 0"
  }, {
      name: "PANTONE 117 C",
      hex: "#EAA900",
      rgb: "234, 169, 0",
      cmyk: "6, 33, 100, 0"
  }, {
      name: "PANTONE 118 C",
      hex: "#D69A00",
      rgb: "214, 154, 0",
      cmyk: "13, 38, 100, 3"
  }, {
      name: "PANTONE 119 C",
      hex: "#B98000",
      rgb: "185, 128, 0",
      cmyk: "25, 45, 100, 12"
  }, {
      name: "PANTONE 120 C",
      hex: "#FCE59C",
      rgb: "252, 229, 156",
      cmyk: "1, 10, 45, 0"
  }, {
      name: "PANTONE 1205 C",
      hex: "#F6D898",
      rgb: "246, 216, 152",
      cmyk: "3, 15, 45, 0"
  }, {
      name: "PANTONE 121 C",
      hex: "#FDE08D",
      rgb: "253, 224, 141",
      cmyk: "1, 12, 52, 0"
  }, {
      name: "PANTONE 1215 C",
      hex: "#F6D173",
      rgb: "246, 209, 115",
      cmyk: "3, 18, 65, 0"
  }, {
      name: "PANTONE 122 C",
      hex: "#FEDA70",
      rgb: "254, 218, 112",
      cmyk: "0, 15, 65, 0"
  }, {
      name: "PANTONE 1225 C",
      hex: "#FFC845",
      rgb: "255, 200, 69",
      cmyk: "0, 23, 82, 0"
  }, {
      name: "PANTONE 123 C",
      hex: "#FFC20E",
      rgb: "255, 194, 14",
      cmyk: "0, 25, 99, 0"
  }, {
      name: "PANTONE 1235 C",
      hex: "#FFB500",
      rgb: "255, 181, 0",
      cmyk: "0, 30, 100, 0"
  }, {
      name: "PANTONE 124 C",
      hex: "#E2A400",
      rgb: "226, 164, 0",
      cmyk: "9, 34, 100, 1"
  }, {
      name: "PANTONE 125 C",
      hex: "#CE9100",
      rgb: "206, 145, 0",
      cmyk: "17, 40, 100, 6"
  }, {
      name: "PANTONE 1255 C",
      hex: "#B17F00",
      rgb: "177, 127, 0",
      cmyk: "27, 45, 100, 15"
  }, {
      name: "PANTONE 126 C",
      hex: "#9A6D00",
      rgb: "154, 109, 0",
      cmyk: "34, 51, 100, 28"
  }, {
      name: "PANTONE 1265 C",
      hex: "#916B00",
      rgb: "145, 107, 0",
      cmyk: "36, 50, 100, 35"
  }, {
      name: "PANTONE Orange 021 C",
      hex: "#FE5000",
      rgb: "254, 80, 0",
      cmyk: "0, 80, 100, 0"
  }, {
      name: "PANTONE 134 C",
      hex: "#FFBE7B",
      rgb: "255, 190, 123",
      cmyk: "0, 28, 59, 0"
  }, {
      name: "PANTONE 1345 C",
      hex: "#FFAE62",
      rgb: "255, 174, 98",
      cmyk: "0, 35, 70, 0"
  }, {
      name: "PANTONE 135 C",
      hex: "#FFB86A",
      rgb: "255, 184, 106",
      cmyk: "0, 30, 66, 0"
  }, {
      name: "PANTONE 1355 C",
      hex: "#FFA14F",
      rgb: "255, 161, 79",
      cmyk: "0, 41, 78, 0"
  }, {
      name: "PANTONE 136 C",
      hex: "#FFB14E",
      rgb: "255, 177, 78",
      cmyk: "0, 34, 78, 0"
  }, {
      name: "PANTONE 1365 C",
      hex: "#FF9100",
      rgb: "255, 145, 0",
      cmyk: "0, 48, 100, 0"
  }, {
      name: "PANTONE 137 C",
      hex: "#FFAA00",
      rgb: "255, 170, 0",
      cmyk: "0, 36, 100, 0"
  }, {
      name: "PANTONE 1375 C",
      hex: "#F28C00",
      rgb: "242, 140, 0",
      cmyk: "0, 50, 100, 0"
  }, {
      name: "PANTONE 138 C",
      hex: "#E18B00",
      rgb: "225, 139, 0",
      cmyk: "8, 48, 100, 1"
  }, {
      name: "PANTONE 1385 C",
      hex: "#D47700",
      rgb: "212, 119, 0",
      cmyk: "12, 56, 100, 3"
  }, {
      name: "PANTONE 139 C",
      hex: "#C77B00",
      rgb: "199, 123, 0",
      cmyk: "19, 52, 100, 8"
  }, {
      name: "PANTONE 1395 C",
      hex: "#B66700",
      rgb: "182, 103, 0",
      cmyk: "24, 60, 100, 15"
  }, {
      name: "PANTONE 140 C",
      hex: "#9E6600",
      rgb: "158, 102, 0",
      cmyk: "31, 56, 100, 25"
  }, {
      name: "PANTONE 1405 C",
      hex: "#9A5B00",
      rgb: "154, 91, 0",
      cmyk: "32, 65, 100, 30"
  }, {
      name: "PANTONE Red 032 C",
      hex: "#EF3340",
      rgb: "239, 51, 64",
      cmyk: "0, 90, 76, 0"
  }, {
      name: "PANTONE 176 C",
      hex: "#F06B84",
      rgb: "240, 107, 132",
      cmyk: "0, 68, 30, 0"
  }, {
      name: "PANTONE 1765 C",
      hex: "#F36C83",
      rgb: "243, 108, 131",
      cmyk: "0, 69, 31, 0"
  }, {
      name: "PANTONE 1767 C",
      hex: "#F4627E",
      rgb: "244, 98, 126",
      cmyk: "0, 75, 41, 0"
  }, {
      name: "PANTONE 177 C",
      hex: "#EA5E77",
      rgb: "234, 94, 119",
      cmyk: "1, 75, 40, 0"
  }, {
      name: "PANTONE 1775 C",
      hex: "#E9506A",
      rgb: "233, 80, 106",
      cmyk: "1, 82, 49, 0"
  }, {
      name: "PANTONE 1777 C",
      hex: "#F45672",
      rgb: "244, 86, 114",
      cmyk: "0, 81, 46, 0"
  }, {
      name: "PANTONE 178 C",
      hex: "#E3445C",
      rgb: "227, 68, 92",
      cmyk: "3, 85, 54, 1"
  }, {
      name: "PANTONE 1785 C",
      hex: "#D92D48",
      rgb: "217, 45, 72",
      cmyk: "5, 94, 63, 1"
  }, {
      name: "PANTONE 1787 C",
      hex: "#F34C67",
      rgb: "243, 76, 103",
      cmyk: "0, 84, 52, 0"
  }, {
      name: "PANTONE 1788 C",
      hex: "#F21A3B",
      rgb: "242, 26, 59",
      cmyk: "0, 97, 72, 0"
  }, {
      name: "PANTONE 179 C",
      hex: "#D0384E",
      rgb: "208, 56, 78",
      cmyk: "12, 90, 63, 2"
  }, {
      name: "PANTONE 1795 C",
      hex: "#D12139",
      rgb: "209, 33, 57",
      cmyk: "9, 99, 69, 2"
  }, {
      name: "PANTONE 1797 C",
      hex: "#D4203D",
      rgb: "212, 32, 61",
      cmyk: "10, 99, 69, 1"
  }, {
      name: "PANTONE 180 C",
      hex: "#BE3A4C",
      rgb: "190, 58, 76",
      cmyk: "21, 89, 61, 7"
  }, {
      name: "PANTONE 1805 C",
      hex: "#B91C31",
      rgb: "185, 28, 49",
      cmyk: "20, 100, 79, 11"
  }, {
      name: "PANTONE 1807 C",
      hex: "#BB1E34",
      rgb: "187, 30, 52",
      cmyk: "21, 100, 77, 10"
  }, {
      name: "PANTONE 181 C",
      hex: "#9E3445",
      rgb: "158, 52, 69",
      cmyk: "31, 89, 62, 23"
  }, {
      name: "PANTONE 1815 C",
      hex: "#9A1F2D",
      rgb: "154, 31, 45",
      cmyk: "32, 98, 77, 28"
  }, {
      name: "PANTONE 1817 C",
      hex: "#A5192D",
      rgb: "165, 25, 45",
      cmyk: "28, 100, 81, 21"
  }, {
      name: "PANTONE 182 C",
      hex: "#F690A3",
      rgb: "246, 144, 163",
      cmyk: "0, 50, 18, 0"
  }, {
      name: "PANTONE 183 C",
      hex: "#F47990",
      rgb: "244, 121, 144",
      cmyk: "0, 62, 27, 0"
  }, {
      name: "PANTONE 184 C",
      hex: "#EF5D7C",
      rgb: "239, 93, 124",
      cmyk: "0, 76, 38, 0"
  }, {
      name: "PANTONE 185 C",
      hex: "#E8002B",
      rgb: "232, 0, 43",
      cmyk: "3, 100, 88, 1"
  }, {
      name: "PANTONE 186 C",
      hex: "#CE0029",
      rgb: "206, 0, 41",
      cmyk: "12, 100, 89, 3"
  }, {
      name: "PANTONE 187 C",
      hex: "#B10021",
      rgb: "177, 0, 33",
      cmyk: "22, 100, 91, 13"
  }, {
      name: "PANTONE 188 C",
      hex: "#91001A",
      rgb: "145, 0, 26",
      cmyk: "33, 100, 91, 30"
  }, {
      name: "PANTONE Rubine Red C",
      hex: "#CE0058",
      rgb: "206, 0, 88",
      cmyk: "12, 100, 50, 2"
  }, {
      name: "PANTONE 189 C",
      hex: "#F8B5C4",
      rgb: "248, 181, 196",
      cmyk: "0, 32, 9, 0"
  }, {
      name: "PANTONE 1895 C",
      hex: "#FBB9CB",
      rgb: "251, 185, 203",
      cmyk: "0, 31, 7, 0"
  }, {
      name: "PANTONE 190 C",
      hex: "#F6A4BA",
      rgb: "246, 164, 186",
      cmyk: "0, 41, 11, 0"
  }, {
      name: "PANTONE 1905 C",
      hex: "#F281A4",
      rgb: "242, 129, 164",
      cmyk: "0, 60, 12, 0"
  }, {
      name: "PANTONE 191 C",
      hex: "#F17E9A",
      rgb: "241, 126, 154",
      cmyk: "0, 61, 22, 0"
  }, {
      name: "PANTONE 1915 C",
      hex: "#E45B8A",
      rgb: "228, 91, 138",
      cmyk: "4, 78, 22, 0"
  }, {
      name: "PANTONE 192 C",
      hex: "#E95484",
      rgb: "233, 84, 132",
      cmyk: "1, 80, 27, 0"
  }, {
      name: "PANTONE 1925 C",
      hex: "#D9196C",
      rgb: "217, 25, 108",
      cmyk: "7, 100, 37, 1"
  }, {
      name: "PANTONE 193 C",
      hex: "#D2406F",
      rgb: "210, 64, 111",
      cmyk: "12, 88, 32, 1"
  }, {
      name: "PANTONE 1935 C",
      hex: "#C3165F",
      rgb: "195, 22, 95",
      cmyk: "16, 100, 42, 7"
  }, {
      name: "PANTONE 194 C",
      hex: "#BE3F63",
      rgb: "190, 63, 99",
      cmyk: "21, 87, 39, 6"
  }, {
      name: "PANTONE 1945 C",
      hex: "#A81450",
      rgb: "168, 20, 80",
      cmyk: "26, 100, 48, 19"
  }, {
      name: "PANTONE 195 C",
      hex: "#9E3A56",
      rgb: "158, 58, 86",
      cmyk: "31, 86, 42, 23"
  }, {
      name: "PANTONE 1955 C",
      hex: "#8F1345",
      rgb: "143, 19, 69",
      cmyk: "35, 100, 52, 33"
  }, {
      name: "PANTONE Blue 072 C",
      hex: "#002F87",
      rgb: "0, 47, 135",
      cmyk: "100, 85, 6, 3"
  }, {
      name: "PANTONE 277 C",
      hex: "#BCCCE3",
      rgb: "188, 204, 227",
      cmyk: "24, 12, 2, 0"
  }, {
      name: "PANTONE 278 C",
      hex: "#93B3D7",
      rgb: "147, 179, 215",
      cmyk: "40, 21, 2, 0"
  }, {
      name: "PANTONE 279 C",
      hex: "#418FDE",
      rgb: "65, 143, 222",
      cmyk: "73, 41, 0, 0"
  }, {
      name: "PANTONE 280 C",
      hex: "#002855",
      rgb: "0, 40, 85",
      cmyk: "100, 85, 28, 39"
  }, {
      name: "PANTONE 281 C",
      hex: "#00205B",
      rgb: "0, 32, 91",
      cmyk: "100, 89, 31, 35"
  }, {
      name: "PANTONE 282 C",
      hex: "#001D4A",
      rgb: "0, 29, 74",
      cmyk: "100, 88, 43, 47"
  }, {
      name: "PANTONE 283 C",
      hex: "#A3C4E3",
      rgb: "163, 196, 227",
      cmyk: "34, 15, 3, 0"
  }, {
      name: "PANTONE 284 C",
      hex: "#6CACE4",
      rgb: "108, 172, 228",
      cmyk: "59, 23, 0, 0"
  }, {
      name: "PANTONE 285 C",
      hex: "#0073CF",
      rgb: "0, 115, 207",
      cmyk: "96, 49, 0, 0"
  }, {
      name: "PANTONE 286 C",
      hex: "#003DA5",
      rgb: "0, 61, 165",
      cmyk: "100, 75, 0, 0"
  }, {
      name: "PANTONE 287 C",
      hex: "#00327D",
      rgb: "0, 50, 125",
      cmyk: "100, 78, 15, 6"
  }, {
      name: "PANTONE 288 C",
      hex: "#002D72",
      rgb: "0, 45, 114",
      cmyk: "100, 83, 21, 16"
  }, {
      name: "PANTONE 289 C",
      hex: "#002654",
      rgb: "0, 38, 84",
      cmyk: "100, 83, 37, 40"
  }, {
      name: "PANTONE 290 C",
      hex: "#C2DFF4",
      rgb: "194, 223, 244",
      cmyk: "22, 6, 2, 0"
  }, {
      name: "PANTONE 2905 C",
      hex: "#A8D4F0",
      rgb: "168, 212, 240",
      cmyk: "32, 5, 2, 0"
  }, {
      name: "PANTONE 291 C",
      hex: "#9FCDED",
      rgb: "159, 205, 237",
      cmyk: "36, 11, 2, 0"
  }, {
      name: "PANTONE 2915 C",
      hex: "#6EC3EE",
      rgb: "110, 195, 238",
      cmyk: "56, 10, 0, 0"
  }, {
      name: "PANTONE 292 C",
      hex: "#63BBEA",
      rgb: "99, 187, 234",
      cmyk: "60, 14, 0, 0"
  }, {
      name: "PANTONE 2925 C",
      hex: "#00A9E0",
      rgb: "0, 169, 224",
      cmyk: "87, 16, 0, 0"
  }, {
      name: "PANTONE 293 C",
      hex: "#0062B8",
      rgb: "0, 98, 184",
      cmyk: "100, 55, 0, 0"
  }, {
      name: "PANTONE 2935 C",
      hex: "#005EB8",
      rgb: "0, 94, 184",
      cmyk: "100, 58, 0, 0"
  }, {
      name: "PANTONE 294 C",
      hex: "#004B8D",
      rgb: "0, 75, 141",
      cmyk: "100, 69, 9, 4"
  }, {
      name: "PANTONE 2945 C",
      hex: "#004C8A",
      rgb: "0, 76, 138",
      cmyk: "100, 68, 15, 6"
  }, {
      name: "PANTONE 295 C",
      hex: "#003A6C",
      rgb: "0, 58, 108",
      cmyk: "100, 74, 27, 22"
  }, {
      name: "PANTONE 2955 C",
      hex: "#003666",
      rgb: "0, 54, 102",
      cmyk: "100, 72, 32, 28"
  }, {
      name: "PANTONE 296 C",
      hex: "#00284D",
      rgb: "0, 40, 77",
      cmyk: "100, 78, 41, 46"
  }, {
      name: "PANTONE 2965 C",
      hex: "#002D51",
      rgb: "0, 45, 81",
      cmyk: "100, 73, 40, 44"
  }, {
      name: "PANTONE Green C",
      hex: "#009E48",
      rgb: "0, 158, 72",
      cmyk: "91, 0, 92, 0"
  }, {
      name: "PANTONE 344 C",
      hex: "#B8DDCC",
      rgb: "184, 221, 204",
      cmyk: "29, 0, 27, 0"
  }, {
      name: "PANTONE 345 C",
      hex: "#8FCCA8",
      rgb: "143, 204, 168",
      cmyk: "44, 0, 41, 0"
  }, {
      name: "PANTONE 346 C",
      hex: "#52B788",
      rgb: "82, 183, 136",
      cmyk: "65, 0, 53, 1"
  }, {
      name: "PANTONE 347 C",
      hex: "#00965E",
      rgb: "0, 150, 94",
      cmyk: "90, 0, 74, 0"
  }, {
      name: "PANTONE 348 C",
      hex: "#00844F",
      rgb: "0, 132, 79",
      cmyk: "98, 3, 85, 9"
  }, {
      name: "PANTONE 349 C",
      hex: "#006643",
      rgb: "0, 102, 67",
      cmyk: "97, 16, 80, 40"
  }, {
      name: "PANTONE 350 C",
      hex: "#004B2F",
      rgb: "0, 75, 47",
      cmyk: "97, 26, 82, 59"
  }, {
      name: "PANTONE 351 C",
      hex: "#B4E1D1",
      rgb: "180, 225, 209",
      cmyk: "30, 0, 26, 0"
  }, {
      name: "PANTONE 352 C",
      hex: "#87D3B9",
      rgb: "135, 211, 185",
      cmyk: "46, 0, 36, 0"
  }, {
      name: "PANTONE 353 C",
      hex: "#50C5A0",
      rgb: "80, 197, 160",
      cmyk: "65, 0, 47, 0"
  }, {
      name: "PANTONE 354 C",
      hex: "#00B083",
      rgb: "0, 176, 131",
      cmyk: "83, 0, 58, 0"
  }, {
      name: "PANTONE 355 C",
      hex: "#00A06A",
      rgb: "0, 160, 106",
      cmyk: "91, 0, 72, 1"
  }, {
      name: "PANTONE 356 C",
      hex: "#007A53",
      rgb: "0, 122, 83",
      cmyk: "95, 7, 78, 25"
  }, {
      name: "PANTONE 357 C",
      hex: "#00563C",
      rgb: "0, 86, 60",
      cmyk: "96, 22, 80, 50"
  }, {
      name: "PANTONE 360 C",
      hex: "#7DC771",
      rgb: "125, 199, 113",
      cmyk: "51, 0, 68, 0"
  }, {
      name: "PANTONE 361 C",
      hex: "#44B54D",
      rgb: "68, 181, 77",
      cmyk: "72, 0, 83, 0"
  }, {
      name: "PANTONE 362 C",
      hex: "#00984D",
      rgb: "0, 152, 77",
      cmyk: "85, 0, 86, 1"
  }, {
      name: "PANTONE 363 C",
      hex: "#008544",
      rgb: "0, 133, 68",
      cmyk: "92, 4, 91, 9"
  }, {
      name: "PANTONE 364 C",
      hex: "#006B3A",
      rgb: "0, 107, 58",
      cmyk: "93, 14, 90, 37"
  }, {
      name: "PANTONE 372 C",
      hex: "#E4ED88",
      rgb: "228, 237, 136",
      cmyk: "12, 0, 53, 0"
  }, {
      name: "PANTONE 373 C",
      hex: "#D6E778",
      rgb: "214, 231, 120",
      cmyk: "18, 0, 61, 0"
  }, {
      name: "PANTONE 374 C",
      hex: "#C7E054",
      rgb: "199, 224, 84",
      cmyk: "25, 0, 74, 0"
  }, {
      name: "PANTONE 375 C",
      hex: "#B5D932",
      rgb: "181, 217, 50",
      cmyk: "33, 0, 89, 0"
  }, {
      name: "PANTONE 376 C",
      hex: "#8DC63F",
      rgb: "141, 198, 63",
      cmyk: "51, 0, 93, 0"
  }, {
      name: "PANTONE 377 C",
      hex: "#6BAB33",
      rgb: "107, 171, 51",
      cmyk: "61, 0, 97, 10"
  }, {
      name: "PANTONE 378 C",
      hex: "#528C2C",
      rgb: "82, 140, 44",
      cmyk: "70, 13, 100, 27"
  }, {
      name: "PANTONE Black C",
      hex: "#231F20",
      rgb: "35, 31, 32",
      cmyk: "75, 68, 67, 90"
  }, {
      name: "PANTONE Cool Gray 1 C",
      hex: "#E9E9E8",
      rgb: "233, 233, 232",
      cmyk: "5, 4, 4, 0"
  }, {
      name: "PANTONE Cool Gray 2 C",
      hex: "#E1E1E1",
      rgb: "225, 225, 225",
      cmyk: "7, 5, 5, 0"
  }, {
      name: "PANTONE Cool Gray 3 C",
      hex: "#D4D5D4",
      rgb: "212, 213, 212",
      cmyk: "12, 9, 9, 0"
  }, {
      name: "PANTONE Cool Gray 4 C",
      hex: "#C6C7C4",
      rgb: "198, 199, 196",
      cmyk: "18, 13, 14, 0"
  }, {
      name: "PANTONE Cool Gray 5 C",
      hex: "#B9BABA",
      rgb: "185, 186, 186",
      cmyk: "24, 18, 17, 0"
  }, {
      name: "PANTONE Cool Gray 6 C",
      hex: "#A7A9AC",
      rgb: "167, 169, 172",
      cmyk: "31, 23, 21, 0"
  }, {
      name: "PANTONE Cool Gray 7 C",
      hex: "#939598",
      rgb: "147, 149, 152",
      cmyk: "40, 31, 28, 1"
  }, {
      name: "PANTONE Cool Gray 8 C",
      hex: "#808285",
      rgb: "128, 130, 133",
      cmyk: "50, 40, 36, 5"
  }, {
      name: "PANTONE Cool Gray 9 C",
      hex: "#6D6E71",
      rgb: "109, 110, 113",
      cmyk: "59, 49, 45, 18"
  }, {
      name: "PANTONE Cool Gray 10 C",
      hex: "#58595B",
      rgb: "88, 89, 91",
      cmyk: "67, 58, 54, 34"
  }, {
      name: "PANTONE Cool Gray 11 C",
      hex: "#414042",
      rgb: "65, 64, 66",
      cmyk: "73, 65, 61, 51"
  }, {
      name: "PANTONE Warm Gray 1 C",
      hex: "#EBE9E4",
      rgb: "235, 233, 228",
      cmyk: "5, 5, 7, 0"
  }, {
      name: "PANTONE Warm Gray 2 C",
      hex: "#E2DFD9",
      rgb: "226, 223, 217",
      cmyk: "7, 7, 10, 0"
  }, {
      name: "PANTONE Warm Gray 3 C",
      hex: "#D4D1CA",
      rgb: "212, 209, 202",
      cmyk: "12, 11, 15, 0"
  }, {
      name: "PANTONE Warm Gray 4 C",
      hex: "#C6C2B9",
      rgb: "198, 194, 185",
      cmyk: "18, 17, 23, 0"
  }, {
      name: "PANTONE Warm Gray 5 C",
      hex: "#B9B5A9",
      rgb: "185, 181, 169",
      cmyk: "24, 23, 31, 0"
  }, {
      name: "PANTONE Warm Gray 6 C",
      hex: "#A8A398",
      rgb: "168, 163, 152",
      cmyk: "31, 29, 38, 1"
  }, {
      name: "PANTONE Warm Gray 7 C",
      hex: "#948F82",
      rgb: "148, 143, 130",
      cmyk: "40, 38, 48, 5"
  }, {
      name: "PANTONE Warm Gray 8 C",
      hex: "#817B6F",
      rgb: "129, 123, 111",
      cmyk: "50, 48, 57, 13"
  }, {
      name: "PANTONE Warm Gray 9 C",
      hex: "#6F695F",
      rgb: "111, 105, 95",
      cmyk: "59, 57, 66, 25"
  }, {
      name: "PANTONE Warm Gray 10 C",
      hex: "#5C564B",
      rgb: "92, 86, 75",
      cmyk: "67, 65, 72, 40"
  }, {
      name: "PANTONE Warm Gray 11 C",
      hex: "#4A443A",
      rgb: "74, 68, 58",
      cmyk: "72, 70, 76, 55"
  }];

  // ================== УТИЛИТЫ ДЛЯ ЦВЕТА ==================
  function hslToRgb(h, s, l) {
    let r, g, b;
    if (s === 0) {
      r = g = b = l;
    } else {
      const hue2rgb = (p, q, t) => {
        if (t < 0) t += 1;
        if (t > 1) t -= 1;
        if (t < 1/6) return p + (q - p) * 6 * t;
        if (t < 1/2) return q;
        if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
        return p;
      };
      const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
      const p = 2 * l - q;
      r = hue2rgb(p, q, h + 1/3);
      g = hue2rgb(p, q, h);
      b = hue2rgb(p, q, h - 1/3);
    }
    return [
      Math.round(r * 255),
      Math.round(g * 255),
      Math.round(b * 255)
    ];
  }

  function rgbToLab(rgb) {
    let [r, g, b] = rgb.map(v => v / 255);
    r = r > 0.04045 ? Math.pow((r + 0.055) / 1.055, 2.4) : r / 12.92;
    g = g > 0.04045 ? Math.pow((g + 0.055) / 1.055, 2.4) : g / 12.92;
    b = b > 0.04045 ? Math.pow((b + 0.055) / 1.055, 2.4) : b / 12.92;

    let x = (r * 0.4124 + g * 0.3576 + b * 0.1805) / 0.95047;
    let y = (r * 0.2126 + g * 0.7152 + b * 0.0722) / 1.00000;
    let z = (r * 0.0193 + g * 0.1192 + b * 0.9505) / 1.08883;

    x = x > 0.008856 ? Math.pow(x, 1/3) : (7.787 * x) + (16/116);
    y = y > 0.008856 ? Math.pow(y, 1/3) : (7.787 * y) + (16/116);
    z = z > 0.008856 ? Math.pow(z, 1/3) : (7.787 * z) + (16/116);

    return [
      (116 * y) - 16,
      500 * (x - y),
      200 * (y - z)
    ];
  }

  function deltaE2000(lab1, lab2) {
    const [L1, a1, b1] = lab1;
    const [L2, a2, b2] = lab2;

    const avgLp = (L1 + L2) / 2;
    const C1 = Math.sqrt(a1 * a1 + b1 * b1);
    const C2 = Math.sqrt(a2 * a2 + b2 * b2);
    const avgC = (C1 + C2) / 2;

    const G = 0.5 * (1 - Math.sqrt(Math.pow(avgC, 7) / (Math.pow(avgC, 7) + Math.pow(25, 7))));
    const a1p = (1 + G) * a1;
    const a2p = (1 + G) * a2;
    const C1p = Math.sqrt(a1p * a1p + b1 * b1);
    const C2p = Math.sqrt(a2p * a2p + b2 * b2);
    const avgCp = (C1p + C2p) / 2;

    let h1p = Math.atan2(b1, a1p) * 180 / Math.PI;
    if (h1p < 0) h1p += 360;
    let h2p = Math.atan2(b2, a2p) * 180 / Math.PI;
    if (h2p < 0) h2p += 360;

    const dLp = L2 - L1;
    const dCp = C2p - C1p;

    let dhp;
    if (C1p * C2p === 0) {
      dhp = 0;
    } else {
      if (Math.abs(h2p - h1p) <= 180) {
        dhp = h2p - h1p;
      } else if (h2p - h1p > 180) {
        dhp = h2p - h1p - 360;
      } else {
        dhp = h2p - h1p + 360;
      }
    }
    const dHp = 2 * Math.sqrt(C1p * C2p) * Math.sin((dhp * Math.PI / 180) / 2);

    const avgLp2 = (L1 + L2) / 2;
    const avgCp2 = (C1p + C2p) / 2;

    let avgHp;
    if (C1p * C2p === 0) {
      avgHp = h1p + h2p;
    } else {
      if (Math.abs(h1p - h2p) <= 180) {
        avgHp = (h1p + h2p) / 2;
      } else if (h1p + h2p < 360) {
        avgHp = (h1p + h2p + 360) / 2;
      } else {
        avgHp = (h1p + h2p - 360) / 2;
      }
    }

    const T = 1 -
      0.17 * Math.cos((avgHp - 30) * Math.PI / 180) +
      0.24 * Math.cos((2 * avgHp) * Math.PI / 180) +
      0.32 * Math.cos((3 * avgHp + 6) * Math.PI / 180) -
      0.20 * Math.cos((4 * avgHp - 63) * Math.PI / 180);

    const dRo = 30 * Math.exp(-Math.pow((avgHp - 275) / 25, 2));
    const RC = 2 * Math.sqrt(Math.pow(avgCp2, 7) / (Math.pow(avgCp2, 7) + Math.pow(25, 7)));
    const RT = -RC * Math.sin(2 * dRo * Math.PI / 180);

    const SL = 1 + (0.015 * Math.pow(avgLp2 - 50, 2)) / Math.sqrt(20 + Math.pow(avgLp2 - 50, 2));
    const SC = 1 + 0.045 * avgCp2;
    const SH = 1 + 0.015 * avgCp2 * T;

    const dE = Math.sqrt(
      Math.pow(dLp / SL, 2) +
      Math.pow(dCp / SC, 2) +
      Math.pow(dHp / SH, 2) +
      RT * (dCp / SC) * (dHp / SH)
    );

    return dE;
  }

  function cieDistance(rgb1, rgb2) {
    const lab1 = rgbToLab(rgb1);
    const lab2 = rgbToLab(rgb2);
    return deltaE2000(lab1, lab2);
  }

  // ================== ОСНОВНОЙ СКРИПТ ДЛЯ ТВОЕЙ РАЗМЕТКИ ==================
  (function () {
    const palette = document.querySelector('.palette');
    if (!palette) return;

    const rows = palette.querySelectorAll('.palette__row');
    if (rows.length < 2) return;

    const colorRow = rows[0]; // первый градиент (цветовой)
    const grayRow  = rows[1]; // второй (серый)

    const colorThumb = colorRow.querySelector('.slider-thumb');
    let grayThumb = grayRow.querySelector('.slider-thumb');
    if (!grayThumb) {
      grayThumb = document.createElement('div');
      grayThumb.className = 'slider-thumb';
      grayRow.appendChild(grayThumb);
    }

    const cardsContainer = palette.querySelector('.palette__cards');

    // Фильтр Pantone для "серых"
    const grayPantones = pantoneColors.filter(c => {
      const [r, g, b] = c.rgb.split(',').map(Number);
      const max = Math.max(r, g, b);
      const min = Math.min(r, g, b);
      return (max - min) < 25;
    });

    // Состояние
    let mode = 'color'; // 'color' | 'gray'
    let currentHSL = { h: 0, s: 1, l: 0.5 };
    let currentGray = null;
    const copied = {}; // key: `${name}-hex/rgb/cmyk`

    function getNearestColors() {
      if (mode === 'color' && currentHSL) {
        const rgb = hslToRgb(currentHSL.h, currentHSL.s, currentHSL.l);
        const arr = pantoneColors.map(c => ({
          ...c,
          distance: cieDistance(
            rgb,
            c.rgb.split(',').map(Number)
          )
        }));
        arr.sort((a, b) => a.distance - b.distance);
        return arr.slice(0, 4);
      }

      if (mode === 'gray' && currentGray !== null) {
        const val = Math.round(currentGray * 255);
        const targetL = rgbToLab([val, val, val])[0];
        const arr = grayPantones.map(c => {
          const rgb = c.rgb.split(',').map(Number);
          const L = rgbToLab(rgb)[0];
          return {
            ...c,
            distance: Math.abs(L - targetL)
          };
        });
        arr.sort((a, b) => a.distance - b.distance);
        return arr.slice(0, 4);
      }

      return [];
    }

    function renderCards() {
      const list = getNearestColors();
      cardsContainer.innerHTML = '';

      list.forEach(c => {
        const keyHex  = `${c.name}-hex`;
        const keyRgb  = `${c.name}-rgb`;
        const keyCmyk = `${c.name}-cmyk`;

        const card = document.createElement('div');
        card.className = 'palette__card palette-card';

        const colorBlock = document.createElement('div');
        colorBlock.className = 'palette__color';
        colorBlock.style.backgroundColor = c.hex;

        const group = document.createElement('div');
        group.className = 'palette-card__group';

        const caption = document.createElement('div');
        caption.className = 'palette-card__caption title-s';
        caption.textContent = c.name;

        const listEl = document.createElement('div');
        listEl.className = 'palette-card__list';

        function makeRow(label, value, type, key) {
          const item = document.createElement('div');
          item.className = 'palette-card__item';
          item.innerHTML = label + ' ';

          const span = document.createElement('span');
          span.dataset.value = value;
          span.dataset.name = c.name;
          span.dataset.type = type;

          if (copied[key]) {
            span.textContent = 'Скопировано';
            span.classList.add('copied');
          } else {
            span.textContent = value;
          }

          item.appendChild(span);
          return item;
        }

        listEl.appendChild(makeRow('HEX:',  c.hex,  'hex',  keyHex));
        listEl.appendChild(makeRow('RGB:',  c.rgb,  'rgb',  keyRgb));
        listEl.appendChild(makeRow('CMYK:', c.cmyk, 'cmyk', keyCmyk));

        group.appendChild(caption);
        group.appendChild(listEl);

        card.appendChild(colorBlock);
        card.appendChild(group);

        cardsContainer.appendChild(card);
      });
    }

    // ------ Слайдеры ------
    let draggingColor = false;
    let draggingGray  = false;

    function setColorByClientX(clientX) {
      const rect = colorRow.getBoundingClientRect();
      const t = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      mode = 'color';
      currentHSL = { h: t, s: 1, l: 0.5 };
      currentGray = null;

      if (colorThumb) {
        colorThumb.style.left = (t * 100) + '%';
      }
      renderCards();
    }

    function setGrayByClientX(clientX) {
      const rect = grayRow.getBoundingClientRect();
      const t = Math.max(0, Math.min(1, 1 - (clientX - rect.left) / rect.width));
      mode = 'gray';
      currentGray = t;
      currentHSL = null;

      grayThumb.style.left = ((1 - t) * 100) + '%';
      renderCards();
    }

    colorRow.addEventListener('mousedown', (e) => {
      draggingColor = true;
      setColorByClientX(e.clientX);
    });

    grayRow.addEventListener('mousedown', (e) => {
      draggingGray = true;
      setGrayByClientX(e.clientX);
    });

    window.addEventListener('mousemove', (e) => {
      if (draggingColor) setColorByClientX(e.clientX);
      if (draggingGray)  setGrayByClientX(e.clientX);
    });

    window.addEventListener('mouseup', () => {
      draggingColor = false;
      draggingGray  = false;
    });

    // ------ Копирование по клику на значение ------
    cardsContainer.addEventListener('click', (e) => {
      const span = e.target.closest('.palette-card__item span');
      if (!span || !navigator.clipboard) return;

      const value = span.dataset.value;
      const name  = span.dataset.name;
      const type  = span.dataset.type;
      const key   = `${name}-${type}`;

      navigator.clipboard.writeText(value).then(() => {
        copied[key] = true;
        renderCards();
        setTimeout(() => {
          delete copied[key];
          renderCards();
        }, 2000);
      });
    });

    const rect = colorRow.getBoundingClientRect();
    const startX = rect.left + rect.width * (30 / 360);
    setColorByClientX(startX);

  })();

  // Tabs

  var tabs = new Tabby('[data-tabs]');
});
