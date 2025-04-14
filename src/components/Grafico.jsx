/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect, useRef } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Grafico({id}) {

    const [data, setData] = useState([]),
        [selectedPista, setSelectedPista] = useState(""),
        [selectedData, setSelectedData] = useState(""),
        [datiGrafico, setDatiGrafico] = useState({}),
        [width, setWidth] = useState(window.innerWidth),
        [type, setType] = useState("Gare"),
        cardRef = useRef(null);

    useEffect( () => {
        fetch('/json/datiGrafico.json')
        .then((response) => {
            if (!response.ok) throw new Error(`Errore nella richiesta: ${response.statusText}`);
            return response.json();
        })
        .then((result) => setData(result || {}))
        .catch((error) => {
            console.warn('error', error);
        })
    }, []);

    useEffect( () => {
        console.log('Modifica dei dati');
        try {

            if(selectedPista && selectedData) {

                let dati = data.find(item => item.Pista.Nome === selectedPista).Pista[type].find(item => item.Data == selectedData).Tempi,
                    grafico = {"piloti":[], "values": []};

                dati.map(pilota => {
                    grafico.piloti.push({
                        "nome": pilota.Pilota,
                        "colore": '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')
                    });

                    (pilota.Turni).forEach((turno, tIndex) => {

                        turno.forEach((giro, gIndex) => {

                            (grafico.values && (grafico.values).find(row => row.Giro == gIndex+1 && row.Turno == tIndex+1))
                            ? grafico.values.find(row => row.Giro == gIndex+1 && row.Turno == tIndex+1)[pilota.Pilota] = giro
                            : grafico.values.push({Turno: tIndex+1, Giro: gIndex+1, [pilota.Pilota]: giro});

                            if(!(grafico.maxValue) || grafico.maxValue < giro)
                                grafico.maxValue = Math.round(giro);
                            

                            if(!(grafico.minValue) || grafico.minValue > giro)
                                grafico.minValue = Math.round(giro);
                        });
                        
                        const giriGiorno = [...grafico.values.map(giro => giro[pilota.Pilota]).filter(giro => giro != undefined)],
                            giriPista = data.find(item => item.Pista.Nome === selectedPista).Pista[type].map(pistata => pistata.Tempi).flat().filter(item => item.Pilota == pilota.Pilota).map(item => item.Turni).flat().flat().filter(tempo => tempo != null);

                        grafico.piloti.find(p => p.nome == pilota.Pilota).bestLap = [Math.min(...giriGiorno), Math.min(...giriPista)];
                        grafico.piloti.find(p => p.nome == pilota.Pilota).worstLap = [Math.max(...giriGiorno), Math.max(...giriPista)];
                        
                        grafico.piloti.find(p => p.nome == pilota.Pilota).avgLap = [Math.round((giriGiorno.reduce((acc, val) => acc + val, 0) / giriGiorno.length) * 1000) / 1000, Math.round((giriPista.reduce((acc, val) => acc + val, 0) / giriPista.length) * 1000) / 1000];

                        grafico.piloti.find(p => p.nome == pilota.Pilota).Punti = pilota.Punti;
                        
                    });
                });
            
                console.log('grafico', grafico);
                setDatiGrafico(grafico);
            } else setDatiGrafico({});
            
        } catch (error) {
            
            console.warn(error);
            
        }
        
    }, [data, selectedData, selectedPista, type]);

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

    return(
        <div id={id}>

            <p className="text-center mt-5 mb-2 mx-10 font-title text-5xl bg-amber-200 rounded-2xl">Grafici</p>

            <div className={`m-8 mt-3 rounded-2xl bg-white p-3 flex flex-col gap-2`}>

                {/* SEL. Type */}
                <div className="flex gap-0 rounded-xl border border-black w-50 mx-auto text-center">
                    <div className="flex w-[50%]">
                        <input
                            type="radio"
                            name="r-btn"
                            id="r-btn-1"
                            value="Pistata"
                            className="hidden peer"
                            onClick={() => {
                                setType("Pistate");
                                setSelectedPista("");
                                setSelectedData("")
                            }} />
                        <label
                            htmlFor="r-btn-1"
                            className="text-xl p-2 rounded-l-xl text-gray-900 cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white w-50"
                        >Pistata</label>
                    </div>
                    <div className="flex w-[50%]">
                        <input
                            type="radio"
                            name="r-btn"
                            id="r-btn-2"
                            value="Gara"
                            className="hidden peer"
                            onClick={() => {
                                setType("Gare");
                                setSelectedPista("");
                                setSelectedData("");
                            }}
                            defaultChecked />
                        <label
                            htmlFor="r-btn-2"
                            className="text-xl p-2 rounded-r-xl text-gray-900 cursor-pointer peer-checked:bg-blue-600 peer-checked:text-white w-50"
                        >Gara</label>
                    </div>
                </div>

                <div ref={cardRef} className={`flex ${(width < 1000) ? "flex-col": "flex-row"} gap-3`}>

                    <div className="flex flex-col">
                        {/* SEL. Pista */}
                        {!(data.length === 0) && <div className={`p-3 space-x-10 flex flex-col `}>
                            <label htmlFor="Pista" className="text-xl">Pista: </label>
                            <select name="Pista" id="pista" value={selectedPista} className="bg-gray-200 text-black rounded-full px-5 py-1 hover:bg-amber-200"
                                onChange={(event) => {
                                    setSelectedPista(event.target.value);
                                    setSelectedData("");
                                }}>
                                <option value="" disabled>Seleziona una pista...</option>
                                {data.map((item, index) => (item.Pista[type] != undefined ? <option key={index} value={item.Pista.Nome}>{item.Pista.Nome}</option> : null))}
                            </select>
                        </div>}

                        {/* SEL. Data */}
                        {(selectedPista) && <div className="p-3 space-x-10 flex flex-col">
                            <label htmlFor="Data" className="text-xl">Data: </label>
                            <select name="Data" id="data" value={selectedData} className="bg-gray-200 text-black rounded-full px-5 py-1 hover:bg-amber-200" onChange={(event) => setSelectedData(event.target.value)} >
                                <option value="" disabled defaultChecked>Seleziona una data...</option>
                                {data.find(item => item.Pista.Nome === selectedPista).Pista[type]?.map((item, index) => (
                                    <option key={index} value={item.Data}>{item.Data}</option>
                                ))}
                            </select>
                        </div>}
                    </div>

                    {((selectedData) && (datiGrafico.piloti)) && <div className="p-3 space-y-4 flex flex-col">
                        <p className="text-xl font-semibold">Dati:</p>
                        <div className="overflow-x-auto">
                            <table className="w-full border-collapse border border-gray-600">
                                <thead>
                                    <tr className="bg-red-600 text-white">
                                        <th className="border text-left border-gray-600 px-4 py-2" rowSpan="2">Pilota</th>
                                        <th className="border text-center border-gray-600 px-4 py-2" colSpan="2">Miglior giro</th>
                                        <th className="border text-center border-gray-600 px-4 py-2" colSpan="2">Media</th>
                                        <th className="border text-center border-gray-600 px-4 py-2" colSpan="2">Peggior giro</th>
                                    </tr>
                                    <tr className="bg-red-600 text-left text-white">
                                        <th className="border border-gray-600 px-4 py-2">Giorno</th>
                                        <th className="border border-gray-600 px-4 py-2">Pista</th>
                                        <th className="border border-gray-600 px-4 py-2">Giorno</th>
                                        <th className="border border-gray-600 px-4 py-2">Pista</th>
                                        <th className="border border-gray-600 px-4 py-2">Giorno</th>
                                        <th className="border border-gray-600 px-4 py-2">Pista</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {datiGrafico?.piloti?.map((pilota, index) => {
                                        return (<tr key={index} className="even:bg-gray-200 mb-3">
                                            <td className={`border border-gray-600 px-4 py-2 text-nowrap font-bold underline underline-offset-3`} style={{ color: pilota.colore }}>{pilota.nome}</td>
                                            <td className={`border border-gray-600 px-4 py-2 text-nowrap`}>{pilota.bestLap[0]}</td>
                                            <td className={`border border-gray-600 px-4 py-2 text-nowrap`}>{pilota.bestLap[1]}</td>
                                            <td className={`border border-gray-600 px-4 py-2 text-nowrap`}>{pilota.avgLap[0]}</td>
                                            <td className={`border border-gray-600 px-4 py-2 text-nowrap`}>{pilota.avgLap[1]}</td>
                                            <td className={`border border-gray-600 px-4 py-2 text-nowrap`}>{pilota.worstLap[0]}</td>
                                            <td className={`border border-gray-600 px-4 py-2 text-nowrap`}>{pilota.worstLap[1]}</td>
                                        </tr>)
                                    })}
                                </tbody>
                            </table>
                        </div>
                    </div>}

                    {((selectedData) && (datiGrafico.piloti) && (type === "Gare")) && <div className="p-3 space-y-4 flex flex-col">
                        <p className="text-xl font-semibold">Classifica gara:</p>
                        <div className="overflow-x-auto">
                            <ol>
                                {datiGrafico?.piloti?.sort((a, b) => b?.Punti - a?.Punti).map((pilota, index) => 
                                    <li key={index} className={`grid grid-cols-7 gap-0 w-70 text-l p-0 col-span-1 ${(index === 0) ? "bg-amber-300" : (index === 1) ? "bg-gray-600" : (index === 2) ? "bg-amber-800" : null}`}>
                                        <span className={`p-1 col-span-1`}>{index+1}°</span>
                                        <span className={`pl-2 py-1 col-span-4`}>{pilota.nome}</span>
                                        <span className={`pr-1 py-1 col-span-2 text-right`}>{pilota.Punti} pt.</span>
                                    </li>)
                                }
                                <li></li>
                            </ol>
                        </div>
                    </div>}
                    
                </div>

                {<ResponsiveContainer width="100%" height={(datiGrafico?.values?.length || 1) * 25}>
                    <LineChart
                        data={datiGrafico.values}
                        margin={{
                            top: 10,
                            right: 30,
                            left: 0,
                            bottom: 0,
                        }}
                    >
                        <CartesianGrid strokeDasharray="5 5" />
                        <XAxis
                            orientation="bottom"
                            dataKey={(entry) => `${entry.Turno}.${entry.Giro}`}
                            label={{
                                value: "Giro",
                                position: "bottom"
                            }} />
                        <YAxis
                            type="number"
                            domain={[datiGrafico.minValue - 2, datiGrafico.maxValue + 2]}/>
                        <Tooltip cursor={{ stroke: 'black', strokeWidth: 1 }} />
                        <Legend 
                            verticalAlign="top"
                            height={72}/>

                        {(datiGrafico.values) && datiGrafico.piloti.map(((pilota, index) => {
                            return <Line key={index} type="monotone" dataKey={pilota.nome} stroke={pilota.colore} />
                        }))}

                    </LineChart>
                </ResponsiveContainer>}
            </div>
        </div>
    )
}