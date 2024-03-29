import React, { useContext, useState } from 'react';
import './AuthModal.scss';
import { ProjectsContext } from '../../utils/ProjectsContext';
import { useNavigate } from 'react-router-dom';
import { API_URL } from '../../utils/constants';

function AuthModal({ handleAuthModal, authModalDisplay }) {
    const { setLoggedIn, setLoggedOut } = useContext(ProjectsContext);
    const navigate = useNavigate();

    const [displayError, setDisplayError] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const onSubmit = async (event) => {
        event.preventDefault();

        const authData = {
            username,
            password
        };

        try {
            const response = await fetch(`${API_URL}/api/users`, {
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(authData)
            });

            const data = await response.json();

            if (data.token) {
                setDisplayError(false);
                const tokenValue = JSON.stringify(data.token);
                const token = tokenValue.replace(/"/g, '');
                setLoggedIn();
                handleAuthModal();
                navigate('/edit');
                window.sessionStorage.setItem("1", token);
                console.log('authentifié')
            } else {
                setDisplayError(true);
                setLoggedOut();
                console.log('non authentifié')
            }
        } catch (error) {
            console.error(error);
        }
    }

    // const onSubmit = async (event) => {
    //     event.preventDefault();
    
    //     const authData = {
    //         username,
    //         password
    //     };
    
    //     try {
    //         const response = await fetch(`${API_URL}/api/users/signup`, {
    //             method: "POST",
    //             headers: {
    //                 'Content-Type': 'application/json'
    //             },
    //             body: JSON.stringify(authData)
    //         });
    
    //         if (response.ok) {
    //             // La requête a réussi (statut HTTP 200)
    //             const data = await response.json();
    //             // Traitez les données de réponse selon vos besoins
    //             console.log("Inscription réussie !", data);
    //             closeAuthModal();
    //         } else {
                
    //             // La requête a échoué avec un statut HTTP différent de 200
    //             // Vous pouvez gérer les erreurs ici, par exemple :
    //             if (response.status === 400) {
    //                 // Gérer l'erreur de validation des données
    //                 console.error("Erreur de validation des données");
    //             } else if (response.status === 401) {
    //                 // Gérer l'erreur d'authentification
    //                 console.error("Erreur d'authentification");
    //             } else {
    //                 // Gérer d'autres erreurs
    //                 console.error("Erreur inattendue :", response.statusText);
    //             }
    //         }
    //     } catch (error) {
    //         // Une erreur s'est produite lors de l'appel de l'API
    //         console.error("Erreur lors de la requête :", error);
    //     }
    // }

    const closeAuthModal = () => {
        handleAuthModal();
        setDisplayError(false);
    }

    return (
        <div className={authModalDisplay === true ? 'authModal authModal--displayOn' : 'authModal authModal--displayOff'}>
            <form onSubmit={onSubmit} className='authModal_form'>
                <p className='authModal_form_title'>AUTHENTIFICATION</p>
                <p className='authModal_form_alert'></p>
                <div className='authModal_form_usernameField'>
                    <label>USERNAME</label>
                    <input type='text' name='username' value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div className='authModal_form_passwordField'>
                    <label>PASSWORD</label>
                    <input type='password' name='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <p className={displayError === true ? 'authModal_alertTextStyle--displayOn' : 'authModal_alertTextStyle--displayOff'}>Utilisateur non-autorisé</p>
                <button type='submit' aria-label="Soumettre le formulaire d'authentification" className='authModal_form_button'>LOGIN</button>
            </form>
            <button onClick={closeAuthModal} aria-label="Fermer la modale d'authentification" className='authModal_form_button'>CLOSE</button>
        </div>
    );
}

export default AuthModal;