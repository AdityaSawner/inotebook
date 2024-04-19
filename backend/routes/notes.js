const express = require("express");
const router = express.Router();
var fetchuser = require("../middleware/fetchuser");
const Note = require("../models/Note");
const { body, validationResult } = require("express-validator");

//to fetch note
router.get("/fetchallnotes", fetchuser, async (req, res) => {
  try {
    const notes = await Note.find({ user: req.user.id });
    res.json(notes);
  } catch (error) {
    console.error(error.message);
    res.json(500).send("internal server error");
  }
});

//to add note
router.post(
  "/addnote",
  fetchuser,
  [
    body('title', 'enter valid title').isLength({ min: 1 }),
    body('description','enter valid description').isLength({ min: 1 }),
  ],
  async (req, res) => {
    try {
      const { title, description, tag } = req.body;

      //if there are error it will return it as bad request

      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
      }

      const note = new Note({
        title,
        description,
        tag,
        user: req.user.id,
      });
      const savedNote = await note.save();

      res.json(savedNote);
    } 
    catch (error) {
      console.error(error.message);
      res.json(500).send("internal server error");
    }
  }
);

//route 3 for editing
router.put("/updatenote/:id", fetchuser, async (req, res) => {
  const {title,description,tag}=req.body;

  //create new object 
  
  const newNote={};
  if(title){
    newNote.title=title;
  }
  if(description){
    newNote.description=description;
  }
  if(tag){
    newNote.tag=tag;
  }
  let note=await Note.findById(req.params.id)
  if(!note){
    return res.status(404).send("not found");
  }
  if(note.user.toString()!==req.user.id){
    return res.status(401).send("not allowed")
  }
  
  note=await Note.findByIdAndUpdate(req.params.id,{$set: newNote},{new:true})
  res.json({note});

  
})

//route 4: for deleting 

router.delete("/deletenote/:id", fetchuser, async (req, res) => {
  
  
// find note to be deleted
  try {
    let note=await Note.findById(req.params.id)
  if(!note){
    return req.status(404).send("not found");
  }

  // check it is correct user
  if(note.user.toString()!==req.user.id){
    return req.status(401).send("not allowed")
  }
  
  note=await Note.findByIdAndDelete(req.params.id)
  res.json({success:"note has been deleted"});
  } 
  catch (error) {
    console.error(error.message);
    res.json(500).send("internal server error");
  }
})

module.exports = router;
