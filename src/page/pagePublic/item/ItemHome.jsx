import React, {useEffect, useState} from 'react';
import ServiceItem from "../../../service/ServiceItem";
import {Link} from "react-router-dom";
import SkeletonItem from '../../../components/skeletons/SkeletonItem';
import "../pagePublic.css"


const products = [
    {
        id: 1,
        name: 'Machined Pen',
        color: 'Black',
        price: '$35',
        href: '#',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/home-page-02-product-01.jpg',
        imageAlt: 'Black machined steel pen with hexagonal grip and small white logo at top.',

    },
    // More products...
]

let  availableColors = [
    { name: 'Black', colorBg: '#111827' },
    { name: 'Brass', colorBg: '#FDE68A' },
    { name: 'Chrome', colorBg: '#E5E7EB' },
]

export default function ItemHome () {
    const [items, setItems] = useState([]);
    let [errorMessage , setErrorMessage] = useState(false);

    useEffect(() => {
        ServiceItem.GetAllItem()
            .then(data => {
                setItems(data.data.result);
            })
            .catch(error => {
                setErrorMessage(true)
                console.error('Erreur de requête :', error);
            });
    }, [items])

    if (errorMessage) {
        return (
            <div >
                <SkeletonItem/>
            </div>
        )
    }
    return (
        <div>
            <div>
                <div className="relative justify-center flex items-center">
                    <div className=""><img alt="decoration" className="w-40 mr-4" src="/img/decoration/decoration_right.jpg"></img></div>
                    <h2 className="text_nav leading-7 text-gray-950 sm:truncate sm:text-3xl sm:tracking-tight">Notre produits</h2>
                    <div className=""><img alt="decoration" className="w-40 ml-4" src="/img/decoration/decoration_left.jpg"/></div>
                </div>
                <div className="mx-auto sm:px-40 sm:py-10">
                    <div className="grid grid-cols-2 gap-x-6 gap-y-5 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 xl:gap-x-12">
                        {items.map((item ) => (
                            <Link  to={`/public/item/details/${item.id}`} state={{item :item}} >
                                <li key={item.id} className="inline-flex w-64 flex-col text-center lg:w-auto">
                                    <div className="group relative">
                                        <div className="image-container aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-md bg-gray-200">
                                            <img
                                                src={item.images && item.images.length > 0 ? `data:image/jpeg;base64,${item.images[0]}` : '/placeholder.jpg'}
                                                alt={item.name}
                                                className="h-full w-80 object-cover object-center group-hover:opacity-75"
                                            />
                                        </div>
                                        <div className="mt-6">
                                            <p className="text-sm text-gray-500">{item.color}</p>
                                            <h3 className="mt-1 font-semibold text-gray-900">
                                                <a href={item.href}>
                                                    <span className="absolute inset-0" />
                                                    {item.name}
                                                </a>
                                            </h3>
                                            <p className="mt-1 text-gray-900">{item.price}</p>
                                        </div>
                                    </div>

                                    <h4 className="sr-only">Available colors</h4>
                                    <ul role="list" className="mt-auto flex items-center justify-center space-x-3 pt-6">
                                        {availableColors.map((color) => (
                                            <li
                                                key={color.name}
                                                className="h-4 w-4 rounded-full border border-black border-opacity-10"
                                                style={{ backgroundColor: color.colorBg }}
                                            >
                                                <span className="sr-only">{color.name}</span>
                                            </li>
                                        ))}
                                    </ul>
                                </li>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

