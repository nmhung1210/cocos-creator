
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/particle/CCTIFFReader.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/****************************************************************************
 Copyright (c) 2011 Gordon P. Hemsley
 http://gphemsley.org/

 Copyright (c) 2008-2010 Ricardo Quesada
 Copyright (c) 2011-2012 cocos2d-x.org
 Copyright (c) 2013-2016 Chukong Technologies Inc.
 Copyright (c) 2017-2018 Xiamen Yaji Software Co., Ltd.

 https://www.cocos.com/

 Permission is hereby granted, free of charge, to any person obtaining a copy
 of this software and associated engine source code (the "Software"), a limited,
 worldwide, royalty-free, non-assignable, revocable and non-exclusive license
 to use Cocos Creator solely to develop games on your target platforms. You shall
 not use Cocos Creator software for developing other software or tools that's
 used for developing games. You are not granted to publish, distribute,
 sublicense, and/or sell copies of Cocos Creator.

 The software or tools in this License Agreement are licensed, not sold.
 Xiamen Yaji Software Co., Ltd. reserves all rights not expressly granted to you.

 THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 THE SOFTWARE.
 ****************************************************************************/
var debug = require('../core/CCDebug');
/**
 * cc.tiffReader is a singleton object, it's a tiff file reader, it can parse byte array to draw into a canvas
 * @class
 * @name tiffReader
 */


