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
});
