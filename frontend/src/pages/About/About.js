import { useEffect, useContext } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext'
import './About.scss'
import lignes from '../../datas/lignes.json';
import portrait from '../../assets/clementDubois.jpg';
import atelier1 from '../../assets/atelier1.jpeg';
import atelier2 from '../../assets/atelier2.jpeg';
import antoineEvents from '../../assets/logos/antoine evenements.jpeg';
import artex from '../../assets/logos/artex.webp';
import daruma from '../../assets/logos/daruma.png';
import etonnantFestin from '../../assets/logos/etonnantFestin.jpeg';
import fnau from '../../assets/logos/FNAU.jpg';
import kube from '../../assets/logos/kube.png';
import laFauvette from '../../assets/logos/laFauvette.png';
import operaClermont from '../../assets/logos/operaClermont.png';
import porteMine from '../../assets/logos/porte mine.png';
import Collapse from '../../components/Collapse/Collapse';


function About() {

    const { setDisplayHeader, displayHeader } = useContext(ProjectsContext);

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
        <main className='about' onClick={()=>displayHeader===true && setDisplayHeader(false)}>
            <img className='about_img' src={portrait} alt='Portrait de Clément Dubois'/>
            <section className='about_introductionContainer'>
                <p> Clément Dubois, scénographe, allie sa riche expérience de comédien et de technicien à sa formation en design. Chaque création, fruit d'une analyse approfondie, fusionne l'esthétique et la fonctionnalité pour susciter l’imaginaire des spectateurs et faciliter le travail des acteurs. Ses décors deviennent des acteurs à part entière, invitant à explorer des univers visuels singuliers, méticuleusement adaptés à chaque récit avec une dramaturgie spécifique.
                    Sa méthodologie de travail encourage la collaboration et l'expression pour tous les contributeurs impliqués dans la conception. Il crée des espaces où la scénographie se transforme en un véritable terrain de jeu artistique, un espace où l'art et la technique se rencontrent, tout en demeurant accessible à tous.<br/><br/>
                    En parallèle de ses créations, il partage sa démarche créative à travers des médiations, stages et workshop destinés tant aux publics professionnels qu'amateurs.
                    Depuis 2020, il contribue activement au projet ARTEX, une initiative dédiée au développement de l’éco-création et du réemploi dans les milieux culturels et artistiques de la région Auvergne-Rhône-Alpes.
                    Il est aussi membre de la commission éco-conception de l’Union Des Scénographe et de l’Augures Lab Scénogrrrraphie, réseau professionnel collaboratif et prospectif , qui s’inspire des “4R” de l’économie circulaire (Réparer, Réemployer, Refabriquer, Recycler) pour développer l’écoscénographie.
                </p>
            </section>
            <img className='about_img' src={atelier1} alt='Première image atelier de Clément Dubois'/>
            <section className='about_manifestoContainer'>
                <h5 className='about_manifestoContainer_title'>Manifeste</h5>
                <p className='about_manifestoContainer_secondTitle'>En premier lieu</p> 
                <p className='about_manifestoContainer_description'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.
                </p>    
                <ul className='about_manifestoContainer_list'>
                    {lignes.map((ligne, index)=>(
                    <li key={index} className='about_manifestoContainer_list_item'>
                        <p>{ligne.ligne}</p>
                    </li>
                    ))}
                </ul>
            </section>
            <img className='about_img' src={atelier2} alt='Seconde image atelier de Clément Dubois'/>
            <Collapse title="Collaborations" style='white'>
                <ul className='about_collabsGrid'>
                    <li className='about_collabsGrid_item'> 
                        <img src={antoineEvents} alt='Logo Antoine Evenements'/>
                    </li>
                    <li className='about_collabsGrid_item'> 
                        <img src={artex} alt='Logo Artex'/>
                    </li>
                    <li className='about_collabsGrid_item'> 
                        <img src={porteMine} alt='Logo Porte Mine'/>
                    </li>
                    <li className='about_collabsGrid_item'> 
                        <img src={etonnantFestin} alt='Logo Etonnant Festin'/>
                    </li>
                    <li className='about_collabsGrid_item'> 
                        <img src={fnau} alt='Logo FNAU'/>
                    </li>
                    <li className='about_collabsGrid_item'> 
                        <img src={operaClermont} alt='Logo Opera Clermont'/>
                    </li>
                    <li className='about_collabsGrid_item'> 
                        <img src={kube} alt='Logo Kube'/>
                    </li>
                    <li className='about_collabsGrid_item'> 
                        <img src={laFauvette} alt='Logo La Fauvette'/>
                    </li>
                </ul>
            </Collapse>
            <Collapse title="Mentions légales" style='dark'>
                <p className='about_mentionsText'> Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed non risus. Suspendisse lectus tortor, dignissim sit amet, adipiscing nec, ultricies sed, dolor. Cras elementum ultrices diam. Maecenas ligula massa, varius a, semper congue, euismod non, mi. Proin porttitor, orci nec nonummy molestie, enim est eleifend mi, non fermentum diam nisl sit amet erat. Duis semper. Duis arcu massa, scelerisque vitae, consequat in, pretium a, enim. Pellentesque congue. Ut in risus volutpat libero pharetra tempor. Cras vestibulum bibendum augue. Praesent egestas leo in pede. Praesent blandit odio eu enim. Pellentesque sed dui ut augue blandit sodales. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam nibh. Mauris ac mauris sed pede pellentesque fermentum. Maecenas adipiscing ante non diam sodales hendrerit.<br/><br/>
                    Ut velit mauris, egestas sed, gravida nec, ornare ut, mi. Aenean ut orci vel massa suscipit pulvinar. Nulla sollicitudin. Fusce varius, ligula non tempus aliquam, nunc turpis ullamcorper nibh, in tempus sapien eros vitae ligula. Pellentesque rhoncus nunc et augue. Integer id felis. Curabitur aliquet pellentesque diam. Integer quis metus vitae elit lobortis egestas. Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Morbi vel erat non mauris convallis vehicula. Nulla et sapien. Integer tortor tellus, aliquam faucibus, convallis id, congue eu, quam. Mauris ullamcorper felis vitae erat. Proin feugiat, augue non elementum posuere, metus purus iaculis lectus, et tristique ligula justo vitae magna.<br/><br/>
                    Aliquam convallis sollicitudin purus. Praesent aliquam, enim at fermentum mollis, ligula massa adipiscing nisl, ac euismod nibh nisl eu lectus. Fusce vulputate sem at sapien. Vivamus leo. Aliquam euismod libero eu enim. Nulla nec felis sed leo placerat imperdiet. Aenean suscipit nulla in justo. Suspendisse cursus rutrum augue. Nulla tincidunt tincidunt mi. Curabitur iaculis, lorem vel rhoncus faucibus, felis magna fermentum augue, et ultricies lacus lorem varius purus. Curabitur eu amet.</p>
            </Collapse>
        </main>
    )
}

export default About