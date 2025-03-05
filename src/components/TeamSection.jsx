import { useEffect, useState } from "react";
import TeamCard from "./TeamCard";

function TeamSection(){
    const [team, setTeam] = useState([]);

    useEffect(() => {
        fetch("./json/teamData.json")
            .then((response) => {
                if (!response.ok) throw new Error(`Errore nella richiesta: ${response.statusText}`);
                return response.json();
            })
            .then((result) => setTeam(result || {}))
        .catch((error) => console.error(`Errore! ${error}`));
    }, []);

    useEffect(() => console.log("Team aggiornato: ", team), [team]);

    return (
        <>
            <p className="text-6xl text-center mt-5 mb-2 ml-0">Il Team</p>
            <div className="grid grid-cols-4 gap-2 p-2">
                {
                    (team.length > 0) ?
                    (
                        team.sort((a, b) => new Date(a?.birthdate) - new Date(b?.birthdate)).map((item, index) => 
                        <TeamCard
                            key={index}
                            alias={item.alias}
                            name={item.name}
                            surname={item.surname}
                        >{item.description}</TeamCard>)
                        
                    ) : (
                        <p>Caricamento...</p>
                    )
                }
            </div>
        </>
      )
}

export default TeamSection;