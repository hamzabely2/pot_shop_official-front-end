import React from "react";
import './App.css';
import Login from './connection/login/Login';
import Home from "./page/pagePublic/home/Home.jsx";
import {
    BrowserRouter,
    Route,
    Routes,

} from 'react-router-dom';
import Register from "./connection/register/Register";
import Profile from "./page/pageUser/profile/Profile";
import Contact from "./components/contact/Contact.jsx";
import ItemDetails from "./page/pagePublic/itemdetails/ItemDetails";
import Collection from "./page/pagePublic/collection/Collection";
import Item from "./page/pagePublic/item/Item";
import NavBarChooser from './components/navBar/NavBarChooser';
import Error404 from './page/pagePublic/page404/Error404';



function App() {

    return (

        <BrowserRouter>
          <NavBarChooser/>
          <Routes>
            <Route path="/"  element={<Home />} />
            <Route path="/public/home"  element={<Home />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login/>} />
            <Route path="/public/profile" element={<Profile />} />
            <Route path="/public/contact" element={<Contact />} />
            <Route path="/public/itemDetails/:id" element={<ItemDetails />} />
            <Route path="/public/collection" element={<Collection />} />
            <Route path="/public/item" element={<Item />} />
          </Routes>
        </BrowserRouter>
    );
}

export default App;
