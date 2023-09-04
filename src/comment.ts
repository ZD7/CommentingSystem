import {
  compareNumberLikeChildComments,
  toCard,
  getLikeComments,
  getCommentsFromLocalStorage,
  getProjectName,
  addToLocalStorage,
} from "./utils/utils.js"
import { IComment, ICommentChild } from "./types/types.js"

export class Comment {

  public create(
    text: string,
    type: string,
    id: string,
    nameUser: string,
    urlAvatar: string,
    idParentComment: string
  ): void {
    const comment: IComment = {
      id,
      nameUser,
      text,
      date: new Date().toJSON(),
      rating: 0,
      like: false,
      urlAvatar,
      type,
      children: [],
    }
    let isIdParent = idParentComment !== "" ? idParentComment : id
    addToLocalStorage(comment, isIdParent)
  }

  public renderList(showLikeComments: boolean): void {
    const comments = getCommentsFromLocalStorage()
    document.querySelector(".header-tabs_item-first-num")!.innerHTML = `(${this.getNumberComments()})`
    let html: string
    const list: HTMLElement | null = document.getElementById("list")!

    if (showLikeComments) {
      let likeComments = getLikeComments(comments)
      html = likeComments.length
        ? likeComments.map(toCard).join(" ")
        : `<div class="empty-list">Избранных комментариев пока нет</div>`
    } else {
      html = comments.length ? comments.map(toCard).join(" ") : `<div class="empty-list">Комментариев пока нет</div>`
    }
    list.innerHTML = html
  }

  public clickLike(idComment: string): void {
    const allComments = getCommentsFromLocalStorage()
    let isLikeComment = getProjectName(allComments, idComment)
    isLikeComment.like = isLikeComment.like === true ? false : true
    localStorage.setItem("comments", JSON.stringify(allComments))
  }

  public clickPlus(idComment: string): void {
    const allComments = getCommentsFromLocalStorage()

    let comment = getProjectName(allComments, idComment)

    comment.rating = comment.rating + 1
    localStorage.setItem("comments", JSON.stringify(allComments))
  }

  public clickMinus(idComment: string): void {
    const allComments = getCommentsFromLocalStorage()

    let comment = getProjectName(allComments, idComment)
    comment.rating = comment.rating - 1
    localStorage.setItem("comments", JSON.stringify(allComments))
  }

  public sortComments(sort: string, isAcending: boolean): void {
    const allComments = getCommentsFromLocalStorage()

    if (sort === "date") {
      allComments.sort((x, y) => new Date(x.date).getTime() - new Date(y.date).getTime())
    } else if (sort === "numberAnswers") {
      allComments.sort((x, y) => x.children.length - y.children.length)
    } else if (sort === "numberLike") {
      allComments.sort(compareNumberLikeChildComments)
    }

    if (isAcending !== true) {
      allComments.reverse()
    }
    localStorage.setItem("comments", JSON.stringify(allComments))
  }

  public changeSortComments(isAcending: boolean) {
    const allComments = getCommentsFromLocalStorage()
    if (isAcending !== true) {
      document.getElementById("193")!.setAttribute("d", "M9 15L17.6603 0H0.339746L9 15Z")
    } else {
      document.getElementById("193")!.setAttribute("d", "M9 0L0.339746 15L17.6603 15L9 0Z")
    }
    allComments.reverse()
    localStorage.setItem("comments", JSON.stringify(allComments))
  }

  public getNumberComments(): number {
    let itog = 0
    const comments = getCommentsFromLocalStorage()
    comments?.forEach((item) => {
      if (item.children.length) {
        itog += item.children.length + 1
      } else {
        itog += 1
      }
    })
    return itog
  }
}
