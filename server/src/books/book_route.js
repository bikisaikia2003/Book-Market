import express from "express";
import Book from "./bookmodel.js";
import bookdetail from "./bookcontroller.js";

const router = express.Router()

//post a book
router.post('/create-book',bookdetail.postABook)
//get all Book
router.get('/',bookdetail.getAllBook)
//get a single book
router.get('/:id',bookdetail.getSingleBook)
//update a book
router.put('/edit/:id',bookdetail.updateBook)
//delete a Book
router.delete('/delete/:id',bookdetail.deleteBook)
export default router;