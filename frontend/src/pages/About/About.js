import { useEffect, useContext } from 'react';
import { ProjectsContext } from '../../utils/ProjectsContext'
import './About.scss'
import lignes from '../../datas/lignes.json';
import portrait from '../../assets/clementDubois.jpg';
import atelier1 from '../../assets/atelier1.jpeg';
import atelier2 from '../../assets/atelier2.jpeg';
import antoineEvents from '../../assets/logos/antoine evenements.jpeg';
import artex from '../../assets/logos/artex.jpg';
import daruma from '../../assets/logos/daruma.png';
import etonnantFestin from '../../assets/logos/etonnantFestin.jpeg';
import fnau from '../../assets/logos/FNAU.jpg';
import kube from '../../assets/logos/kube.png';
import laFauvette from '../../assets/logos/laFauvette.png';
import operaClermont from '../../assets/logos/operaClermont.png';
import porteMine from '../../assets/logos/porte mine.png';

import pelican from '../../assets/logos/theatre_du_pelican.png';
import voltaire from '../../assets/logos/ville_ferney_voltaire.png';
import grandesTables from '../../assets/logos/grandes_tables.png';
import aucm from '../../assets/logos/AUCM.png';
import biscuit from '../../assets/logos/biscuit_production.png';
import clermont from '../../assets/logos/ville_clermont_ferrand.jpeg';
import vulcania from '../../assets/logos/vulcania.jpeg';
import bruitCloches from '../../assets/logos/le_bruit_des_cloches.jpeg';
import caméléon from '../../assets/logos/le_cameleon.png';
import comedieClermont from '../../assets/logos/comedie_clermont.png';
import orchestreIdf from '../../assets/logos/orchestre_national_idf.jpeg';
import souffleur from '../../assets/logos/souffleurDeVerre.png';


import Collapse from '../../components/Collapse/Collapse';


