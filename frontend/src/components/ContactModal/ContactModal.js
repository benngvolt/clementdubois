import { useEffect, useContext } from 'react';
import './ContactModal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'


function ContactModal({setdisplayContactModal}) {

    
    return  (      
        <section className='contactModal'>
            <button type='button' className='contactModal_closeButton' onClick={()=>setdisplayContactModal(false)}>
                <FontAwesomeIcon icon={faXmark} className='contactModal_closeButton_icon'/>
            </button>
            <h3 className='contactModal_title'>Contact</h3>
            <p className='contactModal_tel'>
                        06 59 17 44 74
            </p>
            <p className='contactModal_address'>
                        Le portemine <br/>
                        36 Rue Fontgieve <br/>
                        63000 Clermont-Ferrand
            </p>
            <p className='contactModal_mail'>
                        ecrire@clement-dubois.com
            </p>
        </section>
    )
}

export default ContactModal