import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import App from './App';
import ErrorPage from './components/ErrorPage';
import Home from './components/Home';
import Movies from './components/Movies';
import Movie from './components/Movie';
import Genres from './components/Genres';
import EditMovie from './components/EditMovie';
import ManageCatalogue from './components/ManageCatalogue';
import GraphQl from './components/GraphQl';
import LogIn from './components/LogIn';

const router = createBrowserRouter([
  {path: "/", element: <App></App>, errorElement: <ErrorPage></ErrorPage>, 
  children: [
    {index: true, element: <Home></Home>},
    {path: "/movies", element: <Movies></Movies>},
    {path: "/movies/:id", element: <Movie></Movie>},
    {path: "/genres", element: <Genres></Genres>},
    {path: "/admin/movie/0", element: <EditMovie></EditMovie>},
    {path: "/admin/movie/:id", element: <EditMovie></EditMovie>},
    {path: "/admin", element: <ManageCatalogue></ManageCatalogue>},
    {path: "/graphql", element: <GraphQl></GraphQl>},
    {path: "/login", element: <LogIn></LogIn>},
    ]
  },
])

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <RouterProvider router={router}></RouterProvider>
);
