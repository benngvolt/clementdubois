import './ConfirmBox.scss'
    
function ConfirmBox({confirmBoxState, affirmativeChoice, negativeChoice, attribut}) {
    
    return (
        <div className={confirmBoxState === false ? "editWorkModal_confirmBox editWorkModal_confirmBox--displayOff" : "editWorkModal_confirmBox editWorkModal_confirmBox--displayOn"}>
            <div className='editWorkModal_confirmBox_container'>
                <p className='editWorkModal_confirmBox_container_question'>Es-tu sûr ?</p>
                <div className='editWorkModal_confirmBox_container_buttons'>
                    <button aria-label="Valider la suppression" onClick={() => affirmativeChoice(attribut)} type='button'>OUI</button>
                    <button aria-label="Annuler la suppression" onClick={() => negativeChoice() } type='button'>NON</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox