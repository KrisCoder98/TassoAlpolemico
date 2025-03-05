function TeamCard({alias, name, surname, children}){

    const completeName = `${name} ${surname}`; 
    return (
        <div className="rounded-3xl h-[300px] bg-white/70 hover:shadow-green-900 grid grid-cols-2">
            <img src={`src/img/${alias}Pic.jpg`} alt="" className="rounded-3xl absolute h-[300px] opacity-50 hover:opacity-100"/>
            <p className="text-5xl text-blue-600 font-bold text-center">{alias}</p>
            {/* <p className="text-2xl text-gray-600">{completeName}</p> */}

            {(children) && <div className="text-white hover:bg-gray-700 p-2 rounded-r-3xl">{children}</div>}
        </div>
    )

}

export default TeamCard;