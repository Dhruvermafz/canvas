import { fabric } from "fabric";

export class StaticTextObject extends fabric.Textbox {
  static type = "StaticText";

  initialize(options) {
    const { text, ...textOptions } = options;
    super.initialize(text, textOptions);

    return this;
  }

  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }

  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude);
  }

  static fromObject(options, callback) {
    return callback && callback(new fabric.StaticText(options));
  }
}

fabric.StaticText = fabric.util.createClass(StaticTextObject, {
  type: StaticTextObject.type,
});
fabric.StaticText.fromObject = StaticTextObject.fromObject;

export const StaticTextOptions = fabric.ITextboxOptions;

// Extend fabric namespace to include StaticText class
fabric.StaticText = fabric.StaticTextObject;
