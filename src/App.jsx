import TeamSection from './components/TeamSection';
import background from './assets/img/Moto.jpg';
import Navbar from './components/Navbar';

function App() {

  return (
    <>
      <div className="h-screen bg-cover bg-center" style={{ backgroundImage: `url(${background})`, marginTop: 0 }} >
        
        <p className="text-8xl text-red-600 font-serif p-3 rounded-3xl text-center">🍻 Tasso Alpolemico 🍷</p>

        <Navbar />

        <TeamSection />

      </div>
    </>
  )
}

export default App;