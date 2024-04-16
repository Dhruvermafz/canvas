import React, { useState, useEffect, useRef } from "react";
// Import your Tailwind CSS or any other CSS file here

const CanvasEditor = () => {
  const [captionText, setCaptionText] = useState("");
  const [ctaText, setCtaText] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#0369A1"); // Default background color
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");

    // Your canvas logic class instance
    const canvasLogic = new CanvasLogic(canvas, ctx);
    canvasLogic.renderTemplate(); // Initial rendering

    // Event listeners for updating canvas on text and color changes
    canvasLogic.updateCaption(captionText);
    canvasLogic.updateCta(ctaText);
    canvasLogic.updateBackgroundColor(backgroundColor);

    return () => {
      // Clean up event listeners if necessary
    };
  }, [captionText, ctaText, backgroundColor]);

  const handleCaptionChange = (e) => {
    setCaptionText(e.target.value);
  };

  const handleCtaChange = (e) => {
    setCtaText(e.target.value);
  };

  const handleBackgroundColorChange = (color) => {
    setBackgroundColor(color.hex);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <canvas
        ref={canvasRef}
        width={1080}
        height={1080}
        style={{ width: "400px", height: "400px", border: "1px solid #000" }}
      />
      <div className="mt-4">
        <label className="block mb-2">Caption:</label>
        <input
          type="text"
          value={captionText}
          onChange={handleCaptionChange}
          className="mb-2"
        />
        <label className="block mb-2">CTA:</label>
        <input
          type="text"
          value={ctaText}
          onChange={handleCtaChange}
          className="mb-2"
        />
        <label className="block mb-2">Background Color:</label>
        <input
          type="color"
          value={backgroundColor}
          onChange={(e) => handleBackgroundColorChange(e.target.value)}
          className="mb-2"
        />
      </div>
    </div>
  );
};

class CanvasLogic {
  constructor(canvas, ctx) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.templateData = JSON.parse(
      '{"caption":{"text":"1 & 2 BHK Luxury Apartments at just Rs.34.97 Lakhs","position":{"x":50,"y":50},"max_characters_per_line":31,"font_size":44,"alignment":"left","text_color":"#FFFFFF"},"cta":{"text":"Shop Now","position":{"x":190,"y":320},"text_color":"#FFFFFF","background_color":"#000000"},"image_mask":{"x":56,"y":442,"width":970,"height":600},"urls":{"mask":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_mask.png","stroke":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Mask_stroke.png","design_pattern":"https://d273i1jagfl543.cloudfront.net/templates/global_temp_landscape_temp_10_Design_Pattern.png"}}'
    );
  }

  renderTemplate() {
    // Render background color
    this.ctx.fillStyle = this.templateData.urls.background_color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

    // Render design pattern
    const designPatternImg = new Image();
    designPatternImg.onload = () => {
      this.ctx.drawImage(
        designPatternImg,
        0,
        0,
        this.canvas.width,
        this.canvas.height
      );
    };
    designPatternImg.src = this.templateData.urls.design_pattern;

    // Render mask stroke
    const maskStrokeImg = new Image();
    maskStrokeImg.onload = () => {
      this.ctx.drawImage(
        maskStrokeImg,
        this.templateData.image_mask.x,
        this.templateData.image_mask.y,
        this.templateData.image_mask.width,
        this.templateData.image_mask.height
      );
    };
    maskStrokeImg.src = this.templateData.urls.stroke;

    // Update text and CTA
    this.updateCaption(this.templateData.caption.text);
    this.updateCta(this.templateData.cta.text);
  }

  updateCaption(text) {
    // Clear previous text
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set text properties
    this.ctx.font = `${this.templateData.caption.font_size}px Arial`;
    this.ctx.fillStyle = this.templateData.caption.text_color;
    this.ctx.textAlign = this.templateData.caption.alignment;

    // Split text into lines
    const maxCharactersPerLine =
      this.templateData.caption.max_characters_per_line;
    let lines = [];
    let line = "";
    const words = text.split(" ");
    for (const word of words) {
      if ((line + word).length <= maxCharactersPerLine) {
        line += (line === "" ? "" : " ") + word;
      } else {
        lines.push(line);
        line = word;
      }
    }
    lines.push(line);

    // Render text
    const lineHeight = this.templateData.caption.font_size + 10; // Adjust line height as needed
    const startY = this.templateData.caption.position.y;
    for (let i = 0; i < lines.length; i++) {
      const y = startY + i * lineHeight;
      this.ctx.fillText(lines[i], this.templateData.caption.position.x, y);
    }
  }

  updateCta(text) {
    // Render CTA background
    this.ctx.fillStyle = this.templateData.cta.background_color;
    this.ctx.fillRect(
      this.templateData.cta.position.x,
      this.templateData.cta.position.y,
      200,
      50
    ); // Adjust dimensions as needed

    // Set text properties
    this.ctx.font = `${this.templateData.cta.font_size || 30}px Arial`;
    this.ctx.fillStyle = this.templateData.cta.text_color;
    this.ctx.textAlign = "center"; // Center align CTA text
    this.ctx.textBaseline = "middle"; // Center vertically
    const x = this.templateData.cta.position.x + 100; // Center horizontally
    const y = this.templateData.cta.position.y + 25; // Center vertically

    // Render CTA text
    this.ctx.fillText(text, x, y);
  }

  updateBackgroundColor(color) {
    // Clear canvas and fill with new background color
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fillStyle = color;
    this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
  }
}

export default CanvasEditor;
