import './ProjectForm.scss'
import {useRef, useState, useEffect } from 'react'


function ProjectForm({
    projectEdit,
    projectFormMode
    }) {

    const inputProjectTitleRef = useRef(null);

    return  (      
        <form className='projectForm'>

            {/* CHAMPS TITRE */}
            <div className='projectForm_projectTitle'>
                <label htmlFor='inputProjectTitle'>TITRE*</label>
                <input type='text' id='inputProjectTitle' ref={inputProjectTitleRef} defaultValue={projectFormMode==='edit'? projectEdit.title : null}></input>
            </div>
            
        </form>
    )
}

export default ProjectForm