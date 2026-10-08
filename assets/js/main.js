/**
 * =========================================================
 * CARLOS VINICIUS — PORTFÓLIO
 * JavaScript principal
 * =========================================================
 */

document.addEventListener("DOMContentLoaded", () => {
    "use strict";

    /**
     * -------------------------------------------------------
     * ELEMENTOS PRINCIPAIS
     * -------------------------------------------------------
     */

    const header = document.getElementById("site-header");

    const mobileMenuButton = document.getElementById(
        "mobile-menu-button"
    );

    const mobileMenu = document.getElementById("mobile-menu");

    const menuOpenIcon = document.getElementById(
        "menu-open-icon"
    );

    const menuCloseIcon = document.getElementById(
        "menu-close-icon"
    );

    const currentYear = document.getElementById(
        "current-year"
    );

    /**
     * -------------------------------------------------------
     * ANO DO FOOTER
     * -------------------------------------------------------
     */

    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    /**
     * -------------------------------------------------------
     * HEADER AO ROLAR
     * -------------------------------------------------------
     */

    const updateHeader = () => {
        if (!header) {
            return;
        }

        if (window.scrollY > 20) {
            header.classList.add("scrolled");
        } else {
            header.classList.remove("scrolled");
        }
    };

    updateHeader();

    window.addEventListener(
        "scroll",
        updateHeader,
        { passive: true }
    );

    /**
     * -------------------------------------------------------
     * MENU MOBILE
     * -------------------------------------------------------
     */

    const closeMobileMenu = () => {
        if (
            !mobileMenu ||
            !mobileMenuButton ||
            !menuOpenIcon ||
            !menuCloseIcon
        ) {
            return;
        }

        mobileMenu.classList.add("hidden");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            "Abrir menu"
        );

        menuOpenIcon.classList.remove("hidden");
        menuCloseIcon.classList.add("hidden");
    };

    const toggleMobileMenu = () => {
        if (
            !mobileMenu ||
            !mobileMenuButton ||
            !menuOpenIcon ||
            !menuCloseIcon
        ) {
            return;
        }

        const isOpen =
            mobileMenuButton.getAttribute("aria-expanded") === "true";

        if (isOpen) {
            closeMobileMenu();
            return;
        }

        mobileMenu.classList.remove("hidden");

        mobileMenuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        mobileMenuButton.setAttribute(
            "aria-label",
            "Fechar menu"
        );

        menuOpenIcon.classList.add("hidden");
        menuCloseIcon.classList.remove("hidden");
    };

    if (mobileMenuButton) {
        mobileMenuButton.addEventListener(
            "click",
            toggleMobileMenu
        );
    }

    /**
     * Fecha o menu ao clicar em qualquer link interno.
     */

    const mobileLinks = document.querySelectorAll(
        "#mobile-menu a"
    );

    mobileLinks.forEach((link) => {
        link.addEventListener(
            "click",
            closeMobileMenu
        );
    });

    /**
     * Fecha o menu ao pressionar Escape.
     */

    document.addEventListener(
        "keydown",
        (event) => {
            if (event.key === "Escape") {
                closeMobileMenu();
            }
        }
    );

    /**
     * Fecha o menu quando a janela muda para desktop.
     */

    window.addEventListener(
        "resize",
        () => {
            if (window.innerWidth >= 768) {
                closeMobileMenu();
            }
        }
    );

    /**
     * -------------------------------------------------------
     * ANIMAÇÕES DE ENTRADA NO SCROLL
     * -------------------------------------------------------
     */

    const revealElements =
        document.querySelectorAll("[data-reveal]");

    const prefersReducedMotion =
        window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

    if (
        prefersReducedMotion ||
        !("IntersectionObserver" in window)
    ) {
        revealElements.forEach((element) => {
            element.classList.add("is-visible");
        });
    } else {
        const revealObserver =
            new IntersectionObserver(
                (entries, observer) => {
                    entries.forEach((entry) => {
                        if (!entry.isIntersecting) {
                            return;
                        }

                        entry.target.classList.add(
                            "is-visible"
                        );

                        observer.unobserve(
                            entry.target
                        );
                    });
                },
                {
                    threshold: 0.12,
                    rootMargin: "0px 0px -40px 0px"
                }
            );

        revealElements.forEach((element) => {
            revealObserver.observe(element);
        });
    }

    /**
     * -------------------------------------------------------
     * FILTRO DE PROJETOS
     * -------------------------------------------------------
     */

    const filterButtons =
        document.querySelectorAll(
            "[data-filter]"
        );

    const projectCards =
        document.querySelectorAll(
            "[data-project]"
        );

    filterButtons.forEach((button) => {
        button.addEventListener(
            "click",
            () => {
                const selectedFilter =
                    button.dataset.filter;

                /**
                 * Atualiza estado visual dos botões.
                 */

                filterButtons.forEach(
                    (filterButton) => {
                        filterButton.classList.remove(
                            "is-active"
                        );
                    }
                );

                button.classList.add(
                    "is-active"
                );

                /**
                 * Filtra os projetos.
                 */

                projectCards.forEach((card) => {
                    const category =
                        card.dataset.category;

                    const shouldShow =
                        selectedFilter === "all" ||
                        category === selectedFilter;

                    if (shouldShow) {
                        card.classList.remove(
                            "is-hidden"
                        );

                        /**
                         * Permite que projetos
                         * filtrados também apareçam
                         * com uma pequena animação.
                         */
                        if (!prefersReducedMotion) {
                            card.animate(
                                [
                                    {
                                        opacity: 0,
                                        transform:
                                            "translateY(8px)"
                                    },
                                    {
                                        opacity: 1,
                                        transform:
                                            "translateY(0)"
                                    }
                                ],
                                {
                                    duration: 260,
                                    easing:
                                        "cubic-bezier(0.22, 1, 0.36, 1)"
                                }
                            );
                        }
                    } else {
                        card.classList.add(
                            "is-hidden"
                        );
                    }
                });
            }
        );
    });

    /**
     * -------------------------------------------------------
     * NAVEGAÇÃO SUAVE
     * -------------------------------------------------------
     *
     * O comportamento é aplicado somente aos links
     * internos do próprio documento.
     */

    const internalLinks =
        document.querySelectorAll(
            'a[href^="#"]'
        );

    internalLinks.forEach((link) => {
        link.addEventListener(
            "click",
            (event) => {
                const targetId =
                    link.getAttribute("href");

                if (
                    !targetId ||
                    targetId === "#"
                ) {
                    return;
                }

                const target =
                    document.querySelector(
                        targetId
                    );

                if (!target) {
                    return;
                }

                event.preventDefault();

                target.scrollIntoView({
                    behavior:
                        prefersReducedMotion
                            ? "auto"
                            : "smooth",
                    block: "start"
                });

                /**
                 * Atualiza a URL sem recarregar
                 * a página.
                 */
                history.replaceState(
                    null,
                    "",
                    targetId
                );
            }
        );
    });

    /**
     * -------------------------------------------------------
     * TRATAMENTO DA IMAGEM DE PERFIL
     * -------------------------------------------------------
     *
     * Caso perfil.jpg não exista, o próprio HTML exibe
     * o placeholder. Aqui apenas evitamos qualquer
     * comportamento inesperado de imagem quebrada.
     */

    const profileImage =
        document.querySelector(
            'img[src="assets/images/perfil.jpg"]'
        );

    if (profileImage) {
        profileImage.addEventListener(
            "error",
            () => {
                profileImage.setAttribute(
                    "aria-hidden",
                    "true"
                );
            }
        );
    }

    /**
     * -------------------------------------------------------
     * BOTÃO VOLTAR AO TOPO
     * -------------------------------------------------------
     *
     * A navegação para #inicio já é suficiente para este
     * projeto, portanto não é criado um segundo botão
     * flutuante desnecessário.
     */

    /**
     * -------------------------------------------------------
     * SEGURANÇA BÁSICA PARA LINKS EXTERNOS
     * -------------------------------------------------------
     *
     * Os links externos já utilizam:
     * target="_blank"
     * rel="noopener noreferrer"
     *
     * Portanto não é necessário alterar o DOM.
     */

});