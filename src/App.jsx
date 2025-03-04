import './App.css'

function App() {

  fetch("./mainData")
  .then(response => {
    if(!response.ok)
      throw new Error(`Errore nella richiesta: ${response.statusText}`);
    console.log(response.json)
  })
  .catch(error => console.error(`Errore! ${error}`));

  return (
    <>
      <p className="text-8xl text-gray-200 bg-gray-800 font-serif p-3 m-2 rounded-3xl min-w-[1200px]">🍻 Tasso Alpolemico 🍷</p>
      {/* <div>{data}</div> */}
    </>
  )
}

export default App;
