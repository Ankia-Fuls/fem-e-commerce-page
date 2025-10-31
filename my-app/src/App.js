import './styles.scss';
import Header from './components/Header';
import Main from './components/Main';
import { useState } from "react";

function App() {
  const [pageInert, setPageInert] = useState(false);

  return (
    <>
      <Header setPageInert={setPageInert} />
      <Main pageInert={pageInert}></Main>


      <footer className="attribution">
        Challenge by <a href="https://www.frontendmentor.io?ref=challenge" rel="noreferrer" target="_blank">Frontend Mentor</a>.
        Coded by <a href="https://github.com/Ankia-Fuls">Ankia Fuls</a>.
      </footer>
    </>
  );
}

export default App;
