import './App.css';
import AddCatalogue from './component/AddCatalogue';
import CatalogueList from './component/CatalogueList';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/catlist" element={<CatalogueList />}/>
        <Route path="/" element={<AddCatalogue/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
