import express  from 'express'
import upload from '../middleware/uploads.middleware.js'
import { destroy, get, store, update,detail } from '../controllers/blog.controller.js';
import { authMiddleware } from '../middleware/auth.middleware.js';
const blogroute = express.Router()


// get all blogs 
blogroute.get('/', authMiddleware,get);

// store blog
blogroute.post('/store',upload.single('coverImage'),store)

// delete blog
blogroute.delete('/:id',destroy)

// get blog detail
blogroute.get('/:slug',detail)

// update blog
blogroute.put('/:id',upload.single('coverImage'),update)


export default blogroute