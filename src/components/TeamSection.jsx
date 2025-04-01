import { useEffect, useState, useRef } from "react";
import TeamCard from "./TeamCard";
import MotorcycleSpinner from "./MotorcycleProgressBar";

function TeamSection(id){
    const [team, setTeam] = useState([]),
        [width, setWidth] = useState(window.innerWidth),
        cardRef = useRef(null);

    useEffect(() => {
        fetch("./json/teamData.json")
            .then((response) => {
                if (!response.ok) throw new Error(`Errore nella richiesta: ${response.statusText}`);
                return response.json();
            })
            .then((result) => setTeam(result || {}))
        .catch((error) => console.error(`Errore! ${error}`));
    }, []);

    useEffect(() => {
        const observer = new ResizeObserver(([entry]) => {
            setWidth(entry.contentRect.width);
        });
        
        if (cardRef.current) {
            observer.observe(cardRef.current);
        }
      
        return () => {
            if (cardRef.current) {
              observer.unobserve(cardRef.current);
            }
        };
    }, []);

    return (
        <div id={Object.values(id)}>
            <p className="text-center mt-5 mb-2 mx-10 font-title text-5xl bg-amber-200 rounded-2xl">Il Team</p>
                {
                    (team.length > 0) ?
                    (
                        <div ref={cardRef} className={`grid ${width > 2700 ? 'grid-cols-4' : width > 1330 ? 'grid-cols-2' : 'grid-cols-1'} gap-2 p-2`}>

                            {team.sort((a, b) => new Date(a?.birthdate) - new Date(b?.birthdate))
                                .map((item, index) => 
                                    <TeamCard
                                        key={index}
                                        alias={item.alias}
                                        name={item.name}
                                        surname={item.surname}
                                    >{item.description}</TeamCard>)
                            }
                        </div>

                    ) : (
                        <div ref={cardRef}>
                            <MotorcycleSpinner />
                        </div>
                    )
                }
        </div>
      )
}

export default TeamSection;