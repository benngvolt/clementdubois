import React, { createContext, useState, useEffect } from 'react';
import { API_URL } from './constants'
export const ProjectsContext = createContext()
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

    useEffect(() => {
        fetch(`${API_URL}/api/projects`)
            .then((res) => res.json())
            .then((data) => {
                setProjects(data);
                console.log('Projets chargés');
            })
            .catch((error) => console.log(error.message));
    }, [loadProjects]);

    //AFFICHAGE DU LOADER
    // const [loaderDisplay, setLoaderDisplay] = useState(false);
    // function displayLoader() {
    //     setLoaderDisplay(true);
    // }

    // function hideLoader() {
    //     setLoaderDisplay(false);
    // }

    return (
        <ProjectsContext.Provider value={{ projects, setProjects, handleLoadProjects, loadProjects}}>
            {children}
        </ProjectsContext.Provider>
    )
}