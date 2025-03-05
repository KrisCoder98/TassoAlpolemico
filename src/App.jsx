import TeamSection from './components/TeamSection';

function App() {

  // const bgUrl = "https://plus.unsplash.com/premium_photo-1689038826970-a692d1c76884?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D";

  return (
    <>
      <div>
        <p className="text-8xl text-red-600 font-serif p-3 m-2 rounded-3xl text-center">🍻 Tasso Alpolemico 🍷</p>
        <section className="grid grid-cols-7 gap-5 text-center m-5">
          <TeamSection classes={`col-span-4`}/>
        </section>
      </div>
    </>
  )
}

export default App;