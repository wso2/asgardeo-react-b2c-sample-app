import React from 'react';
import GITHUB_ICON from '../images/github.png';
import USER_GUIDE from '../images/user-guide.png';
import DOCUMENTATION_LOGO from '../images/docs.png';

const cards = [
  {
      'title': 'User Guide',
      'description': 'Check out our user guide and you will guide you to integrate your applications with Asgardeo.',
      'link': 'https://docs.google.com/document/d/1-yKHQgQE3-Pj5FRoBdOLf33u1Y41QWzNd3jdR6TVhIQ/edit#heading=h.mvq9fx4kf8ex',
      'icon': USER_GUIDE
  },
  {
      'title': 'Github Repository',
      'description': 'Lets go through the application codebase and contribute to our Asgardeo React Sample application.',
      'link': 'https://github.com/dasuni-30/asgardeo-react-sample-app',
      'icon': GITHUB_ICON
  },
  {
      'title': 'Asgardeo Docs',
      'description': 'Read our Docs for the guides to provide the instructions for building IAM uses cases.',
      'link': 'https://wso2.com/asgardeo/docs/',
      'icon': DOCUMENTATION_LOGO
  }
];

/**
 * Card component.
 */
const Cards = () => {
  return (
    <div className='row'>
      {cards.map((card) => {
        return (
          <div className='column'>
            <div className='card'>
              <div className="card-container">
                <img alt='react-logo' src={ card?.icon} className='link-logo-image-small'/>
                <h3>
                  { card?.title }
                </h3>
              </div>
              <p>
                {card?.description}
              </p>
              <p>
                <a href={card?.link} target='_blank' rel="noreferrer">Check it out</a>
              </p>
            </div>
          </div>
        )
      })}
    </div> 
  )
}

export default Cards;
