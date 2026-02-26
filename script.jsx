import DecryptedText from "./DecryptedText";
import LetterGlitch from "./LetterGlitch";

export default function Hero() {
  return (
    <div style={{ position: "relative", height: "80vh", overflow: "hidden" }}>
      
      {/* Glitch Background ONLY for hero */}
      <div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          zIndex: 0,
          opacity: 0.25   // makes it subtle, not disturbing
        }}
      >
        <LetterGlitch
          glitchColors={["#005eff", "#ff0000", "#ffffff"]}
          glitchSpeed={60}
          smooth={true}
          outerVignette={true}
          centerVignette={false}
        />
      </div>

      {/* Main Content */}
      <div
        style={{
          position: "relative",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          height: "100%",
          textAlign: "center"
        }}
      >
        
        {/* INNOVESTA TEXT */}
        <DecryptedText
          text="INNOVESTA 2K-26"
          speed={40}
          maxIterations={20}
          sequential={true}
          revealDirection="center"
          animateOn="view"
          className="text-white"
          encryptedClassName="text-blue-400"
          parentClassName="text-2xl tracking-widest mb-2 font-mono"
        />

        {/* HACKATHON TITLE */}
        <DecryptedText
          text="HACKATHON"
          speed={30}
          maxIterations={30}
          sequential={true}
          revealDirection="start"
          animateOn="view"
          className="text-7xl font-bold bg-gradient-to-r from-blue-500 via-white to-red-500 bg-clip-text text-transparent"
          encryptedClassName="text-red-500"
          parentClassName="tracking-widest"
        />

      </div>
    </div>
  );
}