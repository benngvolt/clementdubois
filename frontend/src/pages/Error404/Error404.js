import './Error404.scss'
import { useContext, useEffect } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext';

    
function Error404() {

    const { setHideFooter} = useContext(ProjectsContext);

    useEffect(() => {
        setHideFooter(true);
    }, []);

    return (
        <div className='error404'>
            <div className='error404_container'>
                <p className='error404_container_404'>404</p>
                <p className='error404_container_text'>oups... cette page n'existe pas.</p>
            </div>
        </div>
    )
}

export default Error404