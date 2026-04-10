import { useState } from 'react';
import './Collapse.scss';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

function Collapse({ children, title, style }) {
  const [isCollapseOpened, setIsCollapseOpened] = useState(false);

  function handleCollapseState() {
    setIsCollapseOpened((prev) => !prev);
  }

  return (
    <section className={`collapse collapse--${style}`}>
      <button
        type="button"
        className={`collapse_collapseButton collapse_collapseButton--${style}`}
        onClick={handleCollapseState}
        aria-label={`ouvrir la section ${title}`}
        aria-expanded={isCollapseOpened}
        aria-controls={`collapsible-${title}`}
      >
        <h5>{title}</h5>

        <FontAwesomeIcon
          icon={faChevronDown}
          className={`collapse_collapseButton_icon ${
            isCollapseOpened
              ? 'collapse_collapseButton_icon--opened'
              : 'collapse_collapseButton_icon--closed'
          }`}
        />
      </button>

      <div
        id={`collapsible-${title}`}
        className={
          isCollapseOpened
            ? 'collapse_children collapse_children--opened'
            : 'collapse_children collapse_children--closed'
        }
      >
        {children}
      </div>
    </section>
  );
}

export default Collapse;