import React from 'react';
import Layout from './components/Layout';
import HeartJar from './components/HeartJar';
import MusicPlayer from './components/MusicPlayer';
import GalaxyMessage from './components/GalaxyMessage';
import SparkleTrail from './components/SparkleTrail';

function App() {
  return (
    <Layout>
      <HeartJar />
      <GalaxyMessage />
      <MusicPlayer />
      <SparkleTrail />
    </Layout>
  );
}

export default App;
