import Login from './Components/Login';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter, Routes, Route, } from "react-router-dom";
import Layout from './Components/Layout';
import Mosque from './Components/Mosque';
import Dua from './Components/Dua';
import Dashboard from './Components/Dashboard';
import AddDua from './Add/Add_Dua';
import EditDua from './Edit/Edit_Dua';
import ViewDua from './View/View_Dua';
import AddMosque from './Add/Add_Mosque';
import EditMosque from './Edit/Edit_Mosque';
import ViewMosque from './View/View_Mosque';
import Popup from './Components/Popup';
import Events from './Events/Events';
import AddEvent from './Events/Add_Event';
import ViewEvent from './Events/ViewEvent';
import EditEvent from './Events/Edit_Event';



function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Layout><Dashboard /></Layout>} />
        <Route path="/duas" element={<Layout><Dua /></Layout>} />
        <Route path="/duas/add-dua" element={<Layout><AddDua /></Layout>} />
        <Route path="/duas/edit-dua/:id" element={<Layout><EditDua /></Layout>} />
        <Route path="/duas/view-dua/:id" element={<Layout><ViewDua /></Layout>} />
        <Route path="/mosques" element={<Layout><Mosque /></Layout>} />
        <Route path="/mosques/add-mosque" element={<Layout><AddMosque /></Layout>} />
        <Route path="/mosques/edit-mosque/:id" element={<Layout><EditMosque /></Layout>} />
        <Route path="/mosques/view-mosque/:id" element={<Layout><ViewMosque /></Layout>} />
        <Route path="/events" element={<Layout><Events /></Layout>} />
        <Route path="/events/add-event" element={<Layout><AddEvent /></Layout>} />
        <Route path="/events/edit-event/:id" element={<Layout><EditEvent /></Layout>} />
        <Route path="/events/view-event/:id" element={<Layout><ViewEvent /></Layout>} />
        <Route path="/pop" element={<Popup />} />
      </Routes>
    </div>
  );
}

export default App;
