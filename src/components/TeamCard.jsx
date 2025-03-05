function TeamCard({alias, children}){

    return (
        <div className="rounded-3xl h-[300px] bg-white/70 hover:shadow-green-900 grid grid-cols-2">
            <img src={`src/assets/img/${alias}Pic.jpg`} alt="" className="rounded-3xl absolute h-[300px] opacity-50 hover:opacity-100"/>
            <p className="text-5xl text-blue-600 font-bold text-center">{alias}</p>

            {(children) && <div className="text-white hover:bg-gray-700 p-2 rounded-r-3xl">{children}</div>}
        </div>
    )

}

export default TeamCard;