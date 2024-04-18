import React from "react";
import {
  Button,
  Checkbox,
  FormControlLabel,
  Typography,
  IconButton,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import Add from "@mui/icons-material/Add";
import Remove from "@mui/icons-material/Remove";
import { TwitterPicker } from "react-color";

const Tools = ({
  addText,
  onBold,
  onItalic,
  onUnderline,
  onLinethrough,
  onOverline,
  onFontSize,
  addBackground,
  removeBackground,
  addTemplate,
  zoomToPercent,
  zoomIn,
  zoomOut,
  onImageChange,
  backgroundColor,
  onColorChange,
  fontSize,
  canvasScale,
}) => {
  let options = [];
  for (let i = 1; i < 17; i++) {
    options.push(
      <MenuItem key={i} value={i * 25}>
        {i * 25}%
      </MenuItem>
    );
  }

  return (
    <div>
      <Button onClick={addText} startIcon={<Add />}>
        Add Text
      </Button>
      <div>
        <FormControlLabel
          control={<Checkbox />}
          label="Bold"
          onChange={onBold}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Italic"
          onChange={onItalic}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Underline"
          onChange={onUnderline}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Linethrough"
          onChange={onLinethrough}
        />
        <FormControlLabel
          control={<Checkbox />}
          label="Overline"
          onChange={onOverline}
        />
      </div>
      <div>
        <InputLabel htmlFor="font-size-slider">Font Size</InputLabel>
        <Slider
          id="font-size-slider"
          value={fontSize}
          min={1}
          max={120}
          step={1}
          onChange={onFontSize}
        />
      </div>
      <Button
        onClick={() =>
          addBackground(
            "https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg"
          )
        }
      >
        Add Background Image
      </Button>
      <Button onClick={removeBackground}>Remove Background</Button>
      <div>
        <Button onClick={addTemplate}>Add Template</Button>
      </div>
      <div>
        <Typography>Zoom</Typography>
        <IconButton onClick={zoomOut}>
          <Remove />
        </IconButton>
        <Select
          className="zoom"
          onChange={zoomToPercent}
          value={canvasScale * 100}
        >
          {options}
          <MenuItem value={100}>FIT</MenuItem>
          <MenuItem value={200}>FILL</MenuItem>
        </Select>
        <IconButton onClick={zoomIn}>
          <Add />
        </IconButton>
      </div>
      <div>
        <input
          type="file"
          id="img"
          name="img"
          accept="image/*"
          onChange={onImageChange}
        />
      </div>
      <TwitterPicker color={backgroundColor} onChange={onColorChange} />
    </div>
  );
};

export default Tools;
