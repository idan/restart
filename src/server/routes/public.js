import {Router} from 'express'

const router = Router()

router.get('/about', (req, res) => {
  res.end(`<p>Cat gifs go here.</p>`)
})

export default router
