
import './MainPhoto.scss'
import Loader from '../Loader/Loader'
import { ProjectsContext } from '../../utils/ProjectsContext';
import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getMediaUrl } from '../../utils/getMediaUrl'


    
function MainPhoto() {

    const { loaderDisplay, projects } = useContext(ProjectsContext);
    const [randomImagesSelection, setRandomImageSelection] = useState([]);
    const [homeMedia, setHomeMedia] = useState(null);

    function getMediaType(media) {
        const fileType = media?.fileType || '';

        if (fileType.startsWith('video/')) return 'video';
        if (fileType.startsWith('image/')) return 'image';
        if (media?.imageUrl) return 'image'; // legacy
        return null;
    }

    const randomMediaArray = projects
        .map(item =>
            (item.projectImages || [])
                .filter(image => image.inRandomSelection === true)
        )
        .flat();

    useEffect(() => {
        setRandomImageSelection(randomMediaArray);
    }, [projects]);

    useEffect(() => {
        if (randomImagesSelection.length > 0) {
            const randomIndex = Math.floor(Math.random() * randomImagesSelection.length);
            setHomeMedia(randomImagesSelection[randomIndex]);
        } else {
            setHomeMedia(null);
        }
    }, [randomImagesSelection]);

    const homeMediaType = getMediaType(homeMedia);

    return (
        <div className='mainPhoto'>
            <div className={loaderDisplay === true ? 'mainPhoto_loader--displayOn' : 'mainPhoto_loader--displayOff'}>
                <Loader className='loader--opaque' loaderDisplay={loaderDisplay}/>
            </div>

            {homeMedia && homeMediaType === 'image' &&
                <img
                    className='mainPhoto_image'
                    src={getMediaUrl(homeMedia.imageUrl)}
                    alt="image d'accueil"
                />
            }

            {homeMedia && homeMediaType === 'video' &&
                <video
                    className='mainPhoto_image'
                    src={homeMedia.imageUrl}
                    muted
                    autoPlay
                    loop
                    playsInline
                    preload="metadata"
                />
            }

            {!homeMedia &&
                <div className='mainPhoto_image mainPhoto_image--blackBg'></div>
            }

        </div>
    )
}

export default MainPhoto