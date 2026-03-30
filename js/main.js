const services = [
	{
		id: 1,
		name: "Sitio web corporativo",
		shortDescription: "Web institucional responsive para fortalecer presencia digital.",
		description:
			"Diseñamos y desarrollamos un sitio corporativo completo con arquitectura de contenido, optimización de velocidad y enfoque en conversión.",
		category: "Desarrollo Web",
		price: "Desde Bs 2.500",
	},
	{
		id: 2,
		name: "Tienda online",
		shortDescription: "E-commerce personalizado con catálogo, pagos y panel de gestión.",
		description:
			"Implementamos tiendas digitales escalables con experiencia de compra optimizada, integración de métodos de pago y métricas de ventas.",
		category: "Desarrollo Web",
		price: "Desde Bs 4.800",
	},
	{
		id: 3,
		name: "Diseño UX/UI",
		shortDescription: "Interfaces enfocadas en claridad, usabilidad y conversión.",
		description:
			"Creamos sistemas de diseño, wireframes y prototipos de alta fidelidad para productos web y móviles con pruebas de experiencia.",
		category: "Diseño UI/UX",
		price: "Desde Bs 1.900",
	},
	{
		id: 4,
		name: "Branding digital",
		shortDescription: "Identidad visual consistente para ecosistemas digitales.",
		description:
			"Desarrollamos branding digital completo: paleta, tipografía, tono visual y adaptaciones para redes, web y campañas.",
		category: "Diseño UI/UX",
		price: "Desde Bs 1.500",
	},
	{
		id: 5,
		name: "Campañas de anuncios",
		shortDescription: "Gestión de campañas en Meta y Google con foco en resultados.",
		description:
			"Planificamos y ejecutamos campañas segmentadas para generar leads de calidad, optimizando presupuesto y retorno de inversión.",
		category: "Marketing Digital",
		price: "Desde Bs 1.300/mes",
	},
	{
		id: 6,
		name: "SEO técnico",
		shortDescription: "Mejora de posicionamiento orgánico y rendimiento del sitio.",
		description:
			"Auditamos y corregimos aspectos técnicos de SEO, estructura semántica y performance para mejorar visibilidad y tráfico orgánico.",
		category: "Marketing Digital",
		price: "Desde Bs 1.100/mes",
	},
];

const refs = {
	servicesGrid: document.getElementById("services-grid"),
	searchInput: document.getElementById("search-input"),
	categoryFilter: document.getElementById("category-filter"),
	detailsPanel: document.getElementById("details-panel"),
	resultsInfo: document.getElementById("results-info"),
	emptyState: document.getElementById("empty-state"),
	interestService: document.getElementById("interest-service"),
	contactForm: document.getElementById("contact-form"),
	formStatus: document.getElementById("form-status"),
	heroCopy: document.getElementById("hero-copy"),
	menuToggle: document.getElementById("menu-toggle"),
	mainNav: document.getElementById("main-nav"),
	modal: document.getElementById("service-modal"),
	modalClose: document.getElementById("modal-close"),
	modalTitle: document.getElementById("modal-title"),
	modalDescription: document.getElementById("modal-description"),
	modalCategory: document.getElementById("modal-category"),
	modalPrice: document.getElementById("modal-price"),
	modalCta: document.getElementById("modal-cta"),
};

let selectedServiceId = null;

function createCategoryOptions() {
	const categories = [...new Set(services.map((service) => service.category))];

	categories.forEach((category) => {
		const optionForFilter = document.createElement("option");
		optionForFilter.value = category;
		optionForFilter.textContent = category;
		refs.categoryFilter.appendChild(optionForFilter);

		const optionForForm = document.createElement("option");
		optionForForm.value = category;
		optionForForm.textContent = category;
		refs.interestService.appendChild(optionForForm);
	});
}

function getFilteredServices() {
	const query = refs.searchInput.value.trim().toLowerCase();
	const category = refs.categoryFilter.value;

	return services.filter((service) => {
		const matchText =
			service.name.toLowerCase().includes(query) ||
			service.shortDescription.toLowerCase().includes(query) ||
			service.description.toLowerCase().includes(query);
		const matchCategory = category === "all" || service.category === category;
		return matchText && matchCategory;
	});
}

function renderServices(filteredServices) {
	refs.servicesGrid.innerHTML = "";

	filteredServices.forEach((service) => {
		const card = document.createElement("article");
		card.className = "service-card";
		if (selectedServiceId === service.id) {
			card.classList.add("is-selected");
		}

		card.innerHTML = `
			<h3>${service.name}</h3>
			<p>${service.shortDescription}</p>
			<ul class="service-meta">
				<li><span>Categoría</span><strong>${service.category}</strong></li>
				<li><span>Precio</span><strong>${service.price}</strong></li>
			</ul>
			<button class="btn btn-primary service-action" type="button" data-service-id="${service.id}">
				Ver detalles
			</button>
		`;

		refs.servicesGrid.appendChild(card);
	});

	refs.resultsInfo.textContent = `Mostrando ${filteredServices.length} resultado${
		filteredServices.length === 1 ? "" : "s"
	}`;

	refs.emptyState.hidden = filteredServices.length !== 0;
}

