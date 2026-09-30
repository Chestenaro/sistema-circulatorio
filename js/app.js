document.addEventListener("DOMContentLoaded", () => {
    // 1. NAVEGACIÓN SPA Y LÓGICA DE TABS LÍQUIDAS
    const navButtons = document.querySelectorAll(".nav-btn");
    const sections = document.querySelectorAll(".spa-section");
    const indicator = document.getElementById("navIndicator");

    function updateIndicator(activeBtn) {
        if (!indicator) return;
        const btnRect = activeBtn.getBoundingClientRect();
        const navRect = activeBtn.parentElement.getBoundingClientRect();
        
        indicator.style.width = `${btnRect.width}px`;
        indicator.style.left = `${btnRect.left - navRect.left}px`;
    }

    navButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetId = button.getAttribute("data-target");

            // Si es el botón de personalizar, scrolleamos o mostramos
            navButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");
            updateIndicator(button);

            sections.forEach(section => {
                section.classList.remove("active");
                if (section.id === targetId) {
                    section.classList.add("active");
                    // Animación de entrada GSAP
                    gsap.fromTo(section, 
                        { opacity: 0, y: 30 }, 
                        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
                    );
                }
            });

            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    });

    // Inicializar posición del indicador en el primer botón activo
    const initialActive = document.querySelector(".nav-btn.active");
    if (initialActive) {
        setTimeout(() => updateIndicator(initialActive), 100);
    }

    window.addEventListener("resize", () => {
        const currentActive = document.querySelector(".nav-btn.active");
        if (currentActive) updateIndicator(currentActive);
    });

    // 2. SISTEMA DE ACORDEÓN PARA FQS Y DATOS CURIOSOS
    const accordionHeaders = document.querySelectorAll(".accordion-header");

    accordionHeaders.forEach(header => {
        header.addEventListener("click", () => {
            const currentItem = header.parentElement;
            const isActive = currentItem.classList.contains("active");

            // Opcional: cerrar los demás de la misma columna para limpieza
            const column = currentItem.closest('.faq-column');
            column.querySelectorAll(".accordion-item").forEach(item => {
                item.classList.remove("active");
            });

            if (!isActive) {
                currentItem.classList.add("active");
            }
        });
    });

    // 3. MOTOR DE PERSONALIZACIÓN EN TIEMPO REAL
    const primaryPicker = document.getElementById("primaryColorPicker");
    const glowPicker = document.getElementById("accentGlowPicker");
    const textPicker = document.getElementById("textColorPicker");
    const resetBtn = document.getElementById("resetCustomizer");

    const rootStyles = document.documentElement.style;

    primaryPicker.addEventListener("input", (e) => {
        rootStyles.setProperty("--primary-color", e.target.value);
    });

    glowPicker.addEventListener("input", (e) => {
        rootStyles.setProperty("--accent-glow", e.target.value);
    });

    textPicker.addEventListener("input", (e) => {
        rootStyles.setProperty("--text-color", e.target.value);
    });

    resetBtn.addEventListener("click", () => {
        primaryPicker.value = "#8b0000";
        glowPicker.value = "#ff1e42";
        textPicker.value = "#ffffff";

        rootStyles.setProperty("--primary-color", "#8b0000");
        rootStyles.setProperty("--accent-glow", "#ff1e42");
        rootStyles.setProperty("--text-color", "#ffffff");
    });

    // 4. ANIMACIONES ADICIONALES CON GSAP AL CARGAR
    gsap.from(".hero-text-wrapper", { opacity: 0, x: -50, duration: 1, ease: "power3.out" });
    gsap.from(".hero-image-wrapper", { opacity: 0, scale: 0.8, duration: 1, delay: 0.2, ease: "back.out(1.7)" });
});