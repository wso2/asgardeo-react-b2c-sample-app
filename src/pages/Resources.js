import APICall from '../components/APICall';

/**
 * Resources page for the Sample.
 *
 * @param props - Props injected to the component.
 *
 * @return {React.ReactElement}
 */
export const Resources = () => {

  return (
    <div className='App-section'>
      <header className='App-header-sub-section'>
        <div>
          <h1>External API</h1>
          <p className='p-description justified-text max-width'>
            Invoke an external API and retrieve the resulting response.
          </p>
        </div>
      </header>
      <APICall></APICall>
    </div>
  );
};
