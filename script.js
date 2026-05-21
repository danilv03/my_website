document.addEventListener("DOMContentLoaded", () => {
  const body = document.body;
  const menuToggle = document.querySelector(".menu-toggle");
  const navLinks = document.querySelector(".nav-links");
  const yearSpan = document.querySelector("#year");

  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }

  if (menuToggle && navLinks) {
    menuToggle.addEventListener("click", () => {
      const isOpen = body.classList.toggle("menu-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    navLinks.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        body.classList.remove("menu-open");
        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target) return;
      event.preventDefault();
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  });

  const searchInput = document.querySelector("#course-search");
  const filterStatus = document.querySelector("#filter-status");
  const rows = Array.from(document.querySelectorAll(".course-row"));
  const yearBlocks = Array.from(document.querySelectorAll(".year-block"));

  if (searchInput && rows.length) {
    const updateFilter = () => {
      const query = searchInput.value.trim().toLowerCase();
      let visibleCount = 0;

      rows.forEach((row) => {
        const cells = row.querySelectorAll("td");
        const courseName = cells[1]?.textContent.toLowerCase() || "";
        const instructor = cells[4]?.textContent.toLowerCase() || "";
        const isMatch = !query || courseName.includes(query) || instructor.includes(query);

        row.classList.toggle("hidden", !isMatch);
        if (isMatch) visibleCount += 1;
      });

      yearBlocks.forEach((block) => {
        const hasVisibleRows = Array.from(block.querySelectorAll(".course-row")).some((row) => {
          return !row.classList.contains("hidden");
        });
        block.classList.toggle("hidden", !hasVisibleRows);
      });

      if (filterStatus) {
        filterStatus.textContent = query
          ? `${visibleCount} course${visibleCount === 1 ? "" : "s"} matching your search.`
          : "";
      }
    };

    searchInput.addEventListener("input", updateFilter);
  }
});
