import "materialize-css/dist/js/materialize";

document.addEventListener("DOMContentLoaded", () => {
	const elems = document.querySelectorAll(".modal");
	M.Modal.init(elems);
});
