import React from 'react';
import { createBrowserRouter } from 'react-router-dom';

// pages
import MovieLists from '../pages/movie-list';
import MovieCart from '../pages/movie-cart';
import Page404 from '../pages/Page404';
import LayoutMenu from '../Layout/menu';


const Router = createBrowserRouter([
    {
        element: (
            <LayoutMenu />
        ),
        errorElement: <LayoutMenu />,
        children: [
            {
                path: '',
                element: (
                    <MovieLists />
                ),
            },
            {
                path: 'cart',
                element: (
                    <MovieCart />
                ),
            },
        ]
    },
    {
        path: '*',
        element: <Page404 />,
    }
]);
export default Router;
