// import { useEffect, useContext } from 'react';
// import { ProjectsContext } from '../../utils/ProjectsContext'
// import './About.scss'



// import Collapse from '../../components/Collapse/Collapse';


// function About() {

//     const { informations } = useContext(ProjectsContext);
//     const { setDisplayHeader, displayHeader } = useContext(ProjectsContext);
//     const collabs = informations.collaborations

//     useEffect(() => {
//         window.scrollTo(0, 0);
//     },[]);

//     const bioParagraphText = informations?.bioParagraph ?? '';
//     const bioParagraphWithNewlines = bioParagraphText.replace(/<br\s*\/?>/gi, '\n');


//     return (
//         <main className='about' onClick={()=>displayHeader===true && setDisplayHeader(false)}>
//             <img className='about_img' src={informations.firstPictureUrl} alt='Portrait de Clément Dubois'/>
//             <section className='about_introductionContainer'>
//                 {informations.bioParagraph &&
//                     <p style={{ whiteSpace: 'pre-line' }}>{bioParagraphWithNewlines}</p>
//                 }
                

//             </section>
//             <img className='about_img' src={informations.secondPictureUrl} alt='Première image atelier de Clément Dubois'/>
//             <section className='about_manifestoContainer'>
//                 <h5 className='about_manifestoContainer_title'>Manifeste</h5>
//                 <ul className='about_manifestoContainer_list'>
//                     {informations?.manifesto?.map((sentence, index)=>(
//                     <li key={index} className='about_manifestoContainer_list_item'>
//                         <p>+ {sentence.sentence}</p>
//                     </li>
//                     ))}
//                 </ul>
//             </section>
//             <img className='about_img' src={informations.thirdPictureUrl} alt='Seconde image atelier de Clément Dubois'/>
//             <Collapse title="Collaborations" style='white'>
//                 <ul className='about_collabsGrid'>
//                     {collabs?.map((collab)=>(
//                     <li className='about_collabsGrid_item'> 
//                         <a href={collab.collabUrl} 
//                                 target='_blank' 
//                                 rel='noreferrer'
//                                 aria-label={`Accéder au lien ${collab.collabName}`}><img src={collab.collabImgUrl} alt={`Logo ${collab.collabName}`}/>
//                         </a>
//                     </li>
//                     ))}
//                 </ul>
//             </Collapse>
//             <Collapse title="Mentions légales" style='dark'>
//                 <p className='about_mentionsText'>
//                 Clément Dubois, Entreprise Individuelle affilié au régime social des Artistes Auteurs, <br/>
//                 domicilié au 108 rue nationale 63110 Beaumont <br/><br/>
//                 ecrire@clement-dubois.com <br/>
//                 SIRET : 2231187700024 <br/>
//                 Activité principale : Autres activités artistiques (code : 90005) <br/>
//                 Date de création 19/11/2018 <br/>
//                 TVA : FR 68522311877 <br/>
//                 APE : 9003B <br/><br/>

//                 Direction de la publication : Clément Dubois <br/><br/>
//                 Crédit photo 1 : © Julien Bruhat<br/>
//                 Crédits photos 2 et 3 : © Laurent Garlaschi<br/><br/>

//                 Webdesign, développement web :<br/> 
//                 <a href='http://www.bengibert.com'>Ben Gibert</a><br/>
//                 Site web développé avec ReactJS / NodeJS<br/><br/>

//                 Hébergeur :<br/>
//                 Société : OVH <br/>
//                 Adresse web : www.ovh.com<br/>
//                 Adresse Postale : <br/>
//                 2 rue kellermann – BP 80157 – 59053 ROUBAIX Cedex 1<br/>
//                 Téléphone : +33 (0)8 203 203 63<br/>
//                 Mail : support@ovh.com<br/><br/>

//                 Conditions d'utilisation du site Internet www.clement-dubois.com <br/>
//                 Le site et chacun des éléments, y compris mais sans limitation les marques, les logos, icônes, infographies, photographies, projets, textes qui le composent sont protégés au titre de la législation internationale de la propriété intellectuelle. Les contenus figurant sur le site sont la propriété de Clément Dubois. Toute utilisation, reproduction ou représentation, par quelque procédé que ce soit, et sur quelque support que ce soit, de tout ou partie du site et/ou des éléments qui le composent n'est pas autorisée sans le consentement expresse de Clément Dubois.
//                 </p>
//             </Collapse>
//         </main>
//     )
// }

// export default About

import { useEffect, useContext, useMemo } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import './About.scss'

import Collapse from '../../components/Collapse/Collapse'

