import React from 'react';

// Add the date.
let date = new Date();  
let year = date.getFullYear();

/**
 * Footer component.
 */
const Footer = () => {
  return (
    <div className='footer'>
      <footer className='page-footer font-small blue'>
        <p>© {`${year}`}
          <a href='https://wso2.com/'> WSO2 LLC.</a>
        </p>
      </footer>
    </div>
  );
}

export default Footer;
