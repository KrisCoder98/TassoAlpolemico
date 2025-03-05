import { useState, useEffect } from "react";

function Navbar(classes){
    const [menu, setMenu] = useState([]);
    useEffect(() => {
        fetch('./json/settingsData.json')
        .then((response) => {
            if(!response.ok) throw new Error(`Errore nella richiesta: ${response.statusText}`);
            return response.json();
        })
        .then((result) => setMenu(result.find((item) => item.name === "Navbar")?.values || []))
        .catch((e) => console.error(`Errore! ${e}`))
    },[]);

    useEffect(() => console.log('Menu aggiornato: ', menu), [menu]);

    return(
        <nav className={`${Object.values(classes)}`}>
            <ul className="text-left ml-5">
            {(menu.length > 0) && menu.map((item, index) => <li key={index}>{item.icon} &gt; {item.title}</li>)}
            </ul>
        </nav>
    )
}

export default Navbar;