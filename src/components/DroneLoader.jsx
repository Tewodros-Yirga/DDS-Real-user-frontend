import { motion } from "framer-motion";

const DroneLoader = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      {/* Animated Drone SVG */}
      <motion.svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 100 100"
        width="150"
        height="150"
        animate={{ rotate: 360 }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      >
        {/* Drone Body */}
        <circle cx="50" cy="50" r="12" fill="url(#droneBodyGradient)" />
        <defs>
          <radialGradient id="droneBodyGradient" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
            <stop offset="0%" stopColor="#AC6AFF" />
            <stop offset="100%" stopColor="#7E4BCC" />
          </radialGradient>
        </defs>

        {/* Drone Center */}
        <circle cx="50" cy="50" r="8" fill="#0E0C15" />

        {/* Diagonal Axis (arms) - Intersecting at center */}
        {/* Axis from motor 1 to motor 3 */}
        <motion.rect
          x="18"
          y="50"
          width="64"
          height="5"
          fill="url(#armGradient)"
          transform="rotate(45, 50, 50)"
          animate={{ scaleX: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
        {/* Axis from motor 2 to motor 4 */}
        <motion.rect
          x="18"
          y="50"
          width="64"
          height="5"
          fill="url(#armGradient)"
          transform="rotate(-45, 50, 50)"
          animate={{ scaleX: [1, 1.05, 1] }}
          transition={{ duration: 0.5, repeat: Infinity, ease: "easeInOut" }}
        />
        <defs>
          <linearGradient id="armGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#AC6AFF" />
            <stop offset="100%" stopColor="#7E4BCC" />
          </linearGradient>
        </defs>

        {/* Propellers with motion blur effect */}
        <motion.g filter="url(#blur)">
          {/* Motor 1 (Top-Left) */}
          <motion.rect
            x="5"
            y="46"
            width="20"
            height="6"
            fill="#AC6AFF"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          {/* Motor 2 (Top-Right) */}
          <motion.rect
            x="75"
            y="46"
            width="20"
            height="6"
            fill="#AC6AFF"
            animate={{ rotate: -360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          {/* Motor 3 (Bottom-Left) */}
          <motion.rect
            x="46"
            y="5"
            width="6"
            height="20"
            fill="#AC6AFF"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
          {/* Motor 4 (Bottom-Right) */}
          <motion.rect
            x="46"
            y="74"
            width="6"
            height="20"
            fill="#AC6AFF"
            animate={{ rotate: -360 }}
            transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
          />
        </motion.g>

        {/* Blur filter for propellers */}
        <defs>
          <filter id="blur">
            <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
          </filter>
        </defs>

        {/* Drone Lights */}
        <circle cx="45" cy="45" r="2" fill="#00FF00" /> {/* Green Light */}
        <circle cx="55" cy="45" r="2" fill="#FF0000" /> {/* Red Light */}
        <circle cx="45" cy="55" r="2" fill="#00FF00" /> {/* Green Light */}
        <circle cx="55" cy="55" r="2" fill="#FF0000" /> {/* Red Light */}

        {/* Shadow Effect */}
        <ellipse cx="50" cy="60" rx="15" ry="5" fill="rgba(0, 0, 0, 0.4)" />
      </motion.svg>

      {/* Loading Text */}
      <p className="mt-4 text-xl text-[#AC6AFF]">Loading...</p>
    </div>
  );
};

export default DroneLoader;