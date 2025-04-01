import Navbar from './components/Navbar';
import TeamSection from './components/TeamSection';
import background from '/img/Moto.jpg';
import Grafico from './components/Grafico';

function App() {

  return (
    <div
      className="min-h-screen min-w-screen w-auto bg-cover bg-center"
      style={{
        backgroundImage: `url(${background})`,
        backgroundAttachment: "fixed"
      }} >

      <Navbar />

      <Grafico />

      <TeamSection id="Team"/>


    </div>
  )
}

export default App;