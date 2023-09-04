var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { Comment } from "./comment.js";
import { Modal } from "./modal.js";
import { isValid, RandomName } from "./utils/utils.js";
export class SystemComments {
    constructor() {
        this.form = document.getElementById("form");
        this.input = this.form.querySelector("#comment-input");
        this.id = "";
        this.idParent = "";
        this.showLikeComments = false;
        this.typeComment = "parent";
        this.nameUser = "";
        this.urlAvatar = "";
        this.sortAscending = true;
        this.firstSort = "date";
        this.Modal = new Modal();
        this.Comment = new Comment();
        this.sortComments = document.getElementById("sort-comments");
        this.typeSort = document.getElementById("change-ascending");
        this.submitBtn = this.form.querySelector("#comment-send");
        this.likeComments = document.getElementById("likeComments");
        this.containerAllcoments = document.getElementById("result");
        this.likeComment = document.getElementById("191");
        this.likeComment2 = document.getElementById("192");
        this.avaUser = document.getElementById("insert-ava-user");
        this.nameUserDiv = document.getElementById("insert-name-user");
        this.countComments = document.querySelector(".count-comment-body");
    }
    start() {
        this.sort();
        this.showOnlyLikeComments();
        this.changeCurrentSort();
        this.subscribeClick();
        this.focusInput();
        this.getCommentText();
        this.sendComment();
        this.focusOutInput();
    }
    prepare() {
        return __awaiter(this, void 0, void 0, function* () {
            window.addEventListener("load", () => {
                this.Comment.sortComments(this.firstSort, this.sortAscending);
                this.Comment.renderList(this.showLikeComments);
            });
        });
    }
    focusOutInput() {
        this.input.addEventListener("focusout", () => {
            this.avaUser.innerHTML = "";
            this.nameUserDiv.innerHTML = "";
        });
    }
    focusInput() {
        this.input.addEventListener("focus", () => {
            this.getUrl();
        });
    }
    getUrl() {
        const findProjectName = () => {
            fetch(`https://picsum.photos/id/${Math.floor(Math.random() * 1084)}/200`)
                .then((response) => {
                const result = response;
                return result;
            })
                .then((data) => {
                this.urlAvatar = data.url;
                if (data.status === 404) {
                    findProjectName();
                }
                else {
                    this.avaUser.innerHTML = "";
                    this.nameUserDiv.innerHTML = "";
                    this.nameUser = RandomName();
                    this.nameUserDiv.insertAdjacentHTML("afterbegin", `<div>${this.nameUser}</div>`);
                    this.avaUser.insertAdjacentHTML("afterbegin", `<img src=${this.urlAvatar} alt="Avatar" class="avatar">`);
                }
            });
        };
        findProjectName();
    }
    subscribeClick() {
        this.containerAllcoments.addEventListener("click", (e) => {
            e.preventDefault();
            const eTarget = e.target;
            if (eTarget.classList.contains("response")) {
                this.typeComment = "children";
                this.idParent = eTarget.dataset.id;
                this.input.focus();
            }
            else if (eTarget.classList.contains("like")) {
                this.Comment.clickLike(eTarget.dataset.id);
                this.Comment.renderList(this.showLikeComments);
            }
            else if (eTarget.classList.contains("plus")) {
                this.Comment.clickPlus(eTarget.dataset.id);
                this.Comment.renderList(this.showLikeComments);
            }
            else if (eTarget.classList.contains("minus")) {
                this.Comment.clickMinus(eTarget.dataset.id);
                this.Comment.renderList(this.showLikeComments);
            }
        });
    }
    sendComment() {
        this.form.addEventListener("submit", (e) => {
            e.preventDefault();
            this.id = new Date().toJSON();
            if (isValid(this.input.value)) {
                this.Comment.create(this.input.value.trim(), this.typeComment, this.id, this.nameUser, this.urlAvatar, this.idParent);
                this.Comment.renderList(this.showLikeComments);
                this.input.value = "";
                document.querySelector("textarea").style.height = "61px";
                this.countComments.innerText = "Макс. 1000 символов";
                this.submitBtn.disabled = true;
            }
            this.idParent = "";
            this.typeComment = "parent";
        });
    }
    getCommentText() {
        this.input.addEventListener("input", () => {
            this.countComments.innerHTML =
                this.input.value.length === 0 ? "Макс. 1000 символов" : `${this.input.value.length}/1000`;
            if (this.input.value.length > 1000) {
                this.countComments.setAttribute("style", "color: #FF0000");
                document.querySelector(".over-input").classList.add("show-warning");
            }
            else {
                this.countComments.setAttribute("style", "color:#918d8d");
                document.querySelector(".over-input").classList.remove("show-warning");
            }
            this.submitBtn.disabled = !isValid(this.input.value);
        });
    }
    sort() {
        this.sortComments.addEventListener("click", (e) => {
            e.preventDefault();
            const eTarget = e.target;
            if (eTarget.classList.contains("close")) {
                this.Modal.close(this.modal);
                this.Modal.destroy(this.modal);
                document.getElementById("sort-comments").classList.toggle("close");
                document.getElementById("sort-comments-text").classList.toggle("close");
            }
            else {
                this.modal = this.Modal.create();
                this.Modal.open(this.modal);
                document.getElementById("sort-comments").classList.toggle("close");
                document.getElementById("sort-comments-text").classList.toggle("close");
                this.modal.addEventListener("click", (event) => {
                    const eventTarget = event.target;
                    if (eventTarget.dataset.close) {
                        this.Modal.close(this.modal);
                        document.getElementById("sort-comments-text").innerHTML = eventTarget.innerText;
                        this.Comment.sortComments(eventTarget.dataset.type, this.sortAscending);
                        this.Comment.renderList(this.showLikeComments);
                        this.Modal.destroy(this.modal);
                        document.getElementById("sort-comments").classList.toggle("close");
                        document.getElementById("sort-comments-text").classList.toggle("close");
                    }
                });
            }
        });
    }
    changeCurrentSort() {
        this.typeSort.addEventListener("click", (e) => {
            e.preventDefault();
            this.sortAscending = !this.sortAscending;
            this.Comment.changeSortComments(this.sortAscending);
            this.Comment.renderList(this.showLikeComments);
        });
    }
    showOnlyLikeComments() {
        this.likeComments.addEventListener("click", () => {
            this.showLikeComments = !this.showLikeComments;
            if (this.showLikeComments) {
                this.likeComment.setAttribute("fill", "red");
                this.likeComment2.setAttribute("stroke", "red");
            }
            else {
                this.likeComment.setAttribute("fill", "black");
                this.likeComment2.setAttribute("stroke", "black");
            }
            this.Comment.renderList(this.showLikeComments);
        });
    }
}
