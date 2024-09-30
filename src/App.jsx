import './App.css'
import Navbar from './components/Navbar'
import GamesList from './components/GamesList'
import GamesListHeader from './components/GamesListHeader'
import HeroSection from './components/HeroSection'
function App() {

  return (
    <>
      <Navbar />
      <div className='container'>
        <div className='container-left'>
            <GamesListHeader />
            <GamesList />
        </div>
        <div className='container-right'>
          <HeroSection />
        </div>
      </div>
    </>
  )
}

export default App
