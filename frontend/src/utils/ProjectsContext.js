import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from './constants';
import { useLocation } from 'react-router-dom';
export const ProjectsContext = createContext();
export const ProjectsProvider = ({ children }) => {

    /*---------------------------------
    ----- MISE À JOUR ÉTAT D'AUTH -----
    ---------------------------------*/
    // const [isAuthenticated, setIsAuthenticated] = useState(false);
    // const setLoggedIn = () => {
    //     setIsAuthenticated(true) ;
    // };
    // const setLoggedOut = () => {
    //     setIsAuthenticated(false) ;
    // };

    
    // GESTION STATE LOCAL SERIES + RELOAD 
    
    const [loadProjects, setLoadProjects] = useState(false);
    const handleLoadProjects = () => { 
        setLoadProjects(loadProjects === false ? true : false);
    };

    const [projects, setProjects] = useState([]);
    const [ displayHeader, setDisplayHeader ] = useState(true)

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

    useEffect(() => {
        displayLoader();
        fetch(`${API_URL}/api/projects`)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                hideLoader();
                console.log('Projets chargés');
            })
            .catch((error) => {
                console.log(error.message);
                hideLoader(); // Appel à hideLoader() pour gérer les erreurs
            });
    }, [loadProjects]);

    const [loaderDisplay, setLoaderDisplay] = useState(false);

    function displayLoader() {
        setLoaderDisplay(true);
    }

    function hideLoader() {
        setLoaderDisplay(false);
    }

    return (
        <ProjectsContext.Provider value={{ projects, setProjects, handleLoadProjects, loadProjects, loaderDisplay, displayHeader, closeHeader, openHeader}}>
            {children}
        </ProjectsContext.Provider>
    )
}