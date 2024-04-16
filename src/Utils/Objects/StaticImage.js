import { fabric } from "fabric";

export class StaticImageObject extends fabric.Image {
  static type = "StaticImage";
  subtype = "image";

  initialize(element, options) {
    this.subtype = options.subtype;
    super.initialize(element, options);
    return this;
  }

  static fromObject(options, callback) {
    fabric.util.loadImage(
      options.src,
      function (img) {
        return callback && callback(new fabric.StaticImage(img, options));
      },
      null,
      { crossOrigin: "anonymous" }
    );
  }

  toObject(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude, {
      subtype: this.subtype,
    });
  }

  toJSON(propertiesToInclude = []) {
    return super.toObject(propertiesToInclude, {
      subtype: this.subtype,
    });
  }
}

fabric.StaticImage = fabric.util.createClass(StaticImageObject, {
  type: StaticImageObject.type,
});
fabric.StaticImage.fromObject = StaticImageObject.fromObject;

// Extend fabric namespace to include StaticImage class
fabric.StaticImage = fabric.StaticImageObject;
