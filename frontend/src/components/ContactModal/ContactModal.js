import './ContactModal.scss'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faXmark} from '@fortawesome/free-solid-svg-icons'


function ContactModal({setdisplayContactModal}) {

    
    return  (      
        <section className='contactModal'>
            <button 
                type='button' 
                className='contactModal_closeButton' 
                aria-label="Fermer la modale Contact"
                onClick={()=>setdisplayContactModal(false)}>
                <FontAwesomeIcon 
                    icon={faXmark} 
                    className='contactModal_closeButton_icon'/>
            </button>

            <div className='contactModal_container'>
                <div className='contactModal_container_yellowBlock'>
                </div>
                <div className='contactModal_container_datas'>
                    <h2 className='contactModal_container_datas_title'>Clément Dubois<br/>Scénographe</h2>
                    <p className='contactModal_container_datas_tel'>
                                +33 6 59 17 44 74
                    </p>
                    {/* <p className='contactModal_container_datas_address'>
                                Le portemine <br/>
                                36 Rue Fontgieve <br/>
                                63000 Clermont-Ferrand
                    </p> */}
                    <p className='contactModal_container_datas_mail'>
                                ecrire@clement-dubois.com
                    </p>
                </div>
            </div>
        </section>
    )
}

export default ContactModal