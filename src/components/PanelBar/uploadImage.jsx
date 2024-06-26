import React, { Component } from "react";
import { fabric } from "fabric";
import { connect } from "react-redux";
import { setCanvasBackgroundImage, setCanvas } from "../../Actions/editor";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";

class UploadImage extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  onImageChange = (e) => {
    const { canvas } = this.props.editorState;
    var url = URL.createObjectURL(e.target.files[0]);
    fabric.Image.fromURL(
      url,
      (img) => {
        canvas.add(img);
        canvas.renderAll();
      },
      { scaleX: 0.15, scaleY: 0.15 }
    );
    console.log(canvas.getObjects());
  };

  render() {
    return (
      <div>
        <Typography variant="body1">Upload image</Typography>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={this.onImageChange}
          style={{ display: "none" }} // Hide the default input style
        />
        <label htmlFor="img">
          <Button variant="contained" component="span">
            Choose Image
          </Button>
        </label>
      </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(UploadImage);
