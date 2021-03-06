export default {
  DraggableColorBox: {
    width: "20%",
    margin: "0",
    display: "inline-block",
    position: "relative",
    cursor: "pointer",
    marginBottom: "-3.5px",
    height: "25%",

    "&:hover svg": {
      color: "white",
      transform: "scale(1.4)"
    }
  },
  boxContent: {
    position: "absolute",
    width: "100%",
    left: "0px",
    bottom: "0px",
    padding: "10px",
    letterSpacing: "1px",
    textTransform: "uppercase",
    fontSize: "12px",
    display: "flex",
    justifyContent: "space-between"
  },

  deleteIcon: {
    color: "black",
    transition: "all 0.3s ease-in-out"
  }
}