function About() {
    const {
        informations = {},
        setDisplayHeader,
        displayHeader
    } = useContext(ProjectsContext)

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const collabs = informations.collaborations || []
    const manifesto = informations.manifesto || []

    const bioParagraphWithNewlines = useMemo(() => {
        const bioParagraphText = informations?.bioParagraph || ''
        return bioParagraphText.replace(/<br\s*\/?>/gi, '\n')
    }, [informations?.bioParagraph])

    return (
        <main
            className='about'
            onClick={() => displayHeader === true && setDisplayHeader(false)}
        >
            {informations.firstPictureUrl && (
                <img
                    className='about_img'
                    src={informations.firstPictureUrl}
                    alt='Portrait de Clément Dubois'
                    loading='lazy'
                    decoding='async'
                />
            )}

            <section className='about_introductionContainer'>
                {informations.bioParagraph && (
                    <p style={{ whiteSpace: 'pre-line' }}>
                        {bioParagraphWithNewlines}
                    </p>
                )}
            </section>

            {informations.secondPictureUrl && (
                <img
                    className='about_img'
                    src={informations.secondPictureUrl}
                    alt='Première image atelier de Clément Dubois'
                    loading='lazy'
                    decoding='async'
                />
            )}

            <section className='about_manifestoContainer'>
                <h5 className='about_manifestoContainer_title'>Manifeste</h5>

                {manifesto.length > 0 && (
                    <ul className='about_manifestoContainer_list'>
                        {manifesto.map((sentence, index) => (
                            <li
                                key={sentence._id || sentence.sentence || index}
                                className='about_manifestoContainer_list_item'
                            >
                                <p>+ {sentence.sentence}</p>
                            </li>
                        ))}
                    </ul>
                )}
            </section>

            {informations.thirdPictureUrl && (
                <img
                    className='about_img'
                    src={informations.thirdPictureUrl}
                    alt='Seconde image atelier de Clément Dubois'
                    loading='lazy'
                    decoding='async'
                />
            )}

            <Collapse title='Collaborations' style='white'>
                {collabs.length > 0 && (
                    <ul className='about_collabsGrid'>
                        {collabs.map((collab, index) => (
                            <li
                                key={collab._id || collab.collabUrl || collab.collabName || index}
                                className='about_collabsGrid_item'
                            >
                                <a
                                    href={collab.collabUrl}
                                    target='_blank'
                                    rel='noreferrer'
                                    aria-label={`Accéder au lien ${collab.collabName}`}
                                >
                                    <img
                                        src={collab.collabImgUrl}
                                        alt={`Logo ${collab.collabName}`}
                                        loading='lazy'
                                        decoding='async'
                                    />
                                </a>
                            </li>
                        ))}
                    </ul>
                )}
            </Collapse>

            <Collapse title='Mentions légales' style='dark'>
                <p className='about_mentionsText'>
                    Clément Dubois, Entreprise Individuelle affilié au régime social des Artistes Auteurs, <br />
                    domicilié au 108 rue nationale 63110 Beaumont <br /><br />
                    ecrire@clement-dubois.com <br />
                    SIRET : 2231187700024 <br />
                    Activité principale : Autres activités artistiques (code : 90005) <br />
                    Date de création 19/11/2018 <br />
                    TVA : FR 68522311877 <br />
                    APE : 9003B <br /><br />

                    Direction de la publication : Clément Dubois <br /><br />
                    Crédit photo 1 : © Julien Bruhat<br />
                    Crédits photos 2 et 3 : © Laurent Garlaschi<br /><br />

                    Webdesign, développement web :<br />
                    <a
                        href='http://www.bengibert.com'
                        target='_blank'
                        rel='noreferrer'
                    >
                        Ben Gibert
                    </a>
                    <br />
                    Site web développé avec ReactJS / NodeJS<br /><br />

                    Hébergeur :<br />
                    Société : OVH <br />
                    Adresse web : www.ovh.com<br />
                    Adresse Postale : <br />
                    2 rue kellermann – BP 80157 – 59053 ROUBAIX Cedex 1<br />
                    Téléphone : +33 (0)8 203 203 63<br />
                    Mail : support@ovh.com<br /><br />

                    Conditions d'utilisation du site Internet www.clement-dubois.com <br />
                    Le site et chacun des éléments, y compris mais sans limitation les marques, les logos, icônes, infographies, photographies, projets, textes qui le composent sont protégés au titre de la législation internationale de la propriété intellectuelle. Les contenus figurant sur le site sont la propriété de Clément Dubois. Toute utilisation, reproduction ou représentation, par quelque procédé que ce soit, et sur quelque support que ce soit, de tout ou partie du site et/ou des éléments qui le composent n'est pas autorisée sans le consentement expresse de Clément Dubois.
                </p>
            </Collapse>
        </main>
    )
}

export default About