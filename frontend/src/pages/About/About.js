import { useEffect, useContext } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext'
import './About.scss'
import lignes from '../../datas/lignes.json';
import profileImage from '../../assets/clément-dubois-portrait.jpg'

function About() {

    const { projects, closeHeader } = useContext(ProjectsContext);
    
    console.log(lignes);
  


    return  (      
        <section className='about'>
            <h2 className='about_title'>Clément Dubois</h2>
            <img className='about_img' src={profileImage} alt='Clément Dubois'/>
            <div className='about_introductionContainer'>
                <p> Clément Dubois, scénographe, allie sa riche expérience de comédien et de technicien à sa formation en design. Chaque création, fruit d'une analyse approfondie, fusionne l'esthétique et la fonctionnalité pour susciter l’imaginaire des spectateurs et faciliter le travail des acteurs. Ses décors deviennent des acteurs à part entière, invitant à explorer des univers visuels singuliers, méticuleusement adaptés à chaque récit avec une dramaturgie spécifique.
                    Sa méthodologie de travail encourage la collaboration et l'expression pour tous les contributeurs impliqués dans la conception. Il crée des espaces où la scénographie se transforme en un véritable terrain de jeu artistique, un espace où l'art et la technique se rencontrent, tout en demeurant accessible à tous.
                    En parallèle de ses créations, il partage sa démarche créative à travers des médiations, stages et workshop destinés tant aux publics professionnels qu'amateurs.
                    Depuis 2020, il contribue activement au projet ARTEX, une initiative dédiée au développement de l’éco-création et du réemploi dans les milieux culturels et artistiques de la région Auvergne-Rhône-Alpes.
                    Il est aussi membre de la commission éco-conception de l’Union Des Scénographe et de l’Augures Lab Scénogrrrraphie, réseau professionnel collaboratif et prospectif , qui s’inspire des “4R” de l’économie circulaire (Réparer, Réemployer, Refabriquer, Recycler) pour développer l’écoscénographie.
                </p>
            </div>
            <h3 className='about_manifestoTitle'>Manifeste</h3>        
            <ul className='about_list'>
                {lignes.map((ligne)=>(
                <li className='about_list_item'>
                    <p>{ligne.ligne}</p>
                </li>
                ))}
            </ul>
        </section>
    )
}

export default About