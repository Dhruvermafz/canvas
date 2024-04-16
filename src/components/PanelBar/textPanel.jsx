import React, { Component } from "react";
import { fabric } from "fabric";
import { connect } from "react-redux";
import { setCanvasBackgroundImage, setCanvas } from "../../Actions/editor";
import Button from "@mui/material/Button";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";

class TextPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      canvas: null,
      backgroundColor: "#FDEFEF",
      fontSize: 24,
      href: "",
      color: "#000000",
      canvasScale: 1,
      backgroundImage: "",
    };
  }

  addText = () => {
    const { canvas } = this.props.editorState;
    canvas.add(
      new fabric.IText("Tap and Type", {
        fontFamily: "arial",
        fill: this.state.color,
        fontSize: 29,
        padding: 5,
        left: 0,
        right: 0,
      })
    );
  };

  textColorChange = (e) => {
    const { canvas } = this.props.editorState;
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("fill", e.target.value);
      canvas.renderAll();
    }
    this.setState({ color: e.target.value });
    this.props.setCanvas({ canvas });
  };

  textBgColorChange = (e) => {
    const { canvas } = this.props.editorState;
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("backgroundColor", e.target.value);
      canvas.renderAll();
    }
    this.props.setCanvas({ canvas });
  };

  toggleFontStyle = (style) => (e) => {
    const { canvas } = this.props.editorState;
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set(style, e.target.checked);
      canvas.renderAll();
    }
    this.props.setCanvas({ canvas });
  };

  onFontSize = (e, fontSize) => {
    const { canvas } = this.props.editorState;
    if (canvas.getActiveObject()) {
      canvas.getActiveObject().set("fontSize", fontSize);
      canvas.renderAll();
    }
    this.setState({ fontSize });
  };

  render() {
    return (
      <React.Fragment>
        <Button onClick={this.addText}>Add Text</Button>
        <div>
          <Typography>Text Color</Typography>
          <input
            type="color"
            value={this.state.color}
            size="10"
            onChange={(e) => this.textColorChange(e)}
          />
          <Typography>Background Color</Typography>
          <input
            type="color"
            value=""
            size="10"
            onChange={(e) => this.textBgColorChange(e)}
          />
          <div>
            <Checkbox
              checked={
                !!this.props.editorState.canvas.getActiveObject()?.fontWeight
              }
              onChange={this.toggleFontStyle("fontWeight")}
            />
            Bold
            <Checkbox
              checked={
                !!this.props.editorState.canvas.getActiveObject()?.fontStyle
              }
              onChange={this.toggleFontStyle("fontStyle")}
            />
            Italic
            <Checkbox
              checked={
                !!this.props.editorState.canvas.getActiveObject()?.underline
              }
              onChange={this.toggleFontStyle("underline")}
            />
            Underline
            <Checkbox
              checked={
                !!this.props.editorState.canvas.getActiveObject()?.linethrough
              }
              onChange={this.toggleFontStyle("linethrough")}
            />
            Linethrough
            <Checkbox
              checked={
                !!this.props.editorState.canvas.getActiveObject()?.overline
              }
              onChange={this.toggleFontStyle("overline")}
            />
            Overline
          </div>
          <div>
            <Typography variant="body2">Font Size</Typography>
            <Slider
              min={1}
              max={120}
              value={this.state.fontSize}
              onChange={this.onFontSize}
            />
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    editorState: state.editor,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setCanvasBackgroundImage: (data) => {
      return dispatch(setCanvasBackgroundImage(data));
    },
    setCanvas: (data) => {
      return dispatch(setCanvas(data));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TextPanel);
