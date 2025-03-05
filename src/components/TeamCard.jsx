function TeamCard({alias, name, surname, imgURL, children}){

    const completeName = `${name} ${surname}`; 
    return (
        <div className="rounded-3xl h-[300px]">
            {(imgURL) && <img src={imgURL} alt={`Foto di ${alias}`} />}
            <p className="text-5xl text-blue-600 font-bold">{alias}</p>
            <p className="text-2xl text-gray-600">{completeName}</p>

            {(children) && <div className="text-white">{children}</div>}
        </div>
    )

}

export default TeamCard;