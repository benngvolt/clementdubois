import './ValidBox.scss'
    
function ValidBox({validBoxState}) {
    
    return (
        <div className={validBoxState===true?"validBox validBox--displayOn":"validBox validBox--displayOff"}>
            <div className="validBox_container">
                <p>Projet enregistré avec succès!</p>
            </div>
        </div>
    )
}

export default ValidBox