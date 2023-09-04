import { choiceSVG } from "./utils/utils.js"

export class Modal {
  public create(): HTMLDivElement {
    type InsertPosition = "beforebegin" | "afterbegin" | "beforeend" | "afterend"
    const modal: HTMLDivElement = document.createElement("div")
    modal.classList.add("modal")
    modal.insertAdjacentHTML(
      <InsertPosition>"afterBegin",
      `
            <div class="modal-window">
                <button data-close="true" data-type="date">${choiceSVG}По дате</button>
                <button data-close="true" data-type="numberLike">${choiceSVG}По количеству оценок</button>
                <button data-close="true" data-type="numberAnswers">${choiceSVG}По количеству ответов</button>
            </div>`
    )

    document.querySelector(".change-sort")!.appendChild(modal)
    return modal
  }

  public open(modal: HTMLDivElement): void {
    modal.classList.add("open")
  }

  public close(modal: HTMLDivElement): void {
    modal.classList.remove("open")
  }

  public destroy(modal: HTMLDivElement): void {
    modal.parentNode!.removeChild(modal)
  }
}
