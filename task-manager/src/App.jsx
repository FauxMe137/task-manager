import Footer from "./components/Footer/Footer";
import Header from "./components/Header/Header";
import Main from "./components/Main";
import {useState} from 'react';

export default function App(){
  const [searchQuery, setSearchQuery] = useState('');

  const handleFilterClick = () => {
    console.log('Filter button clicked.');
  };

  return (
    <div className="App">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} onFilterClick={handleFilterClick} />
      <Main />
      <Footer />
    </div>
  );
}