
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

/**
 * So inorder to put the text in the exact position we subtract the change in width and height
 * of the viewport and my screen in pixels.(which is 1366px by 667px). then subtract that to the
 * exact margins needed to put it in that place. finally, devide it by two to change the rate.do 
 * this every time when the screen size changes.
 * 
 * side note:- if you have a better option talk to me.
 * @returns left and top margins
 */

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

export default App;
