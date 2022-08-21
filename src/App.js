
import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [time, setTime] = useState(new Date());
  const size = useWindowSize();
  const margin = useCalculateMargin();

  console.log(margin)

  return (
    <div style={{ marginLeft: margin.leftMargin, marginTop: margin.topMargin }}>
      <h1 className='AppText'>WAIT... IT'S {time.toLocaleTimeString()}</h1>
    </div>
  );
}

function useCalculateMargin() {
  const [margin, setMargin] = useState({
    leftMargin: undefined,
    topMargin: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setMargin({
        leftMargin: 500 - (Math.abs(1366 - window.innerWidth) * 0.5),
        topMargin: 260 - (Math.abs(667 - window.innerHeight) * 0.5),
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return margin;
}

function useWindowSize() {
  // Initialize state with undefined width/height so server and client renders match
  // Learn more here: https://joshwcomeau.com/react/the-perils-of-rehydration/
  const [windowSize, setWindowSize] = useState({
    width: undefined,
    height: undefined,
  });
  useEffect(() => {
    // Handler to call on window resize
    function handleResize() {
      // Set window width/height to state
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    }
    // Add event listener
    window.addEventListener("resize", handleResize);
    // Call handler right away so state gets updated with initial window size
    handleResize();
    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleResize);
  }, []); // Empty array ensures that effect is only run on mount
  return windowSize;
}

export default App;
