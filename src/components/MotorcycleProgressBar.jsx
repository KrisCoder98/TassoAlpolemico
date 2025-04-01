import { motion } from "framer-motion";
import { FaMotorcycle } from "react-icons/fa";

export default function MotorcycleProgressBar() {
  return (
    <div className="w-[100%] h-25 flex justify-center">
      <div className="w-[90%] flex flex-col overflow-hidden">
        
        {/* Moto che si muove lungo la barra */}
        <motion.div
          className="text-5xl text-red-500 w-full"
          initial={{ x: "-15%" }}
          animate={{ x: "100%" }}
          transition={{
            duration: 5,
            ease: "linear",
            repeat: Infinity
          }}
        >
          <FaMotorcycle className="-rotate-z-30"/>
        </motion.div>
          
        {/* Barra di progresso */}
        <motion.div
          className="h-1/5 w-full bg-gray-800 rounded-full text-center text-sm text-white"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 3, ease: "linear", repeat: 0 }}  // La barra di progresso
        >
          <p>Caricamento...</p>
        </motion.div>
      </div>
    </div>
  );
}
