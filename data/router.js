// Needed 
// SOLVED!!!! Post /api/posts, 
// SOLVED!!!! Post /api/posts/:id/comments,
// SOLVED!!!! Get /api/posts,
// SOLVED!!!! Get /api/posts/:id,
// SOLVED!!!! Get /api/posts/:id/comments,
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

router.get("/:id", (req, res)=> {
    dB.findById(req.params.id)
    .then((post)=>{
        if(post.length >= 1){
            res.status(200).json(post)
        } else {
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    })
    .catch((error)=>{
        console.log(error)
        res.status(500).json({error: "The post information could not be retrieved."})
    })
})

router.get("/:id/comments", (req, res) => {
 dB.findPostComments(req.params.id)
 .then((comments)=>{
     if(comments.length >= 1){
        res.status(200).json(comments)
    } else{
        res.status(404).json({message: "The post with the specified ID does not exist."})
    }
 })
 .catch((err)=> {
     console.log("Error trying to read message",err)
     res.status(500).json({
        error: "The comments information could not be retrieved."
     })
 })
})

router.post("/", (req, res) =>{
    if(req.body.title && req.body.contents){
    dB.insert(req.body)
    .then((newPost)=>{
        if(newPost){
            dB.findById(newPost.id)
            .then((NPost)=>{
                res.status(201).json(NPost)
            })
        }
    })
    .catch((errorz)=>{
        console.log("server error in post", errorz)
        res.status(500).json({error: "There was an error while saving the post to the database" })
    })
}else{
    res.status(400).json({errorMessage: "Please provide title and contents for the post." })
}
})

router.post("/:id/comments", (req, res) =>{
    if(req.body.text){
        if(req.params.id == req.body.post_id){
            dB.insertComment(req.body)
            .then((com) =>{
                if(com){
                    dB.findCommentById(com.id)
                    .then((NCom)=>{
                        res.status(201).json(NCom)
                    })
                }
            })
            .catch((errz) =>{
                console.log("server error durring comment post",errz)
                res.status(500).json({error: "There was an error while saving the comment to the database" })
            })
        }else{
            res.status(404).json({message: "The post with the specified ID does not exist."})
        }
    }else{
        res.status(400).json({errorMessage: "Please provide text for the comment."})
    }
})

router.delete("/:id", (req, res) =>{
    const id = req.params.id
    const postToDelete = ()=>{
            dB.findById(id)
            .then((pst)=>{
                if(pst.length>=1){
                res.status(200).json(pst)
                }else{
                    res.status(404).json({message: "The post with the specified ID does not exist."})
                }
            })
        }

        postToDelete();
        dB.remove(id)
        .then((delPost)=>{
            console.log("DeletedPost",delPost)
            res.status(200).json(postToDelete)
        })
        .catch((error)=>{
            res.status(500).json({ error: "The post could not be removed"})
        })


})

module.exports = router;