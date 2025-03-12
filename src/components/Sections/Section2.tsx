import { useState } from 'react';
import dictionaries from '../../assets/dictionaries.png';
import dictionariesdark from '../../assets/dictionariesdark.png';
import { useEffect } from 'react';

function Section2() {
  const [imageToUse, setImageToUse] = useState(dictionaries);

  useEffect(() => {
    // test for dark mode
    const darkMode = window.matchMedia('(prefers-color-scheme: dark)');
    if (darkMode.matches) {
      setImageToUse(dictionariesdark);
    } else {
      setImageToUse(dictionaries);
    }

    // add listener for dark mode changes
    darkMode.addEventListener('change', (e) => {
      if (e.matches) {
        setImageToUse(dictionariesdark);
      } else {
        setImageToUse(dictionaries);
      }
    });

    // cleanup
    return () => {
      darkMode.removeEventListener('change', (e) => {
        if (e.matches) {
          setImageToUse(dictionariesdark);
        } else {
          setImageToUse(dictionaries);
        }
      });
    }
  }, []);
  return (
    <div id="section2">
      <div className="row">
        <div className="side">
          <div id="svg_img_src" className="mainimage textareawrapper">
            <img src={imageToUse} />
          </div>
        </div>
        <div className="main">
          <div id="first_row_problem_desc" className="row_problem_desc">Dictionaries at Hyper-speed</div>
          <div className="readefinedescription">Stumped by a tricky word? No problem. Readefine's advanced dictionary engine makes even the trickiest terms instantly clear. And it's all happening faster than you can say "Wait, what does that word mean?"</div>
        </div>
      </div>
      <div className="inner_hr"></div>
    </div>
  );
}

export default Section2;