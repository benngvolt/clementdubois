import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from './constants';
import { useLocation } from 'react-router-dom';
export const ProjectsContext = createContext();


export const ProjectsProvider = ({ children }) => {

    /*---------------------------------
    ----- MISE À JOUR ÉTAT D'AUTH -----
    ---------------------------------*/

    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const setLoggedIn = () => {
        setIsAuthenticated(true) ;
    };
    const setLoggedOut = () => {
        setIsAuthenticated(false) ;
    };    

    // GESTION STATE LOCAL SERIES + RELOAD 

    const [loadProjects, setLoadProjects] = useState(false);
    const [projects, setProjects] = useState([]);
    const [displayHeader, setDisplayHeader] = useState(true)
    const [hideHeader, setHideHeader] = useState(true)
    const [hideFooter, setHideFooter] = useState(true)
    const [loaderDisplay, setLoaderDisplay] = useState(false);
    const [randomImagesSelection, setRandomImageSelection] = useState ([]);

    // définition des catégories de projets
    const projectCategories = ['spectacle vivant','évènement', 'médiation']
    const productionCategories = ['Production','Co-production', 'Accueil en résidence de création', 'Aide à la création','Aide à la résidence d\'écriture', 'Soutien', 'Remerciements']

    /*---------------------------------------------
    ----- Chargement des projets et stockage ------
    ---------------------------------------------*/

    useEffect(() => {
        displayLoader();
        fetch(`${API_URL}/api/projects`)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                hideLoader();
            })
            .catch((error) => {
                console.log(error.message);
                hideLoader(); // Appel à hideLoader() pour gérer les erreurs
            });
    }, [loadProjects]);

    const handleLoadProjects = () => { 
        setLoadProjects(loadProjects === false ? true : false);
    };

    /*----------------------------------------
    ----- Gestion d'affichage du header ------
    ----------------------------------------*/

    // déploiement/fermeture du header
    const location = useLocation();

    function openHeader() {
        if (location.pathname==='/') {
            return;
        }
        setDisplayHeader(true)
    }

    function closeHeader() {
        if (location.pathname==='/') {
            return;
        }
        setDisplayHeader(false)
    }

    // affichage/dissimulation du header
    useEffect(() => {
        if (location.pathname==='/') {
            setHideHeader(true);
        } else {
            setHideHeader(false);
        }
    }, [location.pathname]);

    /*----------------------------------------
    ----- Gestion d'affichage du footer ------
    ----------------------------------------*/

    // affichage/dissimulation du footer
    useEffect(() => {
        if (location.pathname === '/edit' || location.pathname === '/' ) {
            setHideFooter(true);
        } else {
            setHideFooter(false);
        }
    }, [location.pathname]);

    /*----------------------------------------
    ----- Gestion d'affichage du loader ------
    ----------------------------------------*/

    function displayLoader() {
        setLoaderDisplay(true);
    }

    function hideLoader() {
        setLoaderDisplay(false);
    }

    return (
        <ProjectsContext.Provider value={{ 
                projects, 
                setProjects, 
                handleLoadProjects, 
                loadProjects, 
                loaderDisplay, 
                setLoaderDisplay, 
                displayHeader, 
                closeHeader, 
                openHeader, 
                randomImagesSelection, 
                hideHeader, 
                hideFooter, 
                projectCategories, 
                productionCategories, 
                setDisplayHeader, 
                setLoggedOut, 
                setLoggedIn,
                isAuthenticated,
                setHideFooter
                }}>
            {children}
        </ProjectsContext.Provider>
    )
}