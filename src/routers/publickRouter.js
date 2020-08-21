import Router from 'koa-router'
import PublickController from '../api/PublickController'

const router = new Router()

router.prefix('/public')
router.get('/getCaptcha', PublickController.getCapthca)

export default router