var tiffReader =
/** @lends tiffReader# */
{
  _littleEndian: false,
  _tiffData: null,
  _fileDirectories: [],
  getUint8: function getUint8(offset) {
    return this._tiffData[offset];
  },
  getUint16: function getUint16(offset) {
    if (this._littleEndian) return this._tiffData[offset + 1] << 8 | this._tiffData[offset];else return this._tiffData[offset] << 8 | this._tiffData[offset + 1];
  },
  getUint32: function getUint32(offset) {
    var a = this._tiffData;
    if (this._littleEndian) return a[offset + 3] << 24 | a[offset + 2] << 16 | a[offset + 1] << 8 | a[offset];else return a[offset] << 24 | a[offset + 1] << 16 | a[offset + 2] << 8 | a[offset + 3];
  },
  checkLittleEndian: function checkLittleEndian() {
    var BOM = this.getUint16(0);

    if (BOM === 0x4949) {
      this.littleEndian = true;
    } else if (BOM === 0x4D4D) {
      this.littleEndian = false;
    } else {
      console.log(BOM);
      throw TypeError(debug.getError(6019));
    }

    return this.littleEndian;
  },
  hasTowel: function hasTowel() {
    // Check for towel.
    if (this.getUint16(2) !== 42) {
      throw RangeError(debug.getError(6020));
      return false;
    }

    return true;
  },
  getFieldTypeName: function getFieldTypeName(fieldType) {
    var typeNames = this.fieldTypeNames;

    if (fieldType in typeNames) {
      return typeNames[fieldType];
    }

    return null;
  },
  getFieldTagName: function getFieldTagName(fieldTag) {
    var tagNames = this.fieldTagNames;

    if (fieldTag in tagNames) {
      return tagNames[fieldTag];
    } else {
      cc.logID(6021, fieldTag);
      return "Tag" + fieldTag;
    }
  },
  getFieldTypeLength: function getFieldTypeLength(fieldTypeName) {
    if (['BYTE', 'ASCII', 'SBYTE', 'UNDEFINED'].indexOf(fieldTypeName) !== -1) {
      return 1;
    } else if (['SHORT', 'SSHORT'].indexOf(fieldTypeName) !== -1) {
      return 2;
    } else if (['LONG', 'SLONG', 'FLOAT'].indexOf(fieldTypeName) !== -1) {
      return 4;
    } else if (['RATIONAL', 'SRATIONAL', 'DOUBLE'].indexOf(fieldTypeName) !== -1) {
      return 8;
    }

    return null;
  },
  getFieldValues: function getFieldValues(fieldTagName, fieldTypeName, typeCount, valueOffset) {
    var fieldValues = [];
    var fieldTypeLength = this.getFieldTypeLength(fieldTypeName);
    var fieldValueSize = fieldTypeLength * typeCount;

    if (fieldValueSize <= 4) {
      // The value is stored at the big end of the valueOffset.
      if (this.littleEndian === false) fieldValues.push(valueOffset >>> (4 - fieldTypeLength) * 8);else fieldValues.push(valueOffset);
    } else {
      for (var i = 0; i < typeCount; i++) {
        var indexOffset = fieldTypeLength * i;

        if (fieldTypeLength >= 8) {
          if (['RATIONAL', 'SRATIONAL'].indexOf(fieldTypeName) !== -1) {
            // Numerator
            fieldValues.push(this.getUint32(valueOffset + indexOffset)); // Denominator

            fieldValues.push(this.getUint32(valueOffset + indexOffset + 4));
          } else {
            cc.logID(8000);
          }
        } else {
          fieldValues.push(this.getBytes(fieldTypeLength, valueOffset + indexOffset));
        }
      }
    }

    if (fieldTypeName === 'ASCII') {
      fieldValues.forEach(function (e, i, a) {
        a[i] = String.fromCharCode(e);
      });
    }

    return fieldValues;
  },
  getBytes: function getBytes(numBytes, offset) {
    if (numBytes <= 0) {
      cc.logID(8001);
    } else if (numBytes <= 1) {
      return this.getUint8(offset);
    } else if (numBytes <= 2) {
      return this.getUint16(offset);
    } else if (numBytes <= 3) {
      return this.getUint32(offset) >>> 8;
    } else if (numBytes <= 4) {
      return this.getUint32(offset);
    } else {
      cc.logID(8002);
    }
  },
  getBits: function getBits(numBits, byteOffset, bitOffset) {
    bitOffset = bitOffset || 0;
    var extraBytes = Math.floor(bitOffset / 8);
    var newByteOffset = byteOffset + extraBytes;
    var totalBits = bitOffset + numBits;
    var shiftRight = 32 - numBits;
    var shiftLeft, rawBits;

    if (totalBits <= 0) {
      cc.logID(6023);
    } else if (totalBits <= 8) {
      shiftLeft = 24 + bitOffset;
      rawBits = this.getUint8(newByteOffset);
    } else if (totalBits <= 16) {
      shiftLeft = 16 + bitOffset;
      rawBits = this.getUint16(newByteOffset);
    } else if (totalBits <= 32) {
      shiftLeft = bitOffset;
      rawBits = this.getUint32(newByteOffset);
    } else {
      cc.logID(6022);
    }

    return {
      'bits': rawBits << shiftLeft >>> shiftRight,
      'byteOffset': newByteOffset + Math.floor(totalBits / 8),
      'bitOffset': totalBits % 8
    };
  },
  parseFileDirectory: function parseFileDirectory(byteOffset) {
    var numDirEntries = this.getUint16(byteOffset);
    var tiffFields = [];

    for (var i = byteOffset + 2, entryCount = 0; entryCount < numDirEntries; i += 12, entryCount++) {
      var fieldTag = this.getUint16(i);
      var fieldType = this.getUint16(i + 2);
      var typeCount = this.getUint32(i + 4);
      var valueOffset = this.getUint32(i + 8);
      var fieldTagName = this.getFieldTagName(fieldTag);
      var fieldTypeName = this.getFieldTypeName(fieldType);
      var fieldValues = this.getFieldValues(fieldTagName, fieldTypeName, typeCount, valueOffset);
      tiffFields[fieldTagName] = {
        type: fieldTypeName,
        values: fieldValues
      };
    }

    this._fileDirectories.push(tiffFields);

    var nextIFDByteOffset = this.getUint32(i);

    if (nextIFDByteOffset !== 0x00000000) {
      this.parseFileDirectory(nextIFDByteOffset);
    }
  },
  clampColorSample: function clampColorSample(colorSample, bitsPerSample) {
    var multiplier = Math.pow(2, 8 - bitsPerSample);
    return Math.floor(colorSample * multiplier + (multiplier - 1));
  },

  /**
   * @function
   * @param {Array} tiffData
   * @param {HTMLCanvasElement} canvas
   * @returns {*}
   */
  parseTIFF: function parseTIFF(tiffData, canvas) {
    canvas = canvas || document.createElement('canvas');
    this._tiffData = tiffData;
    this.canvas = canvas;
    this.checkLittleEndian();

    if (!this.hasTowel()) {
      return;
    }

    var firstIFDByteOffset = this.getUint32(4);
    this._fileDirectories.length = 0;
    this.parseFileDirectory(firstIFDByteOffset);
    var fileDirectory = this._fileDirectories[0];
    var imageWidth = fileDirectory['ImageWidth'].values[0];
    var imageLength = fileDirectory['ImageLength'].values[0];
    this.canvas.width = imageWidth;
    this.canvas.height = imageLength;
    var strips = [];
    var compression = fileDirectory['Compression'] ? fileDirectory['Compression'].values[0] : 1;
    var samplesPerPixel = fileDirectory['SamplesPerPixel'].values[0];
    var sampleProperties = [];
    var bitsPerPixel = 0;
    var hasBytesPerPixel = false;
    fileDirectory['BitsPerSample'].values.forEach(function (bitsPerSample, i, bitsPerSampleValues) {
      sampleProperties[i] = {
        bitsPerSample: bitsPerSample,
        hasBytesPerSample: false,
        bytesPerSample: undefined
      };

      if (bitsPerSample % 8 === 0) {
        sampleProperties[i].hasBytesPerSample = true;
        sampleProperties[i].bytesPerSample = bitsPerSample / 8;
      }

      bitsPerPixel += bitsPerSample;
    }, this);

    if (bitsPerPixel % 8 === 0) {
      hasBytesPerPixel = true;
      var bytesPerPixel = bitsPerPixel / 8;
    }

    var stripOffsetValues = fileDirectory['StripOffsets'].values;
    var numStripOffsetValues = stripOffsetValues.length; // StripByteCounts is supposed to be required, but see if we can recover anyway.

    if (fileDirectory['StripByteCounts']) {
      var stripByteCountValues = fileDirectory['StripByteCounts'].values;
    } else {
      cc.logID(8003); // Infer StripByteCounts, if possible.

      if (numStripOffsetValues === 1) {
        var stripByteCountValues = [Math.ceil(imageWidth * imageLength * bitsPerPixel / 8)];
      } else {
        throw Error(debug.getError(6024));
      }
    } // Loop through strips and decompress as necessary.


    for (var i = 0; i < numStripOffsetValues; i++) {
      var stripOffset = stripOffsetValues[i];
      strips[i] = [];
      var stripByteCount = stripByteCountValues[i]; // Loop through pixels.

      for (var byteOffset = 0, bitOffset = 0, jIncrement = 1, getHeader = true, pixel = [], numBytes = 0, sample = 0, currentSample = 0; byteOffset < stripByteCount; byteOffset += jIncrement) {
        // Decompress strip.
        switch (compression) {
          // Uncompressed
          case 1:
            // Loop through samples (sub-pixels).
            for (var m = 0, pixel = []; m < samplesPerPixel; m++) {
              if (sampleProperties[m].hasBytesPerSample) {
                // XXX: This is wrong!
                var sampleOffset = sampleProperties[m].bytesPerSample * m;
                pixel.push(this.getBytes(sampleProperties[m].bytesPerSample, stripOffset + byteOffset + sampleOffset));
              } else {
                var sampleInfo = this.getBits(sampleProperties[m].bitsPerSample, stripOffset + byteOffset, bitOffset);
                pixel.push(sampleInfo.bits);
                byteOffset = sampleInfo.byteOffset - stripOffset;
                bitOffset = sampleInfo.bitOffset;
                throw RangeError(debug.getError(6025));
              }
            }

            strips[i].push(pixel);

            if (hasBytesPerPixel) {
              jIncrement = bytesPerPixel;
            } else {
              jIncrement = 0;
              throw RangeError(debug.getError(6026));
            }

            break;
          // CITT Group 3 1-Dimensional Modified Huffman run-length encoding

          case 2:
            // XXX: Use PDF.js code?
            break;
          // Group 3 Fax

          case 3:
            // XXX: Use PDF.js code?
            break;
          // Group 4 Fax

          case 4:
            // XXX: Use PDF.js code?
            break;
          // LZW

          case 5:
            // XXX: Use PDF.js code?
            break;
          // Old-style JPEG (TIFF 6.0)

          case 6:
            // XXX: Use PDF.js code?
            break;
          // New-style JPEG (TIFF Specification Supplement 2)

          case 7:
            // XXX: Use PDF.js code?
            break;
          // PackBits

          case 32773:
            // Are we ready for a new block?
            if (getHeader) {
              getHeader = false;
              var blockLength = 1;
              var iterations = 1; // The header byte is signed.

              var header = this.getInt8(stripOffset + byteOffset);

              if (header >= 0 && header <= 127) {
                // Normal pixels.
                blockLength = header + 1;
              } else if (header >= -127 && header <= -1) {
                // Collapsed pixels.
                iterations = -header + 1;
              } else
                /*if (header === -128)*/
                {
                  // Placeholder byte?
                  getHeader = true;
                }
            } else {
              var currentByte = this.getUint8(stripOffset + byteOffset); // Duplicate bytes, if necessary.

              for (var m = 0; m < iterations; m++) {
                if (sampleProperties[sample].hasBytesPerSample) {
                  // We're reading one byte at a time, so we need to handle multi-byte samples.
                  currentSample = currentSample << 8 * numBytes | currentByte;
                  numBytes++; // Is our sample complete?

                  if (numBytes === sampleProperties[sample].bytesPerSample) {
                    pixel.push(currentSample);
                    currentSample = numBytes = 0;
                    sample++;
                  }
                } else {
                  throw RangeError(debug.getError(6025));
                } // Is our pixel complete?


                if (sample === samplesPerPixel) {
                  strips[i].push(pixel);
                  pixel = [];
                  sample = 0;
                }
              }

              blockLength--; // Is our block complete?

              if (blockLength === 0) {
                getHeader = true;
              }
            }

            jIncrement = 1;
            break;
          // Unknown compression algorithm

          default:
            // Do not attempt to parse the image data.
            break;
        }
      }
    }

    if (canvas.getContext) {
      var ctx = this.canvas.getContext("2d"); // Set a default fill style.

      ctx.fillStyle = "rgba(255, 255, 255, 0)"; // If RowsPerStrip is missing, the whole image is in one strip.

      var rowsPerStrip = fileDirectory['RowsPerStrip'] ? fileDirectory['RowsPerStrip'].values[0] : imageLength;
      var numStrips = strips.length;
      var imageLengthModRowsPerStrip = imageLength % rowsPerStrip;
      var rowsInLastStrip = imageLengthModRowsPerStrip === 0 ? rowsPerStrip : imageLengthModRowsPerStrip;
      var numRowsInStrip = rowsPerStrip;
      var numRowsInPreviousStrip = 0;
      var photometricInterpretation = fileDirectory['PhotometricInterpretation'].values[0];
      var extraSamplesValues = [];
      var numExtraSamples = 0;

      if (fileDirectory['ExtraSamples']) {
        extraSamplesValues = fileDirectory['ExtraSamples'].values;
        numExtraSamples = extraSamplesValues.length;
      }

      if (fileDirectory['ColorMap']) {
        var colorMapValues = fileDirectory['ColorMap'].values;
        var colorMapSampleSize = Math.pow(2, sampleProperties[0].bitsPerSample);
      } // Loop through the strips in the image.


      for (var i = 0; i < numStrips; i++) {
        // The last strip may be short.
        if (i + 1 === numStrips) {
          numRowsInStrip = rowsInLastStrip;
        }

        var numPixels = strips[i].length;
        var yPadding = numRowsInPreviousStrip * i; // Loop through the rows in the strip.

        for (var y = 0, j = 0; y < numRowsInStrip, j < numPixels; y++) {
          // Loop through the pixels in the row.
          for (var x = 0; x < imageWidth; x++, j++) {
            var pixelSamples = strips[i][j];
            var red = 0;
            var green = 0;
            var blue = 0;
            var opacity = 1.0;

            if (numExtraSamples > 0) {
              for (var k = 0; k < numExtraSamples; k++) {
                if (extraSamplesValues[k] === 1 || extraSamplesValues[k] === 2) {
                  // Clamp opacity to the range [0,1].
                  opacity = pixelSamples[3 + k] / 256;
                  break;
                }
              }
            }

            switch (photometricInterpretation) {
              // Bilevel or Grayscale
              // WhiteIsZero
              case 0:
                if (sampleProperties[0].hasBytesPerSample) {
                  var invertValue = Math.pow(0x10, sampleProperties[0].bytesPerSample * 2);
                } // Invert samples.


                pixelSamples.forEach(function (sample, index, samples) {
                  samples[index] = invertValue - sample;
                });
              // Bilevel or Grayscale
              // BlackIsZero

              case 1:
                red = green = blue = this.clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
                break;
              // RGB Full Color

              case 2:
                red = this.clampColorSample(pixelSamples[0], sampleProperties[0].bitsPerSample);
                green = this.clampColorSample(pixelSamples[1], sampleProperties[1].bitsPerSample);
                blue = this.clampColorSample(pixelSamples[2], sampleProperties[2].bitsPerSample);
                break;
              // RGB Color Palette

              case 3:
                if (colorMapValues === undefined) {
                  throw Error(debug.getError(6027));
                }

                var colorMapIndex = pixelSamples[0];
                red = this.clampColorSample(colorMapValues[colorMapIndex], 16);
                green = this.clampColorSample(colorMapValues[colorMapSampleSize + colorMapIndex], 16);
                blue = this.clampColorSample(colorMapValues[2 * colorMapSampleSize + colorMapIndex], 16);
                break;
              // Unknown Photometric Interpretation

              default:
                throw RangeError(debug.getError(6028, photometricInterpretation));
                break;
            }

            ctx.fillStyle = "rgba(" + red + ", " + green + ", " + blue + ", " + opacity + ")";
            ctx.fillRect(x, yPadding + y, 1, 1);
          }
        }

        numRowsInPreviousStrip = numRowsInStrip;
      }
    }

    return this.canvas;
  },
  // See: http://www.digitizationguidelines.gov/guidelines/TIFF_Metadata_Final.pdf
  // See: http://www.digitalpreservation.gov/formats/content/tiff_tags.shtml
  fieldTagNames: {
    // TIFF Baseline
    0x013B: 'Artist',
    0x0102: 'BitsPerSample',
    0x0109: 'CellLength',
    0x0108: 'CellWidth',
    0x0140: 'ColorMap',
    0x0103: 'Compression',
    0x8298: 'Copyright',
    0x0132: 'DateTime',
    0x0152: 'ExtraSamples',
    0x010A: 'FillOrder',
    0x0121: 'FreeByteCounts',
    0x0120: 'FreeOffsets',
    0x0123: 'GrayResponseCurve',
    0x0122: 'GrayResponseUnit',
    0x013C: 'HostComputer',
    0x010E: 'ImageDescription',
    0x0101: 'ImageLength',
    0x0100: 'ImageWidth',
    0x010F: 'Make',
    0x0119: 'MaxSampleValue',
    0x0118: 'MinSampleValue',
    0x0110: 'Model',
    0x00FE: 'NewSubfileType',
    0x0112: 'Orientation',
    0x0106: 'PhotometricInterpretation',
    0x011C: 'PlanarConfiguration',
    0x0128: 'ResolutionUnit',
    0x0116: 'RowsPerStrip',
    0x0115: 'SamplesPerPixel',
    0x0131: 'Software',
    0x0117: 'StripByteCounts',
    0x0111: 'StripOffsets',
    0x00FF: 'SubfileType',
    0x0107: 'Threshholding',
    0x011A: 'XResolution',
    0x011B: 'YResolution',
    // TIFF Extended
    0x0146: 'BadFaxLines',
    0x0147: 'CleanFaxData',
    0x0157: 'ClipPath',
    0x0148: 'ConsecutiveBadFaxLines',
    0x01B1: 'Decode',
    0x01B2: 'DefaultImageColor',
    0x010D: 'DocumentName',
    0x0150: 'DotRange',
    0x0141: 'HalftoneHints',
    0x015A: 'Indexed',
    0x015B: 'JPEGTables',
    0x011D: 'PageName',
    0x0129: 'PageNumber',
    0x013D: 'Predictor',
    0x013F: 'PrimaryChromaticities',
    0x0214: 'ReferenceBlackWhite',
    0x0153: 'SampleFormat',
    0x022F: 'StripRowCounts',
    0x014A: 'SubIFDs',
    0x0124: 'T4Options',
    0x0125: 'T6Options',
    0x0145: 'TileByteCounts',
    0x0143: 'TileLength',
    0x0144: 'TileOffsets',
    0x0142: 'TileWidth',
    0x012D: 'TransferFunction',
    0x013E: 'WhitePoint',
    0x0158: 'XClipPathUnits',
    0x011E: 'XPosition',
    0x0211: 'YCbCrCoefficients',
    0x0213: 'YCbCrPositioning',
    0x0212: 'YCbCrSubSampling',
    0x0159: 'YClipPathUnits',
    0x011F: 'YPosition',
    // EXIF
    0x9202: 'ApertureValue',
    0xA001: 'ColorSpace',
    0x9004: 'DateTimeDigitized',
    0x9003: 'DateTimeOriginal',
    0x8769: 'Exif IFD',
    0x9000: 'ExifVersion',
    0x829A: 'ExposureTime',
    0xA300: 'FileSource',
    0x9209: 'Flash',
    0xA000: 'FlashpixVersion',
    0x829D: 'FNumber',
    0xA420: 'ImageUniqueID',
    0x9208: 'LightSource',
    0x927C: 'MakerNote',
    0x9201: 'ShutterSpeedValue',
    0x9286: 'UserComment',
    // IPTC
    0x83BB: 'IPTC',
    // ICC
    0x8773: 'ICC Profile',
    // XMP
    0x02BC: 'XMP',
    // GDAL
    0xA480: 'GDAL_METADATA',
    0xA481: 'GDAL_NODATA',
    // Photoshop
    0x8649: 'Photoshop'
  },
  fieldTypeNames: {
    0x0001: 'BYTE',
    0x0002: 'ASCII',
    0x0003: 'SHORT',
    0x0004: 'LONG',
    0x0005: 'RATIONAL',
    0x0006: 'SBYTE',
    0x0007: 'UNDEFINED',
    0x0008: 'SSHORT',
    0x0009: 'SLONG',
    0x000A: 'SRATIONAL',
    0x000B: 'FLOAT',
    0x000C: 'DOUBLE'
  }
};
module.exports = tiffReader;
                    }
                    if (nodeEnv) {
                        __define(__module.exports, __require, __module);
                    }
                    else {
                        __quick_compile_engine__.registerModuleFunc(__filename, function () {
                            __define(__module.exports, __require, __module);
                        });
                    }
                })();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9wYXJ0aWNsZS9DQ1RJRkZSZWFkZXIuanMiXSwibmFtZXMiOlsiZGVidWciLCJyZXF1aXJlIiwidGlmZlJlYWRlciIsIl9saXR0bGVFbmRpYW4iLCJfdGlmZkRhdGEiLCJfZmlsZURpcmVjdG9yaWVzIiwiZ2V0VWludDgiLCJvZmZzZXQiLCJnZXRVaW50MTYiLCJnZXRVaW50MzIiLCJhIiwiY2hlY2tMaXR0bGVFbmRpYW4iLCJCT00iLCJsaXR0bGVFbmRpYW4iLCJjb25zb2xlIiwibG9nIiwiVHlwZUVycm9yIiwiZ2V0RXJyb3IiLCJoYXNUb3dlbCIsIlJhbmdlRXJyb3IiLCJnZXRGaWVsZFR5cGVOYW1lIiwiZmllbGRUeXBlIiwidHlwZU5hbWVzIiwiZmllbGRUeXBlTmFtZXMiLCJnZXRGaWVsZFRhZ05hbWUiLCJmaWVsZFRhZyIsInRhZ05hbWVzIiwiZmllbGRUYWdOYW1lcyIsImNjIiwibG9nSUQiLCJnZXRGaWVsZFR5cGVMZW5ndGgiLCJmaWVsZFR5cGVOYW1lIiwiaW5kZXhPZiIsImdldEZpZWxkVmFsdWVzIiwiZmllbGRUYWdOYW1lIiwidHlwZUNvdW50IiwidmFsdWVPZmZzZXQiLCJmaWVsZFZhbHVlcyIsImZpZWxkVHlwZUxlbmd0aCIsImZpZWxkVmFsdWVTaXplIiwicHVzaCIsImkiLCJpbmRleE9mZnNldCIsImdldEJ5dGVzIiwiZm9yRWFjaCIsImUiLCJTdHJpbmciLCJmcm9tQ2hhckNvZGUiLCJudW1CeXRlcyIsImdldEJpdHMiLCJudW1CaXRzIiwiYnl0ZU9mZnNldCIsImJpdE9mZnNldCIsImV4dHJhQnl0ZXMiLCJNYXRoIiwiZmxvb3IiLCJuZXdCeXRlT2Zmc2V0IiwidG90YWxCaXRzIiwic2hpZnRSaWdodCIsInNoaWZ0TGVmdCIsInJhd0JpdHMiLCJwYXJzZUZpbGVEaXJlY3RvcnkiLCJudW1EaXJFbnRyaWVzIiwidGlmZkZpZWxkcyIsImVudHJ5Q291bnQiLCJ0eXBlIiwidmFsdWVzIiwibmV4dElGREJ5dGVPZmZzZXQiLCJjbGFtcENvbG9yU2FtcGxlIiwiY29sb3JTYW1wbGUiLCJiaXRzUGVyU2FtcGxlIiwibXVsdGlwbGllciIsInBvdyIsInBhcnNlVElGRiIsInRpZmZEYXRhIiwiY2FudmFzIiwiZG9jdW1lbnQiLCJjcmVhdGVFbGVtZW50IiwiZmlyc3RJRkRCeXRlT2Zmc2V0IiwibGVuZ3RoIiwiZmlsZURpcmVjdG9yeSIsImltYWdlV2lkdGgiLCJpbWFnZUxlbmd0aCIsIndpZHRoIiwiaGVpZ2h0Iiwic3RyaXBzIiwiY29tcHJlc3Npb24iLCJzYW1wbGVzUGVyUGl4ZWwiLCJzYW1wbGVQcm9wZXJ0aWVzIiwiYml0c1BlclBpeGVsIiwiaGFzQnl0ZXNQZXJQaXhlbCIsImJpdHNQZXJTYW1wbGVWYWx1ZXMiLCJoYXNCeXRlc1BlclNhbXBsZSIsImJ5dGVzUGVyU2FtcGxlIiwidW5kZWZpbmVkIiwiYnl0ZXNQZXJQaXhlbCIsInN0cmlwT2Zmc2V0VmFsdWVzIiwibnVtU3RyaXBPZmZzZXRWYWx1ZXMiLCJzdHJpcEJ5dGVDb3VudFZhbHVlcyIsImNlaWwiLCJFcnJvciIsInN0cmlwT2Zmc2V0Iiwic3RyaXBCeXRlQ291bnQiLCJqSW5jcmVtZW50IiwiZ2V0SGVhZGVyIiwicGl4ZWwiLCJzYW1wbGUiLCJjdXJyZW50U2FtcGxlIiwibSIsInNhbXBsZU9mZnNldCIsInNhbXBsZUluZm8iLCJiaXRzIiwiYmxvY2tMZW5ndGgiLCJpdGVyYXRpb25zIiwiaGVhZGVyIiwiZ2V0SW50OCIsImN1cnJlbnRCeXRlIiwiZ2V0Q29udGV4dCIsImN0eCIsImZpbGxTdHlsZSIsInJvd3NQZXJTdHJpcCIsIm51bVN0cmlwcyIsImltYWdlTGVuZ3RoTW9kUm93c1BlclN0cmlwIiwicm93c0luTGFzdFN0cmlwIiwibnVtUm93c0luU3RyaXAiLCJudW1Sb3dzSW5QcmV2aW91c1N0cmlwIiwicGhvdG9tZXRyaWNJbnRlcnByZXRhdGlvbiIsImV4dHJhU2FtcGxlc1ZhbHVlcyIsIm51bUV4dHJhU2FtcGxlcyIsImNvbG9yTWFwVmFsdWVzIiwiY29sb3JNYXBTYW1wbGVTaXplIiwibnVtUGl4ZWxzIiwieVBhZGRpbmciLCJ5IiwiaiIsIngiLCJwaXhlbFNhbXBsZXMiLCJyZWQiLCJncmVlbiIsImJsdWUiLCJvcGFjaXR5IiwiayIsImludmVydFZhbHVlIiwiaW5kZXgiLCJzYW1wbGVzIiwiY29sb3JNYXBJbmRleCIsImZpbGxSZWN0IiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUErQkEsSUFBTUEsS0FBSyxHQUFHQyxPQUFPLENBQUMsaUJBQUQsQ0FBckI7QUFFQTs7Ozs7OztBQUtBLElBQUlDLFVBQVU7QUFBRztBQUF5QjtBQUN0Q0MsRUFBQUEsYUFBYSxFQUFFLEtBRHVCO0FBRXRDQyxFQUFBQSxTQUFTLEVBQUUsSUFGMkI7QUFHdENDLEVBQUFBLGdCQUFnQixFQUFFLEVBSG9CO0FBS3RDQyxFQUFBQSxRQUFRLEVBQUUsa0JBQVVDLE1BQVYsRUFBa0I7QUFDeEIsV0FBTyxLQUFLSCxTQUFMLENBQWVHLE1BQWYsQ0FBUDtBQUNILEdBUHFDO0FBU3RDQyxFQUFBQSxTQUFTLEVBQUUsbUJBQVVELE1BQVYsRUFBa0I7QUFDekIsUUFBSSxLQUFLSixhQUFULEVBQ0ksT0FBUSxLQUFLQyxTQUFMLENBQWVHLE1BQU0sR0FBRyxDQUF4QixLQUE4QixDQUEvQixHQUFxQyxLQUFLSCxTQUFMLENBQWVHLE1BQWYsQ0FBNUMsQ0FESixLQUdJLE9BQVEsS0FBS0gsU0FBTCxDQUFlRyxNQUFmLEtBQTBCLENBQTNCLEdBQWlDLEtBQUtILFNBQUwsQ0FBZUcsTUFBTSxHQUFHLENBQXhCLENBQXhDO0FBQ1AsR0FkcUM7QUFnQnRDRSxFQUFBQSxTQUFTLEVBQUUsbUJBQVVGLE1BQVYsRUFBa0I7QUFDekIsUUFBSUcsQ0FBQyxHQUFHLEtBQUtOLFNBQWI7QUFDQSxRQUFJLEtBQUtELGFBQVQsRUFDSSxPQUFRTyxDQUFDLENBQUNILE1BQU0sR0FBRyxDQUFWLENBQUQsSUFBaUIsRUFBbEIsR0FBeUJHLENBQUMsQ0FBQ0gsTUFBTSxHQUFHLENBQVYsQ0FBRCxJQUFpQixFQUExQyxHQUFpREcsQ0FBQyxDQUFDSCxNQUFNLEdBQUcsQ0FBVixDQUFELElBQWlCLENBQWxFLEdBQXdFRyxDQUFDLENBQUNILE1BQUQsQ0FBaEYsQ0FESixLQUdJLE9BQVFHLENBQUMsQ0FBQ0gsTUFBRCxDQUFELElBQWEsRUFBZCxHQUFxQkcsQ0FBQyxDQUFDSCxNQUFNLEdBQUcsQ0FBVixDQUFELElBQWlCLEVBQXRDLEdBQTZDRyxDQUFDLENBQUNILE1BQU0sR0FBRyxDQUFWLENBQUQsSUFBaUIsQ0FBOUQsR0FBb0VHLENBQUMsQ0FBQ0gsTUFBTSxHQUFHLENBQVYsQ0FBNUU7QUFDUCxHQXRCcUM7QUF3QnRDSSxFQUFBQSxpQkFBaUIsRUFBRSw2QkFBWTtBQUMzQixRQUFJQyxHQUFHLEdBQUcsS0FBS0osU0FBTCxDQUFlLENBQWYsQ0FBVjs7QUFFQSxRQUFJSSxHQUFHLEtBQUssTUFBWixFQUFvQjtBQUNoQixXQUFLQyxZQUFMLEdBQW9CLElBQXBCO0FBQ0gsS0FGRCxNQUVPLElBQUlELEdBQUcsS0FBSyxNQUFaLEVBQW9CO0FBQ3ZCLFdBQUtDLFlBQUwsR0FBb0IsS0FBcEI7QUFDSCxLQUZNLE1BRUE7QUFDSEMsTUFBQUEsT0FBTyxDQUFDQyxHQUFSLENBQVlILEdBQVo7QUFDQSxZQUFNSSxTQUFTLENBQUNoQixLQUFLLENBQUNpQixRQUFOLENBQWUsSUFBZixDQUFELENBQWY7QUFDSDs7QUFFRCxXQUFPLEtBQUtKLFlBQVo7QUFDSCxHQXJDcUM7QUF1Q3RDSyxFQUFBQSxRQUFRLEVBQUUsb0JBQVk7QUFDbEI7QUFDQSxRQUFJLEtBQUtWLFNBQUwsQ0FBZSxDQUFmLE1BQXNCLEVBQTFCLEVBQThCO0FBQzFCLFlBQU1XLFVBQVUsQ0FBQ25CLEtBQUssQ0FBQ2lCLFFBQU4sQ0FBZSxJQUFmLENBQUQsQ0FBaEI7QUFDQSxhQUFPLEtBQVA7QUFDSDs7QUFFRCxXQUFPLElBQVA7QUFDSCxHQS9DcUM7QUFpRHRDRyxFQUFBQSxnQkFBZ0IsRUFBRSwwQkFBVUMsU0FBVixFQUFxQjtBQUNuQyxRQUFJQyxTQUFTLEdBQUcsS0FBS0MsY0FBckI7O0FBQ0EsUUFBSUYsU0FBUyxJQUFJQyxTQUFqQixFQUE0QjtBQUN4QixhQUFPQSxTQUFTLENBQUNELFNBQUQsQ0FBaEI7QUFDSDs7QUFDRCxXQUFPLElBQVA7QUFDSCxHQXZEcUM7QUF5RHRDRyxFQUFBQSxlQUFlLEVBQUUseUJBQVVDLFFBQVYsRUFBb0I7QUFDakMsUUFBSUMsUUFBUSxHQUFHLEtBQUtDLGFBQXBCOztBQUVBLFFBQUlGLFFBQVEsSUFBSUMsUUFBaEIsRUFBMEI7QUFDdEIsYUFBT0EsUUFBUSxDQUFDRCxRQUFELENBQWY7QUFDSCxLQUZELE1BRU87QUFDSEcsTUFBQUEsRUFBRSxDQUFDQyxLQUFILENBQVMsSUFBVCxFQUFlSixRQUFmO0FBQ0EsYUFBTyxRQUFRQSxRQUFmO0FBQ0g7QUFDSixHQWxFcUM7QUFvRXRDSyxFQUFBQSxrQkFBa0IsRUFBRSw0QkFBVUMsYUFBVixFQUF5QjtBQUN6QyxRQUFJLENBQUMsTUFBRCxFQUFTLE9BQVQsRUFBa0IsT0FBbEIsRUFBMkIsV0FBM0IsRUFBd0NDLE9BQXhDLENBQWdERCxhQUFoRCxNQUFtRSxDQUFDLENBQXhFLEVBQTJFO0FBQ3ZFLGFBQU8sQ0FBUDtBQUNILEtBRkQsTUFFTyxJQUFJLENBQUMsT0FBRCxFQUFVLFFBQVYsRUFBb0JDLE9BQXBCLENBQTRCRCxhQUE1QixNQUErQyxDQUFDLENBQXBELEVBQXVEO0FBQzFELGFBQU8sQ0FBUDtBQUNILEtBRk0sTUFFQSxJQUFJLENBQUMsTUFBRCxFQUFTLE9BQVQsRUFBa0IsT0FBbEIsRUFBMkJDLE9BQTNCLENBQW1DRCxhQUFuQyxNQUFzRCxDQUFDLENBQTNELEVBQThEO0FBQ2pFLGFBQU8sQ0FBUDtBQUNILEtBRk0sTUFFQSxJQUFJLENBQUMsVUFBRCxFQUFhLFdBQWIsRUFBMEIsUUFBMUIsRUFBb0NDLE9BQXBDLENBQTRDRCxhQUE1QyxNQUErRCxDQUFDLENBQXBFLEVBQXVFO0FBQzFFLGFBQU8sQ0FBUDtBQUNIOztBQUNELFdBQU8sSUFBUDtBQUNILEdBL0VxQztBQWlGdENFLEVBQUFBLGNBQWMsRUFBRSx3QkFBVUMsWUFBVixFQUF3QkgsYUFBeEIsRUFBdUNJLFNBQXZDLEVBQWtEQyxXQUFsRCxFQUErRDtBQUMzRSxRQUFJQyxXQUFXLEdBQUcsRUFBbEI7QUFDQSxRQUFJQyxlQUFlLEdBQUcsS0FBS1Isa0JBQUwsQ0FBd0JDLGFBQXhCLENBQXRCO0FBQ0EsUUFBSVEsY0FBYyxHQUFHRCxlQUFlLEdBQUdILFNBQXZDOztBQUVBLFFBQUlJLGNBQWMsSUFBSSxDQUF0QixFQUF5QjtBQUNyQjtBQUNBLFVBQUksS0FBSzFCLFlBQUwsS0FBc0IsS0FBMUIsRUFDSXdCLFdBQVcsQ0FBQ0csSUFBWixDQUFpQkosV0FBVyxLQUFNLENBQUMsSUFBSUUsZUFBTCxJQUF3QixDQUExRCxFQURKLEtBR0lELFdBQVcsQ0FBQ0csSUFBWixDQUFpQkosV0FBakI7QUFDUCxLQU5ELE1BTU87QUFDSCxXQUFLLElBQUlLLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUdOLFNBQXBCLEVBQStCTSxDQUFDLEVBQWhDLEVBQW9DO0FBQ2hDLFlBQUlDLFdBQVcsR0FBR0osZUFBZSxHQUFHRyxDQUFwQzs7QUFDQSxZQUFJSCxlQUFlLElBQUksQ0FBdkIsRUFBMEI7QUFDdEIsY0FBSSxDQUFDLFVBQUQsRUFBYSxXQUFiLEVBQTBCTixPQUExQixDQUFrQ0QsYUFBbEMsTUFBcUQsQ0FBQyxDQUExRCxFQUE2RDtBQUN6RDtBQUNBTSxZQUFBQSxXQUFXLENBQUNHLElBQVosQ0FBaUIsS0FBSy9CLFNBQUwsQ0FBZTJCLFdBQVcsR0FBR00sV0FBN0IsQ0FBakIsRUFGeUQsQ0FHekQ7O0FBQ0FMLFlBQUFBLFdBQVcsQ0FBQ0csSUFBWixDQUFpQixLQUFLL0IsU0FBTCxDQUFlMkIsV0FBVyxHQUFHTSxXQUFkLEdBQTRCLENBQTNDLENBQWpCO0FBQ0gsV0FMRCxNQUtPO0FBQ0hkLFlBQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTLElBQVQ7QUFDSDtBQUNKLFNBVEQsTUFTTztBQUNIUSxVQUFBQSxXQUFXLENBQUNHLElBQVosQ0FBaUIsS0FBS0csUUFBTCxDQUFjTCxlQUFkLEVBQStCRixXQUFXLEdBQUdNLFdBQTdDLENBQWpCO0FBQ0g7QUFDSjtBQUNKOztBQUVELFFBQUlYLGFBQWEsS0FBSyxPQUF0QixFQUErQjtBQUMzQk0sTUFBQUEsV0FBVyxDQUFDTyxPQUFaLENBQW9CLFVBQVVDLENBQVYsRUFBYUosQ0FBYixFQUFnQi9CLENBQWhCLEVBQW1CO0FBQ25DQSxRQUFBQSxDQUFDLENBQUMrQixDQUFELENBQUQsR0FBT0ssTUFBTSxDQUFDQyxZQUFQLENBQW9CRixDQUFwQixDQUFQO0FBQ0gsT0FGRDtBQUdIOztBQUNELFdBQU9SLFdBQVA7QUFDSCxHQXBIcUM7QUFzSHRDTSxFQUFBQSxRQUFRLEVBQUUsa0JBQVVLLFFBQVYsRUFBb0J6QyxNQUFwQixFQUE0QjtBQUNsQyxRQUFJeUMsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ2ZwQixNQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUyxJQUFUO0FBQ0gsS0FGRCxNQUVPLElBQUltQixRQUFRLElBQUksQ0FBaEIsRUFBbUI7QUFDdEIsYUFBTyxLQUFLMUMsUUFBTCxDQUFjQyxNQUFkLENBQVA7QUFDSCxLQUZNLE1BRUEsSUFBSXlDLFFBQVEsSUFBSSxDQUFoQixFQUFtQjtBQUN0QixhQUFPLEtBQUt4QyxTQUFMLENBQWVELE1BQWYsQ0FBUDtBQUNILEtBRk0sTUFFQSxJQUFJeUMsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ3RCLGFBQU8sS0FBS3ZDLFNBQUwsQ0FBZUYsTUFBZixNQUEyQixDQUFsQztBQUNILEtBRk0sTUFFQSxJQUFJeUMsUUFBUSxJQUFJLENBQWhCLEVBQW1CO0FBQ3RCLGFBQU8sS0FBS3ZDLFNBQUwsQ0FBZUYsTUFBZixDQUFQO0FBQ0gsS0FGTSxNQUVBO0FBQ0hxQixNQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUyxJQUFUO0FBQ0g7QUFDSixHQXBJcUM7QUFzSXRDb0IsRUFBQUEsT0FBTyxFQUFFLGlCQUFVQyxPQUFWLEVBQW1CQyxVQUFuQixFQUErQkMsU0FBL0IsRUFBMEM7QUFDL0NBLElBQUFBLFNBQVMsR0FBR0EsU0FBUyxJQUFJLENBQXpCO0FBQ0EsUUFBSUMsVUFBVSxHQUFHQyxJQUFJLENBQUNDLEtBQUwsQ0FBV0gsU0FBUyxHQUFHLENBQXZCLENBQWpCO0FBQ0EsUUFBSUksYUFBYSxHQUFHTCxVQUFVLEdBQUdFLFVBQWpDO0FBQ0EsUUFBSUksU0FBUyxHQUFHTCxTQUFTLEdBQUdGLE9BQTVCO0FBQ0EsUUFBSVEsVUFBVSxHQUFHLEtBQUtSLE9BQXRCO0FBQ0EsUUFBSVMsU0FBSixFQUFjQyxPQUFkOztBQUVBLFFBQUlILFNBQVMsSUFBSSxDQUFqQixFQUFvQjtBQUNoQjdCLE1BQUFBLEVBQUUsQ0FBQ0MsS0FBSCxDQUFTLElBQVQ7QUFDSCxLQUZELE1BRU8sSUFBSTRCLFNBQVMsSUFBSSxDQUFqQixFQUFvQjtBQUN2QkUsTUFBQUEsU0FBUyxHQUFHLEtBQUtQLFNBQWpCO0FBQ0FRLE1BQUFBLE9BQU8sR0FBRyxLQUFLdEQsUUFBTCxDQUFja0QsYUFBZCxDQUFWO0FBQ0gsS0FITSxNQUdBLElBQUlDLFNBQVMsSUFBSSxFQUFqQixFQUFxQjtBQUN4QkUsTUFBQUEsU0FBUyxHQUFHLEtBQUtQLFNBQWpCO0FBQ0FRLE1BQUFBLE9BQU8sR0FBRyxLQUFLcEQsU0FBTCxDQUFlZ0QsYUFBZixDQUFWO0FBQ0gsS0FITSxNQUdBLElBQUlDLFNBQVMsSUFBSSxFQUFqQixFQUFxQjtBQUN4QkUsTUFBQUEsU0FBUyxHQUFHUCxTQUFaO0FBQ0FRLE1BQUFBLE9BQU8sR0FBRyxLQUFLbkQsU0FBTCxDQUFlK0MsYUFBZixDQUFWO0FBQ0gsS0FITSxNQUdBO0FBQ0g1QixNQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUyxJQUFUO0FBQ0g7O0FBRUQsV0FBTztBQUNILGNBQVUrQixPQUFPLElBQUlELFNBQVosS0FBMkJELFVBRGpDO0FBRUgsb0JBQWNGLGFBQWEsR0FBR0YsSUFBSSxDQUFDQyxLQUFMLENBQVdFLFNBQVMsR0FBRyxDQUF2QixDQUYzQjtBQUdILG1CQUFhQSxTQUFTLEdBQUc7QUFIdEIsS0FBUDtBQUtILEdBbEtxQztBQW9LdENJLEVBQUFBLGtCQUFrQixFQUFFLDRCQUFVVixVQUFWLEVBQXNCO0FBQ3RDLFFBQUlXLGFBQWEsR0FBRyxLQUFLdEQsU0FBTCxDQUFlMkMsVUFBZixDQUFwQjtBQUNBLFFBQUlZLFVBQVUsR0FBRyxFQUFqQjs7QUFFQSxTQUFLLElBQUl0QixDQUFDLEdBQUdVLFVBQVUsR0FBRyxDQUFyQixFQUF3QmEsVUFBVSxHQUFHLENBQTFDLEVBQTZDQSxVQUFVLEdBQUdGLGFBQTFELEVBQXlFckIsQ0FBQyxJQUFJLEVBQUwsRUFBU3VCLFVBQVUsRUFBNUYsRUFBZ0c7QUFDNUYsVUFBSXZDLFFBQVEsR0FBRyxLQUFLakIsU0FBTCxDQUFlaUMsQ0FBZixDQUFmO0FBQ0EsVUFBSXBCLFNBQVMsR0FBRyxLQUFLYixTQUFMLENBQWVpQyxDQUFDLEdBQUcsQ0FBbkIsQ0FBaEI7QUFDQSxVQUFJTixTQUFTLEdBQUcsS0FBSzFCLFNBQUwsQ0FBZWdDLENBQUMsR0FBRyxDQUFuQixDQUFoQjtBQUNBLFVBQUlMLFdBQVcsR0FBRyxLQUFLM0IsU0FBTCxDQUFlZ0MsQ0FBQyxHQUFHLENBQW5CLENBQWxCO0FBRUEsVUFBSVAsWUFBWSxHQUFHLEtBQUtWLGVBQUwsQ0FBcUJDLFFBQXJCLENBQW5CO0FBQ0EsVUFBSU0sYUFBYSxHQUFHLEtBQUtYLGdCQUFMLENBQXNCQyxTQUF0QixDQUFwQjtBQUNBLFVBQUlnQixXQUFXLEdBQUcsS0FBS0osY0FBTCxDQUFvQkMsWUFBcEIsRUFBa0NILGFBQWxDLEVBQWlESSxTQUFqRCxFQUE0REMsV0FBNUQsQ0FBbEI7QUFFQTJCLE1BQUFBLFVBQVUsQ0FBQzdCLFlBQUQsQ0FBVixHQUEyQjtBQUFFK0IsUUFBQUEsSUFBSSxFQUFFbEMsYUFBUjtBQUF1Qm1DLFFBQUFBLE1BQU0sRUFBRTdCO0FBQS9CLE9BQTNCO0FBQ0g7O0FBRUQsU0FBS2hDLGdCQUFMLENBQXNCbUMsSUFBdEIsQ0FBMkJ1QixVQUEzQjs7QUFFQSxRQUFJSSxpQkFBaUIsR0FBRyxLQUFLMUQsU0FBTCxDQUFlZ0MsQ0FBZixDQUF4Qjs7QUFDQSxRQUFJMEIsaUJBQWlCLEtBQUssVUFBMUIsRUFBc0M7QUFDbEMsV0FBS04sa0JBQUwsQ0FBd0JNLGlCQUF4QjtBQUNIO0FBQ0osR0EzTHFDO0FBNkx0Q0MsRUFBQUEsZ0JBQWdCLEVBQUUsMEJBQVNDLFdBQVQsRUFBc0JDLGFBQXRCLEVBQXFDO0FBQ25ELFFBQUlDLFVBQVUsR0FBR2pCLElBQUksQ0FBQ2tCLEdBQUwsQ0FBUyxDQUFULEVBQVksSUFBSUYsYUFBaEIsQ0FBakI7QUFFQSxXQUFPaEIsSUFBSSxDQUFDQyxLQUFMLENBQVljLFdBQVcsR0FBR0UsVUFBZixJQUE4QkEsVUFBVSxHQUFHLENBQTNDLENBQVgsQ0FBUDtBQUNILEdBak1xQzs7QUFtTXRDOzs7Ozs7QUFNQUUsRUFBQUEsU0FBUyxFQUFFLG1CQUFVQyxRQUFWLEVBQW9CQyxNQUFwQixFQUE0QjtBQUNuQ0EsSUFBQUEsTUFBTSxHQUFHQSxNQUFNLElBQUlDLFFBQVEsQ0FBQ0MsYUFBVCxDQUF1QixRQUF2QixDQUFuQjtBQUVBLFNBQUt6RSxTQUFMLEdBQWlCc0UsUUFBakI7QUFDQSxTQUFLQyxNQUFMLEdBQWNBLE1BQWQ7QUFFQSxTQUFLaEUsaUJBQUw7O0FBRUEsUUFBSSxDQUFDLEtBQUtPLFFBQUwsRUFBTCxFQUFzQjtBQUNsQjtBQUNIOztBQUVELFFBQUk0RCxrQkFBa0IsR0FBRyxLQUFLckUsU0FBTCxDQUFlLENBQWYsQ0FBekI7QUFFQSxTQUFLSixnQkFBTCxDQUFzQjBFLE1BQXRCLEdBQStCLENBQS9CO0FBQ0EsU0FBS2xCLGtCQUFMLENBQXdCaUIsa0JBQXhCO0FBRUEsUUFBSUUsYUFBYSxHQUFHLEtBQUszRSxnQkFBTCxDQUFzQixDQUF0QixDQUFwQjtBQUVBLFFBQUk0RSxVQUFVLEdBQUdELGFBQWEsQ0FBQyxZQUFELENBQWIsQ0FBNEJkLE1BQTVCLENBQW1DLENBQW5DLENBQWpCO0FBQ0EsUUFBSWdCLFdBQVcsR0FBR0YsYUFBYSxDQUFDLGFBQUQsQ0FBYixDQUE2QmQsTUFBN0IsQ0FBb0MsQ0FBcEMsQ0FBbEI7QUFFQSxTQUFLUyxNQUFMLENBQVlRLEtBQVosR0FBb0JGLFVBQXBCO0FBQ0EsU0FBS04sTUFBTCxDQUFZUyxNQUFaLEdBQXFCRixXQUFyQjtBQUVBLFFBQUlHLE1BQU0sR0FBRyxFQUFiO0FBRUEsUUFBSUMsV0FBVyxHQUFJTixhQUFhLENBQUMsYUFBRCxDQUFkLEdBQWlDQSxhQUFhLENBQUMsYUFBRCxDQUFiLENBQTZCZCxNQUE3QixDQUFvQyxDQUFwQyxDQUFqQyxHQUEwRSxDQUE1RjtBQUVBLFFBQUlxQixlQUFlLEdBQUdQLGFBQWEsQ0FBQyxpQkFBRCxDQUFiLENBQWlDZCxNQUFqQyxDQUF3QyxDQUF4QyxDQUF0QjtBQUVBLFFBQUlzQixnQkFBZ0IsR0FBRyxFQUF2QjtBQUVBLFFBQUlDLFlBQVksR0FBRyxDQUFuQjtBQUNBLFFBQUlDLGdCQUFnQixHQUFHLEtBQXZCO0FBRUFWLElBQUFBLGFBQWEsQ0FBQyxlQUFELENBQWIsQ0FBK0JkLE1BQS9CLENBQXNDdEIsT0FBdEMsQ0FBOEMsVUFBVTBCLGFBQVYsRUFBeUI3QixDQUF6QixFQUE0QmtELG1CQUE1QixFQUFpRDtBQUMzRkgsTUFBQUEsZ0JBQWdCLENBQUMvQyxDQUFELENBQWhCLEdBQXNCO0FBQ2xCNkIsUUFBQUEsYUFBYSxFQUFFQSxhQURHO0FBRWxCc0IsUUFBQUEsaUJBQWlCLEVBQUUsS0FGRDtBQUdsQkMsUUFBQUEsY0FBYyxFQUFFQztBQUhFLE9BQXRCOztBQU1BLFVBQUt4QixhQUFhLEdBQUcsQ0FBakIsS0FBd0IsQ0FBNUIsRUFBK0I7QUFDM0JrQixRQUFBQSxnQkFBZ0IsQ0FBQy9DLENBQUQsQ0FBaEIsQ0FBb0JtRCxpQkFBcEIsR0FBd0MsSUFBeEM7QUFDQUosUUFBQUEsZ0JBQWdCLENBQUMvQyxDQUFELENBQWhCLENBQW9Cb0QsY0FBcEIsR0FBcUN2QixhQUFhLEdBQUcsQ0FBckQ7QUFDSDs7QUFFRG1CLE1BQUFBLFlBQVksSUFBSW5CLGFBQWhCO0FBQ0gsS0FiRCxFQWFHLElBYkg7O0FBZUEsUUFBS21CLFlBQVksR0FBRyxDQUFoQixLQUF1QixDQUEzQixFQUE4QjtBQUMxQkMsTUFBQUEsZ0JBQWdCLEdBQUcsSUFBbkI7QUFDQSxVQUFJSyxhQUFhLEdBQUdOLFlBQVksR0FBRyxDQUFuQztBQUNIOztBQUVELFFBQUlPLGlCQUFpQixHQUFHaEIsYUFBYSxDQUFDLGNBQUQsQ0FBYixDQUE4QmQsTUFBdEQ7QUFDQSxRQUFJK0Isb0JBQW9CLEdBQUdELGlCQUFpQixDQUFDakIsTUFBN0MsQ0F6RG1DLENBMkRuQzs7QUFDQSxRQUFJQyxhQUFhLENBQUMsaUJBQUQsQ0FBakIsRUFBc0M7QUFDbEMsVUFBSWtCLG9CQUFvQixHQUFHbEIsYUFBYSxDQUFDLGlCQUFELENBQWIsQ0FBaUNkLE1BQTVEO0FBQ0gsS0FGRCxNQUVPO0FBQ0h0QyxNQUFBQSxFQUFFLENBQUNDLEtBQUgsQ0FBUyxJQUFULEVBREcsQ0FHSDs7QUFDQSxVQUFJb0Usb0JBQW9CLEtBQUssQ0FBN0IsRUFBZ0M7QUFDNUIsWUFBSUMsb0JBQW9CLEdBQUcsQ0FBQzVDLElBQUksQ0FBQzZDLElBQUwsQ0FBV2xCLFVBQVUsR0FBR0MsV0FBYixHQUEyQk8sWUFBNUIsR0FBNEMsQ0FBdEQsQ0FBRCxDQUEzQjtBQUNILE9BRkQsTUFFTztBQUNILGNBQU1XLEtBQUssQ0FBQ3BHLEtBQUssQ0FBQ2lCLFFBQU4sQ0FBZSxJQUFmLENBQUQsQ0FBWDtBQUNIO0FBQ0osS0F2RWtDLENBeUVuQzs7O0FBQ0EsU0FBSyxJQUFJd0IsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR3dELG9CQUFwQixFQUEwQ3hELENBQUMsRUFBM0MsRUFBK0M7QUFDM0MsVUFBSTRELFdBQVcsR0FBR0wsaUJBQWlCLENBQUN2RCxDQUFELENBQW5DO0FBQ0E0QyxNQUFBQSxNQUFNLENBQUM1QyxDQUFELENBQU4sR0FBWSxFQUFaO0FBRUEsVUFBSTZELGNBQWMsR0FBR0osb0JBQW9CLENBQUN6RCxDQUFELENBQXpDLENBSjJDLENBTTNDOztBQUNBLFdBQUssSUFBSVUsVUFBVSxHQUFHLENBQWpCLEVBQW9CQyxTQUFTLEdBQUcsQ0FBaEMsRUFBbUNtRCxVQUFVLEdBQUcsQ0FBaEQsRUFBbURDLFNBQVMsR0FBRyxJQUEvRCxFQUFxRUMsS0FBSyxHQUFHLEVBQTdFLEVBQWlGekQsUUFBUSxHQUFHLENBQTVGLEVBQStGMEQsTUFBTSxHQUFHLENBQXhHLEVBQTJHQyxhQUFhLEdBQUcsQ0FBaEksRUFDS3hELFVBQVUsR0FBR21ELGNBRGxCLEVBQ2tDbkQsVUFBVSxJQUFJb0QsVUFEaEQsRUFDNEQ7QUFDeEQ7QUFDQSxnQkFBUWpCLFdBQVI7QUFDSTtBQUNBLGVBQUssQ0FBTDtBQUNJO0FBQ0EsaUJBQUssSUFBSXNCLENBQUMsR0FBRyxDQUFSLEVBQVdILEtBQUssR0FBRyxFQUF4QixFQUE0QkcsQ0FBQyxHQUFHckIsZUFBaEMsRUFBaURxQixDQUFDLEVBQWxELEVBQXNEO0FBQ2xELGtCQUFJcEIsZ0JBQWdCLENBQUNvQixDQUFELENBQWhCLENBQW9CaEIsaUJBQXhCLEVBQTJDO0FBQ3ZDO0FBQ0Esb0JBQUlpQixZQUFZLEdBQUdyQixnQkFBZ0IsQ0FBQ29CLENBQUQsQ0FBaEIsQ0FBb0JmLGNBQXBCLEdBQXFDZSxDQUF4RDtBQUNBSCxnQkFBQUEsS0FBSyxDQUFDakUsSUFBTixDQUFXLEtBQUtHLFFBQUwsQ0FBYzZDLGdCQUFnQixDQUFDb0IsQ0FBRCxDQUFoQixDQUFvQmYsY0FBbEMsRUFBa0RRLFdBQVcsR0FBR2xELFVBQWQsR0FBMkIwRCxZQUE3RSxDQUFYO0FBQ0gsZUFKRCxNQUlPO0FBQ0gsb0JBQUlDLFVBQVUsR0FBRyxLQUFLN0QsT0FBTCxDQUFhdUMsZ0JBQWdCLENBQUNvQixDQUFELENBQWhCLENBQW9CdEMsYUFBakMsRUFBZ0QrQixXQUFXLEdBQUdsRCxVQUE5RCxFQUEwRUMsU0FBMUUsQ0FBakI7QUFDQXFELGdCQUFBQSxLQUFLLENBQUNqRSxJQUFOLENBQVdzRSxVQUFVLENBQUNDLElBQXRCO0FBQ0E1RCxnQkFBQUEsVUFBVSxHQUFHMkQsVUFBVSxDQUFDM0QsVUFBWCxHQUF3QmtELFdBQXJDO0FBQ0FqRCxnQkFBQUEsU0FBUyxHQUFHMEQsVUFBVSxDQUFDMUQsU0FBdkI7QUFFQSxzQkFBTWpDLFVBQVUsQ0FBQ25CLEtBQUssQ0FBQ2lCLFFBQU4sQ0FBZSxJQUFmLENBQUQsQ0FBaEI7QUFDSDtBQUNKOztBQUVEb0UsWUFBQUEsTUFBTSxDQUFDNUMsQ0FBRCxDQUFOLENBQVVELElBQVYsQ0FBZWlFLEtBQWY7O0FBRUEsZ0JBQUlmLGdCQUFKLEVBQXNCO0FBQ2xCYSxjQUFBQSxVQUFVLEdBQUdSLGFBQWI7QUFDSCxhQUZELE1BRU87QUFDSFEsY0FBQUEsVUFBVSxHQUFHLENBQWI7QUFDQSxvQkFBTXBGLFVBQVUsQ0FBQ25CLEtBQUssQ0FBQ2lCLFFBQU4sQ0FBZSxJQUFmLENBQUQsQ0FBaEI7QUFDSDs7QUFDRDtBQUVKOztBQUNBLGVBQUssQ0FBTDtBQUNJO0FBQ0E7QUFFSjs7QUFDQSxlQUFLLENBQUw7QUFDSTtBQUNBO0FBRUo7O0FBQ0EsZUFBSyxDQUFMO0FBQ0k7QUFDQTtBQUVKOztBQUNBLGVBQUssQ0FBTDtBQUNJO0FBQ0E7QUFFSjs7QUFDQSxlQUFLLENBQUw7QUFDSTtBQUNBO0FBRUo7O0FBQ0EsZUFBSyxDQUFMO0FBQ0k7QUFDQTtBQUVKOztBQUNBLGVBQUssS0FBTDtBQUNJO0FBQ0EsZ0JBQUl1RixTQUFKLEVBQWU7QUFDWEEsY0FBQUEsU0FBUyxHQUFHLEtBQVo7QUFFQSxrQkFBSVEsV0FBVyxHQUFHLENBQWxCO0FBQ0Esa0JBQUlDLFVBQVUsR0FBRyxDQUFqQixDQUpXLENBTVg7O0FBQ0Esa0JBQUlDLE1BQU0sR0FBRyxLQUFLQyxPQUFMLENBQWFkLFdBQVcsR0FBR2xELFVBQTNCLENBQWI7O0FBRUEsa0JBQUsrRCxNQUFNLElBQUksQ0FBWCxJQUFrQkEsTUFBTSxJQUFJLEdBQWhDLEVBQXNDO0FBQUU7QUFDcENGLGdCQUFBQSxXQUFXLEdBQUdFLE1BQU0sR0FBRyxDQUF2QjtBQUNILGVBRkQsTUFFTyxJQUFLQSxNQUFNLElBQUksQ0FBQyxHQUFaLElBQXFCQSxNQUFNLElBQUksQ0FBQyxDQUFwQyxFQUF3QztBQUFFO0FBQzdDRCxnQkFBQUEsVUFBVSxHQUFHLENBQUNDLE1BQUQsR0FBVSxDQUF2QjtBQUNILGVBRk07QUFFQTtBQUF5QjtBQUFFO0FBQzlCVixrQkFBQUEsU0FBUyxHQUFHLElBQVo7QUFDSDtBQUNKLGFBaEJELE1BZ0JPO0FBQ0gsa0JBQUlZLFdBQVcsR0FBRyxLQUFLOUcsUUFBTCxDQUFjK0YsV0FBVyxHQUFHbEQsVUFBNUIsQ0FBbEIsQ0FERyxDQUdIOztBQUNBLG1CQUFLLElBQUl5RCxDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHSyxVQUFwQixFQUFnQ0wsQ0FBQyxFQUFqQyxFQUFxQztBQUNqQyxvQkFBSXBCLGdCQUFnQixDQUFDa0IsTUFBRCxDQUFoQixDQUF5QmQsaUJBQTdCLEVBQWdEO0FBQzVDO0FBQ0FlLGtCQUFBQSxhQUFhLEdBQUlBLGFBQWEsSUFBSyxJQUFJM0QsUUFBdkIsR0FBb0NvRSxXQUFwRDtBQUNBcEUsa0JBQUFBLFFBQVEsR0FIb0MsQ0FLNUM7O0FBQ0Esc0JBQUlBLFFBQVEsS0FBS3dDLGdCQUFnQixDQUFDa0IsTUFBRCxDQUFoQixDQUF5QmIsY0FBMUMsRUFBMEQ7QUFDdERZLG9CQUFBQSxLQUFLLENBQUNqRSxJQUFOLENBQVdtRSxhQUFYO0FBQ0FBLG9CQUFBQSxhQUFhLEdBQUczRCxRQUFRLEdBQUcsQ0FBM0I7QUFDQTBELG9CQUFBQSxNQUFNO0FBQ1Q7QUFDSixpQkFYRCxNQVdPO0FBQ0gsd0JBQU12RixVQUFVLENBQUNuQixLQUFLLENBQUNpQixRQUFOLENBQWUsSUFBZixDQUFELENBQWhCO0FBQ0gsaUJBZGdDLENBZ0JqQzs7O0FBQ0Esb0JBQUl5RixNQUFNLEtBQUtuQixlQUFmLEVBQWdDO0FBQzVCRixrQkFBQUEsTUFBTSxDQUFDNUMsQ0FBRCxDQUFOLENBQVVELElBQVYsQ0FBZWlFLEtBQWY7QUFDQUEsa0JBQUFBLEtBQUssR0FBRyxFQUFSO0FBQ0FDLGtCQUFBQSxNQUFNLEdBQUcsQ0FBVDtBQUNIO0FBQ0o7O0FBRURNLGNBQUFBLFdBQVcsR0E1QlIsQ0E4Qkg7O0FBQ0Esa0JBQUlBLFdBQVcsS0FBSyxDQUFwQixFQUF1QjtBQUNuQlIsZ0JBQUFBLFNBQVMsR0FBRyxJQUFaO0FBQ0g7QUFDSjs7QUFFREQsWUFBQUEsVUFBVSxHQUFHLENBQWI7QUFDQTtBQUVKOztBQUNBO0FBQ0k7QUFDQTtBQXhIUjtBQTBISDtBQUNKOztBQUVELFFBQUk1QixNQUFNLENBQUMwQyxVQUFYLEVBQXVCO0FBQ25CLFVBQUlDLEdBQUcsR0FBRyxLQUFLM0MsTUFBTCxDQUFZMEMsVUFBWixDQUF1QixJQUF2QixDQUFWLENBRG1CLENBR25COztBQUNBQyxNQUFBQSxHQUFHLENBQUNDLFNBQUosR0FBZ0Isd0JBQWhCLENBSm1CLENBTW5COztBQUNBLFVBQUlDLFlBQVksR0FBR3hDLGFBQWEsQ0FBQyxjQUFELENBQWIsR0FBZ0NBLGFBQWEsQ0FBQyxjQUFELENBQWIsQ0FBOEJkLE1BQTlCLENBQXFDLENBQXJDLENBQWhDLEdBQTBFZ0IsV0FBN0Y7QUFFQSxVQUFJdUMsU0FBUyxHQUFHcEMsTUFBTSxDQUFDTixNQUF2QjtBQUVBLFVBQUkyQywwQkFBMEIsR0FBR3hDLFdBQVcsR0FBR3NDLFlBQS9DO0FBQ0EsVUFBSUcsZUFBZSxHQUFJRCwwQkFBMEIsS0FBSyxDQUFoQyxHQUFxQ0YsWUFBckMsR0FBb0RFLDBCQUExRTtBQUVBLFVBQUlFLGNBQWMsR0FBR0osWUFBckI7QUFDQSxVQUFJSyxzQkFBc0IsR0FBRyxDQUE3QjtBQUVBLFVBQUlDLHlCQUF5QixHQUFHOUMsYUFBYSxDQUFDLDJCQUFELENBQWIsQ0FBMkNkLE1BQTNDLENBQWtELENBQWxELENBQWhDO0FBRUEsVUFBSTZELGtCQUFrQixHQUFHLEVBQXpCO0FBQ0EsVUFBSUMsZUFBZSxHQUFHLENBQXRCOztBQUVBLFVBQUloRCxhQUFhLENBQUMsY0FBRCxDQUFqQixFQUFtQztBQUMvQitDLFFBQUFBLGtCQUFrQixHQUFHL0MsYUFBYSxDQUFDLGNBQUQsQ0FBYixDQUE4QmQsTUFBbkQ7QUFDQThELFFBQUFBLGVBQWUsR0FBR0Qsa0JBQWtCLENBQUNoRCxNQUFyQztBQUNIOztBQUVELFVBQUlDLGFBQWEsQ0FBQyxVQUFELENBQWpCLEVBQStCO0FBQzNCLFlBQUlpRCxjQUFjLEdBQUdqRCxhQUFhLENBQUMsVUFBRCxDQUFiLENBQTBCZCxNQUEvQztBQUNBLFlBQUlnRSxrQkFBa0IsR0FBRzVFLElBQUksQ0FBQ2tCLEdBQUwsQ0FBUyxDQUFULEVBQVlnQixnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CbEIsYUFBaEMsQ0FBekI7QUFDSCxPQTlCa0IsQ0FnQ25COzs7QUFDQSxXQUFLLElBQUk3QixDQUFDLEdBQUcsQ0FBYixFQUFnQkEsQ0FBQyxHQUFHZ0YsU0FBcEIsRUFBK0JoRixDQUFDLEVBQWhDLEVBQW9DO0FBQ2hDO0FBQ0EsWUFBS0EsQ0FBQyxHQUFHLENBQUwsS0FBWWdGLFNBQWhCLEVBQTJCO0FBQ3ZCRyxVQUFBQSxjQUFjLEdBQUdELGVBQWpCO0FBQ0g7O0FBRUQsWUFBSVEsU0FBUyxHQUFHOUMsTUFBTSxDQUFDNUMsQ0FBRCxDQUFOLENBQVVzQyxNQUExQjtBQUNBLFlBQUlxRCxRQUFRLEdBQUdQLHNCQUFzQixHQUFHcEYsQ0FBeEMsQ0FQZ0MsQ0FTaEM7O0FBQ0EsYUFBSyxJQUFJNEYsQ0FBQyxHQUFHLENBQVIsRUFBV0MsQ0FBQyxHQUFHLENBQXBCLEVBQXVCRCxDQUFDLEdBQUdULGNBQUosRUFBb0JVLENBQUMsR0FBR0gsU0FBL0MsRUFBMERFLENBQUMsRUFBM0QsRUFBK0Q7QUFDM0Q7QUFDQSxlQUFLLElBQUlFLENBQUMsR0FBRyxDQUFiLEVBQWdCQSxDQUFDLEdBQUd0RCxVQUFwQixFQUFnQ3NELENBQUMsSUFBSUQsQ0FBQyxFQUF0QyxFQUEwQztBQUN0QyxnQkFBSUUsWUFBWSxHQUFHbkQsTUFBTSxDQUFDNUMsQ0FBRCxDQUFOLENBQVU2RixDQUFWLENBQW5CO0FBRUEsZ0JBQUlHLEdBQUcsR0FBRyxDQUFWO0FBQ0EsZ0JBQUlDLEtBQUssR0FBRyxDQUFaO0FBQ0EsZ0JBQUlDLElBQUksR0FBRyxDQUFYO0FBQ0EsZ0JBQUlDLE9BQU8sR0FBRyxHQUFkOztBQUVBLGdCQUFJWixlQUFlLEdBQUcsQ0FBdEIsRUFBeUI7QUFDckIsbUJBQUssSUFBSWEsQ0FBQyxHQUFHLENBQWIsRUFBZ0JBLENBQUMsR0FBR2IsZUFBcEIsRUFBcUNhLENBQUMsRUFBdEMsRUFBMEM7QUFDdEMsb0JBQUlkLGtCQUFrQixDQUFDYyxDQUFELENBQWxCLEtBQTBCLENBQTFCLElBQStCZCxrQkFBa0IsQ0FBQ2MsQ0FBRCxDQUFsQixLQUEwQixDQUE3RCxFQUFnRTtBQUM1RDtBQUNBRCxrQkFBQUEsT0FBTyxHQUFHSixZQUFZLENBQUMsSUFBSUssQ0FBTCxDQUFaLEdBQXNCLEdBQWhDO0FBRUE7QUFDSDtBQUNKO0FBQ0o7O0FBRUQsb0JBQVFmLHlCQUFSO0FBQ0k7QUFDQTtBQUNBLG1CQUFLLENBQUw7QUFDSSxvQkFBSXRDLGdCQUFnQixDQUFDLENBQUQsQ0FBaEIsQ0FBb0JJLGlCQUF4QixFQUEyQztBQUN2QyxzQkFBSWtELFdBQVcsR0FBR3hGLElBQUksQ0FBQ2tCLEdBQUwsQ0FBUyxJQUFULEVBQWVnQixnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CSyxjQUFwQixHQUFxQyxDQUFwRCxDQUFsQjtBQUNILGlCQUhMLENBS0k7OztBQUNBMkMsZ0JBQUFBLFlBQVksQ0FBQzVGLE9BQWIsQ0FBcUIsVUFBVThELE1BQVYsRUFBa0JxQyxLQUFsQixFQUF5QkMsT0FBekIsRUFBa0M7QUFDbkRBLGtCQUFBQSxPQUFPLENBQUNELEtBQUQsQ0FBUCxHQUFpQkQsV0FBVyxHQUFHcEMsTUFBL0I7QUFDSCxpQkFGRDtBQUlKO0FBQ0E7O0FBQ0EsbUJBQUssQ0FBTDtBQUNJK0IsZ0JBQUFBLEdBQUcsR0FBR0MsS0FBSyxHQUFHQyxJQUFJLEdBQUcsS0FBS3ZFLGdCQUFMLENBQXNCb0UsWUFBWSxDQUFDLENBQUQsQ0FBbEMsRUFBdUNoRCxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CbEIsYUFBM0QsQ0FBckI7QUFDQTtBQUVKOztBQUNBLG1CQUFLLENBQUw7QUFDSW1FLGdCQUFBQSxHQUFHLEdBQUcsS0FBS3JFLGdCQUFMLENBQXNCb0UsWUFBWSxDQUFDLENBQUQsQ0FBbEMsRUFBdUNoRCxnQkFBZ0IsQ0FBQyxDQUFELENBQWhCLENBQW9CbEIsYUFBM0QsQ0FBTjtBQUNBb0UsZ0JBQUFBLEtBQUssR0FBRyxLQUFLdEUsZ0JBQUwsQ0FBc0JvRSxZQUFZLENBQUMsQ0FBRCxDQUFsQyxFQUF1Q2hELGdCQUFnQixDQUFDLENBQUQsQ0FBaEIsQ0FBb0JsQixhQUEzRCxDQUFSO0FBQ0FxRSxnQkFBQUEsSUFBSSxHQUFHLEtBQUt2RSxnQkFBTCxDQUFzQm9FLFlBQVksQ0FBQyxDQUFELENBQWxDLEVBQXVDaEQsZ0JBQWdCLENBQUMsQ0FBRCxDQUFoQixDQUFvQmxCLGFBQTNELENBQVA7QUFDQTtBQUVKOztBQUNBLG1CQUFLLENBQUw7QUFDSSxvQkFBSTJELGNBQWMsS0FBS25DLFNBQXZCLEVBQWtDO0FBQzlCLHdCQUFNTSxLQUFLLENBQUNwRyxLQUFLLENBQUNpQixRQUFOLENBQWUsSUFBZixDQUFELENBQVg7QUFDSDs7QUFFRCxvQkFBSWdJLGFBQWEsR0FBR1QsWUFBWSxDQUFDLENBQUQsQ0FBaEM7QUFFQUMsZ0JBQUFBLEdBQUcsR0FBRyxLQUFLckUsZ0JBQUwsQ0FBc0I2RCxjQUFjLENBQUNnQixhQUFELENBQXBDLEVBQXFELEVBQXJELENBQU47QUFDQVAsZ0JBQUFBLEtBQUssR0FBRyxLQUFLdEUsZ0JBQUwsQ0FBc0I2RCxjQUFjLENBQUNDLGtCQUFrQixHQUFHZSxhQUF0QixDQUFwQyxFQUEwRSxFQUExRSxDQUFSO0FBQ0FOLGdCQUFBQSxJQUFJLEdBQUcsS0FBS3ZFLGdCQUFMLENBQXNCNkQsY0FBYyxDQUFFLElBQUlDLGtCQUFMLEdBQTJCZSxhQUE1QixDQUFwQyxFQUFnRixFQUFoRixDQUFQO0FBQ0E7QUFFSjs7QUFDQTtBQUNJLHNCQUFNOUgsVUFBVSxDQUFDbkIsS0FBSyxDQUFDaUIsUUFBTixDQUFlLElBQWYsRUFBcUI2Ryx5QkFBckIsQ0FBRCxDQUFoQjtBQUNBO0FBMUNSOztBQTZDQVIsWUFBQUEsR0FBRyxDQUFDQyxTQUFKLEdBQWdCLFVBQVVrQixHQUFWLEdBQWdCLElBQWhCLEdBQXVCQyxLQUF2QixHQUErQixJQUEvQixHQUFzQ0MsSUFBdEMsR0FBNkMsSUFBN0MsR0FBb0RDLE9BQXBELEdBQThELEdBQTlFO0FBQ0F0QixZQUFBQSxHQUFHLENBQUM0QixRQUFKLENBQWFYLENBQWIsRUFBZ0JILFFBQVEsR0FBR0MsQ0FBM0IsRUFBOEIsQ0FBOUIsRUFBaUMsQ0FBakM7QUFDSDtBQUNKOztBQUVEUixRQUFBQSxzQkFBc0IsR0FBR0QsY0FBekI7QUFDSDtBQUNKOztBQUVELFdBQU8sS0FBS2pELE1BQVo7QUFDSCxHQWpoQnFDO0FBbWhCdEM7QUFDQTtBQUNBaEQsRUFBQUEsYUFBYSxFQUFFO0FBQ1g7QUFDQSxZQUFRLFFBRkc7QUFHWCxZQUFRLGVBSEc7QUFJWCxZQUFRLFlBSkc7QUFLWCxZQUFRLFdBTEc7QUFNWCxZQUFRLFVBTkc7QUFPWCxZQUFRLGFBUEc7QUFRWCxZQUFRLFdBUkc7QUFTWCxZQUFRLFVBVEc7QUFVWCxZQUFRLGNBVkc7QUFXWCxZQUFRLFdBWEc7QUFZWCxZQUFRLGdCQVpHO0FBYVgsWUFBUSxhQWJHO0FBY1gsWUFBUSxtQkFkRztBQWVYLFlBQVEsa0JBZkc7QUFnQlgsWUFBUSxjQWhCRztBQWlCWCxZQUFRLGtCQWpCRztBQWtCWCxZQUFRLGFBbEJHO0FBbUJYLFlBQVEsWUFuQkc7QUFvQlgsWUFBUSxNQXBCRztBQXFCWCxZQUFRLGdCQXJCRztBQXNCWCxZQUFRLGdCQXRCRztBQXVCWCxZQUFRLE9BdkJHO0FBd0JYLFlBQVEsZ0JBeEJHO0FBeUJYLFlBQVEsYUF6Qkc7QUEwQlgsWUFBUSwyQkExQkc7QUEyQlgsWUFBUSxxQkEzQkc7QUE0QlgsWUFBUSxnQkE1Qkc7QUE2QlgsWUFBUSxjQTdCRztBQThCWCxZQUFRLGlCQTlCRztBQStCWCxZQUFRLFVBL0JHO0FBZ0NYLFlBQVEsaUJBaENHO0FBaUNYLFlBQVEsY0FqQ0c7QUFrQ1gsWUFBUSxhQWxDRztBQW1DWCxZQUFRLGVBbkNHO0FBb0NYLFlBQVEsYUFwQ0c7QUFxQ1gsWUFBUSxhQXJDRztBQXVDWDtBQUNBLFlBQVEsYUF4Q0c7QUF5Q1gsWUFBUSxjQXpDRztBQTBDWCxZQUFRLFVBMUNHO0FBMkNYLFlBQVEsd0JBM0NHO0FBNENYLFlBQVEsUUE1Q0c7QUE2Q1gsWUFBUSxtQkE3Q0c7QUE4Q1gsWUFBUSxjQTlDRztBQStDWCxZQUFRLFVBL0NHO0FBZ0RYLFlBQVEsZUFoREc7QUFpRFgsWUFBUSxTQWpERztBQWtEWCxZQUFRLFlBbERHO0FBbURYLFlBQVEsVUFuREc7QUFvRFgsWUFBUSxZQXBERztBQXFEWCxZQUFRLFdBckRHO0FBc0RYLFlBQVEsdUJBdERHO0FBdURYLFlBQVEscUJBdkRHO0FBd0RYLFlBQVEsY0F4REc7QUF5RFgsWUFBUSxnQkF6REc7QUEwRFgsWUFBUSxTQTFERztBQTJEWCxZQUFRLFdBM0RHO0FBNERYLFlBQVEsV0E1REc7QUE2RFgsWUFBUSxnQkE3REc7QUE4RFgsWUFBUSxZQTlERztBQStEWCxZQUFRLGFBL0RHO0FBZ0VYLFlBQVEsV0FoRUc7QUFpRVgsWUFBUSxrQkFqRUc7QUFrRVgsWUFBUSxZQWxFRztBQW1FWCxZQUFRLGdCQW5FRztBQW9FWCxZQUFRLFdBcEVHO0FBcUVYLFlBQVEsbUJBckVHO0FBc0VYLFlBQVEsa0JBdEVHO0FBdUVYLFlBQVEsa0JBdkVHO0FBd0VYLFlBQVEsZ0JBeEVHO0FBeUVYLFlBQVEsV0F6RUc7QUEyRVg7QUFDQSxZQUFRLGVBNUVHO0FBNkVYLFlBQVEsWUE3RUc7QUE4RVgsWUFBUSxtQkE5RUc7QUErRVgsWUFBUSxrQkEvRUc7QUFnRlgsWUFBUSxVQWhGRztBQWlGWCxZQUFRLGFBakZHO0FBa0ZYLFlBQVEsY0FsRkc7QUFtRlgsWUFBUSxZQW5GRztBQW9GWCxZQUFRLE9BcEZHO0FBcUZYLFlBQVEsaUJBckZHO0FBc0ZYLFlBQVEsU0F0Rkc7QUF1RlgsWUFBUSxlQXZGRztBQXdGWCxZQUFRLGFBeEZHO0FBeUZYLFlBQVEsV0F6Rkc7QUEwRlgsWUFBUSxtQkExRkc7QUEyRlgsWUFBUSxhQTNGRztBQTZGWDtBQUNBLFlBQVEsTUE5Rkc7QUFnR1g7QUFDQSxZQUFRLGFBakdHO0FBbUdYO0FBQ0EsWUFBUSxLQXBHRztBQXNHWDtBQUNBLFlBQVEsZUF2R0c7QUF3R1gsWUFBUSxhQXhHRztBQTBHWDtBQUNBLFlBQVE7QUEzR0csR0FyaEJ1QjtBQW1vQnRDSixFQUFBQSxjQUFjLEVBQUU7QUFDWixZQUFRLE1BREk7QUFFWixZQUFRLE9BRkk7QUFHWixZQUFRLE9BSEk7QUFJWixZQUFRLE1BSkk7QUFLWixZQUFRLFVBTEk7QUFNWixZQUFRLE9BTkk7QUFPWixZQUFRLFdBUEk7QUFRWixZQUFRLFFBUkk7QUFTWixZQUFRLE9BVEk7QUFVWixZQUFRLFdBVkk7QUFXWixZQUFRLE9BWEk7QUFZWixZQUFRO0FBWkk7QUFub0JzQixDQUExQztBQW1wQkE0SCxNQUFNLENBQUNDLE9BQVAsR0FBaUJsSixVQUFqQiIsInNvdXJjZXNDb250ZW50IjpbIi8qKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqXG4gQ29weXJpZ2h0IChjKSAyMDExIEdvcmRvbiBQLiBIZW1zbGV5XG4gaHR0cDovL2dwaGVtc2xleS5vcmcvXG5cbiBDb3B5cmlnaHQgKGMpIDIwMDgtMjAxMCBSaWNhcmRvIFF1ZXNhZGFcbiBDb3B5cmlnaHQgKGMpIDIwMTEtMjAxMiBjb2NvczJkLXgub3JnXG4gQ29weXJpZ2h0IChjKSAyMDEzLTIwMTYgQ2h1a29uZyBUZWNobm9sb2dpZXMgSW5jLlxuIENvcHlyaWdodCAoYykgMjAxNy0yMDE4IFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLlxuXG4gaHR0cHM6Ly93d3cuY29jb3MuY29tL1xuXG4gUGVybWlzc2lvbiBpcyBoZXJlYnkgZ3JhbnRlZCwgZnJlZSBvZiBjaGFyZ2UsIHRvIGFueSBwZXJzb24gb2J0YWluaW5nIGEgY29weVxuIG9mIHRoaXMgc29mdHdhcmUgYW5kIGFzc29jaWF0ZWQgZW5naW5lIHNvdXJjZSBjb2RlICh0aGUgXCJTb2Z0d2FyZVwiKSwgYSBsaW1pdGVkLFxuIHdvcmxkd2lkZSwgcm95YWx0eS1mcmVlLCBub24tYXNzaWduYWJsZSwgcmV2b2NhYmxlIGFuZCBub24tZXhjbHVzaXZlIGxpY2Vuc2VcbiB0byB1c2UgQ29jb3MgQ3JlYXRvciBzb2xlbHkgdG8gZGV2ZWxvcCBnYW1lcyBvbiB5b3VyIHRhcmdldCBwbGF0Zm9ybXMuIFlvdSBzaGFsbFxuIG5vdCB1c2UgQ29jb3MgQ3JlYXRvciBzb2Z0d2FyZSBmb3IgZGV2ZWxvcGluZyBvdGhlciBzb2Z0d2FyZSBvciB0b29scyB0aGF0J3NcbiB1c2VkIGZvciBkZXZlbG9waW5nIGdhbWVzLiBZb3UgYXJlIG5vdCBncmFudGVkIHRvIHB1Ymxpc2gsIGRpc3RyaWJ1dGUsXG4gc3VibGljZW5zZSwgYW5kL29yIHNlbGwgY29waWVzIG9mIENvY29zIENyZWF0b3IuXG5cbiBUaGUgc29mdHdhcmUgb3IgdG9vbHMgaW4gdGhpcyBMaWNlbnNlIEFncmVlbWVudCBhcmUgbGljZW5zZWQsIG5vdCBzb2xkLlxuIFhpYW1lbiBZYWppIFNvZnR3YXJlIENvLiwgTHRkLiByZXNlcnZlcyBhbGwgcmlnaHRzIG5vdCBleHByZXNzbHkgZ3JhbnRlZCB0byB5b3UuXG5cbiBUSEUgU09GVFdBUkUgSVMgUFJPVklERUQgXCJBUyBJU1wiLCBXSVRIT1VUIFdBUlJBTlRZIE9GIEFOWSBLSU5ELCBFWFBSRVNTIE9SXG4gSU1QTElFRCwgSU5DTFVESU5HIEJVVCBOT1QgTElNSVRFRCBUTyBUSEUgV0FSUkFOVElFUyBPRiBNRVJDSEFOVEFCSUxJVFksXG4gRklUTkVTUyBGT1IgQSBQQVJUSUNVTEFSIFBVUlBPU0UgQU5EIE5PTklORlJJTkdFTUVOVC4gSU4gTk8gRVZFTlQgU0hBTEwgVEhFXG4gQVVUSE9SUyBPUiBDT1BZUklHSFQgSE9MREVSUyBCRSBMSUFCTEUgRk9SIEFOWSBDTEFJTSwgREFNQUdFUyBPUiBPVEhFUlxuIExJQUJJTElUWSwgV0hFVEhFUiBJTiBBTiBBQ1RJT04gT0YgQ09OVFJBQ1QsIFRPUlQgT1IgT1RIRVJXSVNFLCBBUklTSU5HIEZST00sXG4gT1VUIE9GIE9SIElOIENPTk5FQ1RJT04gV0lUSCBUSEUgU09GVFdBUkUgT1IgVEhFIFVTRSBPUiBPVEhFUiBERUFMSU5HUyBJTlxuIFRIRSBTT0ZUV0FSRS5cbiAqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqKioqL1xuXG5jb25zdCBkZWJ1ZyA9IHJlcXVpcmUoJy4uL2NvcmUvQ0NEZWJ1ZycpO1xuXG4vKipcbiAqIGNjLnRpZmZSZWFkZXIgaXMgYSBzaW5nbGV0b24gb2JqZWN0LCBpdCdzIGEgdGlmZiBmaWxlIHJlYWRlciwgaXQgY2FuIHBhcnNlIGJ5dGUgYXJyYXkgdG8gZHJhdyBpbnRvIGEgY2FudmFzXG4gKiBAY2xhc3NcbiAqIEBuYW1lIHRpZmZSZWFkZXJcbiAqL1xudmFyIHRpZmZSZWFkZXIgPSAvKiogQGxlbmRzIHRpZmZSZWFkZXIjICove1xuICAgIF9saXR0bGVFbmRpYW46IGZhbHNlLFxuICAgIF90aWZmRGF0YTogbnVsbCxcbiAgICBfZmlsZURpcmVjdG9yaWVzOiBbXSxcblxuICAgIGdldFVpbnQ4OiBmdW5jdGlvbiAob2Zmc2V0KSB7XG4gICAgICAgIHJldHVybiB0aGlzLl90aWZmRGF0YVtvZmZzZXRdO1xuICAgIH0sXG5cbiAgICBnZXRVaW50MTY6IGZ1bmN0aW9uIChvZmZzZXQpIHtcbiAgICAgICAgaWYgKHRoaXMuX2xpdHRsZUVuZGlhbilcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fdGlmZkRhdGFbb2Zmc2V0ICsgMV0gPDwgOCkgfCAodGhpcy5fdGlmZkRhdGFbb2Zmc2V0XSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAodGhpcy5fdGlmZkRhdGFbb2Zmc2V0XSA8PCA4KSB8ICh0aGlzLl90aWZmRGF0YVtvZmZzZXQgKyAxXSk7XG4gICAgfSxcblxuICAgIGdldFVpbnQzMjogZnVuY3Rpb24gKG9mZnNldCkge1xuICAgICAgICB2YXIgYSA9IHRoaXMuX3RpZmZEYXRhO1xuICAgICAgICBpZiAodGhpcy5fbGl0dGxlRW5kaWFuKVxuICAgICAgICAgICAgcmV0dXJuIChhW29mZnNldCArIDNdIDw8IDI0KSB8IChhW29mZnNldCArIDJdIDw8IDE2KSB8IChhW29mZnNldCArIDFdIDw8IDgpIHwgKGFbb2Zmc2V0XSk7XG4gICAgICAgIGVsc2VcbiAgICAgICAgICAgIHJldHVybiAoYVtvZmZzZXRdIDw8IDI0KSB8IChhW29mZnNldCArIDFdIDw8IDE2KSB8IChhW29mZnNldCArIDJdIDw8IDgpIHwgKGFbb2Zmc2V0ICsgM10pO1xuICAgIH0sXG5cbiAgICBjaGVja0xpdHRsZUVuZGlhbjogZnVuY3Rpb24gKCkge1xuICAgICAgICB2YXIgQk9NID0gdGhpcy5nZXRVaW50MTYoMCk7XG5cbiAgICAgICAgaWYgKEJPTSA9PT0gMHg0OTQ5KSB7XG4gICAgICAgICAgICB0aGlzLmxpdHRsZUVuZGlhbiA9IHRydWU7XG4gICAgICAgIH0gZWxzZSBpZiAoQk9NID09PSAweDRENEQpIHtcbiAgICAgICAgICAgIHRoaXMubGl0dGxlRW5kaWFuID0gZmFsc2U7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjb25zb2xlLmxvZyhCT00pO1xuICAgICAgICAgICAgdGhyb3cgVHlwZUVycm9yKGRlYnVnLmdldEVycm9yKDYwMTkpKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0aGlzLmxpdHRsZUVuZGlhbjtcbiAgICB9LFxuXG4gICAgaGFzVG93ZWw6IGZ1bmN0aW9uICgpIHtcbiAgICAgICAgLy8gQ2hlY2sgZm9yIHRvd2VsLlxuICAgICAgICBpZiAodGhpcy5nZXRVaW50MTYoMikgIT09IDQyKSB7XG4gICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKGRlYnVnLmdldEVycm9yKDYwMjApKTtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH0sXG5cbiAgICBnZXRGaWVsZFR5cGVOYW1lOiBmdW5jdGlvbiAoZmllbGRUeXBlKSB7XG4gICAgICAgIHZhciB0eXBlTmFtZXMgPSB0aGlzLmZpZWxkVHlwZU5hbWVzO1xuICAgICAgICBpZiAoZmllbGRUeXBlIGluIHR5cGVOYW1lcykge1xuICAgICAgICAgICAgcmV0dXJuIHR5cGVOYW1lc1tmaWVsZFR5cGVdO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgIH0sXG5cbiAgICBnZXRGaWVsZFRhZ05hbWU6IGZ1bmN0aW9uIChmaWVsZFRhZykge1xuICAgICAgICB2YXIgdGFnTmFtZXMgPSB0aGlzLmZpZWxkVGFnTmFtZXM7XG5cbiAgICAgICAgaWYgKGZpZWxkVGFnIGluIHRhZ05hbWVzKSB7XG4gICAgICAgICAgICByZXR1cm4gdGFnTmFtZXNbZmllbGRUYWddO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2MubG9nSUQoNjAyMSwgZmllbGRUYWcpO1xuICAgICAgICAgICAgcmV0dXJuIFwiVGFnXCIgKyBmaWVsZFRhZztcbiAgICAgICAgfVxuICAgIH0sXG5cbiAgICBnZXRGaWVsZFR5cGVMZW5ndGg6IGZ1bmN0aW9uIChmaWVsZFR5cGVOYW1lKSB7XG4gICAgICAgIGlmIChbJ0JZVEUnLCAnQVNDSUknLCAnU0JZVEUnLCAnVU5ERUZJTkVEJ10uaW5kZXhPZihmaWVsZFR5cGVOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICB9IGVsc2UgaWYgKFsnU0hPUlQnLCAnU1NIT1JUJ10uaW5kZXhPZihmaWVsZFR5cGVOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIHJldHVybiAyO1xuICAgICAgICB9IGVsc2UgaWYgKFsnTE9ORycsICdTTE9ORycsICdGTE9BVCddLmluZGV4T2YoZmllbGRUeXBlTmFtZSkgIT09IC0xKSB7XG4gICAgICAgICAgICByZXR1cm4gNDtcbiAgICAgICAgfSBlbHNlIGlmIChbJ1JBVElPTkFMJywgJ1NSQVRJT05BTCcsICdET1VCTEUnXS5pbmRleE9mKGZpZWxkVHlwZU5hbWUpICE9PSAtMSkge1xuICAgICAgICAgICAgcmV0dXJuIDg7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfSxcblxuICAgIGdldEZpZWxkVmFsdWVzOiBmdW5jdGlvbiAoZmllbGRUYWdOYW1lLCBmaWVsZFR5cGVOYW1lLCB0eXBlQ291bnQsIHZhbHVlT2Zmc2V0KSB7XG4gICAgICAgIHZhciBmaWVsZFZhbHVlcyA9IFtdO1xuICAgICAgICB2YXIgZmllbGRUeXBlTGVuZ3RoID0gdGhpcy5nZXRGaWVsZFR5cGVMZW5ndGgoZmllbGRUeXBlTmFtZSk7XG4gICAgICAgIHZhciBmaWVsZFZhbHVlU2l6ZSA9IGZpZWxkVHlwZUxlbmd0aCAqIHR5cGVDb3VudDtcblxuICAgICAgICBpZiAoZmllbGRWYWx1ZVNpemUgPD0gNCkge1xuICAgICAgICAgICAgLy8gVGhlIHZhbHVlIGlzIHN0b3JlZCBhdCB0aGUgYmlnIGVuZCBvZiB0aGUgdmFsdWVPZmZzZXQuXG4gICAgICAgICAgICBpZiAodGhpcy5saXR0bGVFbmRpYW4gPT09IGZhbHNlKVxuICAgICAgICAgICAgICAgIGZpZWxkVmFsdWVzLnB1c2godmFsdWVPZmZzZXQgPj4+ICgoNCAtIGZpZWxkVHlwZUxlbmd0aCkgKiA4KSk7XG4gICAgICAgICAgICBlbHNlXG4gICAgICAgICAgICAgICAgZmllbGRWYWx1ZXMucHVzaCh2YWx1ZU9mZnNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IHR5cGVDb3VudDsgaSsrKSB7XG4gICAgICAgICAgICAgICAgdmFyIGluZGV4T2Zmc2V0ID0gZmllbGRUeXBlTGVuZ3RoICogaTtcbiAgICAgICAgICAgICAgICBpZiAoZmllbGRUeXBlTGVuZ3RoID49IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgaWYgKFsnUkFUSU9OQUwnLCAnU1JBVElPTkFMJ10uaW5kZXhPZihmaWVsZFR5cGVOYW1lKSAhPT0gLTEpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIE51bWVyYXRvclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZXMucHVzaCh0aGlzLmdldFVpbnQzMih2YWx1ZU9mZnNldCArIGluZGV4T2Zmc2V0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEZW5vbWluYXRvclxuICAgICAgICAgICAgICAgICAgICAgICAgZmllbGRWYWx1ZXMucHVzaCh0aGlzLmdldFVpbnQzMih2YWx1ZU9mZnNldCArIGluZGV4T2Zmc2V0ICsgNCkpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgY2MubG9nSUQoODAwMCk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBmaWVsZFZhbHVlcy5wdXNoKHRoaXMuZ2V0Qnl0ZXMoZmllbGRUeXBlTGVuZ3RoLCB2YWx1ZU9mZnNldCArIGluZGV4T2Zmc2V0KSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKGZpZWxkVHlwZU5hbWUgPT09ICdBU0NJSScpIHtcbiAgICAgICAgICAgIGZpZWxkVmFsdWVzLmZvckVhY2goZnVuY3Rpb24gKGUsIGksIGEpIHtcbiAgICAgICAgICAgICAgICBhW2ldID0gU3RyaW5nLmZyb21DaGFyQ29kZShlKTtcbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICAgIHJldHVybiBmaWVsZFZhbHVlcztcbiAgICB9LFxuXG4gICAgZ2V0Qnl0ZXM6IGZ1bmN0aW9uIChudW1CeXRlcywgb2Zmc2V0KSB7XG4gICAgICAgIGlmIChudW1CeXRlcyA8PSAwKSB7XG4gICAgICAgICAgICBjYy5sb2dJRCg4MDAxKTtcbiAgICAgICAgfSBlbHNlIGlmIChudW1CeXRlcyA8PSAxKSB7XG4gICAgICAgICAgICByZXR1cm4gdGhpcy5nZXRVaW50OChvZmZzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKG51bUJ5dGVzIDw9IDIpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVpbnQxNihvZmZzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKG51bUJ5dGVzIDw9IDMpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVpbnQzMihvZmZzZXQpID4+PiA4O1xuICAgICAgICB9IGVsc2UgaWYgKG51bUJ5dGVzIDw9IDQpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLmdldFVpbnQzMihvZmZzZXQpO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY2MubG9nSUQoODAwMik7XG4gICAgICAgIH1cbiAgICB9LFxuXG4gICAgZ2V0Qml0czogZnVuY3Rpb24gKG51bUJpdHMsIGJ5dGVPZmZzZXQsIGJpdE9mZnNldCkge1xuICAgICAgICBiaXRPZmZzZXQgPSBiaXRPZmZzZXQgfHwgMDtcbiAgICAgICAgdmFyIGV4dHJhQnl0ZXMgPSBNYXRoLmZsb29yKGJpdE9mZnNldCAvIDgpO1xuICAgICAgICB2YXIgbmV3Qnl0ZU9mZnNldCA9IGJ5dGVPZmZzZXQgKyBleHRyYUJ5dGVzO1xuICAgICAgICB2YXIgdG90YWxCaXRzID0gYml0T2Zmc2V0ICsgbnVtQml0cztcbiAgICAgICAgdmFyIHNoaWZ0UmlnaHQgPSAzMiAtIG51bUJpdHM7XG4gICAgICAgIHZhciBzaGlmdExlZnQscmF3Qml0cztcblxuICAgICAgICBpZiAodG90YWxCaXRzIDw9IDApIHtcbiAgICAgICAgICAgIGNjLmxvZ0lEKDYwMjMpO1xuICAgICAgICB9IGVsc2UgaWYgKHRvdGFsQml0cyA8PSA4KSB7XG4gICAgICAgICAgICBzaGlmdExlZnQgPSAyNCArIGJpdE9mZnNldDtcbiAgICAgICAgICAgIHJhd0JpdHMgPSB0aGlzLmdldFVpbnQ4KG5ld0J5dGVPZmZzZXQpO1xuICAgICAgICB9IGVsc2UgaWYgKHRvdGFsQml0cyA8PSAxNikge1xuICAgICAgICAgICAgc2hpZnRMZWZ0ID0gMTYgKyBiaXRPZmZzZXQ7XG4gICAgICAgICAgICByYXdCaXRzID0gdGhpcy5nZXRVaW50MTYobmV3Qnl0ZU9mZnNldCk7XG4gICAgICAgIH0gZWxzZSBpZiAodG90YWxCaXRzIDw9IDMyKSB7XG4gICAgICAgICAgICBzaGlmdExlZnQgPSBiaXRPZmZzZXQ7XG4gICAgICAgICAgICByYXdCaXRzID0gdGhpcy5nZXRVaW50MzIobmV3Qnl0ZU9mZnNldCk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5sb2dJRCg2MDIyKTtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAnYml0cyc6ICgocmF3Qml0cyA8PCBzaGlmdExlZnQpID4+PiBzaGlmdFJpZ2h0KSxcbiAgICAgICAgICAgICdieXRlT2Zmc2V0JzogbmV3Qnl0ZU9mZnNldCArIE1hdGguZmxvb3IodG90YWxCaXRzIC8gOCksXG4gICAgICAgICAgICAnYml0T2Zmc2V0JzogdG90YWxCaXRzICUgOFxuICAgICAgICB9O1xuICAgIH0sXG5cbiAgICBwYXJzZUZpbGVEaXJlY3Rvcnk6IGZ1bmN0aW9uIChieXRlT2Zmc2V0KSB7XG4gICAgICAgIHZhciBudW1EaXJFbnRyaWVzID0gdGhpcy5nZXRVaW50MTYoYnl0ZU9mZnNldCk7XG4gICAgICAgIHZhciB0aWZmRmllbGRzID0gW107XG5cbiAgICAgICAgZm9yICh2YXIgaSA9IGJ5dGVPZmZzZXQgKyAyLCBlbnRyeUNvdW50ID0gMDsgZW50cnlDb3VudCA8IG51bURpckVudHJpZXM7IGkgKz0gMTIsIGVudHJ5Q291bnQrKykge1xuICAgICAgICAgICAgdmFyIGZpZWxkVGFnID0gdGhpcy5nZXRVaW50MTYoaSk7XG4gICAgICAgICAgICB2YXIgZmllbGRUeXBlID0gdGhpcy5nZXRVaW50MTYoaSArIDIpO1xuICAgICAgICAgICAgdmFyIHR5cGVDb3VudCA9IHRoaXMuZ2V0VWludDMyKGkgKyA0KTtcbiAgICAgICAgICAgIHZhciB2YWx1ZU9mZnNldCA9IHRoaXMuZ2V0VWludDMyKGkgKyA4KTtcblxuICAgICAgICAgICAgdmFyIGZpZWxkVGFnTmFtZSA9IHRoaXMuZ2V0RmllbGRUYWdOYW1lKGZpZWxkVGFnKTtcbiAgICAgICAgICAgIHZhciBmaWVsZFR5cGVOYW1lID0gdGhpcy5nZXRGaWVsZFR5cGVOYW1lKGZpZWxkVHlwZSk7XG4gICAgICAgICAgICB2YXIgZmllbGRWYWx1ZXMgPSB0aGlzLmdldEZpZWxkVmFsdWVzKGZpZWxkVGFnTmFtZSwgZmllbGRUeXBlTmFtZSwgdHlwZUNvdW50LCB2YWx1ZU9mZnNldCk7XG5cbiAgICAgICAgICAgIHRpZmZGaWVsZHNbZmllbGRUYWdOYW1lXSA9IHsgdHlwZTogZmllbGRUeXBlTmFtZSwgdmFsdWVzOiBmaWVsZFZhbHVlcyB9O1xuICAgICAgICB9XG5cbiAgICAgICAgdGhpcy5fZmlsZURpcmVjdG9yaWVzLnB1c2godGlmZkZpZWxkcyk7XG5cbiAgICAgICAgdmFyIG5leHRJRkRCeXRlT2Zmc2V0ID0gdGhpcy5nZXRVaW50MzIoaSk7XG4gICAgICAgIGlmIChuZXh0SUZEQnl0ZU9mZnNldCAhPT0gMHgwMDAwMDAwMCkge1xuICAgICAgICAgICAgdGhpcy5wYXJzZUZpbGVEaXJlY3RvcnkobmV4dElGREJ5dGVPZmZzZXQpO1xuICAgICAgICB9XG4gICAgfSxcblxuICAgIGNsYW1wQ29sb3JTYW1wbGU6IGZ1bmN0aW9uKGNvbG9yU2FtcGxlLCBiaXRzUGVyU2FtcGxlKSB7XG4gICAgICAgIHZhciBtdWx0aXBsaWVyID0gTWF0aC5wb3coMiwgOCAtIGJpdHNQZXJTYW1wbGUpO1xuXG4gICAgICAgIHJldHVybiBNYXRoLmZsb29yKChjb2xvclNhbXBsZSAqIG11bHRpcGxpZXIpICsgKG11bHRpcGxpZXIgLSAxKSk7XG4gICAgfSxcblxuICAgIC8qKlxuICAgICAqIEBmdW5jdGlvblxuICAgICAqIEBwYXJhbSB7QXJyYXl9IHRpZmZEYXRhXG4gICAgICogQHBhcmFtIHtIVE1MQ2FudmFzRWxlbWVudH0gY2FudmFzXG4gICAgICogQHJldHVybnMgeyp9XG4gICAgICovXG4gICAgcGFyc2VUSUZGOiBmdW5jdGlvbiAodGlmZkRhdGEsIGNhbnZhcykge1xuICAgICAgICBjYW52YXMgPSBjYW52YXMgfHwgZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnY2FudmFzJyk7XG5cbiAgICAgICAgdGhpcy5fdGlmZkRhdGEgPSB0aWZmRGF0YTtcbiAgICAgICAgdGhpcy5jYW52YXMgPSBjYW52YXM7XG5cbiAgICAgICAgdGhpcy5jaGVja0xpdHRsZUVuZGlhbigpO1xuXG4gICAgICAgIGlmICghdGhpcy5oYXNUb3dlbCgpKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICB2YXIgZmlyc3RJRkRCeXRlT2Zmc2V0ID0gdGhpcy5nZXRVaW50MzIoNCk7XG5cbiAgICAgICAgdGhpcy5fZmlsZURpcmVjdG9yaWVzLmxlbmd0aCA9IDA7XG4gICAgICAgIHRoaXMucGFyc2VGaWxlRGlyZWN0b3J5KGZpcnN0SUZEQnl0ZU9mZnNldCk7XG5cbiAgICAgICAgdmFyIGZpbGVEaXJlY3RvcnkgPSB0aGlzLl9maWxlRGlyZWN0b3JpZXNbMF07XG5cbiAgICAgICAgdmFyIGltYWdlV2lkdGggPSBmaWxlRGlyZWN0b3J5WydJbWFnZVdpZHRoJ10udmFsdWVzWzBdO1xuICAgICAgICB2YXIgaW1hZ2VMZW5ndGggPSBmaWxlRGlyZWN0b3J5WydJbWFnZUxlbmd0aCddLnZhbHVlc1swXTtcblxuICAgICAgICB0aGlzLmNhbnZhcy53aWR0aCA9IGltYWdlV2lkdGg7XG4gICAgICAgIHRoaXMuY2FudmFzLmhlaWdodCA9IGltYWdlTGVuZ3RoO1xuXG4gICAgICAgIHZhciBzdHJpcHMgPSBbXTtcblxuICAgICAgICB2YXIgY29tcHJlc3Npb24gPSAoZmlsZURpcmVjdG9yeVsnQ29tcHJlc3Npb24nXSkgPyBmaWxlRGlyZWN0b3J5WydDb21wcmVzc2lvbiddLnZhbHVlc1swXSA6IDE7XG5cbiAgICAgICAgdmFyIHNhbXBsZXNQZXJQaXhlbCA9IGZpbGVEaXJlY3RvcnlbJ1NhbXBsZXNQZXJQaXhlbCddLnZhbHVlc1swXTtcblxuICAgICAgICB2YXIgc2FtcGxlUHJvcGVydGllcyA9IFtdO1xuXG4gICAgICAgIHZhciBiaXRzUGVyUGl4ZWwgPSAwO1xuICAgICAgICB2YXIgaGFzQnl0ZXNQZXJQaXhlbCA9IGZhbHNlO1xuXG4gICAgICAgIGZpbGVEaXJlY3RvcnlbJ0JpdHNQZXJTYW1wbGUnXS52YWx1ZXMuZm9yRWFjaChmdW5jdGlvbiAoYml0c1BlclNhbXBsZSwgaSwgYml0c1BlclNhbXBsZVZhbHVlcykge1xuICAgICAgICAgICAgc2FtcGxlUHJvcGVydGllc1tpXSA9IHtcbiAgICAgICAgICAgICAgICBiaXRzUGVyU2FtcGxlOiBiaXRzUGVyU2FtcGxlLFxuICAgICAgICAgICAgICAgIGhhc0J5dGVzUGVyU2FtcGxlOiBmYWxzZSxcbiAgICAgICAgICAgICAgICBieXRlc1BlclNhbXBsZTogdW5kZWZpbmVkXG4gICAgICAgICAgICB9O1xuXG4gICAgICAgICAgICBpZiAoKGJpdHNQZXJTYW1wbGUgJSA4KSA9PT0gMCkge1xuICAgICAgICAgICAgICAgIHNhbXBsZVByb3BlcnRpZXNbaV0uaGFzQnl0ZXNQZXJTYW1wbGUgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHNhbXBsZVByb3BlcnRpZXNbaV0uYnl0ZXNQZXJTYW1wbGUgPSBiaXRzUGVyU2FtcGxlIC8gODtcbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgYml0c1BlclBpeGVsICs9IGJpdHNQZXJTYW1wbGU7XG4gICAgICAgIH0sIHRoaXMpO1xuXG4gICAgICAgIGlmICgoYml0c1BlclBpeGVsICUgOCkgPT09IDApIHtcbiAgICAgICAgICAgIGhhc0J5dGVzUGVyUGl4ZWwgPSB0cnVlO1xuICAgICAgICAgICAgdmFyIGJ5dGVzUGVyUGl4ZWwgPSBiaXRzUGVyUGl4ZWwgLyA4O1xuICAgICAgICB9XG5cbiAgICAgICAgdmFyIHN0cmlwT2Zmc2V0VmFsdWVzID0gZmlsZURpcmVjdG9yeVsnU3RyaXBPZmZzZXRzJ10udmFsdWVzO1xuICAgICAgICB2YXIgbnVtU3RyaXBPZmZzZXRWYWx1ZXMgPSBzdHJpcE9mZnNldFZhbHVlcy5sZW5ndGg7XG5cbiAgICAgICAgLy8gU3RyaXBCeXRlQ291bnRzIGlzIHN1cHBvc2VkIHRvIGJlIHJlcXVpcmVkLCBidXQgc2VlIGlmIHdlIGNhbiByZWNvdmVyIGFueXdheS5cbiAgICAgICAgaWYgKGZpbGVEaXJlY3RvcnlbJ1N0cmlwQnl0ZUNvdW50cyddKSB7XG4gICAgICAgICAgICB2YXIgc3RyaXBCeXRlQ291bnRWYWx1ZXMgPSBmaWxlRGlyZWN0b3J5WydTdHJpcEJ5dGVDb3VudHMnXS52YWx1ZXM7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBjYy5sb2dJRCg4MDAzKTtcblxuICAgICAgICAgICAgLy8gSW5mZXIgU3RyaXBCeXRlQ291bnRzLCBpZiBwb3NzaWJsZS5cbiAgICAgICAgICAgIGlmIChudW1TdHJpcE9mZnNldFZhbHVlcyA9PT0gMSkge1xuICAgICAgICAgICAgICAgIHZhciBzdHJpcEJ5dGVDb3VudFZhbHVlcyA9IFtNYXRoLmNlaWwoKGltYWdlV2lkdGggKiBpbWFnZUxlbmd0aCAqIGJpdHNQZXJQaXhlbCkgLyA4KV07XG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGRlYnVnLmdldEVycm9yKDYwMjQpKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIExvb3AgdGhyb3VnaCBzdHJpcHMgYW5kIGRlY29tcHJlc3MgYXMgbmVjZXNzYXJ5LlxuICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVN0cmlwT2Zmc2V0VmFsdWVzOyBpKyspIHtcbiAgICAgICAgICAgIHZhciBzdHJpcE9mZnNldCA9IHN0cmlwT2Zmc2V0VmFsdWVzW2ldO1xuICAgICAgICAgICAgc3RyaXBzW2ldID0gW107XG5cbiAgICAgICAgICAgIHZhciBzdHJpcEJ5dGVDb3VudCA9IHN0cmlwQnl0ZUNvdW50VmFsdWVzW2ldO1xuXG4gICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggcGl4ZWxzLlxuICAgICAgICAgICAgZm9yICh2YXIgYnl0ZU9mZnNldCA9IDAsIGJpdE9mZnNldCA9IDAsIGpJbmNyZW1lbnQgPSAxLCBnZXRIZWFkZXIgPSB0cnVlLCBwaXhlbCA9IFtdLCBudW1CeXRlcyA9IDAsIHNhbXBsZSA9IDAsIGN1cnJlbnRTYW1wbGUgPSAwO1xuICAgICAgICAgICAgICAgICBieXRlT2Zmc2V0IDwgc3RyaXBCeXRlQ291bnQ7IGJ5dGVPZmZzZXQgKz0gakluY3JlbWVudCkge1xuICAgICAgICAgICAgICAgIC8vIERlY29tcHJlc3Mgc3RyaXAuXG4gICAgICAgICAgICAgICAgc3dpdGNoIChjb21wcmVzc2lvbikge1xuICAgICAgICAgICAgICAgICAgICAvLyBVbmNvbXByZXNzZWRcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAxOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIHNhbXBsZXMgKHN1Yi1waXhlbHMpLlxuICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgbSA9IDAsIHBpeGVsID0gW107IG0gPCBzYW1wbGVzUGVyUGl4ZWw7IG0rKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYW1wbGVQcm9wZXJ0aWVzW21dLmhhc0J5dGVzUGVyU2FtcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhYWDogVGhpcyBpcyB3cm9uZyFcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNhbXBsZU9mZnNldCA9IHNhbXBsZVByb3BlcnRpZXNbbV0uYnl0ZXNQZXJTYW1wbGUgKiBtO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXhlbC5wdXNoKHRoaXMuZ2V0Qnl0ZXMoc2FtcGxlUHJvcGVydGllc1ttXS5ieXRlc1BlclNhbXBsZSwgc3RyaXBPZmZzZXQgKyBieXRlT2Zmc2V0ICsgc2FtcGxlT2Zmc2V0KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHNhbXBsZUluZm8gPSB0aGlzLmdldEJpdHMoc2FtcGxlUHJvcGVydGllc1ttXS5iaXRzUGVyU2FtcGxlLCBzdHJpcE9mZnNldCArIGJ5dGVPZmZzZXQsIGJpdE9mZnNldCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHBpeGVsLnB1c2goc2FtcGxlSW5mby5iaXRzKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnl0ZU9mZnNldCA9IHNhbXBsZUluZm8uYnl0ZU9mZnNldCAtIHN0cmlwT2Zmc2V0O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBiaXRPZmZzZXQgPSBzYW1wbGVJbmZvLmJpdE9mZnNldDtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKGRlYnVnLmdldEVycm9yKDYwMjUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN0cmlwc1tpXS5wdXNoKHBpeGVsKTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGhhc0J5dGVzUGVyUGl4ZWwpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBqSW5jcmVtZW50ID0gYnl0ZXNQZXJQaXhlbDtcbiAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgakluY3JlbWVudCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdGhyb3cgUmFuZ2VFcnJvcihkZWJ1Zy5nZXRFcnJvcig2MDI2KSk7XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAvLyBDSVRUIEdyb3VwIDMgMS1EaW1lbnNpb25hbCBNb2RpZmllZCBIdWZmbWFuIHJ1bi1sZW5ndGggZW5jb2RpbmdcbiAgICAgICAgICAgICAgICAgICAgY2FzZSAyOlxuICAgICAgICAgICAgICAgICAgICAgICAgLy8gWFhYOiBVc2UgUERGLmpzIGNvZGU/XG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcblxuICAgICAgICAgICAgICAgICAgICAvLyBHcm91cCAzIEZheFxuICAgICAgICAgICAgICAgICAgICBjYXNlIDM6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBYWFg6IFVzZSBQREYuanMgY29kZT9cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIEdyb3VwIDQgRmF4XG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNDpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhYWDogVXNlIFBERi5qcyBjb2RlP1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gTFpXXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgNTpcbiAgICAgICAgICAgICAgICAgICAgICAgIC8vIFhYWDogVXNlIFBERi5qcyBjb2RlP1xuICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgLy8gT2xkLXN0eWxlIEpQRUcgKFRJRkYgNi4wKVxuICAgICAgICAgICAgICAgICAgICBjYXNlIDY6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBYWFg6IFVzZSBQREYuanMgY29kZT9cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIE5ldy1zdHlsZSBKUEVHIChUSUZGIFNwZWNpZmljYXRpb24gU3VwcGxlbWVudCAyKVxuICAgICAgICAgICAgICAgICAgICBjYXNlIDc6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBYWFg6IFVzZSBQREYuanMgY29kZT9cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFBhY2tCaXRzXG4gICAgICAgICAgICAgICAgICAgIGNhc2UgMzI3NzM6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBBcmUgd2UgcmVhZHkgZm9yIGEgbmV3IGJsb2NrP1xuICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGdldEhlYWRlcikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEhlYWRlciA9IGZhbHNlO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJsb2NrTGVuZ3RoID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaXRlcmF0aW9ucyA9IDE7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBUaGUgaGVhZGVyIGJ5dGUgaXMgc2lnbmVkLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBoZWFkZXIgPSB0aGlzLmdldEludDgoc3RyaXBPZmZzZXQgKyBieXRlT2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmICgoaGVhZGVyID49IDApICYmIChoZWFkZXIgPD0gMTI3KSkgeyAvLyBOb3JtYWwgcGl4ZWxzLlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibG9ja0xlbmd0aCA9IGhlYWRlciArIDE7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfSBlbHNlIGlmICgoaGVhZGVyID49IC0xMjcpICYmIChoZWFkZXIgPD0gLTEpKSB7IC8vIENvbGxhcHNlZCBwaXhlbHMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGl0ZXJhdGlvbnMgPSAtaGVhZGVyICsgMTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2UgLyppZiAoaGVhZGVyID09PSAtMTI4KSovIHsgLy8gUGxhY2Vob2xkZXIgYnl0ZT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ2V0SGVhZGVyID0gdHJ1ZTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjdXJyZW50Qnl0ZSA9IHRoaXMuZ2V0VWludDgoc3RyaXBPZmZzZXQgKyBieXRlT2Zmc2V0KTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIER1cGxpY2F0ZSBieXRlcywgaWYgbmVjZXNzYXJ5LlxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGZvciAodmFyIG0gPSAwOyBtIDwgaXRlcmF0aW9uczsgbSsrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYW1wbGVQcm9wZXJ0aWVzW3NhbXBsZV0uaGFzQnl0ZXNQZXJTYW1wbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIFdlJ3JlIHJlYWRpbmcgb25lIGJ5dGUgYXQgYSB0aW1lLCBzbyB3ZSBuZWVkIHRvIGhhbmRsZSBtdWx0aS1ieXRlIHNhbXBsZXMuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBjdXJyZW50U2FtcGxlID0gKGN1cnJlbnRTYW1wbGUgPDwgKDggKiBudW1CeXRlcykpIHwgY3VycmVudEJ5dGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBudW1CeXRlcysrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJcyBvdXIgc2FtcGxlIGNvbXBsZXRlP1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKG51bUJ5dGVzID09PSBzYW1wbGVQcm9wZXJ0aWVzW3NhbXBsZV0uYnl0ZXNQZXJTYW1wbGUpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXhlbC5wdXNoKGN1cnJlbnRTYW1wbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGN1cnJlbnRTYW1wbGUgPSBudW1CeXRlcyA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlKys7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB0aHJvdyBSYW5nZUVycm9yKGRlYnVnLmdldEVycm9yKDYwMjUpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIElzIG91ciBwaXhlbCBjb21wbGV0ZT9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKHNhbXBsZSA9PT0gc2FtcGxlc1BlclBpeGVsKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBzdHJpcHNbaV0ucHVzaChwaXhlbCk7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBwaXhlbCA9IFtdO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgc2FtcGxlID0gMDtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJsb2NrTGVuZ3RoLS07XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJcyBvdXIgYmxvY2sgY29tcGxldGU/XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGJsb2NrTGVuZ3RoID09PSAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGdldEhlYWRlciA9IHRydWU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICBqSW5jcmVtZW50ID0gMTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgIC8vIFVua25vd24gY29tcHJlc3Npb24gYWxnb3JpdGhtXG4gICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAvLyBEbyBub3QgYXR0ZW1wdCB0byBwYXJzZSB0aGUgaW1hZ2UgZGF0YS5cbiAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGlmIChjYW52YXMuZ2V0Q29udGV4dCkge1xuICAgICAgICAgICAgdmFyIGN0eCA9IHRoaXMuY2FudmFzLmdldENvbnRleHQoXCIyZFwiKTtcblxuICAgICAgICAgICAgLy8gU2V0IGEgZGVmYXVsdCBmaWxsIHN0eWxlLlxuICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYSgyNTUsIDI1NSwgMjU1LCAwKVwiO1xuXG4gICAgICAgICAgICAvLyBJZiBSb3dzUGVyU3RyaXAgaXMgbWlzc2luZywgdGhlIHdob2xlIGltYWdlIGlzIGluIG9uZSBzdHJpcC5cbiAgICAgICAgICAgIHZhciByb3dzUGVyU3RyaXAgPSBmaWxlRGlyZWN0b3J5WydSb3dzUGVyU3RyaXAnXSA/IGZpbGVEaXJlY3RvcnlbJ1Jvd3NQZXJTdHJpcCddLnZhbHVlc1swXSA6IGltYWdlTGVuZ3RoO1xuXG4gICAgICAgICAgICB2YXIgbnVtU3RyaXBzID0gc3RyaXBzLmxlbmd0aDtcblxuICAgICAgICAgICAgdmFyIGltYWdlTGVuZ3RoTW9kUm93c1BlclN0cmlwID0gaW1hZ2VMZW5ndGggJSByb3dzUGVyU3RyaXA7XG4gICAgICAgICAgICB2YXIgcm93c0luTGFzdFN0cmlwID0gKGltYWdlTGVuZ3RoTW9kUm93c1BlclN0cmlwID09PSAwKSA/IHJvd3NQZXJTdHJpcCA6IGltYWdlTGVuZ3RoTW9kUm93c1BlclN0cmlwO1xuXG4gICAgICAgICAgICB2YXIgbnVtUm93c0luU3RyaXAgPSByb3dzUGVyU3RyaXA7XG4gICAgICAgICAgICB2YXIgbnVtUm93c0luUHJldmlvdXNTdHJpcCA9IDA7XG5cbiAgICAgICAgICAgIHZhciBwaG90b21ldHJpY0ludGVycHJldGF0aW9uID0gZmlsZURpcmVjdG9yeVsnUGhvdG9tZXRyaWNJbnRlcnByZXRhdGlvbiddLnZhbHVlc1swXTtcblxuICAgICAgICAgICAgdmFyIGV4dHJhU2FtcGxlc1ZhbHVlcyA9IFtdO1xuICAgICAgICAgICAgdmFyIG51bUV4dHJhU2FtcGxlcyA9IDA7XG5cbiAgICAgICAgICAgIGlmIChmaWxlRGlyZWN0b3J5WydFeHRyYVNhbXBsZXMnXSkge1xuICAgICAgICAgICAgICAgIGV4dHJhU2FtcGxlc1ZhbHVlcyA9IGZpbGVEaXJlY3RvcnlbJ0V4dHJhU2FtcGxlcyddLnZhbHVlcztcbiAgICAgICAgICAgICAgICBudW1FeHRyYVNhbXBsZXMgPSBleHRyYVNhbXBsZXNWYWx1ZXMubGVuZ3RoO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICBpZiAoZmlsZURpcmVjdG9yeVsnQ29sb3JNYXAnXSkge1xuICAgICAgICAgICAgICAgIHZhciBjb2xvck1hcFZhbHVlcyA9IGZpbGVEaXJlY3RvcnlbJ0NvbG9yTWFwJ10udmFsdWVzO1xuICAgICAgICAgICAgICAgIHZhciBjb2xvck1hcFNhbXBsZVNpemUgPSBNYXRoLnBvdygyLCBzYW1wbGVQcm9wZXJ0aWVzWzBdLmJpdHNQZXJTYW1wbGUpO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIHN0cmlwcyBpbiB0aGUgaW1hZ2UuXG4gICAgICAgICAgICBmb3IgKHZhciBpID0gMDsgaSA8IG51bVN0cmlwczsgaSsrKSB7XG4gICAgICAgICAgICAgICAgLy8gVGhlIGxhc3Qgc3RyaXAgbWF5IGJlIHNob3J0LlxuICAgICAgICAgICAgICAgIGlmICgoaSArIDEpID09PSBudW1TdHJpcHMpIHtcbiAgICAgICAgICAgICAgICAgICAgbnVtUm93c0luU3RyaXAgPSByb3dzSW5MYXN0U3RyaXA7XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgdmFyIG51bVBpeGVscyA9IHN0cmlwc1tpXS5sZW5ndGg7XG4gICAgICAgICAgICAgICAgdmFyIHlQYWRkaW5nID0gbnVtUm93c0luUHJldmlvdXNTdHJpcCAqIGk7XG5cbiAgICAgICAgICAgICAgICAvLyBMb29wIHRocm91Z2ggdGhlIHJvd3MgaW4gdGhlIHN0cmlwLlxuICAgICAgICAgICAgICAgIGZvciAodmFyIHkgPSAwLCBqID0gMDsgeSA8IG51bVJvd3NJblN0cmlwLCBqIDwgbnVtUGl4ZWxzOyB5KyspIHtcbiAgICAgICAgICAgICAgICAgICAgLy8gTG9vcCB0aHJvdWdoIHRoZSBwaXhlbHMgaW4gdGhlIHJvdy5cbiAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgeCA9IDA7IHggPCBpbWFnZVdpZHRoOyB4KyssIGorKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHBpeGVsU2FtcGxlcyA9IHN0cmlwc1tpXVtqXTtcblxuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIHJlZCA9IDA7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgZ3JlZW4gPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIGJsdWUgPSAwO1xuICAgICAgICAgICAgICAgICAgICAgICAgdmFyIG9wYWNpdHkgPSAxLjA7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIGlmIChudW1FeHRyYVNhbXBsZXMgPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgZm9yICh2YXIgayA9IDA7IGsgPCBudW1FeHRyYVNhbXBsZXM7IGsrKykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBpZiAoZXh0cmFTYW1wbGVzVmFsdWVzW2tdID09PSAxIHx8IGV4dHJhU2FtcGxlc1ZhbHVlc1trXSA9PT0gMikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQ2xhbXAgb3BhY2l0eSB0byB0aGUgcmFuZ2UgWzAsMV0uXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBvcGFjaXR5ID0gcGl4ZWxTYW1wbGVzWzMgKyBrXSAvIDI1NjtcblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgICAgICAgICAgIHN3aXRjaCAocGhvdG9tZXRyaWNJbnRlcnByZXRhdGlvbikge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8vIEJpbGV2ZWwgb3IgR3JheXNjYWxlXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gV2hpdGVJc1plcm9cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICBjYXNlIDA6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGlmIChzYW1wbGVQcm9wZXJ0aWVzWzBdLmhhc0J5dGVzUGVyU2FtcGxlKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICB2YXIgaW52ZXJ0VmFsdWUgPSBNYXRoLnBvdygweDEwLCBzYW1wbGVQcm9wZXJ0aWVzWzBdLmJ5dGVzUGVyU2FtcGxlICogMik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBJbnZlcnQgc2FtcGxlcy5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcGl4ZWxTYW1wbGVzLmZvckVhY2goZnVuY3Rpb24gKHNhbXBsZSwgaW5kZXgsIHNhbXBsZXMpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHNhbXBsZXNbaW5kZXhdID0gaW52ZXJ0VmFsdWUgLSBzYW1wbGU7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIH0pO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gQmlsZXZlbCBvciBHcmF5c2NhbGVcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBCbGFja0lzWmVyb1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMTpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkID0gZ3JlZW4gPSBibHVlID0gdGhpcy5jbGFtcENvbG9yU2FtcGxlKHBpeGVsU2FtcGxlc1swXSwgc2FtcGxlUHJvcGVydGllc1swXS5iaXRzUGVyU2FtcGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSR0IgRnVsbCBDb2xvclxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMjpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgcmVkID0gdGhpcy5jbGFtcENvbG9yU2FtcGxlKHBpeGVsU2FtcGxlc1swXSwgc2FtcGxlUHJvcGVydGllc1swXS5iaXRzUGVyU2FtcGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgZ3JlZW4gPSB0aGlzLmNsYW1wQ29sb3JTYW1wbGUocGl4ZWxTYW1wbGVzWzFdLCBzYW1wbGVQcm9wZXJ0aWVzWzFdLmJpdHNQZXJTYW1wbGUpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibHVlID0gdGhpcy5jbGFtcENvbG9yU2FtcGxlKHBpeGVsU2FtcGxlc1syXSwgc2FtcGxlUHJvcGVydGllc1syXS5iaXRzUGVyU2FtcGxlKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgYnJlYWs7XG5cbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAvLyBSR0IgQ29sb3IgUGFsZXR0ZVxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGNhc2UgMzpcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgaWYgKGNvbG9yTWFwVmFsdWVzID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IEVycm9yKGRlYnVnLmdldEVycm9yKDYwMjcpKTtcbiAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjb2xvck1hcEluZGV4ID0gcGl4ZWxTYW1wbGVzWzBdO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHJlZCA9IHRoaXMuY2xhbXBDb2xvclNhbXBsZShjb2xvck1hcFZhbHVlc1tjb2xvck1hcEluZGV4XSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBncmVlbiA9IHRoaXMuY2xhbXBDb2xvclNhbXBsZShjb2xvck1hcFZhbHVlc1tjb2xvck1hcFNhbXBsZVNpemUgKyBjb2xvck1hcEluZGV4XSwgMTYpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBibHVlID0gdGhpcy5jbGFtcENvbG9yU2FtcGxlKGNvbG9yTWFwVmFsdWVzWygyICogY29sb3JNYXBTYW1wbGVTaXplKSArIGNvbG9yTWFwSW5kZXhdLCAxNik7XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIGJyZWFrO1xuXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLy8gVW5rbm93biBQaG90b21ldHJpYyBJbnRlcnByZXRhdGlvblxuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGRlZmF1bHQ6XG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgIHRocm93IFJhbmdlRXJyb3IoZGVidWcuZ2V0RXJyb3IoNjAyOCwgcGhvdG9tZXRyaWNJbnRlcnByZXRhdGlvbikpO1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgICAgICAgICAgY3R4LmZpbGxTdHlsZSA9IFwicmdiYShcIiArIHJlZCArIFwiLCBcIiArIGdyZWVuICsgXCIsIFwiICsgYmx1ZSArIFwiLCBcIiArIG9wYWNpdHkgKyBcIilcIjtcbiAgICAgICAgICAgICAgICAgICAgICAgIGN0eC5maWxsUmVjdCh4LCB5UGFkZGluZyArIHksIDEsIDEpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgICAgbnVtUm93c0luUHJldmlvdXNTdHJpcCA9IG51bVJvd3NJblN0cmlwO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIHRoaXMuY2FudmFzO1xuICAgIH0sXG5cbiAgICAvLyBTZWU6IGh0dHA6Ly93d3cuZGlnaXRpemF0aW9uZ3VpZGVsaW5lcy5nb3YvZ3VpZGVsaW5lcy9USUZGX01ldGFkYXRhX0ZpbmFsLnBkZlxuICAgIC8vIFNlZTogaHR0cDovL3d3dy5kaWdpdGFscHJlc2VydmF0aW9uLmdvdi9mb3JtYXRzL2NvbnRlbnQvdGlmZl90YWdzLnNodG1sXG4gICAgZmllbGRUYWdOYW1lczoge1xuICAgICAgICAvLyBUSUZGIEJhc2VsaW5lXG4gICAgICAgIDB4MDEzQjogJ0FydGlzdCcsXG4gICAgICAgIDB4MDEwMjogJ0JpdHNQZXJTYW1wbGUnLFxuICAgICAgICAweDAxMDk6ICdDZWxsTGVuZ3RoJyxcbiAgICAgICAgMHgwMTA4OiAnQ2VsbFdpZHRoJyxcbiAgICAgICAgMHgwMTQwOiAnQ29sb3JNYXAnLFxuICAgICAgICAweDAxMDM6ICdDb21wcmVzc2lvbicsXG4gICAgICAgIDB4ODI5ODogJ0NvcHlyaWdodCcsXG4gICAgICAgIDB4MDEzMjogJ0RhdGVUaW1lJyxcbiAgICAgICAgMHgwMTUyOiAnRXh0cmFTYW1wbGVzJyxcbiAgICAgICAgMHgwMTBBOiAnRmlsbE9yZGVyJyxcbiAgICAgICAgMHgwMTIxOiAnRnJlZUJ5dGVDb3VudHMnLFxuICAgICAgICAweDAxMjA6ICdGcmVlT2Zmc2V0cycsXG4gICAgICAgIDB4MDEyMzogJ0dyYXlSZXNwb25zZUN1cnZlJyxcbiAgICAgICAgMHgwMTIyOiAnR3JheVJlc3BvbnNlVW5pdCcsXG4gICAgICAgIDB4MDEzQzogJ0hvc3RDb21wdXRlcicsXG4gICAgICAgIDB4MDEwRTogJ0ltYWdlRGVzY3JpcHRpb24nLFxuICAgICAgICAweDAxMDE6ICdJbWFnZUxlbmd0aCcsXG4gICAgICAgIDB4MDEwMDogJ0ltYWdlV2lkdGgnLFxuICAgICAgICAweDAxMEY6ICdNYWtlJyxcbiAgICAgICAgMHgwMTE5OiAnTWF4U2FtcGxlVmFsdWUnLFxuICAgICAgICAweDAxMTg6ICdNaW5TYW1wbGVWYWx1ZScsXG4gICAgICAgIDB4MDExMDogJ01vZGVsJyxcbiAgICAgICAgMHgwMEZFOiAnTmV3U3ViZmlsZVR5cGUnLFxuICAgICAgICAweDAxMTI6ICdPcmllbnRhdGlvbicsXG4gICAgICAgIDB4MDEwNjogJ1Bob3RvbWV0cmljSW50ZXJwcmV0YXRpb24nLFxuICAgICAgICAweDAxMUM6ICdQbGFuYXJDb25maWd1cmF0aW9uJyxcbiAgICAgICAgMHgwMTI4OiAnUmVzb2x1dGlvblVuaXQnLFxuICAgICAgICAweDAxMTY6ICdSb3dzUGVyU3RyaXAnLFxuICAgICAgICAweDAxMTU6ICdTYW1wbGVzUGVyUGl4ZWwnLFxuICAgICAgICAweDAxMzE6ICdTb2Z0d2FyZScsXG4gICAgICAgIDB4MDExNzogJ1N0cmlwQnl0ZUNvdW50cycsXG4gICAgICAgIDB4MDExMTogJ1N0cmlwT2Zmc2V0cycsXG4gICAgICAgIDB4MDBGRjogJ1N1YmZpbGVUeXBlJyxcbiAgICAgICAgMHgwMTA3OiAnVGhyZXNoaG9sZGluZycsXG4gICAgICAgIDB4MDExQTogJ1hSZXNvbHV0aW9uJyxcbiAgICAgICAgMHgwMTFCOiAnWVJlc29sdXRpb24nLFxuXG4gICAgICAgIC8vIFRJRkYgRXh0ZW5kZWRcbiAgICAgICAgMHgwMTQ2OiAnQmFkRmF4TGluZXMnLFxuICAgICAgICAweDAxNDc6ICdDbGVhbkZheERhdGEnLFxuICAgICAgICAweDAxNTc6ICdDbGlwUGF0aCcsXG4gICAgICAgIDB4MDE0ODogJ0NvbnNlY3V0aXZlQmFkRmF4TGluZXMnLFxuICAgICAgICAweDAxQjE6ICdEZWNvZGUnLFxuICAgICAgICAweDAxQjI6ICdEZWZhdWx0SW1hZ2VDb2xvcicsXG4gICAgICAgIDB4MDEwRDogJ0RvY3VtZW50TmFtZScsXG4gICAgICAgIDB4MDE1MDogJ0RvdFJhbmdlJyxcbiAgICAgICAgMHgwMTQxOiAnSGFsZnRvbmVIaW50cycsXG4gICAgICAgIDB4MDE1QTogJ0luZGV4ZWQnLFxuICAgICAgICAweDAxNUI6ICdKUEVHVGFibGVzJyxcbiAgICAgICAgMHgwMTFEOiAnUGFnZU5hbWUnLFxuICAgICAgICAweDAxMjk6ICdQYWdlTnVtYmVyJyxcbiAgICAgICAgMHgwMTNEOiAnUHJlZGljdG9yJyxcbiAgICAgICAgMHgwMTNGOiAnUHJpbWFyeUNocm9tYXRpY2l0aWVzJyxcbiAgICAgICAgMHgwMjE0OiAnUmVmZXJlbmNlQmxhY2tXaGl0ZScsXG4gICAgICAgIDB4MDE1MzogJ1NhbXBsZUZvcm1hdCcsXG4gICAgICAgIDB4MDIyRjogJ1N0cmlwUm93Q291bnRzJyxcbiAgICAgICAgMHgwMTRBOiAnU3ViSUZEcycsXG4gICAgICAgIDB4MDEyNDogJ1Q0T3B0aW9ucycsXG4gICAgICAgIDB4MDEyNTogJ1Q2T3B0aW9ucycsXG4gICAgICAgIDB4MDE0NTogJ1RpbGVCeXRlQ291bnRzJyxcbiAgICAgICAgMHgwMTQzOiAnVGlsZUxlbmd0aCcsXG4gICAgICAgIDB4MDE0NDogJ1RpbGVPZmZzZXRzJyxcbiAgICAgICAgMHgwMTQyOiAnVGlsZVdpZHRoJyxcbiAgICAgICAgMHgwMTJEOiAnVHJhbnNmZXJGdW5jdGlvbicsXG4gICAgICAgIDB4MDEzRTogJ1doaXRlUG9pbnQnLFxuICAgICAgICAweDAxNTg6ICdYQ2xpcFBhdGhVbml0cycsXG4gICAgICAgIDB4MDExRTogJ1hQb3NpdGlvbicsXG4gICAgICAgIDB4MDIxMTogJ1lDYkNyQ29lZmZpY2llbnRzJyxcbiAgICAgICAgMHgwMjEzOiAnWUNiQ3JQb3NpdGlvbmluZycsXG4gICAgICAgIDB4MDIxMjogJ1lDYkNyU3ViU2FtcGxpbmcnLFxuICAgICAgICAweDAxNTk6ICdZQ2xpcFBhdGhVbml0cycsXG4gICAgICAgIDB4MDExRjogJ1lQb3NpdGlvbicsXG5cbiAgICAgICAgLy8gRVhJRlxuICAgICAgICAweDkyMDI6ICdBcGVydHVyZVZhbHVlJyxcbiAgICAgICAgMHhBMDAxOiAnQ29sb3JTcGFjZScsXG4gICAgICAgIDB4OTAwNDogJ0RhdGVUaW1lRGlnaXRpemVkJyxcbiAgICAgICAgMHg5MDAzOiAnRGF0ZVRpbWVPcmlnaW5hbCcsXG4gICAgICAgIDB4ODc2OTogJ0V4aWYgSUZEJyxcbiAgICAgICAgMHg5MDAwOiAnRXhpZlZlcnNpb24nLFxuICAgICAgICAweDgyOUE6ICdFeHBvc3VyZVRpbWUnLFxuICAgICAgICAweEEzMDA6ICdGaWxlU291cmNlJyxcbiAgICAgICAgMHg5MjA5OiAnRmxhc2gnLFxuICAgICAgICAweEEwMDA6ICdGbGFzaHBpeFZlcnNpb24nLFxuICAgICAgICAweDgyOUQ6ICdGTnVtYmVyJyxcbiAgICAgICAgMHhBNDIwOiAnSW1hZ2VVbmlxdWVJRCcsXG4gICAgICAgIDB4OTIwODogJ0xpZ2h0U291cmNlJyxcbiAgICAgICAgMHg5MjdDOiAnTWFrZXJOb3RlJyxcbiAgICAgICAgMHg5MjAxOiAnU2h1dHRlclNwZWVkVmFsdWUnLFxuICAgICAgICAweDkyODY6ICdVc2VyQ29tbWVudCcsXG5cbiAgICAgICAgLy8gSVBUQ1xuICAgICAgICAweDgzQkI6ICdJUFRDJyxcblxuICAgICAgICAvLyBJQ0NcbiAgICAgICAgMHg4NzczOiAnSUNDIFByb2ZpbGUnLFxuXG4gICAgICAgIC8vIFhNUFxuICAgICAgICAweDAyQkM6ICdYTVAnLFxuXG4gICAgICAgIC8vIEdEQUxcbiAgICAgICAgMHhBNDgwOiAnR0RBTF9NRVRBREFUQScsXG4gICAgICAgIDB4QTQ4MTogJ0dEQUxfTk9EQVRBJyxcblxuICAgICAgICAvLyBQaG90b3Nob3BcbiAgICAgICAgMHg4NjQ5OiAnUGhvdG9zaG9wJ1xuICAgIH0sXG5cbiAgICBmaWVsZFR5cGVOYW1lczoge1xuICAgICAgICAweDAwMDE6ICdCWVRFJyxcbiAgICAgICAgMHgwMDAyOiAnQVNDSUknLFxuICAgICAgICAweDAwMDM6ICdTSE9SVCcsXG4gICAgICAgIDB4MDAwNDogJ0xPTkcnLFxuICAgICAgICAweDAwMDU6ICdSQVRJT05BTCcsXG4gICAgICAgIDB4MDAwNjogJ1NCWVRFJyxcbiAgICAgICAgMHgwMDA3OiAnVU5ERUZJTkVEJyxcbiAgICAgICAgMHgwMDA4OiAnU1NIT1JUJyxcbiAgICAgICAgMHgwMDA5OiAnU0xPTkcnLFxuICAgICAgICAweDAwMEE6ICdTUkFUSU9OQUwnLFxuICAgICAgICAweDAwMEI6ICdGTE9BVCcsXG4gICAgICAgIDB4MDAwQzogJ0RPVUJMRSdcbiAgICB9XG59O1xuXG5tb2R1bGUuZXhwb3J0cyA9IHRpZmZSZWFkZXI7Il0sInNvdXJjZVJvb3QiOiIvIn0=