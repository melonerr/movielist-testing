import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from './routers';

function App() {
  return <RouterProvider router={Router} />;
}

export default App