
import chroma from 'chroma-js';

const luminanceTest = (area, light, test) => {
    const lightTest = chroma(area).luminance()
    let outcome;
    if (test === 'less') {
      if(lightTest <= light) {
        outcome = 'white'
      } else {
        outcome = 'black'
      }
    } else {
      if(lightTest >= light) {
        outcome = 'black'
      } else {
        outcome = 'white'
      }
    }
    return outcome
}

export default {
  ColorBox: {
    width: "20%",
    margin: "0",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    height: props => props.tall ? "50%" : "25%",

    "&:hover button": {
      opacity: "1",
      transition: "0.5s"
    }
  },

  copyButton: {
    width: "100px",
    height: "30px",
    position: "absolute",
    display: "inline-block",
    top: "50%",
    left: "50%",
    marginLeft: "-50px",
    marginTop: "-15px",
    textAlign: "center",
    outline: "none",
    background: "rgba(255, 255, 255, 0.3)",
    fontSize: "1rem",
    lineHeight: "30px",
    color: props => luminanceTest(props.background, 0.4, 'greater'),
    textTransform: "uppercase",
    border: "none",
    opacity: "0"
  },

  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px"
  },

  seeMore: {
    background: "rgba(255, 255, 255, 0.3)",
    position: "absolute",
    border: "none",
    right: "0px",
    bottom: "0px",
    width: "60px",
    height: "30px",
    textAlign: "center",
    lineHeight: "30px",
    textTransform: "uppercase",
    color: props => luminanceTest(props.background, 0.4, 'greater')
  },

  copyOverlay: {
    opacity: "0",
    zIndex: "0",
    width: "100%",
    height: "100%",
    transition: "transform 0.55s ease-in-out",
    transform: "scale(0.1)"
  },

  showOverlay: {
    opacity: '1',
    transform: "scale(50)",
    zIndex: "10",
    position: "absolute"
  },

  copyMsg: {
    position: "fixed",
    left: "0",
    right: "0",
    top: "0",
    bottom: "0",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "4rem",
    transform: "scale(0.1)",
    opacity: "0",
    zIndex: "0"
  },

  showMsg: {
    opacity: "1",
    transform: "scale(1)",
    zIndex: "11",
    transition: "all 0.4s ease-in-out",
    transitionDelay: "0.1s"
  },

  copyText: {
    color: props => luminanceTest(props.background, 0.4, 'greater')
  },

  colorName: {
    color: props => luminanceTest(props.background, 0.4, 'less'),
    fontWeight: "400",
    textShadow: "1px 2px black",
    background: "rgba(255, 255, 255, 0.2)",
    width: "100%",
    textAlign: "center",
    marginBottom: "0",
    padding: "1rem",
    textTransform: "uppercase"
  },

  colorPar: {
    fontSize: "2rem",
    fontWeight: "100",
    color: props => luminanceTest(props.background, 0.4, 'less')
  }
}
