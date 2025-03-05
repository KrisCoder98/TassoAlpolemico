import { useEffect, useState } from "react";
import TeamCard from "./TeamCard";

function TeamSection(classes){
    const [team, setTeam] = useState([]);

    useEffect(() => {
        fetch("./json/teamData.json")
            .then((response) => {
                if (!response.ok) throw new Error(`Errore nella richiesta: ${response.statusText}`);
                return response.json();
            })
            .then((result) => setTeam(result || {}))
        .catch((error) => console   .error(`Errore! ${error}`));
    }, []);

    useEffect(() => console.log("Team aggiornato: ", team), [team]);

    return (
        <div
            style={{
                backgroundImage: `url("./img/${team.bgImg}")`
            }}

            className={`relative bg-cover bg-center h-[500px] border-4 border-green-800 rounded-3xl ${Object.values(classes)}`}
        >
            <div className="absolute inset-0 bg-gradient-to-t from-transparent to-black/100 rounded-3xl" />

            <div className="relative z-10 text-white p-5">
                <p className="text-6xl mt-5 mb-2 ml-0">Il nostro Team</p>
                <div className="grid grid-cols-4 gap-2 p-2">
                    {
                        team?.value?.length > 0 ? (
                            (team.value).sort((a, b) => new Date(a?.birthdate) - new Date(b?.birthdate)).map((item, index) => 
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
            </div>
        </div>
      )
}

export default TeamSection;