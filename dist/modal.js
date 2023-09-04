import { choiceSVG } from "./utils/utils.js";
export class Modal {
    create() {
        const modal = document.createElement("div");
        modal.classList.add("modal");
        modal.insertAdjacentHTML("afterBegin", `
            <div class="modal-window">
                <button data-close="true" data-type="date">${choiceSVG}По дате</button>
                <button data-close="true" data-type="numberLike">${choiceSVG}По количеству оценок</button>
                <button data-close="true" data-type="numberAnswers">${choiceSVG}По количеству ответов</button>
            </div>`);
        document.querySelector(".change-sort").appendChild(modal);
        return modal;
    }
    open(modal) {
        modal.classList.add("open");
    }
    close(modal) {
        modal.classList.remove("open");
    }
    destroy(modal) {
        modal.parentNode.removeChild(modal);
    }
}
