const asideBtns = document.querySelectorAll(".aside-btn");

asideBtns.forEach(btn => {
	btn.addEventListener("click", ({ target }) => {
		const aside = document.querySelector(`.${target.dataset.aside}`);
		aside.classList.toggle("aside--active");
	});
});
