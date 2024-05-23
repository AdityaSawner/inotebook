import React, { useState } from "react";
import noteContext from "./noteContext";

const NoteState = (props) => {
  const host="http://localhost:5000"

  const [notes, setNotes] = useState([]);

  //get all notes
  const getNotes = async () => {
    //api call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
        
      }
    });
    const json= await response.json();
    console.log(json)
    setNotes(json)
 };



  //add a note
  
  const addNote = async (title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
        
      },
      body: JSON.stringify({title,description,tag}),
    });
    const note= await response.json();
    setNotes(notes.concat(note));
  };

  //delete a note
  const deleteNote =async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
        
      },
  
    });
    const json= await response.json();
    console.log(json);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setNotes(newNotes);
  };

  //edit a note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token":localStorage.getItem('token'),
        
      },
      body: JSON.stringify({title,description,tag}),
    });
    const json= await response.json();
    console.log(json)
    
    let newNotes=JSON.parse(JSON.stringify(notes))

    for (let index = 0; index < notes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      
 
    }
    setNotes(newNotes)
  };

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export default NoteState;
