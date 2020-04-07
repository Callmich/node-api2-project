// Needed 
// Post /api/posts, 
// Post /api/posts/:id/comments,
// Get /api/posts,
// Get /api/posts/:id,
// Get /api/posts/:id/comments,
// DELETE /api/posts/:id,
// Put /api/posts/:id

const express = require("express")

const dB = require("./db");

const router = express.Router();

//handle every request begining with /api/posts

router.get("/", (req, res)=> {
    dB.find()
    .then((array) => {
        res.status(200).json(array)
    }
    )
    .catch((error) => {
        console.log(error)
        res.status(500).json({error: "The posts information could not be retrieved."})
    }
    
    )
})

module.exports = router;