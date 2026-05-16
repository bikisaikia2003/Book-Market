import Book from "./bookmodel.js";


const postABook = async (req, res) => {
  try {
    if (!req.body) {
      return res.status(400).json({ message: "Request body missing" });
    }

    const {
      title,
      description,
      category,
      trending,
      coverImage,
      oldPrice,
      newPrice,
    } = req.body;

    const newBook = new Book({
      title,
      description,
      category,
      trending,
      coverImage,
      oldPrice,
      newPrice,
    });

    await newBook.save();

    res.status(201).json({
      message: "Book posted successfully!",
      book: newBook,
    });
  } catch (error) {
    console.error("Error creating book:", error);
    res.status(500).json({ message: "Failed to create Book" });
  }
};

//APi for gettibg all books
const getAllBook =async(req,res)=>{
    try {
        const books = await Book.find().sort({ createdAt: -1 })
        res.status(200).send(books)
    } catch (error) {
        console.log("Falid to get all books",error)
        res.status(500).send({message:"failed to fetch books"})        
    }
}
//Api for getting a single book
const getSingleBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findOne({ _id: id });

    if (!book) {
      return res.status(404).send({ message: "Book not found" });
    }

    res.status(200).send(book);
  } catch (error) {
    console.log("failed to get a book", error);
    res.status(500).send({ message: "failed to fetch book" });
  }
};
//update a book
const updateBook=async (req,res)=>{
  try {
    const {id}=req.params
    const updatedBook= await Book.findByIdAndUpdate(id,req.body,{new:true})
    if(!updatedBook){
        return res.status(404).send({ message: "Book not found" });      
    }
    res.status(200).send(updatedBook)
  } catch (error) {
    console.log("failed to update the book",error)
    res.status(500).send({message:"Failed to update a Book"})
  }
}
//delete a Book
const deleteBook= async (req,res)=>{
  try {
    const {id}=req.params
    const deletedBook = await Book.findByIdAndDelete(id)
    if(!deletedBook){
      return res.status(404).send({ message: "Book not found" });
    }
    res.status(200).send({message:"Deleted the book"})
  } catch (error) {
    console.log("failed to delete the book",error)
    res.status(500).send({message:"Failed to delete a Book"})
  }
}


export default {
  postABook,
  getAllBook,
  getSingleBook,
  updateBook,
  deleteBook
};