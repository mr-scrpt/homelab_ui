// Массив со всеми сервисами
const services = [
  {
    name: "Управление роутером",
    description: "Настройка сети и доступа к интернету",
    url: "router.homelab.loc",
    category: "network",
    icon: "fa-bezier-curve",
  },
  {
    name: "Управление хостингом",
    description: "Платформа для размещения веб-приложений",
    url: "coolify.hosting.loc",
    category: "management",
    icon: "fa-server",
  },
  {
    name: "Управление Pi Hole",
    description: "Блокировка рекламы на уровне DNS",
    url: "dns.homelab.loc",
    category: "network",
    icon: "fa-ban",
  },
  {
    name: "Управление домом",
    description: "Умный дом и автоматизация",
    url: "hs.homelab.loc",
    category: "management",
    icon: "fa-house",
  },
  {
    name: "Управление файлами",
    description: "Доступ к сетевому хранилищу",
    url: "nas.homelab.loc",
    category: "management",
    icon: "fa-hard-drive",
  },
  {
    name: "Управление PROXMOX",
    description: "Виртуализация и контейнеры",
    url: "proxmox.homelab.loc",
    category: "management",
    icon: "fa-cubes",
  },
  {
    name: "Torrent WebUI",
    description: "Загрузка файлов через торрент-клиент",
    url: "download.homelab.loc",
    category: "media",
    icon: "fa-download",
  },
  {
    name: "Медиасервер",
    description: "Стриминг фильмов, сериалов и музыки",
    url: "plex.homelab.loc",
    category: "media",
    icon: "fa-photo-film",
  },
  {
    name: "Панель для Traefik",
    description: "Управление обратным прокси",
    url: "proxy.homelab.loc",
    category: "network",
    icon: "fa-globe",
  },
];

// Загрузка сервисов при загрузке страницы
document.addEventListener("DOMContentLoaded", () => {
  renderServices();
  setupSearch();
  document.getElementById("current-year").textContent =
    new Date().getFullYear();
});

// Функция для отображения сервисов
function renderServices() {
  const managementServices = document.getElementById("management-services");
  const mediaServices = document.getElementById("media-services");
  const networkServices = document.getElementById("network-services");

  // Очистка контейнеров
  managementServices.innerHTML = "";
  mediaServices.innerHTML = "";
  networkServices.innerHTML = "";

  // Распределение сервисов по категориям
  services.forEach((service) => {
    const serviceCard = createServiceCard(service);

    switch (service.category) {
      case "management":
        managementServices.appendChild(serviceCard);
        break;
      case "media":
        mediaServices.appendChild(serviceCard);
        break;
      case "network":
        networkServices.appendChild(serviceCard);
        break;
    }
  });

  // Скрытие пустых категорий
  hideEmptyCategories();
}

// Создание карточки сервиса
function createServiceCard(service) {
  const card = document.createElement("div");
  card.className = `service-card ${service.category}`;

  card.innerHTML = `
        <div class="icon">
            <i class="fas ${service.icon}"></i>
        </div>
        <h4>${service.name}</h4>
        <p>${service.description}</p>
        <div class="url">${service.url}</div>
    `;

  // Добавление обработчика для перехода по ссылке
  card.addEventListener("click", () => {
    window.location.href = `http://${service.url}`;
  });

  return card;
}

// Скрытие пустых категорий
function hideEmptyCategories() {
  const categories = document.querySelectorAll(".category");

  categories.forEach((category) => {
    const services = category.querySelector(".services");
    if (services.children.length === 0) {
      category.style.display = "none";
    } else {
      category.style.display = "block";
    }
  });
}

// Настройка поиска
function setupSearch() {
  const searchInput = document.getElementById("search");

  searchInput.addEventListener("input", () => {
    const searchTerm = searchInput.value.toLowerCase();

    if (searchTerm === "") {
      // Если поиск пустой, показываем все сервисы
      renderServices();
      return;
    }

    // Фильтруем сервисы по поисковому запросу
    const filteredServices = services.filter((service) => {
      return (
        service.name.toLowerCase().includes(searchTerm) ||
        service.description.toLowerCase().includes(searchTerm) ||
        service.url.toLowerCase().includes(searchTerm)
      );
    });

    // Отображаем найденные сервисы
    renderFilteredServices(filteredServices);
  });
}

// Отображение отфильтрованных сервисов
function renderFilteredServices(filteredServices) {
  const managementServices = document.getElementById("management-services");
  const mediaServices = document.getElementById("media-services");
  const networkServices = document.getElementById("network-services");

  // Очистка контейнеров
  managementServices.innerHTML = "";
  mediaServices.innerHTML = "";
  networkServices.innerHTML = "";

  // Распределение отфильтрованных сервисов по категориям
  filteredServices.forEach((service) => {
    const serviceCard = createServiceCard(service);

    switch (service.category) {
      case "management":
        managementServices.appendChild(serviceCard);
        break;
      case "media":
        mediaServices.appendChild(serviceCard);
        break;
      case "network":
        networkServices.appendChild(serviceCard);
        break;
    }
  });

  // Скрытие пустых категорий
  hideEmptyCategories();
}