function updateHeroMessage(filteredServices) {
	if (filteredServices.length === services.length) {
		refs.heroCopy.textContent =
			"Creamos productos web rápidos, accesibles y escalables para ayudarte a captar más clientes y convertir oportunidades en resultados.";
		return;
	}

	refs.heroCopy.textContent = `Has filtrado ${filteredServices.length} servicio${
		filteredServices.length === 1 ? "" : "s"
	}. Sigue explorando para encontrar la mejor opción para tu negocio.`;
}

function updateDetailsPanel(service) {
	refs.detailsPanel.innerHTML = `
		<h3>${service.name}</h3>
		<p>${service.description}</p>
		<ul class="service-meta">
			<li><span>Categoría</span><strong>${service.category}</strong></li>
			<li><span>Precio</span><strong>${service.price}</strong></li>
		</ul>
	`;
}

function openModal(service) {
	refs.modalTitle.textContent = service.name;
	refs.modalDescription.textContent = service.description;
	refs.modalCategory.textContent = service.category;
	refs.modalPrice.textContent = service.price;
	refs.modalCta.setAttribute("data-selected-service", service.name);

	refs.modal.hidden = false;
	document.body.classList.add("modal-open");
}

function closeModal() {
	refs.modal.hidden = true;
	document.body.classList.remove("modal-open");
}

function applyFiltersAndRender() {
	const filteredServices = getFilteredServices();
	renderServices(filteredServices);
	updateHeroMessage(filteredServices);
}

function validateField(field) {
	const value = field.value.trim();
	const feedbackId = `${field.id}-feedback`;
	const feedbackElement = document.getElementById(feedbackId);
	let message = "";

	if (!value) {
		message = "Este campo es obligatorio.";
	} else if (field.name === "email") {
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(value)) {
			message = "Ingresa un correo con formato válido.";
		}
	} else if (field.name === "message" && value.length < 10) {
		message = "El mensaje debe tener al menos 10 caracteres.";
	}

	field.classList.toggle("is-invalid", Boolean(message));
	field.classList.toggle("is-valid", !message && Boolean(value));

	if (feedbackElement) {
		feedbackElement.textContent = message;
	}

	return !message;
}

function handleFormSubmit(event) {
	event.preventDefault();

	const fields = Array.from(refs.contactForm.querySelectorAll("input, select, textarea"));
	const isFormValid = fields.every((field) => validateField(field));

	if (!isFormValid) {
		refs.formStatus.textContent = "Revisa los campos marcados antes de enviar.";
		refs.formStatus.className = "form-status error";
		return;
	}

	refs.formStatus.textContent =
		"Solicitud enviada con éxito. Te contactaremos en menos de 24 horas hábiles.";
	refs.formStatus.className = "form-status success";
	refs.contactForm.reset();
	fields.forEach((field) => {
		field.classList.remove("is-valid", "is-invalid");
		const feedbackElement = document.getElementById(`${field.id}-feedback`);
		if (feedbackElement) {
			feedbackElement.textContent = "";
		}
	});
}

function setupEvents() {
	refs.searchInput.addEventListener("input", applyFiltersAndRender);
	refs.categoryFilter.addEventListener("change", applyFiltersAndRender);

	refs.servicesGrid.addEventListener("click", (event) => {
		const button = event.target.closest(".service-action");
		if (!button) {
			return;
		}

		const serviceId = Number(button.dataset.serviceId);
		const selectedService = services.find((service) => service.id === serviceId);

		if (!selectedService) {
			return;
		}

		selectedServiceId = serviceId;
		updateDetailsPanel(selectedService);
		openModal(selectedService);
		applyFiltersAndRender();
	});

	refs.modalClose.addEventListener("click", closeModal);

	refs.modal.addEventListener("click", (event) => {
		if (event.target === refs.modal) {
			closeModal();
		}
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && !refs.modal.hidden) {
			closeModal();
		}
	});

	refs.contactForm.addEventListener("submit", handleFormSubmit);
	refs.contactForm.querySelectorAll("input, select, textarea").forEach((field) => {
		field.addEventListener("blur", () => validateField(field));
	});

	refs.menuToggle.addEventListener("click", () => {
		const isExpanded = refs.menuToggle.getAttribute("aria-expanded") === "true";
		refs.menuToggle.setAttribute("aria-expanded", String(!isExpanded));
		refs.mainNav.classList.toggle("is-open");
	});

	refs.mainNav.querySelectorAll("a").forEach((link) => {
		link.addEventListener("click", () => {
			refs.mainNav.classList.remove("is-open");
			refs.menuToggle.setAttribute("aria-expanded", "false");
		});
	});
}

function init() {
	createCategoryOptions();
	applyFiltersAndRender();
	setupEvents();
}

init();
