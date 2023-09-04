export function isValid(value) {
    return value.length >= 1 && value.length <= 1000;
}
export function compareNumberLikeChildComments(a, b) {
    let aa = 0;
    let bb = 0;
    for (let prop in a.children) {
        if (a.children[prop]["like"] === true) {
            aa += 1;
        }
    }
    for (let prop in b.children) {
        if (b.children[prop]["like"] === true) {
            bb += 1;
        }
    }
    if (aa > bb) {
        return 1;
    }
    else if (aa < bb) {
        return -1;
    }
    else
        return 0;
}
export function getCommentsFromLocalStorage() {
    return JSON.parse(localStorage.getItem("comments") || "[]");
}
export const getLikeComments = (comments) => {
    let itog = [];
    comments === null || comments === void 0 ? void 0 : comments.forEach((item) => {
        let changeChildren = [];
        if (item.children.length) {
            if (item.like === true) {
                for (let prop in item.children) {
                    if (item.children[prop]["like"] === true) {
                        changeChildren.push(item.children[prop]);
                    }
                }
                itog.push(Object.assign(Object.assign({}, item), { children: changeChildren }));
            }
            else {
                for (let prop in item.children) {
                    if (item.children[prop]["like"] === true) {
                        itog.push(Object.assign(Object.assign({}, item.children[prop]), { nameParent: item.nameUser }));
                    }
                }
            }
        }
        else {
            if (item.like === true) {
                itog.push(item);
            }
        }
    });
    return itog;
};
export function toCard(comment) {
    let childComments = "";
    let childComment = "";
    if (comment.children.length) {
        comment.children.map((el) => {
            childComment += `
        <div class="wrapper">
          <img src=${el.urlAvatar} class="avatar">
          <div class="container-comment-children">
            <div class="header-comment">
              <div>${el.nameUser}</div>
              <div class="parent-name">${svgResponseArrow}${comment.nameUser}</div>
              <div class="date-time">
                ${new Date(el.date).toLocaleDateString().slice(0, 5)}
                ${new Date(el.date).toLocaleTimeString().slice(0, 5)}
              </div>
            </div>
            <div>${el.text}</div>
            <div class="footer">
              <button class="like" data-id="${el.id}">${likeSVG(el.like)}${el.like ? "В избранном" : "В избранное"}</button>
              <div class="block-rating">
                <button class="minus" data-id="${el.id}">${svgMinus}</button>
                <span class="rating">${el.rating}</span>
                <button class="plus" data-id="${el.id}">${svgPlus}</button>
              </div>
            </div>
          </div>
        </div>
      `;
        });
        childComments = `<div class="block-result-child-comment">${childComment}</div>`;
    }
    let parentComent = `
  <div class="wrapper">
    <img src=${comment.urlAvatar} alt="Avatar" class="avatar">
    <div class="container-comment">
      <div class="header-comment">
        <div>${comment.nameUser}</div>
        ${comment.hasOwnProperty("nameParent")
        ? `<div class="parent-name">${svgResponseArrow}${comment.nameParent}</div>`
        : ""}
          <div class="date-time">
            ${new Date(comment.date).toLocaleDateString().slice(0, 5)}
            ${new Date(comment.date).toLocaleTimeString().slice(0, 5)}
          </div>
      </div>
      <div>${comment.text}</div>
      <div class="footer footer-parent">
        <div>
          <button class="like" data-id="${comment.id}">${likeSVG(comment.like)}${comment.like ? "В избранном" : "В избранное"}</button>
        </div>
        <div>
          ${comment.type === "parent"
        ? `<button class="response" data-id=${comment.id}>${svgResponseArrow}Ответить</button>`
        : ""}
        </div>
        <div class="block-rating">
          <button class="minus" value="child" data-id="${comment.id}">${svgMinus}</button>
            <span class="rating">${comment.rating}</span>
          <button class="plus" value="child" data-id="${comment.id}">${svgPlus}</button>
        </div>
      </div>
      ${childComments.length ? childComments : ""}
    </div>
  </div>
  `;
    return parentComent;
}
export const getProjectName = (comments, commentId) => {
    let itog;
    const findProjectName = (comments, commentId) => {
        comments === null || comments === void 0 ? void 0 : comments.forEach((child) => {
            if (child.id === commentId) {
                itog = child;
                return child;
            }
            else {
                findProjectName(child.children, commentId);
            }
        });
    };
    findProjectName(comments, commentId);
    return itog;
};
export function addToLocalStorage(comment, idParent) {
    const allComments = getCommentsFromLocalStorage();
    // const allComments: IComment[] = JSON.parse(localStorage.getItem("comments") || "[]")
    if (comment.type === "children") {
        const parentComment = getProjectName(allComments, idParent);
        parentComment.children.push(comment);
        localStorage.setItem("comments", JSON.stringify(allComments));
    }
    else {
        allComments.push(comment);
        localStorage.setItem("comments", JSON.stringify(allComments));
    }
}
const firstName = new Array("Alice", "Bonnie", "Cassie", "Donna", "Ethel", "Grace", "Heather", "Jan", "Katherine", "Julie", "Marcia", "Patricia", "Mabel", "Jennifer", "Dorthey", "Mary Ellen", "Jacki", "Jean", "Betty", "Diane", "Annette", "Dawn", "Jody", "Karen", "Mary Jane", "Shannon", "Stephanie", "Kathleen", "Emily", "Tiffany", "Angela", "Christine", "Debbie", "Karla", "Sandy", "Marilyn", "Brenda", "Hayley", "Linda", "Allen", "Bob", "Carlton", "David", "Ernie", "Foster", "George", "Howard", "Ian", "Jeffery", "Kenneth", "Lawrence", "Michael", "Nathen", "Orson", "Peter", "Quinten", "Reginald", "Stephen", "Thomas", "Morris", "Victor", "Walter", "Xavier", "Charles", "Anthony", "Gordon", "Percy", "Conrad", "Quincey", "Armand", "Jamal", "Andrew", "Matthew", "Mark", "Gerald");
const lastName = new Array("Adams", "Bowden", "Conway", "Darden", "Edwards", "Flynn", "Gilliam", "Holiday", "Ingram", "Johnson", "Kraemer", "Hunter", "McDonald", "Nichols", "Pierce", "Sawyer", "Saunders", "Schmidt", "Schroeder", "Smith", "Douglas", "Ward", "Watson", "Williams", "Winters", "Yeager", "Ford", "Forman", "Dixon", "Clark", "Churchill", "Brown", "Blum", "Anderson", "Black", "Cavenaugh", "Hampton", "Jenkins", "Prichard");
export function RandomName() {
    let i = Math.floor(Math.random() * firstName.length);
    let r = Math.floor(Math.random() * lastName.length);
    return firstName[i] + " " + lastName[r];
}
export const svgResponseArrow = `<svg class="responseArrow" xmlns="http://www.w3.org/2000/svg" width="22.702" height="21.928">
<g opacity="0.4">
<path d="M11.629 12.553c4.356.341 10.018 2.844 10.018 9.375h.979c.084-.925.693-8.982-3.653-13.74a10.506 10.506 0 0 0-7.344-3.352V0L0 9.044 11.629 18.1z"/>
</g>
</svg>`;
export const likeSVG = (isLike) => {
    return `
    <svg class="svgLike" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <g opacity="0.4">
        <mask id="mask0_3_263" style="mask-type:alpha" maskUnits="userSpaceOnUse" x="0" y="0" width="24" height="24">
          <rect width="24" height="24" fill="url(#pattern0)"/>
        </mask>
        <g mask="url(#mask0_3_263)">
          <rect x="-1.25" width="29.5" height="27.5" fill="black"/>
          ${isLike
        ? ""
        : `<path d="M3.5 9.00004C2.5 12.9999 8.83333 17.3333 12 20C20 14.4 21.1667 10.5001 20.5 9.00004C18.5 4.20004 13.8333 6.16667 12 8.00001C7 3.5 4.5 6.50002 3.5 9.00004Z" fill="white"/>`}
        </g>
      </g>
    </svg>`;
};
export const svgPlus = `
<svg class="svg-plus" width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M4.13281 9.16903V0.526988H5.85227V9.16903H4.13281ZM0.674716 5.70455V3.98509H9.31676V5.70455H0.674716Z" fill="#8AC540"/>
</svg>
`;
export const svgMinus = `
<svg class="svg-minus" width="10" height="10" viewBox="0 0 7 3" fill="none" xmlns="http://www.w3.org/2000/svg">
<path d="M6.0696 0.639914V2.29545H0.265625V0.639914H6.0696Z" fill="#FF0000"/>
</svg>
`;
export const sortSVG = `
<svg class="svg-sort" width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
<path opacity="0.4" d="M9 15L17.6603 0H0.339746L9 15Z" fill="black"/>
</svg>
`;
export const choiceSVG = `
<svg id="svg-choice" width="16" height="16" viewBox="0 0 16 16" margin = "30px" fill="none" xmlns="http://www.w3.org/2000/svg">
<path id="194" opacity="0.4" d="M2.7998 8.00039L6.3998 11.6004L13.3998 4.40039" stroke="black" stroke-width="2"/>
</svg>`;
// export function api() {
//   return fetch(`https://picsum.photos/id/${Math.floor(Math.random() * 1084)}/200`)
//     .then((response) => {
//       if (!response.ok) {
//         console.log(response.status)
//         throw new Error(response.statusText)
//       }
//       const result = response
//       return result
//     })
//     .then((data) => {
//       return data
//     })
//     .then((url) => {
//       return url.url
//     })
//     .catch((error: Error) => {
//       throw error
//     })
// }
// const obj = {
//   a: "",
//   setA: (b) => {
//     obj.a = b
//   },
// }
// async function getAll() {
//   let g9 = await api()
//   console.log("g9", g9)
//   obj.setA(g9)
//   console.log("aaa", obj);
// }
// const sss = getAll()
// setTimeout(()=>{
// console.log("sdfg", obj);
// },123)
// obj.setA("asd")
// console.log(obj);
// function api<T>(url: string): Promise<T> {
//   return fetch(url)
//     .then(response => {
//       if (!response.ok) {
//         console.log(response.status)
//         throw new Error(response.statusText)
//       }
//       // return response.json<{ data: T }>()
//       // return response.json<T>()
//       // return response.json() as Promise<T>
//       return response.json() as Promise<{ data: T }>
//     })
//     .then(data => {
//       return data.data
//     })
//     .catch((error: Error) => {
//       throw error /* повторно выдать ошибку, чтобы потребитель мог ее отловить */
//     })
// }
// let vvv = api<{ title: string; message: string }>(`https://picsum.photos/id/756/200`)
//   // .then(({ title, message }) => {
//   //   console.log(title, message)
//   // })
//   // .catch(error => {
//   //   console.log("error", error)
//   // })
