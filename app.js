import { getStudents } from "./api-calls.js";

const selectSortBy = document.querySelector("select");
const addStudentBtn = document.getElementById("add-student");
// --------------- Spinner ---------------
const bsSpinner = document.getElementById("spinner");
// --------------- Search ---------------
const searchInput = document.getElementById("search");
const searchGlassIcon = document.getElementById("search-glass");
const clearIcon = document.getElementById("clear");
// --------------- Modal ---------------
const myModalEl = document.getElementById("myModal");
const modalForm = document.getElementById("modalForm");
const delConfirmTxt = document.getElementById("delete-confirmation-text");
const liveToast = document.getElementById("liveToast");
const tableBody = document.querySelector("tbody");
const submitBtn = document.querySelector("#submit");
const modalTitle = document.querySelector(".modal-header h1");
const modalBody = document.querySelector("#myModal .modal-body");
const modalFooter = document.querySelector("#myModal .modal-footer");

addStudentBtn.addEventListener("click", () => {});

selectSortBy.addEventListener("change", (e) => {
  console.log(e.target.value);
});

function initApp() {
  bsSpinner.classList.toggle("d-none");

  //   getStudents()
}

initApp();
