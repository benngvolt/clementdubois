import { useState } from 'react';
import './Collapse.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
    faChevronDown
} from '@fortawesome/free-solid-svg-icons'


function Collapse({children, title, style}) {


    const [isCollapseOpened, setIsCollapseOpened] = useState(false);
    
    function handleCollapseState() {
        if (isCollapseOpened === true) {
            setIsCollapseOpened(false)
        } else {
            setIsCollapseOpened(true)
        }
    }

    return (     
        <div className={`collapse collapse--${style}`}> 
            <button type='button' className={`collapse_collapseButton collapse_collapseButton--${style}`} onClick={() => handleCollapseState()} ><p>{title}</p><FontAwesomeIcon icon={faChevronDown} className={isCollapseOpened===false?'collapse_collapseButton_icon--closed':'collapse_collapseButton_icon--opened'}/></button>
            <div className={isCollapseOpened===false?'collapse_children collapse_children--closed':'collapse_children collapse_children--opened'}>
                {children}
            </div>
        </div>
    )   
}

export default Collapse