import React, {useState} from 'react';
import  "../pagePublic.css";
import StrongPoint from "./StrongPoint";
import Contact from "./Contact.jsx";
import {Link} from 'react-router-dom';
import ListItem from '../item/ListItem';

const Home = () => {
    const [maxItemsToShow, setMaxItemsToShow] = useState(10);

    const backgroundStyle = {
        backgroundImage: "url(/img/imgPage/imgHome.jpg)" ,
        backgroundSize: "100%",
        borderRadius: "20px"
    };
    return (
        <div>
                <div className="">
                    <div className="bg-white">
                        <div className="bg-white">
                            <div className="mx-auto max-w-8xl   sm:py-8 lg:px-8">
                                <div style={backgroundStyle} className="relative isolate overflow-hidden bg-gray-900 px-6 pt-16 sm:rounded-3xl sm:px-16 md:pt-24 lg:flex lg:gap-x-20 lg:px-24 lg:pt-0">
                                    <div className="mx-auto max-w-md text-center lg:mx-0 lg:flex-auto lg:py-32 lg:text-left">
                                        <h2 className="text-3xl font-bold tracking-tight text-white sm:text-4xl">
                                            créez votre vase
                                            <br />
                                            idéal maintenant !
                                        </h2>
                                        <div className="mt-10 flex items-center justify-center gap-x-6 lg:justify-start">
                                            <Link to="/public/creation"
                                                className="rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm hover:bg-gray-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white m-5"
                                            >
                                                Commencer
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                 <StrongPoint/>
                <ListItem maxItemsToShow={maxItemsToShow} />
               <Contact/>
            </div>
        </div>
    );
};

export default Home;