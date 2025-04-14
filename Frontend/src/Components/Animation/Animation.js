export const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 1.2, ease: "easeInOut" } }
  };
  
  export const slideIn = {
    hidden: { x: -50, opacity: 0 },
    visible: { x: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } }
  };
  
  export const scaleUp = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { duration: 1, ease: "easeInOut" } }
  };
  
  export const rotateIn = {
    hidden: { rotate: -10, opacity: 0 },
    visible: { rotate: 0, opacity: 1, transition: { duration: 1, ease: "easeOut" } }
  };
  