function About() {

    const { setDisplayHeader, displayHeader } = useContext(ProjectsContext);
    const collabs = [
        {
            name: 'Antoine Évènements',
            logo: antoineEvents,
            link: 'https://www.antoineevenements.fr/'
        },
        {
            name: 'Artex',
            logo: artex,
            link: 'https://artex63.fr/'
        },
        {
            name: 'Porte Mine',
            logo: porteMine,
            link: 'https://www.leportemine.fr/'
        },
        {
            name: 'Etonnant Festin',
            logo: etonnantFestin,
            link: 'https://www.letonnantfestin.com/'
        },
        {
            name: 'FNAU',
            logo: fnau,
            link: 'https://www.fnau.org/fr/accueil/'
        },
        {
            name: 'Opera Clermont',
            logo: operaClermont,
            link: 'https://clermont-auvergne-opera.com/'
        },
        {
            name: 'Kube',
            logo: kube,
            link: 'https://www.agencekube.com/'
        },
        {
            name: 'La Fauvette',
            logo: laFauvette,
            link: 'https://www.cielafauvette.com/'
        },
        {
            name: 'Théâtre le Pélican',
            logo: pelican,
            link: 'https://billetterie-c3c.clermont-ferrand.fr/'
        },
        {
            name: 'Ville de Ferney-Voltaire',
            logo: voltaire,
            link: 'https://www.ferney-voltaire.fr/decouvrir-et-sortir/saison-culturelle/fete-a-voltaire/'
        },
        {
            name: 'Les Grandes Tables',
            logo: grandesTables,
            link: 'https://lesgrandestables.com/la-comedie/'
        },
        {
            name: 'AUCM',
            logo: aucm,
            link: 'https://aucm.fr/'
        },
        {
            name: 'Biscuit Production',
            logo: biscuit,
            link: 'http://www.biscuit-production.fr/'
        },
        {
            name: 'Ville de Clermont-Ferrand',
            logo: clermont,
            link: 'https://clermont-ferrand.fr/'
        },
        {
            name: 'Vulcania',
            logo: vulcania,
            link: 'https://www.vulcania.com/'
        },
        {
            name: 'Le Bruit des Cloches',
            logo: bruitCloches,
            link: 'https://www.facebook.com/lebruitdescloches/?locale=fr_FR'
        },
        {
            name: 'Le Caméléon',
            logo: caméléon,
            link: 'https://www.pontduchateau.fr/bouger-me-divertir/culture/les-rendez-vous-du-cameleon/'
        },

        {
            name: 'La Comédie de Clermont-Ferrand',
            logo: comedieClermont,
            link: 'https://lacomediedeclermont.com'
        },
        {
            name: 'Orchestre National d\'Île de France',
            logo: orchestreIdf,
            link: 'https://www.orchestre-ile.com/'
        },
        {
            name: 'Le Souffleur de Verre',
            logo: souffleur,
            link: 'http://souffleurdeverre.fr/'
        },
        {
            name: 'Daruma',
            logo: daruma,
            link: 'https://www.ciedaruma.com/'
        }
    ]

    useEffect(() => {
        window.scrollTo(0, 0);
    },[]);

    return (
        <main className='about' onClick={()=>displayHeader===true && setDisplayHeader(false)}>
            <img className='about_img' src={portrait} alt='Portrait de Clément Dubois'/>
            <section className='about_introductionContainer'>
                <p> Clément Dubois, scénographe, allie son expérience de comédien et de technicien à sa formation en design. Chaque création, fruit d'une analyse approfondie, réunit l'esthétique et la fonctionnalité pour susciter l’imaginaire des spectateur·ice·s et faciliter le travail des utilisateur·ice·s. <br/><br/>
                    Ses décors deviennent des acteurs à part entière, invitant à explorer des univers visuels singuliers, méticuleusement adaptés à chaque récit avec une dramaturgie spécifique. <br/><br/>
                    Sa méthodologie de travail encourage la collaboration et l'expression pour tous·tes les contributeur·ice·s impliqué·e·s dans la conception. Il crée des espaces où la scénographie se transforme en un véritable terrain de jeu artistique, tout en demeurant accessible à tous·tes.<br/><br/>
                    En parallèle de ses créations, il partage sa démarche créative à travers des médiations et des stages destinés tant aux publics professionnels qu'amateurs. Depuis 2020, il contribue activement au projet ARTEX, une initiative dédiée au développement de l’éco-création et du réemploi dans les milieux culturels et artistiques de la région Auvergne-Rhône-Alpes.
                </p>
            </section>
            <img className='about_img' src={atelier1} alt='Première image atelier de Clément Dubois'/>
            <section className='about_manifestoContainer'>
                <h5 className='about_manifestoContainer_title'>Manifeste</h5>
                {/* <p className='about_manifestoContainer_secondTitle'>En premier lieu</p> 
                <p className='about_manifestoContainer_description'>
                    La nécessité d’un site Internet m’a beaucoup posé questions. Comment présenter le travail d’analyse, de recherche, d’étude de contexte d’un lieu, d’un texte ou d’un brief ? Comment représenter l’aventure humaine d’un projet de création ? Comment présenter les étapes de ces créations, le nombre de propositions non retenues et l’équilibrage entre les envies artistiques, les enjeux de production et les contraintes techniques?<br/><br/>
                    J’avais cependant le besoin de proposer un portfolio, une vitrine d’exposition, pour garder une trace tangible de mes différentes créations. L’ensemble de mes réalisations sont par nature éphémères. Ce site permet de garder un témoignage de ces moments mais ne permet malheureusement pas d’appréhender l’ensemble d’une création, son parcours, sa représentation dans un temps et un espace donné. La meilleure façon d’appréhender mon travail reste de venir voir sur place, un événement ou un spectacle vivant.
                </p>     */}
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
                    {collabs.map((collab)=>(
                    <li className='about_collabsGrid_item'> 
                        <a href={collab.link} 
                                target='_blank' 
                                rel='noreferrer'
                                aria-label={`Accéder au lien ${collab.name}`}><img src={collab.logo} alt={`Logo ${collab.name}`}/>
                        </a>
                    </li>
                    ))}
                </ul>
            </Collapse>
            <Collapse title="Mentions légales" style='dark'>
                <p className='about_mentionsText'>
                Clément Dubois, Entreprise Individuelle affilié au régime social des Artistes Auteurs, <br/>
                domicilié au 108 rue nationale 63110 Beaumont <br/><br/>
                ecrire@clement-dubois.com <br/>
                SIRET : 2231187700024 <br/>
                Activité principale : Autres activités artistiques (code : 90005) <br/>
                Date de création 19/11/2018 <br/>
                TVA : FR 68522311877 <br/>
                APE : 9003B <br/><br/>

                Direction de la publication : Clément Dubois <br/><br/>

                Webdesign, développement web :<br/> 
                <a href='http://www.bengibert.com'>Ben Gibert</a><br/>
                Site web développé avec ReactJS / NodeJS<br/><br/>

                Hébergeur :<br/>
                Société : OVH <br/>
                Adresse web : www.ovh.com<br/>
                Adresse Postale : <br/>
                2 rue kellermann – BP 80157 – 59053 ROUBAIX Cedex 1<br/>
                Téléphone : +33 (0)8 203 203 63<br/>
                Mail : support@ovh.com<br/><br/>

                Conditions d'utilisation du site Internet www.clement-dubois.com <br/>
                Le site et chacun des éléments, y compris mais sans limitation les marques, les logos, icônes, infographies, photographies, projets, textes qui le composent sont protégés au titre de la législation internationale de la propriété intellectuelle. Les contenus figurant sur le site sont la propriété de Clément Dubois. Toute utilisation, reproduction ou représentation, par quelque procédé que ce soit, et sur quelque support que ce soit, de tout ou partie du site et/ou des éléments qui le composent n'est pas autorisée sans le consentement expresse de Clément Dubois.
                </p>
            </Collapse>
        </main>
    )
}

export default About