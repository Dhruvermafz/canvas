import { fabric } from "fabric";

class SvgObject extends fabric.Group {
  static type = "StaticVector";
  src = '';

  initialize(objects, options, others) {
    this.src = others.src;
    const object = fabric.util.groupSVGElements(objects, options);
    super.initialize([object], others);
    return this;
  }

  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude, {
      src: this.src
    });
  }

  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude, {
      src: this.src
    });
  }
}

fabric.Svg = fabric.util.createClass(SvgObject, {
  type: SvgObject.type
});

// Extend fabric namespace to include Svg class
fabric.Svg = SvgObject;

export default SvgObject;
