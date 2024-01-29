import './ConfirmBox.scss'
    
function ConfirmBox({closeConfirmBox, deleteProject, confirmBoxState}) {
    
    return (
        <div className={confirmBoxState === false ? "editWorkModal_confirmBox editWorkModal_confirmBox--displayOff" : "editWorkModal_confirmBox editWorkModal_confirmBox--displayOn"}>
            <div className='editWorkModal_confirmBox_container'>
                <p className='editWorkModal_confirmBox_container_question'>Voulez-vous vraiment supprimer ce projet?</p>
                <div className='editWorkModal_confirmBox_container_buttons'>
                    <button aria-label="Valider la suppression" onClick={() => deleteProject()}>OUI</button>
                    <button aria-label="Annuler la suppression" onClick={() => closeConfirmBox() } type='button'>NON</button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmBox