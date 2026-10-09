import './MainPhoto.scss'
import Loader from '../Loader/Loader'
import { ProjectsContext } from '../../utils/ProjectsContext';
import { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/getMediaUrl'
import { MEDIA_CORS_ENABLED } from '../../utils/constants'


function getMediaType(media) {
    const fileType = media?.fileType || '';

    if (fileType.startsWith('video/')) return 'video';
    if (fileType.startsWith('image/')) return 'image';
    if (media?.imageUrl) return 'image'; // legacy
    return null;
}

// luminance perçue moyenne (0 = noir, 1 = blanc) de la zone de l'image située sous la légende
function measureCaptionZoneLuminance(image, linkElement, captionElement) {
    const box = linkElement.getBoundingClientRect();
    const caption = captionElement.getBoundingClientRect();
    const { naturalWidth, naturalHeight } = image;

    if (!box.width || !box.height || !naturalWidth || !naturalHeight) return null;

    // reproduit le recadrage de object-fit: cover (centré)
    const scale = Math.max(box.width / naturalWidth, box.height / naturalHeight);
    const offsetX = (box.width - naturalWidth * scale) / 2;
    const offsetY = (box.height - naturalHeight * scale) / 2;

    const sourceX = (caption.left - box.left - offsetX) / scale;
    const sourceY = (caption.top - box.top - offsetY) / scale;
    const sourceWidth = caption.width / scale;
    const sourceHeight = caption.height / scale;

    const size = 24;
    const canvas = document.createElement('canvas');
    canvas.width = size;
    canvas.height = size;
    const context = canvas.getContext('2d', { willReadFrequently: true });
    context.drawImage(image, sourceX, sourceY, sourceWidth, sourceHeight, 0, 0, size, size);

    // lève une SecurityError si le bucket n'autorise pas le CORS : géré par l'appelant
    const { data } = context.getImageData(0, 0, size, size);
    let total = 0;
    for (let i = 0; i < data.length; i += 4) {
        total += 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2];
    }
    return total / (data.length / 4) / 255;
}

function MainPhoto() {

    const { loaderDisplay, projects } = useContext(ProjectsContext);

    // tirage aléatoire d'un média "inRandomSelection", en gardant le projet associé
    const homeSelection = useMemo(() => {
        const candidates = (Array.isArray(projects) ? projects : []).flatMap(project =>
            (project.projectImages || [])
                .filter(media => media.inRandomSelection === true && media.imageUrl)
                .map(media => ({ media, project }))
        );

        if (candidates.length === 0) return null;

        return candidates[Math.floor(Math.random() * candidates.length)];
    }, [projects]);

    const homeMedia = homeSelection?.media;
    const homeProject = homeSelection?.project;
    const homeMediaType = getMediaType(homeMedia);
    const projectYear = homeProject?.creationDate?.split('-')[0];

    const linkRef = useRef(null);
    const captionRef = useRef(null);
    // 'light' = texte gris clair (défaut, lisible grâce à l'ombre), 'dark' = texte foncé sur image claire
    const [captionTone, setCaptionTone] = useState('light');

    useEffect(() => {
        setCaptionTone('light');
        // sans CORS sur le bucket la mesure échoue forcément : on évite un second téléchargement de l'image
        if (!MEDIA_CORS_ENABLED || homeMediaType !== 'image') return;

        // image chargée à part en mode CORS : l'image affichée n'est pas concernée si le bucket refuse
        const probe = new Image();
        probe.crossOrigin = 'anonymous';
        let cancelled = false;
        let resizeTimer;

        const updateTone = () => {
            if (cancelled || !linkRef.current || !captionRef.current) return;
            try {
                const luminance = measureCaptionZoneLuminance(probe, linkRef.current, captionRef.current);
                if (luminance !== null) setCaptionTone(luminance > 0.55 ? 'dark' : 'light');
            } catch (error) {
                // lecture des pixels refusée (CORS) : on garde le texte clair
            }
        };

        // la légende change de place selon la taille d'écran : on remesure
        const handleResize = () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(updateTone, 200);
        };

        probe.onload = () => {
            updateTone();
            window.addEventListener('resize', handleResize);
        };
        probe.src = getMediaUrl(homeMedia.imageUrl);

        return () => {
            cancelled = true;
            clearTimeout(resizeTimer);
            window.removeEventListener('resize', handleResize);
        };
    }, [homeMedia, homeMediaType]);

    const renderMedia = () => {
        if (homeMediaType === 'image') {
            return (
                <img
                    className='mainPhoto_image'
                    src={getMediaUrl(homeMedia.imageUrl)}
                    alt={`projet ${homeProject.title}`}
                />
            );
        }

        if (homeMediaType === 'video') {
            return (
                <video
                    className='mainPhoto_image'
                    src={getMediaUrl(homeMedia.imageUrl)}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                />
            );
        }

        return null;
    };

    return (
        <div className='mainPhoto'>
            <div className={loaderDisplay === true ? 'mainPhoto_loader--displayOn' : 'mainPhoto_loader--displayOff'}>
                <Loader className='loader--opaque' loaderDisplay={loaderDisplay}/>
            </div>

            {homeSelection &&
                <Link
                    to={`/projets/${homeProject.slug || homeProject._id}`}
                    className='mainPhoto_link'
                    ref={linkRef}
                    aria-label={`Accéder à la page du projet ${homeProject.title}`}
                >
                    {renderMedia()}

                    <div ref={captionRef} className={`mainPhoto_caption mainPhoto_caption--${captionTone}`}>
                        <h2 translate='no' className='mainPhoto_caption_title'>
                            {homeProject.title}
                        </h2>

                        {homeProject.subtitle?.trim() &&
                            <p translate='no' className='mainPhoto_caption_subtitle'>
                                {homeProject.subtitle}
                            </p>
                        }

                        {homeProject.projectInfos?.trim() &&
                            <p className='mainPhoto_caption_projectInfos'>
                                {homeProject.projectInfos}
                            </p>
                        }

                        {projectYear &&
                            <p className='mainPhoto_caption_creationDate'>
                                {projectYear}
                            </p>
                        }
                    </div>
                </Link>
            }

            {!homeSelection &&
                <div className='mainPhoto_image mainPhoto_image--blackBg'></div>
            }

        </div>
    )
}

export default MainPhoto
