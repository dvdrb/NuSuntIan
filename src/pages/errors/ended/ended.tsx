import { useState, useEffect } from "react";
import { Fragment } from "react/jsx-runtime";
import { motion, AnimatePresence } from "framer-motion";
import ReactPlayer from "react-player";
import styles from "./ended.module.scss";
import Video from "assets/video/shop-bg.webm";
import { Noise, ScrambleText } from "components";
import Seo from "components/seo/seo";

const EnhancedComingSoon = () => {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [currentDate, setCurrentDate] = useState("2025-12-12 09:00");
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  const dates = [
    "2025-09-06 12:00",
    "2025-09-20 00:00",
    "2025-10-04 00:00",
    "2025-12-12 09:00",
    "2025-09-14 02:00",
    "2025-11-07 19:00",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDate(dates[Math.floor(Math.random() * dates.length)]);
    }, 1500);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email) {
      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbzFSCa6n5ltMHxneGFLB7IrHrKA8A3uF-2YkVGGanZcXC-4nd4tnxxJG5Fu2u7HUanKng/exec",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: `email=${encodeURIComponent(email)}`,
          }
        );

        const text = await response.text();
        if (text === "Success") {
          console.log("Email submitted to Google Sheets!");
        } else {
          console.error("Submission error:", text);
        }
      } catch (err) {
        console.error("Fetch error:", err);
      }
      setSubmitted(true);
    }
  };

  const floatingElements = Array.from({ length: 6 }, (_, i) => (
    <motion.div
      key={i}
      className="floating-element"
      style={{
        position: "absolute",
        width: Math.random() * 8 + 4,
        height: Math.random() * 8 + 4,
        background: "linear-gradient(45deg, #ff5959, #ff7979)",
        borderRadius: "50%",
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
      }}
      animate={{
        y: [0, -30, 0],
        x: [0, Math.random() * 20 - 10, 0],
        opacity: [0.3, 0.8, 0.3],
      }}
      transition={{
        duration: 3 + Math.random() * 2,
        repeat: Infinity,
        delay: Math.random() * 2,
      }}
    />
  ));

  return (
    <Fragment>
      <Seo />
      <div
        style={{
          minHeight: "100vh",
          background:
            "linear-gradient(135deg, #0c0c0c 0%, #1a1a1a 50%, #0c0c0c 100%)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          position: "relative",
          overflow: "hidden",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div className={styles.video}>
          <ReactPlayer
            muted={true}
            playing={true}
            loop={true}
            playsinline={true}
            url={Video}
            width={"100%"}
            height={"100%"}
          />
        </div>
        <Noise position={"fixed"} />
        {/* Animated background elements */}
        {floatingElements}

        {/* Mouse follower glow */}
        <motion.div
          style={{
            position: "fixed",
            left: mousePosition.x - 100,
            top: mousePosition.y - 100,
            width: 200,
            height: 200,
            background:
              "radial-gradient(circle, rgba(255, 89, 89, 0.1) 0%, transparent 70%)",
            borderRadius: "50%",
            pointerEvents: "none",
            zIndex: 1,
          }}
          animate={{ scale: isHovering ? 1.5 : 1 }}
          transition={{ type: "spring", stiffness: 150, damping: 15 }}
        />

        {/* Logo with enhanced animation */}
        <motion.div
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ type: "spring", duration: 1.2, bounce: 0.6 }}
          style={{
            marginBottom: "3rem",
            position: "relative",
          }}
        >
          <motion.div
            initial={{ scale: 1, opacity: 0.7 }}
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 1, 0.7],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              repeatType: "reverse",
            }}
            style={{
              position: "absolute",
              inset: -20,
              background:
                "radial-gradient(circle, rgba(255, 89, 89, 0.3), transparent)",
              borderRadius: "50%",
              filter: "blur(20px)",
            }}
          />
          <svg width="60" height="60" viewBox="0 0 24 24" fill="#ff5959">
            <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z" />
            <path
              d="M12 8L12.5 11L15 11.5L12.5 12L12 15L11.5 12L9 11.5L11.5 11L12 8Z"
              opacity="0.7"
            />
          </svg>
        </motion.div>

        {/* Enhanced SOON text */}
        <motion.div
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
          style={{
            position: "relative",
            marginBottom: "4rem",
          }}
        >
          <motion.h1
            style={{
              fontSize: "clamp(4rem, 12vw, 8rem)",
              fontWeight: 900,
              background: "linear-gradient(45deg, #ff5959, #ff7979, #ff5959)",
              backgroundSize: "200% 200%",
              backgroundClip: "text",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textAlign: "center",
              margin: 0,
              letterSpacing: "0.1em",
              textShadow: "0 0 30px rgba(255, 89, 89, 0.5)",
            }}
            animate={{
              backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
            }}
          >
            SOON
          </motion.h1>
        </motion.div>

        {/* Enhanced countdown section */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            textAlign: "center",
            marginBottom: "3rem",
          }}
        >
          <motion.h2
            style={{
              color: "#ffffff",
              fontSize: "1.2rem",
              fontWeight: 600,
              marginBottom: "1rem",
              letterSpacing: "0.15em",
            }}
            animate={{ opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            DON'T MISS THE DROP
          </motion.h2>

          <motion.div
            key={currentDate}
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 1.2, opacity: 0 }}
            style={{
              fontSize: "1.5rem",
              color: "#ff5959",
              fontWeight: 700,
              fontFamily: "monospace",
              background: "rgba(255, 89, 89, 0.1)",
              padding: "1rem 2rem",
              borderRadius: "12px",
              border: "1px solid rgba(255, 89, 89, 0.3)",
              backdropFilter: "blur(10px)",
            }}
          >
            <ScrambleText text={currentDate} />
          </motion.div>
        </motion.div>

        {/* Enhanced form */}
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.form
              key="form"
              initial={{ y: 40, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -40, opacity: 0 }}
              transition={{ delay: 0.9, duration: 0.8 }}
              onSubmit={handleSubmit}
              style={{
                display: "flex",
                gap: "1rem",
                flexWrap: "wrap",
                justifyContent: "center",
                alignItems: "stretch",
                maxWidth: "500px",
                width: "100%",
                padding: "0 2rem",
              }}
              onMouseEnter={() => setIsHovering(true)}
              onMouseLeave={() => setIsHovering(false)}
            >
              <motion.div
                style={{ flex: "1", minWidth: "250px" }}
                whileHover={{ scale: 1.02 }}
                whileFocus={{ scale: 1.02 }}
              >
                <input
                  type="email"
                  placeholder="EMAIL ADDRESS"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%",
                    padding: "1.2rem 1.5rem",
                    background: "rgba(255, 255, 255, 0.05)",
                    border: "2px solid rgba(255, 255, 255, 0.1)",
                    borderRadius: "12px",
                    color: "#ffffff",
                    fontSize: "1rem",
                    outline: "none",
                    backdropFilter: "blur(10px)",
                    transition: "all 0.3s ease",
                  }}
                  onFocus={(e) => {
                    e.target.style.borderColor = "#ff5959";
                    e.target.style.boxShadow =
                      "0 0 20px rgba(255, 89, 89, 0.3)";
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                    e.target.style.boxShadow = "none";
                  }}
                />
              </motion.div>

              <motion.button
                type="submit"
                whileHover={{ scale: 1.05, y: -2 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                style={{
                  padding: "1.2rem 2rem",
                  background: "linear-gradient(135deg, #ff5959, #ff7979)",
                  border: "none",
                  borderRadius: "12px",
                  color: "#ffffff",
                  fontSize: "1rem",
                  fontWeight: 600,
                  letterSpacing: "0.05em",
                  cursor: "pointer",
                  boxShadow: "0 8px 25px rgba(255, 89, 89, 0.4)",
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <motion.div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(135deg, transparent, rgba(255, 255, 255, 0.2), transparent)",
                  }}
                  initial={{ x: "-100%" }}
                  animate={{ x: "100%" }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    repeatDelay: 2,
                  }}
                />
                GET ON THE LIST
              </motion.button>
            </motion.form>
          ) : (
            <motion.div
              key="success"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", duration: 0.8, bounce: 0.6 }}
              style={{
                textAlign: "center",
                color: "#ff5959",
                fontSize: "1.2rem",
                fontWeight: 600,
                background: "rgba(255, 89, 89, 0.1)",
                padding: "1.5rem 2rem",
                borderRadius: "12px",
                border: "1px solid rgba(255, 89, 89, 0.3)",
                backdropFilter: "blur(10px)",
              }}
            >
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                ✓ You're on the list!
              </motion.div>
              <div
                style={{
                  fontSize: "0.9rem",
                  marginTop: "0.5rem",
                  opacity: 0.8,
                }}
              >
                We'll notify you when it's time
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Subtle pulse animation at the bottom */}
        <motion.div
          style={{
            position: "absolute",
            bottom: "2rem",
            color: "rgba(255, 255, 255, 0.4)",
            fontSize: "0.9rem",
            textAlign: "center",
          }}
          animate={{ opacity: [0.4, 0.8, 0.4] }}
          transition={{ duration: 3, repeat: Infinity }}
        >
          Something amazing is coming...
        </motion.div>
      </div>
    </Fragment>
  );
};

export default EnhancedComingSoon;
