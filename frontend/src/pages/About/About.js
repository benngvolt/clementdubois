import { useEffect, useContext } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext'
import './About.scss'



function About() {

    const { projects, closeHeader } = useContext(ProjectsContext);

    // useEffect(() => {
    //     closeHeader();
    // },[]);

    return  (      
        <section className='about'>
            <p>About</p>
        </section>
    )
}

export default About