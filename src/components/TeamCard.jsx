import { useState, useEffect } from 'react';

function TeamCard({alias, children}){

    const [motoImg, setMotoImg] = useState(null),
        [autoImg, setAutoImg] = useState(null);

    useEffect(() => {
        const loadImage = async (path, setImage) => {
            try {
                const response = await fetch(path);
                if (!response.ok) throw new Error("Immagine non trovata");
                const blob = await response.blob();
                setImage(URL.createObjectURL(blob));
            } catch (error) {
                console.error("Errore caricamento immagine:", error);
                setImage(null); // Se fallisce, non mostra l'immagine rotta
            }
        };

        loadImage(`/img/${alias}MotoPic.jpg`, setMotoImg);
        loadImage(`/img/${alias}AutoPic.jpg`, setAutoImg);

    }, [alias])

    return (
        <div className="rounded-3xl h-[300px] bg-white/70 hover:shadow-green-900 flex justify-between min-w-[650px]">
            {/* Immagine Moto */}
            <div className='flex-col justify-start'>
                { motoImg && <img src={motoImg} alt="" className="rounded-l-3xl h-[300px] w-auto opacity-30 hover:opacity-100"/>}
            </div>
            
            <div className='flex flex-col justify-center'>
                <p className="text-5xl text-blue-600 font-bold text-center w-auto font-item">{alias}</p>

                {children && <div className="hover:text-white hover:bg-gray-700 p-2 font-base">{children}</div>}

            </div>

            {/* Immagine Auto */}
            <div className='flex-col justify-end'>
                { autoImg && <img src={autoImg} alt="" className="rounded-r-3xl h-[300px] w-auto opacity-30 hover:opacity-100"/>}
            </div>

        </div>
    )

}

export default TeamCard;