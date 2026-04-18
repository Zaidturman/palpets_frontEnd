let headerPetTypes = [];

function isHomePage() {
  const path = window.location.pathname;
  return path.endsWith("/index.html") || path === "/" || path === "";
}

function getPagePrefix() {
  return isHomePage() ? "./pages/" : "";
}

function getRootPrefix() {
  return isHomePage() ? "./" : "../";
}

function buildPageUrl(page) {
  if (page === "index.html") {
    return isHomePage() ? "index.html" : "../index.html";
  }
  return `${getPagePrefix()}${page}`;
}

async function initSharedHeader() {
  setupHeaderEvents();
  setupDesktopDropdown();
  setActiveNavLink();
  await loadHeaderPetTypes();
}

function setupHeaderEvents() {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileMenu = document.getElementById("mobileMenu");
  const mobileShopToggle = document.getElementById("mobileShopToggle");
  const petTypeMenuMobile = document.getElementById("petTypeMenuMobile");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.toggle("show");
    });
  }

  if (mobileShopToggle && petTypeMenuMobile) {
    mobileShopToggle.addEventListener("click", () => {
      petTypeMenuMobile.classList.toggle("show");
      mobileShopToggle.classList.toggle("open");
    });
  }
}

function setupDesktopDropdown() {
  const wrapper = document.getElementById("shopByPetWrapper");
  const toggle = document.getElementById("shopByPetToggle");
  const dropdown = document.getElementById("petShopDropdown");

  if (!wrapper || !toggle || !dropdown) return;

  toggle.addEventListener("click", function (e) {
    e.stopPropagation();
    const isOpen = dropdown.classList.contains("open");

    dropdown.classList.toggle("open", !isOpen);
    wrapper.classList.toggle("dropdown-open", !isOpen);
    toggle.setAttribute("aria-expanded", String(!isOpen));
  });

  dropdown.addEventListener("click", function (e) {
    e.stopPropagation();
  });

  document.addEventListener("click", function (e) {
    if (!wrapper.contains(e.target)) {
      dropdown.classList.remove("open");
      wrapper.classList.remove("dropdown-open");
      toggle.setAttribute("aria-expanded", "false");
    }
  });
}

function setActiveNavLink() {
  const currentPath = window.location.pathname;

  const pageMap = [
    { key: "home", match: ["/index.html", "/"] },
    { key: "pets", match: ["/pages/pets.html", "/pets.html"] },
    { key: "adoption", match: ["/pages/adoption.html", "/adoption.html"] },
    { key: "lost-found", match: ["/pages/lost-found.html", "/lost-found.html"] },
    { key: "veterinary", match: ["/pages/veterinary.html", "/veterinary.html"] },
    { key: "store", match: ["/pages/store.html", "/store.html"] },
  ];

  let activeKey = null;

  for (const item of pageMap) {
    if (item.match.some((m) => currentPath.endsWith(m) || currentPath === m)) {
      activeKey = item.key;
      break;
    }
  }

  if (!activeKey) return;

  document.querySelectorAll("[data-page]").forEach((link) => {
    if (link.dataset.page === activeKey) {
      link.classList.add("active");
    }
  });
}

async function loadHeaderPetTypes() {
  try {
    if (typeof apiCall !== "function") {
      console.error("apiCall is not available");
      renderHeaderTypesError();
      return;
    }

    const response = await apiCall("/animals/types/", "GET", null, false);

    headerPetTypes = Array.isArray(response)
      ? response
      : Array.isArray(response?.results)
        ? response.results
        : Array.isArray(response?.data)
          ? response.data
          : [];

    renderHeaderPetTypes();
  } catch (error) {
    console.error("Error loading header pet types:", error);
    renderHeaderTypesError();
  }
}

function renderHeaderTypesError() {
  const desktopMenu = document.getElementById("petTypeMenuDesktop");
  const mobileMenu = document.getElementById("petTypeMenuMobile");

  if (desktopMenu) {
    desktopMenu.innerHTML =
      '<button type="button" class="pet-type-item active">فشل تحميل الأنواع</button>';
  }

  if (mobileMenu) {
    mobileMenu.innerHTML = `<a href="${buildPageUrl("store.html")}">فشل تحميل الأنواع</a>`;
  }
}

function renderHeaderPetTypes() {
  const desktopMenu = document.getElementById("petTypeMenuDesktop");
  const mobileMenu = document.getElementById("petTypeMenuMobile");

  if (!desktopMenu || !mobileMenu) return;

  if (!headerPetTypes.length) {
    desktopMenu.innerHTML =
      '<button type="button" class="pet-type-item active">لا توجد أنواع متاحة</button>';
    mobileMenu.innerHTML = `<a href="${buildPageUrl("store.html")}">لا توجد أنواع متاحة</a>`;
    return;
  }

  desktopMenu.innerHTML = headerPetTypes
    .map(
      (type, index) => `
        <button
          type="button"
          class="pet-type-item ${index === 0 ? "active" : ""}"
          data-type-id="${type.id}"
          onclick="setHeaderActiveType(${type.id}, false)"
        >
          ${type.name}
        </button>
      `
    )
    .join("");

  mobileMenu.innerHTML = headerPetTypes
    .map(
      (type) => `
        <a href="${buildPageUrl("store.html")}?animal_type=${type.id}">
          ${type.name}
        </a>
      `
    )
    .join("");

  setHeaderDropdownContent(headerPetTypes[0]);
}

function setHeaderActiveType(typeId, navigate = true) {
  const type = headerPetTypes.find((item) => Number(item.id) === Number(typeId));
  if (!type) return;

  document.querySelectorAll("#petTypeMenuDesktop .pet-type-item").forEach((item) => {
    item.classList.remove("active");
  });

  const activeItem = document.querySelector(
    `#petTypeMenuDesktop .pet-type-item[data-type-id="${typeId}"]`
  );

  if (activeItem) {
    activeItem.classList.add("active");
  }

  setHeaderDropdownContent(type);

  if (navigate) {
    window.location.href = `${buildPageUrl("store.html")}?animal_type=${type.id}`;
  }
}

function setHeaderDropdownContent(type) {
  const title = document.getElementById("dropdownTypeTitle");
  const links = document.getElementById("dropdownTypeLinks");
  const bannerText = document.getElementById("dropdownBannerText");
  const bannerBtn = document.getElementById("dropdownBannerBtn");

  if (!title || !links || !bannerText || !bannerBtn || !type) return;

  title.textContent = type.name;

  links.innerHTML = `
    <a href="${buildPageUrl("pets.html")}?animal_type=${type.id}">عرض كل ${type.name}</a>
    <a href="${buildPageUrl("pets.html")}?animal_type=${type.id}&listing_type=adoption">${type.name} للتبني</a>
    <a href="${buildPageUrl("pets.html")}?animal_type=${type.id}&listing_type=sale">${type.name} للبيع</a>
    <a href="${buildPageUrl("pets.html")}?animal_type=${type.id}&gender=male">${type.name} ذكور</a>
    <a href="${buildPageUrl("pets.html")}?animal_type=${type.id}&gender=female">${type.name} إناث</a>
  `;

  bannerText.textContent =
    type.description?.trim() ||
    `تصفح الحيوانات المتاحة ضمن قسم ${type.name}، واختر الحيوان المناسب لك بسهولة.`;

  bannerBtn.href = `${buildPageUrl("pets.html")}?animal_type=${type.id}`;
}