import express  from 'express'
import upload from '../middleware/uploads.middleware.js'
import { destroy, get, store, update } from '../controllers/blog.controller.js';
const blogroute = express.Router()


// get all blogs 
blogroute.get('/',get);

// store blog
blogroute.post('/store',upload.single('coverImage'),store)

// delete blog
blogroute.delete('/:id',destroy)


// update blog
blogroute.put('/:id',update)


export default blogroute