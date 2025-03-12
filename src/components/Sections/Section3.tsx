import { useEffect, useState } from 'react';
import ai from '../../assets/ai.png';
import aidark from '../../assets/aidark.png';

function Section3() {
  const [imageToUse, setImageToUse] = useState(ai);

  useEffect(() => {
    // test for dark mode
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkMode.matches) {
      setImageToUse(aidark);
    } else {
      setImageToUse(ai);
    }

    // add listener for dark mode changes
    darkMode.addEventListener('change', (e) => {
      if (e.matches) {
        setImageToUse(aidark);
      } else {
        setImageToUse(ai);
      }
    });

    // cleanup
    return () => {
      darkMode.removeEventListener('change', (e) => {
        if (e.matches) {
          setImageToUse(aidark);
        } else {
          setImageToUse(ai);
        }
      });
    }
  }, []);
  return (
    <div id="section3">
      <div className="row">
        <div className="main">
          <div className="row_problem_desc">AI-Powered Rewording Magic</div>
          <div className="readefinedescription">Ever wish the internet spoke YOUR language? With our AI-driven rewording tool, it kind of does. Whether you're translating, summarizing, or just browsing, Readefine shapes the web to suit you.</div>
        </div>
        <div className="side mat_icon_as_image">
          <img src={imageToUse} />
        </div>
      </div>
      <div className="inner_hr"></div>
    </div>
  );
}

export default Section3;