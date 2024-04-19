import React, { useContext, useState } from 'react'
import noteContext from '../context/noteContext'

const Addnote = () => {
    const context = useContext(noteContext)
    const { addNote } = context

    const [note,setNote]=useState({title:"",description:"",tag:""})

    const onClick=(e)=>{
        e.preventDefault();
         addNote(note.title,note.description,note.tag);
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
                        <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" onChange={onChange} />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="description">Description</label>
                        <input type="text" className="form-control" id="description" name="description" onChange={onChange} />
                    </div>
                    <div className="form-group ">
                        <label htmlFor="tag">tag</label>
                        <input type="text" className="form-control" id="tag" name="tag" onChange={onChange} />
                    </div>
                   
                    <button type="submit" className="btn btn-primary" onClick={onClick}>Add note</button>
                </form>
            </div>
        </div>
    )
}

export default Addnote
