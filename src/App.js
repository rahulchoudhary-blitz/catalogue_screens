import './App.css';
import AddCatalogue from './component/AddCatalogue';
import CatalogueList from './component/CatalogueList';
import EditCatalogue from './pages/Edit/EditCatalogue';
import {BrowserRouter, Routes, Route} from 'react-router-dom'


function App() {
  
  return (
    <div>
      <BrowserRouter>
      <Routes>
        <Route path="/catlist" element={<CatalogueList />}/>
        <Route path="/edit/:catalogue_id" element={<EditCatalogue />}/>
        <Route path="/" element={<AddCatalogue/>} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
