import React from 'react';
import Header from './Header';
import Songs from './Songs';
import Tools from './Tools';
import Shop from './Shop';
import Footer from './Footer';
import Player from './Player';

export default function App() {
  return (
    <div className="app">
      <Header />
      <Songs />
      <Tools />
      <Shop />
      <Footer />
      <Player />
    </div>
  );
}
