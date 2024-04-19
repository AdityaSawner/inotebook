import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'

const Addnote = () => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note,setNote]=useState({title:"",description:"",tag:""})

    const onClick=(e)=>{
        e.preventDefault();
         addNote(note.title,note.description,note.tag);
         setNote({title:"",description:"",tag:""})
    }
    
    const onChange=(e)=>{
      setNote({...note,[e.target.name]:e.target.value})
    }

    return (
        <div>
            <h2>add your note</h2>
            <div >
                <form>
                    <div className="form-group mx-10">
                        <label htmlFor="title">Title</label>
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={onChange} />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={onChange} minLength={5} required/>
                    </div>
                    <div className="form-group ">
                        <label htmlFor="tag">tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={onChange} minLength={5} required />
                    </div>
                   
                    <button disabled={note.title.length < 5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={onClick}>Add note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
