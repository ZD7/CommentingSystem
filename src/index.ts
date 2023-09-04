import { SystemComments } from "./systemComments.js"

const systemComments = new SystemComments()
systemComments.prepare().then(() => {
  systemComments.start()
})
