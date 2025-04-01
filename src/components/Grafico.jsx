import { useState, useEffect } from "react";
import { LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from 'recharts';

export default function Grafico() {

    const [data, setData] = useState([]),
        [selectedPista, setSelectedPista] = useState(null),
        [selectedData, setSelectedData] = useState(null),
        [datiGrafico, setDatiGrafico] = useState({});

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

        console.log('Pista o Data aggiornati');
        try {

            if(selectedPista && selectedData) {

                let dati = data.find(item => item.Pista.Nome === selectedPista).Pista.Pistate.find(item => item.Data == selectedData).Tempi,
                    grafico = {"piloti":[], "values": []};

                console.log('dati', dati);

                dati.map(pilota => {
                    console.log('Pilota', pilota);
                    grafico.piloti.push(pilota.Pilota);

                    (pilota.Turni).forEach((turno, tIndex) => {
                        console.log('turno', turno);

                        turno.forEach((giro, gIndex) => {

                            (grafico.values && (grafico.values).find(row => row.Giro == gIndex+1 && row.Turno == tIndex+1))
                            ? grafico.values.find(row => row.Giro == gIndex+1 && row.Turno == tIndex+1)[pilota.Pilota] = giro
                            : grafico.values.push({Turno: tIndex+1, Giro: gIndex+1, [pilota.Pilota]: giro});

                            if(!(grafico.maxValue) || grafico.maxValue < giro)
                                grafico.maxValue = Math.round(giro);
                            

                            if(!(grafico.minValue) || grafico.minValue > giro)
                                grafico.minValue = Math.round(giro);
                        })
                    });
                });
            
                console.log('grafico', grafico);
                setDatiGrafico(grafico);
            } else setDatiGrafico({});
            
        } catch (error) {
            
            console.warn(error);
            
        }
        
    }, [selectedData, selectedPista])

    return(
        <div id="Grafici">

            <p className="text-center mt-5 mb-2 mx-10 font-title text-5xl bg-amber-200 rounded-2xl">Grafici</p>

            <div className="m-8 mt-3 rounded-2xl bg-white p-3 flex gap-2">

                {/* PARTE DI SELEZIONE */}
                <div className="flex flex-col gap-3">
                    {
                        !(data.length === 0) && <div className="p-3 space-x-10 flex flex-col">
                            <label htmlFor="Pista">Seleziona la Pista: </label>
                            <select name="Pista" id="pista" defaultValue="" onChange={(event) => {
                                setSelectedPista(event.target.value);
                                setSelectedData("");
                            }} className="bg-gray-200 text-black rounded-full px-5 py-1 hover:bg-amber-200">
                                <option value="">Seleziona una pista...</option>
                                {data.map((item, index) => (
                                    <option key={index} value={item.Pista.Nome}>{item.Pista.Nome}</option>
                                ))}
                            </select>
                        </div>
                    }

                    {
                        (selectedPista) && <div className="p-3 space-x-10 flex flex-col">
                            <label htmlFor="Data">Seleziona la Data: </label>
                            <select name="Data" id="data" onChange={(event) => setSelectedData(event.target.value)} value={selectedData} className="bg-gray-200 text-black rounded-full px-5 py-1 hover:bg-amber-200">
                                <option value="">Seleziona una data...</option>
                                {data.find(item => item.Pista.Nome === selectedPista).Pista.Pistate.map((item, index) => (
                                    <option key={index} value={item.Data}>{item.Data}</option>
                                ))}
                            </select>
                        </div>
                    }
                    
                </div>

                {
                    <ResponsiveContainer width="100%" height={500}>
                        <LineChart
                            width={500}
                            height={200}
                            data={datiGrafico.values}
                            margin={{
                                top: 10,
                                right: 30,
                                left: 0,
                                bottom: 0,
                            }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="Giro" label={{ value: "Giro" }} />
                            <YAxis type="number" domain={[datiGrafico.minValue - 2, datiGrafico.maxValue + 2]}/>
                            <Tooltip />
                            <Legend />

                            {(datiGrafico.values) && datiGrafico.piloti.map(((pilota, index) => {
                                let strokeColor = '#' + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0');
                                return <Line key={index} type="monotone" dataKey={pilota} stroke={strokeColor} />
                            }))}

                        </LineChart>
                  </ResponsiveContainer>
                }
            </div>
        </div>
    )
}