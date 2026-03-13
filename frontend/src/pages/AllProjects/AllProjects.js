import './AllProjects.scss'
import React, { useState, useContext, useEffect, useRef } from 'react'
import { ProjectsContext } from '../../utils/ProjectsContext'
import { Link } from 'react-router-dom'
import DOMPurify from 'dompurify';
import MainPhoto from '../../components/MainPhoto/MainPhoto';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faAnglesDown } from '@fortawesome/free-solid-svg-icons'

function AllProjects() {
    const { projects, projectCategories, setDisplayHeader, displayHeader } = useContext(ProjectsContext);
    const [filteredProjects, setFilteredProjects] = useState(projects);
    const [categoryProjects, setCategoryProjects] = useState('tous');

    const filtersAnchorRef = useRef(null);

    const scrollWithOffset = (element, offset = 100) => {
        if (!element) return;

        const y = element.getBoundingClientRect().top + window.scrollY - offset;

        window.scrollTo({
            top: y,
            behavior: "smooth"
        });
    };

    const handleScrollToFilters = () => {
        scrollWithOffset(filtersAnchorRef.current, 100);
    };

    const handleCategoryClick = (category) => {
        if (category === "tous") {
            setFilteredProjects(projects);
        } else {
            setFilteredProjects(
                projects.filter(project => project.projectType === category)
            );
        }

        setCategoryProjects(category);

        scrollWithOffset(filtersAnchorRef.current, 100);
    };

    function getMediaType(media) {
        const fileType = media?.fileType || '';

        if (fileType.startsWith('video/')) return 'video';
        if (fileType.startsWith('image/')) return 'image';
        if (media?.imageUrl) return 'image'; // legacy
        return null;
    }

    function renderProjectMedia(media, alt = '') {
        if (!media?.imageUrl) return null;

        const mediaType = getMediaType(media);

        if (mediaType === 'video') {
            return (
                <video
                    src={media.imageUrl}
                    muted
                    playsInline
                    autoPlay
                    loop
                    preload="metadata"
                />
            );
        }

        if (mediaType === 'image') {
            return (
                <img
                    src={media.imageUrl}
                    alt={alt}
                />
            );
        }

        return null;
    }

    useEffect(() => {
        window.scrollTo(0, 0);
        setFilteredProjects(projects);
    }, [projects]);

    const projectsWithNumericDate = filteredProjects.map(project => {
        const [year, month] = project.creationDate.split("-");
        return {
            ...project,
            numericDate: parseInt(year + month, 10)
        };
    });

    const sortedProjects = projectsWithNumericDate.sort((a, b) => b.numericDate - a.numericDate);

    return (
        <main
            className='allProjects'
            onClick={() => displayHeader === true && setDisplayHeader(false)}
        >
            <div className='allProjects_topContainer'>
                <MainPhoto />

                <button
                    className='allProjects_buttonsContainer_button--anchor '
                    type="button"
                    aria-label="Aller aux filtres projets"
                    onClick={handleScrollToFilters}
                >
                    <FontAwesomeIcon icon={faAnglesDown} />
                </button>
            </div>

            <ul
                className="allProjects_buttonsContainer"
                id="projects-filters"
                ref={filtersAnchorRef}
            >
                <li className="allProjects_buttonsContainer_button">
                    <button
                        className={
                            categoryProjects === "tous"
                                ? "allProjects_buttonsContainer_button--selected"
                                : "allProjects_buttonsContainer_button--notSelected"
                        }
                        type="button"
                        aria-pressed={categoryProjects === "tous"}
                        aria-label="Afficher toutes les catégories de projets"
                        onClick={() => handleCategoryClick("tous")}
                    >
                        <h3>Tous</h3>
                    </button>
                </li>

                {projectCategories
                    .filter(category =>
                        projects.some(project => project.projectType === category)
                    )
                    .map(category => (
                        <li key={category} className="allProjects_buttonsContainer_button">
                            <button
                                className={
                                    categoryProjects === category
                                        ? "allProjects_buttonsContainer_button--selected"
                                        : "allProjects_buttonsContainer_button--notSelected"
                                }
                                type="button"
                                aria-pressed={categoryProjects === category}
                                aria-label={`Afficher les projets correspondants à la catégorie ${category}`}
                                onClick={() => handleCategoryClick(category)}
                            >
                                <h3 className="allProjects_buttonsContainer_button_h3">
                                    {category}
                                </h3>
                            </button>
                        </li>
                    ))}
            </ul>

            <ul className='allProjects_projectsList'>
                {sortedProjects.map((project, index) => {
                    const mainMedia = project.projectImages?.[project.mainImageIndex];

                    return (
                        <li key={project._id}>
                            <Link
                                to={`/projets/${project.slug || project._id}`}
                                className='allProjects_projectCard'
                                aria-label={`Accéder à la page du projet ${project.title}`}
                            >
                                <div className='allProjects_projectCard_infos'>
                                    <h4 translate="no" className='allProjects_projectCard_infos_title'>
                                        {project.title}
                                    </h4>

                                    <p translate="no" className='allProjects_projectCard_infos_subtitle'>
                                        {project.subtitle}
                                    </p>

                                    <p className='allProjects_projectCard_infos_projectInfos'>
                                        {project.projectInfos}
                                    </p>

                                    <p className='allProjects_projectCard_infos_creationDate'>
                                        {project.creationDate.split("-")[0]}
                                    </p>

                                    {project.summary &&
                                        <p
                                            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(project.summary) }}
                                            className='allProjects_projectCard_infos_summary'
                                        ></p>
                                    }
                                </div>

                                <figure className='allProjects_projectCard_imageContainer'>
                                    {renderProjectMedia(
                                        mainMedia,
                                        `image principale du projet ${project.title} (${index})`
                                    )}
                                </figure>
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </main>
    )
}

export default AllProjects