
                (function() {
                    var nodeEnv = typeof require !== 'undefined' && typeof process !== 'undefined';
                    var __module = nodeEnv ? module : {exports:{}};
                    var __filename = 'engine-dev/cocos2d/compression/gzip.js';
                    var __require = nodeEnv ? function (request) {
                        return require(request);
                    } : function (request) {
                        return __quick_compile_engine__.require(request, __filename);
                    };
                    function __define (exports, require, module) {
                        if (!nodeEnv) {__quick_compile_engine__.registerModule(__filename, module);}"use strict";

/*--
 Copyright 2009-2010 by Stefan Rusterholz.
 All rights reserved.
 You can choose between MIT and BSD-3-Clause license. License file will be added later.
 --*/

/**
 * See cc.Codec.GZip.gunzip.
 * @param {Array | String} data The bytestream to decompress
 * Constructor
 */
var GZip = function Jacob__GZip(data) {
  this.data = data;
  this.debug = false;
  this.gpflags = undefined;
  this.files = 0;
  this.unzipped = [];
  this.buf32k = new Array(32768);
  this.bIdx = 0;
  this.modeZIP = false;
  this.bytepos = 0;
  this.bb = 1;
  this.bits = 0;
  this.nameBuf = [];
  this.fileout = undefined;
  this.literalTree = new Array(GZip.LITERALS);
  this.distanceTree = new Array(32);
  this.treepos = 0;
  this.Places = null;
  this.len = 0;
  this.fpos = new Array(17);
  this.fpos[0] = 0;
  this.flens = undefined;
  this.fmax = undefined;
};
/**
 * Unzips the gzipped data of the 'data' argument.
 * @param string  The bytestream to decompress. Either an array of Integers between 0 and 255, or a String.
 * @return {String}
 */


GZip.gunzip = function (string) {
  if (string.constructor === Array) {} else if (string.constructor === String) {}

  var gzip = new GZip(string);
  return gzip.gunzip()[0][0];
};

GZip.HufNode = function () {
  this.b0 = 0;
  this.b1 = 0;
  this.jump = null;
  this.jumppos = -1;
};
/**
 * @constant
 * @type Number
 */


GZip.LITERALS = 288;
/**
 * @constant
 * @type Number
 */

GZip.NAMEMAX = 256;
GZip.bitReverse = [0x00, 0x80, 0x40, 0xc0, 0x20, 0xa0, 0x60, 0xe0, 0x10, 0x90, 0x50, 0xd0, 0x30, 0xb0, 0x70, 0xf0, 0x08, 0x88, 0x48, 0xc8, 0x28, 0xa8, 0x68, 0xe8, 0x18, 0x98, 0x58, 0xd8, 0x38, 0xb8, 0x78, 0xf8, 0x04, 0x84, 0x44, 0xc4, 0x24, 0xa4, 0x64, 0xe4, 0x14, 0x94, 0x54, 0xd4, 0x34, 0xb4, 0x74, 0xf4, 0x0c, 0x8c, 0x4c, 0xcc, 0x2c, 0xac, 0x6c, 0xec, 0x1c, 0x9c, 0x5c, 0xdc, 0x3c, 0xbc, 0x7c, 0xfc, 0x02, 0x82, 0x42, 0xc2, 0x22, 0xa2, 0x62, 0xe2, 0x12, 0x92, 0x52, 0xd2, 0x32, 0xb2, 0x72, 0xf2, 0x0a, 0x8a, 0x4a, 0xca, 0x2a, 0xaa, 0x6a, 0xea, 0x1a, 0x9a, 0x5a, 0xda, 0x3a, 0xba, 0x7a, 0xfa, 0x06, 0x86, 0x46, 0xc6, 0x26, 0xa6, 0x66, 0xe6, 0x16, 0x96, 0x56, 0xd6, 0x36, 0xb6, 0x76, 0xf6, 0x0e, 0x8e, 0x4e, 0xce, 0x2e, 0xae, 0x6e, 0xee, 0x1e, 0x9e, 0x5e, 0xde, 0x3e, 0xbe, 0x7e, 0xfe, 0x01, 0x81, 0x41, 0xc1, 0x21, 0xa1, 0x61, 0xe1, 0x11, 0x91, 0x51, 0xd1, 0x31, 0xb1, 0x71, 0xf1, 0x09, 0x89, 0x49, 0xc9, 0x29, 0xa9, 0x69, 0xe9, 0x19, 0x99, 0x59, 0xd9, 0x39, 0xb9, 0x79, 0xf9, 0x05, 0x85, 0x45, 0xc5, 0x25, 0xa5, 0x65, 0xe5, 0x15, 0x95, 0x55, 0xd5, 0x35, 0xb5, 0x75, 0xf5, 0x0d, 0x8d, 0x4d, 0xcd, 0x2d, 0xad, 0x6d, 0xed, 0x1d, 0x9d, 0x5d, 0xdd, 0x3d, 0xbd, 0x7d, 0xfd, 0x03, 0x83, 0x43, 0xc3, 0x23, 0xa3, 0x63, 0xe3, 0x13, 0x93, 0x53, 0xd3, 0x33, 0xb3, 0x73, 0xf3, 0x0b, 0x8b, 0x4b, 0xcb, 0x2b, 0xab, 0x6b, 0xeb, 0x1b, 0x9b, 0x5b, 0xdb, 0x3b, 0xbb, 0x7b, 0xfb, 0x07, 0x87, 0x47, 0xc7, 0x27, 0xa7, 0x67, 0xe7, 0x17, 0x97, 0x57, 0xd7, 0x37, 0xb7, 0x77, 0xf7, 0x0f, 0x8f, 0x4f, 0xcf, 0x2f, 0xaf, 0x6f, 0xef, 0x1f, 0x9f, 0x5f, 0xdf, 0x3f, 0xbf, 0x7f, 0xff];
GZip.cplens = [3, 4, 5, 6, 7, 8, 9, 10, 11, 13, 15, 17, 19, 23, 27, 31, 35, 43, 51, 59, 67, 83, 99, 115, 131, 163, 195, 227, 258, 0, 0];
GZip.cplext = [0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 99, 99];
/* 99==invalid */

GZip.cpdist = [0x0001, 0x0002, 0x0003, 0x0004, 0x0005, 0x0007, 0x0009, 0x000d, 0x0011, 0x0019, 0x0021, 0x0031, 0x0041, 0x0061, 0x0081, 0x00c1, 0x0101, 0x0181, 0x0201, 0x0301, 0x0401, 0x0601, 0x0801, 0x0c01, 0x1001, 0x1801, 0x2001, 0x3001, 0x4001, 0x6001];
GZip.cpdext = [0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13];
GZip.border = [16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15];
/**
 * gunzip
 * @return {Array}
 */

GZip.prototype.gunzip = function () {
  this.outputArr = []; //convertToByteArray(input);
  //if (this.debug) alert(this.data);

  this.nextFile();
  return this.unzipped;
};

GZip.prototype.readByte = function () {
  this.bits += 8;

  if (this.bytepos < this.data.length) {
    //return this.data[this.bytepos++]; // Array
    return this.data.charCodeAt(this.bytepos++);
  } else {
    return -1;
  }
};

GZip.prototype.byteAlign = function () {
  this.bb = 1;
};

GZip.prototype.readBit = function () {
  var carry;
  this.bits++;
  carry = this.bb & 1;
  this.bb >>= 1;

  if (this.bb === 0) {
    this.bb = this.readByte();
    carry = this.bb & 1;
    this.bb = this.bb >> 1 | 0x80;
  }

  return carry;
};

GZip.prototype.readBits = function (a) {
  var res = 0,
      i = a;

  while (i--) {
    res = res << 1 | this.readBit();
  }

  if (a) res = GZip.bitReverse[res] >> 8 - a;
  return res;
};

GZip.prototype.flushBuffer = function () {
  this.bIdx = 0;
};

GZip.prototype.addBuffer = function (a) {
  this.buf32k[this.bIdx++] = a;
  this.outputArr.push(String.fromCharCode(a));
  if (this.bIdx === 0x8000) this.bIdx = 0;
};

GZip.prototype.IsPat = function () {
  while (1) {
    if (this.fpos[this.len] >= this.fmax) return -1;
    if (this.flens[this.fpos[this.len]] === this.len) return this.fpos[this.len]++;
    this.fpos[this.len]++;
  }
};

GZip.prototype.Rec = function () {
  var curplace = this.Places[this.treepos];
  var tmp; //if (this.debug) document.write("<br>len:"+this.len+" treepos:"+this.treepos);

  if (this.len === 17) {
    //war 17
    return -1;
  }

  this.treepos++;
  this.len++;
  tmp = this.IsPat(); //if (this.debug) document.write("<br>IsPat "+tmp);

  if (tmp >= 0) {
    curplace.b0 = tmp;
    /* leaf cell for 0-bit */
    //if (this.debug) document.write("<br>b0 "+curplace.b0);
  } else {
    /* Not a Leaf cell */
    curplace.b0 = 0x8000; //if (this.debug) document.write("<br>b0 "+curplace.b0);

    if (this.Rec()) return -1;
  }

  tmp = this.IsPat();

  if (tmp >= 0) {
    curplace.b1 = tmp;
    /* leaf cell for 1-bit */
    //if (this.debug) document.write("<br>b1 "+curplace.b1);

    curplace.jump = null;
    /* Just for the display routine */
  } else {
    /* Not a Leaf cell */
    curplace.b1 = 0x8000; //if (this.debug) document.write("<br>b1 "+curplace.b1);

    curplace.jump = this.Places[this.treepos];
    curplace.jumppos = this.treepos;
    if (this.Rec()) return -1;
  }

  this.len--;
  return 0;
};

GZip.prototype.CreateTree = function (currentTree, numval, lengths, show) {
  var i;
  /* Create the Huffman decode tree/table */
  //if (this.debug) document.write("currentTree "+currentTree+" numval "+numval+" lengths "+lengths+" show "+show);

  this.Places = currentTree;
  this.treepos = 0;
  this.flens = lengths;
  this.fmax = numval;

  for (i = 0; i < 17; i++) {
    this.fpos[i] = 0;
  }

  this.len = 0;

  if (this.Rec()) {
    //if (this.debug) alert("invalid huffman tree\n");
    return -1;
  } // if (this.debug) {
  //   document.write('<br>Tree: '+this.Places.length);
  //   for (var a=0;a<32;a++){
  //     document.write("Places["+a+"].b0="+this.Places[a].b0+"<br>");
  //     document.write("Places["+a+"].b1="+this.Places[a].b1+"<br>");
  //   }
  // }


  return 0;
};

GZip.prototype.DecodeValue = function (currentTree) {
  var len,
      i,
      xtreepos = 0,
      X = currentTree[xtreepos],
      b;
  /* decode one symbol of the data */

  while (1) {
    b = this.readBit(); // if (this.debug) document.write("b="+b);

    if (b) {
      if (!(X.b1 & 0x8000)) {
        // if (this.debug) document.write("ret1");
        return X.b1;
        /* If leaf node, return data */
      }

      X = X.jump;
      len = currentTree.length;

      for (i = 0; i < len; i++) {
        if (currentTree[i] === X) {
          xtreepos = i;
          break;
        }
      }
    } else {
      if (!(X.b0 & 0x8000)) {
        // if (this.debug) document.write("ret2");
        return X.b0;
        /* If leaf node, return data */
      }

      xtreepos++;
      X = currentTree[xtreepos];
    }
  } // if (this.debug) document.write("ret3");


  return -1;
};

GZip.prototype.DeflateLoop = function () {
  var last, c, type, i, len;

  do {
    last = this.readBit();
    type = this.readBits(2);

    if (type === 0) {
      var blockLen, cSum; // Stored

      this.byteAlign();
      blockLen = this.readByte();
      blockLen |= this.readByte() << 8;
      cSum = this.readByte();
      cSum |= this.readByte() << 8;

      if ((blockLen ^ ~cSum) & 0xffff) {
        document.write("BlockLen checksum mismatch\n"); // FIXME: use throw
      }

      while (blockLen--) {
        c = this.readByte();
        this.addBuffer(c);
      }
    } else if (type === 1) {
      var j;
      /* Fixed Huffman tables -- fixed decode routine */

      while (1) {
        /*
         256    0000000        0
         :   :     :
         279    0010111        23
         0   00110000    48
         :    :      :
         143    10111111    191
         280 11000000    192
         :    :      :
         287 11000111    199
         144    110010000    400
         :    :       :
         255    111111111    511
          Note the bit order!
         */
        j = GZip.bitReverse[this.readBits(7)] >> 1;

        if (j > 23) {
          j = j << 1 | this.readBit();
          /* 48..255 */

          if (j > 199) {
            /* 200..255 */
            j -= 128;
            /*  72..127 */

            j = j << 1 | this.readBit();
            /* 144..255 << */
          } else {
            /*  48..199 */
            j -= 48;
            /*   0..151 */

            if (j > 143) {
              j = j + 136;
              /* 280..287 << */

              /*   0..143 << */
            }
          }
        } else {
          /*   0..23 */
          j += 256;
          /* 256..279 << */
        }

        if (j < 256) {
          this.addBuffer(j);
        } else if (j === 256) {
          /* EOF */
          break; // FIXME: make this the loop-condition
        } else {
          var len, dist;
          j -= 256 + 1;
          /* bytes + EOF */

          len = this.readBits(GZip.cplext[j]) + GZip.cplens[j];
          j = GZip.bitReverse[this.readBits(5)] >> 3;

          if (GZip.cpdext[j] > 8) {
            dist = this.readBits(8);
            dist |= this.readBits(GZip.cpdext[j] - 8) << 8;
          } else {
            dist = this.readBits(GZip.cpdext[j]);
          }

          dist += GZip.cpdist[j];

          for (j = 0; j < len; j++) {
            var c = this.buf32k[this.bIdx - dist & 0x7fff];
            this.addBuffer(c);
          }
        }
      } // while

    } else if (type === 2) {
      var j, n, literalCodes, distCodes, lenCodes;
      var ll = new Array(288 + 32); // "static" just to preserve stack
      // Dynamic Huffman tables

      literalCodes = 257 + this.readBits(5);
      distCodes = 1 + this.readBits(5);
      lenCodes = 4 + this.readBits(4);

      for (j = 0; j < 19; j++) {
        ll[j] = 0;
      } // Get the decode tree code lengths


      for (j = 0; j < lenCodes; j++) {
        ll[GZip.border[j]] = this.readBits(3);
      }

      len = this.distanceTree.length;

      for (i = 0; i < len; i++) {
        this.distanceTree[i] = new GZip.HufNode();
      }

      if (this.CreateTree(this.distanceTree, 19, ll, 0)) {
        this.flushBuffer();
        return 1;
      } // if (this.debug) {
      //   document.write("<br>distanceTree");
      //   for(var a=0;a<this.distanceTree.length;a++){
      //     document.write("<br>"+this.distanceTree[a].b0+" "+this.distanceTree[a].b1+" "+this.distanceTree[a].jump+" "+this.distanceTree[a].jumppos);
      //   }
      // }
      //read in literal and distance code lengths


      n = literalCodes + distCodes;
      i = 0;
      var z = -1; // if (this.debug) document.write("<br>n="+n+" bits: "+this.bits+"<br>");

      while (i < n) {
        z++;
        j = this.DecodeValue(this.distanceTree); // if (this.debug) document.write("<br>"+z+" i:"+i+" decode: "+j+"    bits "+this.bits+"<br>");

        if (j < 16) {
          // length of code in bits (0..15)
          ll[i++] = j;
        } else if (j === 16) {
          // repeat last length 3 to 6 times
          var l;
          j = 3 + this.readBits(2);

          if (i + j > n) {
            this.flushBuffer();
            return 1;
          }

          l = i ? ll[i - 1] : 0;

          while (j--) {
            ll[i++] = l;
          }
        } else {
          if (j === 17) {
            // 3 to 10 zero length codes
            j = 3 + this.readBits(3);
          } else {
            // j == 18: 11 to 138 zero length codes
            j = 11 + this.readBits(7);
          }

          if (i + j > n) {
            this.flushBuffer();
            return 1;
          }

          while (j--) {
            ll[i++] = 0;
          }
        }
      } // while
      // Can overwrite tree decode tree as it is not used anymore


      len = this.literalTree.length;

      for (i = 0; i < len; i++) {
        this.literalTree[i] = new GZip.HufNode();
      }

      if (this.CreateTree(this.literalTree, literalCodes, ll, 0)) {
        this.flushBuffer();
        return 1;
      }

      len = this.literalTree.length;

      for (i = 0; i < len; i++) {
        this.distanceTree[i] = new GZip.HufNode();
      }

      var ll2 = new Array();

      for (i = literalCodes; i < ll.length; i++) {
        ll2[i - literalCodes] = ll[i];
      }

      if (this.CreateTree(this.distanceTree, distCodes, ll2, 0)) {
        this.flushBuffer();
        return 1;
      } // if (this.debug) document.write("<br>literalTree");


      while (1) {
        j = this.DecodeValue(this.literalTree);

        if (j >= 256) {
          // In C64: if carry set
          var len, dist;
          j -= 256;

          if (j === 0) {
            // EOF
            break;
          }

          j--;
          len = this.readBits(GZip.cplext[j]) + GZip.cplens[j];
          j = this.DecodeValue(this.distanceTree);

          if (GZip.cpdext[j] > 8) {
            dist = this.readBits(8);
            dist |= this.readBits(GZip.cpdext[j] - 8) << 8;
          } else {
            dist = this.readBits(GZip.cpdext[j]);
          }

          dist += GZip.cpdist[j];

          while (len--) {
            var c = this.buf32k[this.bIdx - dist & 0x7fff];
            this.addBuffer(c);
          }
        } else {
          this.addBuffer(j);
        }
      } // while

    }
  } while (!last);

  this.flushBuffer();
  this.byteAlign();
  return 0;
};

GZip.prototype.unzipFile = function (name) {
  var i;
  this.gunzip();

  for (i = 0; i < this.unzipped.length; i++) {
    if (this.unzipped[i][1] === name) {
      return this.unzipped[i][0];
    }
  }
};

GZip.prototype.nextFile = function () {
  // if (this.debug) alert("NEXTFILE");
  this.outputArr = [];
  this.modeZIP = false;
  var tmp = [];
  tmp[0] = this.readByte();
  tmp[1] = this.readByte(); // if (this.debug) alert("type: "+tmp[0]+" "+tmp[1]);

  if (tmp[0] === 0x78 && tmp[1] === 0xda) {
    //GZIP
    // if (this.debug) alert("GEONExT-GZIP");
    this.DeflateLoop(); // if (this.debug) alert(this.outputArr.join(''));

    this.unzipped[this.files] = [this.outputArr.join(''), "geonext.gxt"];
    this.files++;
  }

  if (tmp[0] === 0x1f && tmp[1] === 0x8b) {
    //GZIP
    // if (this.debug) alert("GZIP");
    this.skipdir(); // if (this.debug) alert(this.outputArr.join(''));

    this.unzipped[this.files] = [this.outputArr.join(''), "file"];
    this.files++;
  }

  if (tmp[0] === 0x50 && tmp[1] === 0x4b) {
    //ZIP
    this.modeZIP = true;
    tmp[2] = this.readByte();
    tmp[3] = this.readByte();

    if (tmp[2] === 0x03 && tmp[3] === 0x04) {
      //MODE_ZIP
      tmp[0] = this.readByte();
      tmp[1] = this.readByte(); // if (this.debug) alert("ZIP-Version: "+tmp[1]+" "+tmp[0]/10+"."+tmp[0]%10);

      this.gpflags = this.readByte();
      this.gpflags |= this.readByte() << 8; // if (this.debug) alert("gpflags: "+this.gpflags);

      var method = this.readByte();
      method |= this.readByte() << 8; // if (this.debug) alert("method: "+method);

      this.readByte();
      this.readByte();
      this.readByte();
      this.readByte(); //       var crc = this.readByte();
      //       crc |= (this.readByte()<<8);
      //       crc |= (this.readByte()<<16);
      //       crc |= (this.readByte()<<24);

      var compSize = this.readByte();
      compSize |= this.readByte() << 8;
      compSize |= this.readByte() << 16;
      compSize |= this.readByte() << 24;
      var size = this.readByte();
      size |= this.readByte() << 8;
      size |= this.readByte() << 16;
      size |= this.readByte() << 24; // if (this.debug) alert("local CRC: "+crc+"\nlocal Size: "+size+"\nlocal CompSize: "+compSize);

      var filelen = this.readByte();
      filelen |= this.readByte() << 8;
      var extralen = this.readByte();
      extralen |= this.readByte() << 8; // if (this.debug) alert("filelen "+filelen);

      i = 0;
      this.nameBuf = [];

      while (filelen--) {
        var c = this.readByte();

        if (c === "/" | c === ":") {
          i = 0;
        } else if (i < GZip.NAMEMAX - 1) {
          this.nameBuf[i++] = String.fromCharCode(c);
        }
      } // if (this.debug) alert("nameBuf: "+this.nameBuf);


      if (!this.fileout) this.fileout = this.nameBuf;
      var i = 0;

      while (i < extralen) {
        c = this.readByte();
        i++;
      } // if (size = 0 && this.fileOut.charAt(this.fileout.length-1)=="/"){
      //   //skipdir
      //   // if (this.debug) alert("skipdir");
      // }


      if (method === 8) {
        this.DeflateLoop(); // if (this.debug) alert(this.outputArr.join(''));

        this.unzipped[this.files] = [this.outputArr.join(''), this.nameBuf.join('')];
        this.files++;
      }

      this.skipdir();
    }
  }
};

GZip.prototype.skipdir = function () {
  var tmp = [];
  var compSize, size, os, i, c;

  if (this.gpflags & 8) {
    tmp[0] = this.readByte();
    tmp[1] = this.readByte();
    tmp[2] = this.readByte();
    tmp[3] = this.readByte(); //     if (tmp[0] == 0x50 && tmp[1] == 0x4b && tmp[2] == 0x07 && tmp[3] == 0x08) {
    //       crc = this.readByte();
    //       crc |= (this.readByte()<<8);
    //       crc |= (this.readByte()<<16);
    //       crc |= (this.readByte()<<24);
    //     } else {
    //       crc = tmp[0] | (tmp[1]<<8) | (tmp[2]<<16) | (tmp[3]<<24);
    //     }

    compSize = this.readByte();
    compSize |= this.readByte() << 8;
    compSize |= this.readByte() << 16;
    compSize |= this.readByte() << 24;
    size = this.readByte();
    size |= this.readByte() << 8;
    size |= this.readByte() << 16;
    size |= this.readByte() << 24;
  }

  if (this.modeZIP) this.nextFile();
  tmp[0] = this.readByte();

  if (tmp[0] !== 8) {
    // if (this.debug) alert("Unknown compression method!");
    return 0;
  }

  this.gpflags = this.readByte(); // if (this.debug && (this.gpflags & ~(0x1f))) alert("Unknown flags set!");

  this.readByte();
  this.readByte();
  this.readByte();
  this.readByte();
  this.readByte();
  os = this.readByte();

  if (this.gpflags & 4) {
    tmp[0] = this.readByte();
    tmp[2] = this.readByte();
    this.len = tmp[0] + 256 * tmp[1]; // if (this.debug) alert("Extra field size: "+this.len);

    for (i = 0; i < this.len; i++) {
      this.readByte();
    }
  }

  if (this.gpflags & 8) {
    i = 0;
    this.nameBuf = [];

    while (c = this.readByte()) {
      if (c === "7" || c === ":") i = 0;
      if (i < GZip.NAMEMAX - 1) this.nameBuf[i++] = c;
    } //this.nameBuf[i] = "\0";
    // if (this.debug) alert("original file name: "+this.nameBuf);

  }

  if (this.gpflags & 16) {
    while (c = this.readByte()) {// FIXME: looks like they read to the end of the stream, should be doable more efficiently
      //FILE COMMENT
    }
  }

  if (this.gpflags & 2) {
    this.readByte();
    this.readByte();
  }

  this.DeflateLoop(); //   crc = this.readByte();
  //   crc |= (this.readByte()<<8);
  //   crc |= (this.readByte()<<16);
  //   crc |= (this.readByte()<<24);

  size = this.readByte();
  size |= this.readByte() << 8;
  size |= this.readByte() << 16;
  size |= this.readByte() << 24;
  if (this.modeZIP) this.nextFile();
};

module.exports = GZip;
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImVuZ2luZS1kZXYvY29jb3MyZC9jb21wcmVzc2lvbi9nemlwLmpzIl0sIm5hbWVzIjpbIkdaaXAiLCJKYWNvYl9fR1ppcCIsImRhdGEiLCJkZWJ1ZyIsImdwZmxhZ3MiLCJ1bmRlZmluZWQiLCJmaWxlcyIsInVuemlwcGVkIiwiYnVmMzJrIiwiQXJyYXkiLCJiSWR4IiwibW9kZVpJUCIsImJ5dGVwb3MiLCJiYiIsImJpdHMiLCJuYW1lQnVmIiwiZmlsZW91dCIsImxpdGVyYWxUcmVlIiwiTElURVJBTFMiLCJkaXN0YW5jZVRyZWUiLCJ0cmVlcG9zIiwiUGxhY2VzIiwibGVuIiwiZnBvcyIsImZsZW5zIiwiZm1heCIsImd1bnppcCIsInN0cmluZyIsImNvbnN0cnVjdG9yIiwiU3RyaW5nIiwiZ3ppcCIsIkh1Zk5vZGUiLCJiMCIsImIxIiwianVtcCIsImp1bXBwb3MiLCJOQU1FTUFYIiwiYml0UmV2ZXJzZSIsImNwbGVucyIsImNwbGV4dCIsImNwZGlzdCIsImNwZGV4dCIsImJvcmRlciIsInByb3RvdHlwZSIsIm91dHB1dEFyciIsIm5leHRGaWxlIiwicmVhZEJ5dGUiLCJsZW5ndGgiLCJjaGFyQ29kZUF0IiwiYnl0ZUFsaWduIiwicmVhZEJpdCIsImNhcnJ5IiwicmVhZEJpdHMiLCJhIiwicmVzIiwiaSIsImZsdXNoQnVmZmVyIiwiYWRkQnVmZmVyIiwicHVzaCIsImZyb21DaGFyQ29kZSIsIklzUGF0IiwiUmVjIiwiY3VycGxhY2UiLCJ0bXAiLCJDcmVhdGVUcmVlIiwiY3VycmVudFRyZWUiLCJudW12YWwiLCJsZW5ndGhzIiwic2hvdyIsIkRlY29kZVZhbHVlIiwieHRyZWVwb3MiLCJYIiwiYiIsIkRlZmxhdGVMb29wIiwibGFzdCIsImMiLCJ0eXBlIiwiYmxvY2tMZW4iLCJjU3VtIiwiZG9jdW1lbnQiLCJ3cml0ZSIsImoiLCJkaXN0IiwibiIsImxpdGVyYWxDb2RlcyIsImRpc3RDb2RlcyIsImxlbkNvZGVzIiwibGwiLCJ6IiwibCIsImxsMiIsInVuemlwRmlsZSIsIm5hbWUiLCJqb2luIiwic2tpcGRpciIsIm1ldGhvZCIsImNvbXBTaXplIiwic2l6ZSIsImZpbGVsZW4iLCJleHRyYWxlbiIsIm9zIiwibW9kdWxlIiwiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQUFBOzs7Ozs7QUFNQTs7Ozs7QUFLQSxJQUFJQSxJQUFJLEdBQUcsU0FBU0MsV0FBVCxDQUFxQkMsSUFBckIsRUFBMkI7QUFDbEMsT0FBS0EsSUFBTCxHQUFZQSxJQUFaO0FBRUEsT0FBS0MsS0FBTCxHQUFhLEtBQWI7QUFDQSxPQUFLQyxPQUFMLEdBQWVDLFNBQWY7QUFDQSxPQUFLQyxLQUFMLEdBQWEsQ0FBYjtBQUNBLE9BQUtDLFFBQUwsR0FBZ0IsRUFBaEI7QUFDQSxPQUFLQyxNQUFMLEdBQWMsSUFBSUMsS0FBSixDQUFVLEtBQVYsQ0FBZDtBQUNBLE9BQUtDLElBQUwsR0FBWSxDQUFaO0FBQ0EsT0FBS0MsT0FBTCxHQUFlLEtBQWY7QUFDQSxPQUFLQyxPQUFMLEdBQWUsQ0FBZjtBQUNBLE9BQUtDLEVBQUwsR0FBVSxDQUFWO0FBQ0EsT0FBS0MsSUFBTCxHQUFZLENBQVo7QUFDQSxPQUFLQyxPQUFMLEdBQWUsRUFBZjtBQUNBLE9BQUtDLE9BQUwsR0FBZVgsU0FBZjtBQUNBLE9BQUtZLFdBQUwsR0FBbUIsSUFBSVIsS0FBSixDQUFVVCxJQUFJLENBQUNrQixRQUFmLENBQW5CO0FBQ0EsT0FBS0MsWUFBTCxHQUFvQixJQUFJVixLQUFKLENBQVUsRUFBVixDQUFwQjtBQUNBLE9BQUtXLE9BQUwsR0FBZSxDQUFmO0FBQ0EsT0FBS0MsTUFBTCxHQUFjLElBQWQ7QUFDQSxPQUFLQyxHQUFMLEdBQVcsQ0FBWDtBQUNBLE9BQUtDLElBQUwsR0FBWSxJQUFJZCxLQUFKLENBQVUsRUFBVixDQUFaO0FBQ0EsT0FBS2MsSUFBTCxDQUFVLENBQVYsSUFBZSxDQUFmO0FBQ0EsT0FBS0MsS0FBTCxHQUFhbkIsU0FBYjtBQUNBLE9BQUtvQixJQUFMLEdBQVlwQixTQUFaO0FBQ0gs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QUFLN0IsUUFBTCxFQUFYLEVBQTRCO0FBQ3hCLFVBQUk2QixDQUFDLEtBQUssR0FBTixJQUFhQSxDQUFDLEtBQUssR0FBdkIsRUFDSXBCLENBQUMsR0FBRyxDQUFKO0FBQ0osVUFBSUEsQ0FBQyxHQUFHdkQsSUFBSSxDQUFDb0MsT0FBTCxHQUFlLENBQXZCLEVBQ0ksS0FBS3JCLE9BQUwsQ0FBYXdDLENBQUMsRUFBZCxJQUFvQm9CLENBQXBCO0FBQ1AsS0FSbUIsQ0FTcEI7QUFDQTs7QUFDSDs7QUFFRCxNQUFLLEtBQUt2RSxPQUFMLEdBQWUsRUFBcEIsRUFBeUI7QUFDckIsV0FBT3VFLENBQUMsR0FBRyxLQUFLN0IsUUFBTCxFQUFYLEVBQTRCLENBQUU7QUFDMUI7QUFDSDtBQUNKOztBQUVELE1BQUssS0FBSzFDLE9BQUwsR0FBZSxDQUFwQixFQUF3QjtBQUNwQixTQUFLMEMsUUFBTDtBQUNBLFNBQUtBLFFBQUw7QUFDSDs7QUFFRCxPQUFLMkIsV0FBTCxHQWxGaUMsQ0FvRnJDO0FBQ0E7QUFDQTtBQUNBOztBQUVJd0IsRUFBQUEsSUFBSSxHQUFHLEtBQUtuRCxRQUFMLEVBQVA7QUFDQW1ELEVBQUFBLElBQUksSUFBSyxLQUFLbkQsUUFBTCxNQUFtQixDQUE1QjtBQUNBbUQsRUFBQUEsSUFBSSxJQUFLLEtBQUtuRCxRQUFMLE1BQW1CLEVBQTVCO0FBQ0FtRCxFQUFBQSxJQUFJLElBQUssS0FBS25ELFFBQUwsTUFBbUIsRUFBNUI7QUFFQSxNQUFJLEtBQUtuQyxPQUFULEVBQWtCLEtBQUtrQyxRQUFMO0FBQ3JCLENBL0ZEOztBQWlHQXdELE1BQU0sQ0FBQ0MsT0FBUCxHQUFpQnRHLElBQWpCIiwic291cmNlc0NvbnRlbnQiOlsiLyotLVxuIENvcHlyaWdodCAyMDA5LTIwMTAgYnkgU3RlZmFuIFJ1c3RlcmhvbHouXG4gQWxsIHJpZ2h0cyByZXNlcnZlZC5cbiBZb3UgY2FuIGNob29zZSBiZXR3ZWVuIE1JVCBhbmQgQlNELTMtQ2xhdXNlIGxpY2Vuc2UuIExpY2Vuc2UgZmlsZSB3aWxsIGJlIGFkZGVkIGxhdGVyLlxuIC0tKi9cblxuLyoqXG4gKiBTZWUgY2MuQ29kZWMuR1ppcC5ndW56aXAuXG4gKiBAcGFyYW0ge0FycmF5IHwgU3RyaW5nfSBkYXRhIFRoZSBieXRlc3RyZWFtIHRvIGRlY29tcHJlc3NcbiAqIENvbnN0cnVjdG9yXG4gKi9cbnZhciBHWmlwID0gZnVuY3Rpb24gSmFjb2JfX0daaXAoZGF0YSkge1xuICAgIHRoaXMuZGF0YSA9IGRhdGE7XG5cbiAgICB0aGlzLmRlYnVnID0gZmFsc2U7XG4gICAgdGhpcy5ncGZsYWdzID0gdW5kZWZpbmVkO1xuICAgIHRoaXMuZmlsZXMgPSAwO1xuICAgIHRoaXMudW56aXBwZWQgPSBbXTtcbiAgICB0aGlzLmJ1ZjMyayA9IG5ldyBBcnJheSgzMjc2OCk7XG4gICAgdGhpcy5iSWR4ID0gMDtcbiAgICB0aGlzLm1vZGVaSVAgPSBmYWxzZTtcbiAgICB0aGlzLmJ5dGVwb3MgPSAwO1xuICAgIHRoaXMuYmIgPSAxO1xuICAgIHRoaXMuYml0cyA9IDA7XG4gICAgdGhpcy5uYW1lQnVmID0gW107XG4gICAgdGhpcy5maWxlb3V0ID0gdW5kZWZpbmVkO1xuICAgIHRoaXMubGl0ZXJhbFRyZWUgPSBuZXcgQXJyYXkoR1ppcC5MSVRFUkFMUyk7XG4gICAgdGhpcy5kaXN0YW5jZVRyZWUgPSBuZXcgQXJyYXkoMzIpO1xuICAgIHRoaXMudHJlZXBvcyA9IDA7XG4gICAgdGhpcy5QbGFjZXMgPSBudWxsO1xuICAgIHRoaXMubGVuID0gMDtcbiAgICB0aGlzLmZwb3MgPSBuZXcgQXJyYXkoMTcpO1xuICAgIHRoaXMuZnBvc1swXSA9IDA7XG4gICAgdGhpcy5mbGVucyA9IHVuZGVmaW5lZDtcbiAgICB0aGlzLmZtYXggPSB1bmRlZmluZWQ7XG59O1xuXG4vKipcbiAqIFVuemlwcyB0aGUgZ3ppcHBlZCBkYXRhIG9mIHRoZSAnZGF0YScgYXJndW1lbnQuXG4gKiBAcGFyYW0gc3RyaW5nICBUaGUgYnl0ZXN0cmVhbSB0byBkZWNvbXByZXNzLiBFaXRoZXIgYW4gYXJyYXkgb2YgSW50ZWdlcnMgYmV0d2VlbiAwIGFuZCAyNTUsIG9yIGEgU3RyaW5nLlxuICogQHJldHVybiB7U3RyaW5nfVxuICovXG5HWmlwLmd1bnppcCA9IGZ1bmN0aW9uIChzdHJpbmcpIHtcbiAgICBpZiAoc3RyaW5nLmNvbnN0cnVjdG9yID09PSBBcnJheSkge1xuICAgIH0gZWxzZSBpZiAoc3RyaW5nLmNvbnN0cnVjdG9yID09PSBTdHJpbmcpIHtcbiAgICB9XG4gICAgdmFyIGd6aXAgPSBuZXcgR1ppcChzdHJpbmcpO1xuICAgIHJldHVybiBnemlwLmd1bnppcCgpWzBdWzBdO1xufTtcblxuR1ppcC5IdWZOb2RlID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYjAgPSAwO1xuICAgIHRoaXMuYjEgPSAwO1xuICAgIHRoaXMuanVtcCA9IG51bGw7XG4gICAgdGhpcy5qdW1wcG9zID0gLTE7XG59O1xuXG4vKipcbiAqIEBjb25zdGFudFxuICogQHR5cGUgTnVtYmVyXG4gKi9cbkdaaXAuTElURVJBTFMgPSAyODg7XG4vKipcbiAqIEBjb25zdGFudFxuICogQHR5cGUgTnVtYmVyXG4gKi9cbkdaaXAuTkFNRU1BWCA9IDI1NjtcblxuR1ppcC5iaXRSZXZlcnNlID0gW1xuICAgIDB4MDAsIDB4ODAsIDB4NDAsIDB4YzAsIDB4MjAsIDB4YTAsIDB4NjAsIDB4ZTAsXG4gICAgMHgxMCwgMHg5MCwgMHg1MCwgMHhkMCwgMHgzMCwgMHhiMCwgMHg3MCwgMHhmMCxcbiAgICAweDA4LCAweDg4LCAweDQ4LCAweGM4LCAweDI4LCAweGE4LCAweDY4LCAweGU4LFxuICAgIDB4MTgsIDB4OTgsIDB4NTgsIDB4ZDgsIDB4MzgsIDB4YjgsIDB4NzgsIDB4ZjgsXG4gICAgMHgwNCwgMHg4NCwgMHg0NCwgMHhjNCwgMHgyNCwgMHhhNCwgMHg2NCwgMHhlNCxcbiAgICAweDE0LCAweDk0LCAweDU0LCAweGQ0LCAweDM0LCAweGI0LCAweDc0LCAweGY0LFxuICAgIDB4MGMsIDB4OGMsIDB4NGMsIDB4Y2MsIDB4MmMsIDB4YWMsIDB4NmMsIDB4ZWMsXG4gICAgMHgxYywgMHg5YywgMHg1YywgMHhkYywgMHgzYywgMHhiYywgMHg3YywgMHhmYyxcbiAgICAweDAyLCAweDgyLCAweDQyLCAweGMyLCAweDIyLCAweGEyLCAweDYyLCAweGUyLFxuICAgIDB4MTIsIDB4OTIsIDB4NTIsIDB4ZDIsIDB4MzIsIDB4YjIsIDB4NzIsIDB4ZjIsXG4gICAgMHgwYSwgMHg4YSwgMHg0YSwgMHhjYSwgMHgyYSwgMHhhYSwgMHg2YSwgMHhlYSxcbiAgICAweDFhLCAweDlhLCAweDVhLCAweGRhLCAweDNhLCAweGJhLCAweDdhLCAweGZhLFxuICAgIDB4MDYsIDB4ODYsIDB4NDYsIDB4YzYsIDB4MjYsIDB4YTYsIDB4NjYsIDB4ZTYsXG4gICAgMHgxNiwgMHg5NiwgMHg1NiwgMHhkNiwgMHgzNiwgMHhiNiwgMHg3NiwgMHhmNixcbiAgICAweDBlLCAweDhlLCAweDRlLCAweGNlLCAweDJlLCAweGFlLCAweDZlLCAweGVlLFxuICAgIDB4MWUsIDB4OWUsIDB4NWUsIDB4ZGUsIDB4M2UsIDB4YmUsIDB4N2UsIDB4ZmUsXG4gICAgMHgwMSwgMHg4MSwgMHg0MSwgMHhjMSwgMHgyMSwgMHhhMSwgMHg2MSwgMHhlMSxcbiAgICAweDExLCAweDkxLCAweDUxLCAweGQxLCAweDMxLCAweGIxLCAweDcxLCAweGYxLFxuICAgIDB4MDksIDB4ODksIDB4NDksIDB4YzksIDB4MjksIDB4YTksIDB4NjksIDB4ZTksXG4gICAgMHgxOSwgMHg5OSwgMHg1OSwgMHhkOSwgMHgzOSwgMHhiOSwgMHg3OSwgMHhmOSxcbiAgICAweDA1LCAweDg1LCAweDQ1LCAweGM1LCAweDI1LCAweGE1LCAweDY1LCAweGU1LFxuICAgIDB4MTUsIDB4OTUsIDB4NTUsIDB4ZDUsIDB4MzUsIDB4YjUsIDB4NzUsIDB4ZjUsXG4gICAgMHgwZCwgMHg4ZCwgMHg0ZCwgMHhjZCwgMHgyZCwgMHhhZCwgMHg2ZCwgMHhlZCxcbiAgICAweDFkLCAweDlkLCAweDVkLCAweGRkLCAweDNkLCAweGJkLCAweDdkLCAweGZkLFxuICAgIDB4MDMsIDB4ODMsIDB4NDMsIDB4YzMsIDB4MjMsIDB4YTMsIDB4NjMsIDB4ZTMsXG4gICAgMHgxMywgMHg5MywgMHg1MywgMHhkMywgMHgzMywgMHhiMywgMHg3MywgMHhmMyxcbiAgICAweDBiLCAweDhiLCAweDRiLCAweGNiLCAweDJiLCAweGFiLCAweDZiLCAweGViLFxuICAgIDB4MWIsIDB4OWIsIDB4NWIsIDB4ZGIsIDB4M2IsIDB4YmIsIDB4N2IsIDB4ZmIsXG4gICAgMHgwNywgMHg4NywgMHg0NywgMHhjNywgMHgyNywgMHhhNywgMHg2NywgMHhlNyxcbiAgICAweDE3LCAweDk3LCAweDU3LCAweGQ3LCAweDM3LCAweGI3LCAweDc3LCAweGY3LFxuICAgIDB4MGYsIDB4OGYsIDB4NGYsIDB4Y2YsIDB4MmYsIDB4YWYsIDB4NmYsIDB4ZWYsXG4gICAgMHgxZiwgMHg5ZiwgMHg1ZiwgMHhkZiwgMHgzZiwgMHhiZiwgMHg3ZiwgMHhmZlxuXTtcbkdaaXAuY3BsZW5zID0gW1xuICAgIDMsIDQsIDUsIDYsIDcsIDgsIDksIDEwLCAxMSwgMTMsIDE1LCAxNywgMTksIDIzLCAyNywgMzEsXG4gICAgMzUsIDQzLCA1MSwgNTksIDY3LCA4MywgOTksIDExNSwgMTMxLCAxNjMsIDE5NSwgMjI3LCAyNTgsIDAsIDBcbl07XG5HWmlwLmNwbGV4dCA9IFtcbiAgICAwLCAwLCAwLCAwLCAwLCAwLCAwLCAwLCAxLCAxLCAxLCAxLCAyLCAyLCAyLCAyLFxuICAgIDMsIDMsIDMsIDMsIDQsIDQsIDQsIDQsIDUsIDUsIDUsIDUsIDAsIDk5LCA5OVxuXTtcbi8qIDk5PT1pbnZhbGlkICovXG5HWmlwLmNwZGlzdCA9IFtcbiAgICAweDAwMDEsIDB4MDAwMiwgMHgwMDAzLCAweDAwMDQsIDB4MDAwNSwgMHgwMDA3LCAweDAwMDksIDB4MDAwZCxcbiAgICAweDAwMTEsIDB4MDAxOSwgMHgwMDIxLCAweDAwMzEsIDB4MDA0MSwgMHgwMDYxLCAweDAwODEsIDB4MDBjMSxcbiAgICAweDAxMDEsIDB4MDE4MSwgMHgwMjAxLCAweDAzMDEsIDB4MDQwMSwgMHgwNjAxLCAweDA4MDEsIDB4MGMwMSxcbiAgICAweDEwMDEsIDB4MTgwMSwgMHgyMDAxLCAweDMwMDEsIDB4NDAwMSwgMHg2MDAxXG5dO1xuR1ppcC5jcGRleHQgPSBbXG4gICAgMCwgMCwgMCwgMCwgMSwgMSwgMiwgMixcbiAgICAzLCAzLCA0LCA0LCA1LCA1LCA2LCA2LFxuICAgIDcsIDcsIDgsIDgsIDksIDksIDEwLCAxMCxcbiAgICAxMSwgMTEsIDEyLCAxMiwgMTMsIDEzXG5dO1xuR1ppcC5ib3JkZXIgPSBbMTYsIDE3LCAxOCwgMCwgOCwgNywgOSwgNiwgMTAsIDUsIDExLCA0LCAxMiwgMywgMTMsIDIsIDE0LCAxLCAxNV07XG5cblxuLyoqXG4gKiBndW56aXBcbiAqIEByZXR1cm4ge0FycmF5fVxuICovXG5HWmlwLnByb3RvdHlwZS5ndW56aXAgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5vdXRwdXRBcnIgPSBbXTtcblxuICAgIC8vY29udmVydFRvQnl0ZUFycmF5KGlucHV0KTtcbiAgICAvL2lmICh0aGlzLmRlYnVnKSBhbGVydCh0aGlzLmRhdGEpO1xuXG4gICAgdGhpcy5uZXh0RmlsZSgpO1xuICAgIHJldHVybiB0aGlzLnVuemlwcGVkO1xufTtcblxuR1ppcC5wcm90b3R5cGUucmVhZEJ5dGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgdGhpcy5iaXRzICs9IDg7XG4gICAgaWYgKHRoaXMuYnl0ZXBvcyA8IHRoaXMuZGF0YS5sZW5ndGgpIHtcbiAgICAgICAgLy9yZXR1cm4gdGhpcy5kYXRhW3RoaXMuYnl0ZXBvcysrXTsgLy8gQXJyYXlcbiAgICAgICAgcmV0dXJuIHRoaXMuZGF0YS5jaGFyQ29kZUF0KHRoaXMuYnl0ZXBvcysrKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICByZXR1cm4gLTE7XG4gICAgfVxufTtcblxuR1ppcC5wcm90b3R5cGUuYnl0ZUFsaWduID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYmIgPSAxO1xufTtcblxuR1ppcC5wcm90b3R5cGUucmVhZEJpdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB2YXIgY2Fycnk7XG4gICAgdGhpcy5iaXRzKys7XG4gICAgY2FycnkgPSAodGhpcy5iYiAmIDEpO1xuICAgIHRoaXMuYmIgPj49IDE7XG4gICAgaWYgKHRoaXMuYmIgPT09IDApIHtcbiAgICAgICAgdGhpcy5iYiA9IHRoaXMucmVhZEJ5dGUoKTtcbiAgICAgICAgY2FycnkgPSAodGhpcy5iYiAmIDEpO1xuICAgICAgICB0aGlzLmJiID0gKHRoaXMuYmIgPj4gMSkgfCAweDgwO1xuICAgIH1cbiAgICByZXR1cm4gY2Fycnk7XG59O1xuXG5HWmlwLnByb3RvdHlwZS5yZWFkQml0cyA9IGZ1bmN0aW9uIChhKSB7XG4gICAgdmFyIHJlcyA9IDAsXG4gICAgICAgIGkgPSBhO1xuXG4gICAgd2hpbGUgKGktLSkgcmVzID0gKHJlcyA8PCAxKSB8IHRoaXMucmVhZEJpdCgpO1xuICAgIGlmIChhKSByZXMgPSBHWmlwLmJpdFJldmVyc2VbcmVzXSA+PiAoOCAtIGEpO1xuXG4gICAgcmV0dXJuIHJlcztcbn07XG5cbkdaaXAucHJvdG90eXBlLmZsdXNoQnVmZmVyID0gZnVuY3Rpb24gKCkge1xuICAgIHRoaXMuYklkeCA9IDA7XG59O1xuXG5HWmlwLnByb3RvdHlwZS5hZGRCdWZmZXIgPSBmdW5jdGlvbiAoYSkge1xuICAgIHRoaXMuYnVmMzJrW3RoaXMuYklkeCsrXSA9IGE7XG4gICAgdGhpcy5vdXRwdXRBcnIucHVzaChTdHJpbmcuZnJvbUNoYXJDb2RlKGEpKTtcbiAgICBpZiAodGhpcy5iSWR4ID09PSAweDgwMDApIHRoaXMuYklkeCA9IDA7XG59O1xuXG5HWmlwLnByb3RvdHlwZS5Jc1BhdCA9IGZ1bmN0aW9uICgpIHtcbiAgICB3aGlsZSAoMSkge1xuICAgICAgICBpZiAodGhpcy5mcG9zW3RoaXMubGVuXSA+PSB0aGlzLmZtYXgpICAgICAgIHJldHVybiAtMTtcbiAgICAgICAgaWYgKHRoaXMuZmxlbnNbdGhpcy5mcG9zW3RoaXMubGVuXV0gPT09IHRoaXMubGVuKSByZXR1cm4gdGhpcy5mcG9zW3RoaXMubGVuXSsrO1xuICAgICAgICB0aGlzLmZwb3NbdGhpcy5sZW5dKys7XG4gICAgfVxufTtcblxuR1ppcC5wcm90b3R5cGUuUmVjID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBjdXJwbGFjZSA9IHRoaXMuUGxhY2VzW3RoaXMudHJlZXBvc107XG4gICAgdmFyIHRtcDtcbiAgICAvL2lmICh0aGlzLmRlYnVnKSBkb2N1bWVudC53cml0ZShcIjxicj5sZW46XCIrdGhpcy5sZW4rXCIgdHJlZXBvczpcIit0aGlzLnRyZWVwb3MpO1xuICAgIGlmICh0aGlzLmxlbiA9PT0gMTcpIHsgLy93YXIgMTdcbiAgICAgICAgcmV0dXJuIC0xO1xuICAgIH1cbiAgICB0aGlzLnRyZWVwb3MrKztcbiAgICB0aGlzLmxlbisrO1xuXG4gICAgdG1wID0gdGhpcy5Jc1BhdCgpO1xuICAgIC8vaWYgKHRoaXMuZGVidWcpIGRvY3VtZW50LndyaXRlKFwiPGJyPklzUGF0IFwiK3RtcCk7XG4gICAgaWYgKHRtcCA+PSAwKSB7XG4gICAgICAgIGN1cnBsYWNlLmIwID0gdG1wO1xuICAgICAgICAvKiBsZWFmIGNlbGwgZm9yIDAtYml0ICovXG4gICAgICAgIC8vaWYgKHRoaXMuZGVidWcpIGRvY3VtZW50LndyaXRlKFwiPGJyPmIwIFwiK2N1cnBsYWNlLmIwKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICAvKiBOb3QgYSBMZWFmIGNlbGwgKi9cbiAgICAgICAgY3VycGxhY2UuYjAgPSAweDgwMDA7XG4gICAgICAgIC8vaWYgKHRoaXMuZGVidWcpIGRvY3VtZW50LndyaXRlKFwiPGJyPmIwIFwiK2N1cnBsYWNlLmIwKTtcbiAgICAgICAgaWYgKHRoaXMuUmVjKCkpIHJldHVybiAtMTtcbiAgICB9XG4gICAgdG1wID0gdGhpcy5Jc1BhdCgpO1xuICAgIGlmICh0bXAgPj0gMCkge1xuICAgICAgICBjdXJwbGFjZS5iMSA9IHRtcDtcbiAgICAgICAgLyogbGVhZiBjZWxsIGZvciAxLWJpdCAqL1xuICAgICAgICAvL2lmICh0aGlzLmRlYnVnKSBkb2N1bWVudC53cml0ZShcIjxicj5iMSBcIitjdXJwbGFjZS5iMSk7XG4gICAgICAgIGN1cnBsYWNlLmp1bXAgPSBudWxsO1xuICAgICAgICAvKiBKdXN0IGZvciB0aGUgZGlzcGxheSByb3V0aW5lICovXG4gICAgfSBlbHNlIHtcbiAgICAgICAgLyogTm90IGEgTGVhZiBjZWxsICovXG4gICAgICAgIGN1cnBsYWNlLmIxID0gMHg4MDAwO1xuICAgICAgICAvL2lmICh0aGlzLmRlYnVnKSBkb2N1bWVudC53cml0ZShcIjxicj5iMSBcIitjdXJwbGFjZS5iMSk7XG4gICAgICAgIGN1cnBsYWNlLmp1bXAgPSB0aGlzLlBsYWNlc1t0aGlzLnRyZWVwb3NdO1xuICAgICAgICBjdXJwbGFjZS5qdW1wcG9zID0gdGhpcy50cmVlcG9zO1xuICAgICAgICBpZiAodGhpcy5SZWMoKSkgcmV0dXJuIC0xO1xuICAgIH1cbiAgICB0aGlzLmxlbi0tO1xuICAgIHJldHVybiAwO1xufTtcblxuR1ppcC5wcm90b3R5cGUuQ3JlYXRlVHJlZSA9IGZ1bmN0aW9uIChjdXJyZW50VHJlZSwgbnVtdmFsLCBsZW5ndGhzLCBzaG93KSB7XG4gICAgdmFyIGk7XG4gICAgLyogQ3JlYXRlIHRoZSBIdWZmbWFuIGRlY29kZSB0cmVlL3RhYmxlICovXG4gICAgLy9pZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCJjdXJyZW50VHJlZSBcIitjdXJyZW50VHJlZStcIiBudW12YWwgXCIrbnVtdmFsK1wiIGxlbmd0aHMgXCIrbGVuZ3RocytcIiBzaG93IFwiK3Nob3cpO1xuICAgIHRoaXMuUGxhY2VzID0gY3VycmVudFRyZWU7XG4gICAgdGhpcy50cmVlcG9zID0gMDtcbiAgICB0aGlzLmZsZW5zID0gbGVuZ3RocztcbiAgICB0aGlzLmZtYXggPSBudW12YWw7XG4gICAgZm9yIChpID0gMDsgaSA8IDE3OyBpKyspIHRoaXMuZnBvc1tpXSA9IDA7XG4gICAgdGhpcy5sZW4gPSAwO1xuICAgIGlmICh0aGlzLlJlYygpKSB7XG4gICAgICAgIC8vaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwiaW52YWxpZCBodWZmbWFuIHRyZWVcXG5cIik7XG4gICAgICAgIHJldHVybiAtMTtcbiAgICB9XG4gICAgLy8gaWYgKHRoaXMuZGVidWcpIHtcbiAgICAvLyAgIGRvY3VtZW50LndyaXRlKCc8YnI+VHJlZTogJyt0aGlzLlBsYWNlcy5sZW5ndGgpO1xuICAgIC8vICAgZm9yICh2YXIgYT0wO2E8MzI7YSsrKXtcbiAgICAvLyAgICAgZG9jdW1lbnQud3JpdGUoXCJQbGFjZXNbXCIrYStcIl0uYjA9XCIrdGhpcy5QbGFjZXNbYV0uYjArXCI8YnI+XCIpO1xuICAgIC8vICAgICBkb2N1bWVudC53cml0ZShcIlBsYWNlc1tcIithK1wiXS5iMT1cIit0aGlzLlBsYWNlc1thXS5iMStcIjxicj5cIik7XG4gICAgLy8gICB9XG4gICAgLy8gfVxuXG4gICAgcmV0dXJuIDA7XG59O1xuXG5HWmlwLnByb3RvdHlwZS5EZWNvZGVWYWx1ZSA9IGZ1bmN0aW9uIChjdXJyZW50VHJlZSkge1xuICAgIHZhciBsZW4sIGksXG4gICAgICAgIHh0cmVlcG9zID0gMCxcbiAgICAgICAgWCA9IGN1cnJlbnRUcmVlW3h0cmVlcG9zXSxcbiAgICAgICAgYjtcblxuICAgIC8qIGRlY29kZSBvbmUgc3ltYm9sIG9mIHRoZSBkYXRhICovXG4gICAgd2hpbGUgKDEpIHtcbiAgICAgICAgYiA9IHRoaXMucmVhZEJpdCgpO1xuICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCJiPVwiK2IpO1xuICAgICAgICBpZiAoYikge1xuICAgICAgICAgICAgaWYgKCEoWC5iMSAmIDB4ODAwMCkpIHtcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgZG9jdW1lbnQud3JpdGUoXCJyZXQxXCIpO1xuICAgICAgICAgICAgICAgIHJldHVybiBYLmIxO1xuICAgICAgICAgICAgICAgIC8qIElmIGxlYWYgbm9kZSwgcmV0dXJuIGRhdGEgKi9cbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIFggPSBYLmp1bXA7XG4gICAgICAgICAgICBsZW4gPSBjdXJyZW50VHJlZS5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHtcbiAgICAgICAgICAgICAgICBpZiAoY3VycmVudFRyZWVbaV0gPT09IFgpIHtcbiAgICAgICAgICAgICAgICAgICAgeHRyZWVwb3MgPSBpO1xuICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBpZiAoIShYLmIwICYgMHg4MDAwKSkge1xuICAgICAgICAgICAgICAgIC8vIGlmICh0aGlzLmRlYnVnKSBkb2N1bWVudC53cml0ZShcInJldDJcIik7XG4gICAgICAgICAgICAgICAgcmV0dXJuIFguYjA7XG4gICAgICAgICAgICAgICAgLyogSWYgbGVhZiBub2RlLCByZXR1cm4gZGF0YSAqL1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgeHRyZWVwb3MrKztcbiAgICAgICAgICAgIFggPSBjdXJyZW50VHJlZVt4dHJlZXBvc107XG4gICAgICAgIH1cbiAgICB9XG4gICAgLy8gaWYgKHRoaXMuZGVidWcpIGRvY3VtZW50LndyaXRlKFwicmV0M1wiKTtcblxuICAgIHJldHVybiAtMTtcbn07XG5cbkdaaXAucHJvdG90eXBlLkRlZmxhdGVMb29wID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciBsYXN0LCBjLCB0eXBlLCBpLCBsZW47XG4gICAgZG8ge1xuICAgICAgICBsYXN0ID0gdGhpcy5yZWFkQml0KCk7XG4gICAgICAgIHR5cGUgPSB0aGlzLnJlYWRCaXRzKDIpO1xuXG4gICAgICAgIGlmICh0eXBlID09PSAwKSB7XG4gICAgICAgICAgICB2YXIgYmxvY2tMZW4sIGNTdW07XG5cbiAgICAgICAgICAgIC8vIFN0b3JlZFxuICAgICAgICAgICAgdGhpcy5ieXRlQWxpZ24oKTtcbiAgICAgICAgICAgIGJsb2NrTGVuID0gdGhpcy5yZWFkQnl0ZSgpO1xuICAgICAgICAgICAgYmxvY2tMZW4gfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcblxuICAgICAgICAgICAgY1N1bSA9IHRoaXMucmVhZEJ5dGUoKTtcbiAgICAgICAgICAgIGNTdW0gfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcblxuICAgICAgICAgICAgaWYgKCgoYmxvY2tMZW4gXiB+Y1N1bSkgJiAweGZmZmYpKSB7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQud3JpdGUoXCJCbG9ja0xlbiBjaGVja3N1bSBtaXNtYXRjaFxcblwiKTsgLy8gRklYTUU6IHVzZSB0aHJvd1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgd2hpbGUgKGJsb2NrTGVuLS0pIHtcbiAgICAgICAgICAgICAgICBjID0gdGhpcy5yZWFkQnl0ZSgpO1xuICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVmZmVyKGMpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IDEpIHtcbiAgICAgICAgICAgIHZhciBqO1xuXG4gICAgICAgICAgICAvKiBGaXhlZCBIdWZmbWFuIHRhYmxlcyAtLSBmaXhlZCBkZWNvZGUgcm91dGluZSAqL1xuICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICAvKlxuICAgICAgICAgICAgICAgICAyNTYgICAgMDAwMDAwMCAgICAgICAgMFxuICAgICAgICAgICAgICAgICA6ICAgOiAgICAgOlxuICAgICAgICAgICAgICAgICAyNzkgICAgMDAxMDExMSAgICAgICAgMjNcbiAgICAgICAgICAgICAgICAgMCAgIDAwMTEwMDAwICAgIDQ4XG4gICAgICAgICAgICAgICAgIDogICAgOiAgICAgIDpcbiAgICAgICAgICAgICAgICAgMTQzICAgIDEwMTExMTExICAgIDE5MVxuICAgICAgICAgICAgICAgICAyODAgMTEwMDAwMDAgICAgMTkyXG4gICAgICAgICAgICAgICAgIDogICAgOiAgICAgIDpcbiAgICAgICAgICAgICAgICAgMjg3IDExMDAwMTExICAgIDE5OVxuICAgICAgICAgICAgICAgICAxNDQgICAgMTEwMDEwMDAwICAgIDQwMFxuICAgICAgICAgICAgICAgICA6ICAgIDogICAgICAgOlxuICAgICAgICAgICAgICAgICAyNTUgICAgMTExMTExMTExICAgIDUxMVxuXG4gICAgICAgICAgICAgICAgIE5vdGUgdGhlIGJpdCBvcmRlciFcbiAgICAgICAgICAgICAgICAgKi9cbiAgICAgICAgICAgICAgICBqID0gKEdaaXAuYml0UmV2ZXJzZVt0aGlzLnJlYWRCaXRzKDcpXSA+PiAxKTtcbiAgICAgICAgICAgICAgICBpZiAoaiA+IDIzKSB7XG4gICAgICAgICAgICAgICAgICAgIGogPSAoaiA8PCAxKSB8IHRoaXMucmVhZEJpdCgpO1xuICAgICAgICAgICAgICAgICAgICAvKiA0OC4uMjU1ICovXG5cbiAgICAgICAgICAgICAgICAgICAgaWYgKGogPiAxOTkpIHsgICAgICAgICAgICAgIC8qIDIwMC4uMjU1ICovXG4gICAgICAgICAgICAgICAgICAgICAgICBqIC09IDEyODtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qICA3Mi4uMTI3ICovXG4gICAgICAgICAgICAgICAgICAgICAgICBqID0gKGogPDwgMSkgfCB0aGlzLnJlYWRCaXQoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qIDE0NC4uMjU1IDw8ICovXG4gICAgICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAvKiAgNDguLjE5OSAqL1xuICAgICAgICAgICAgICAgICAgICAgICAgaiAtPSA0ODtcbiAgICAgICAgICAgICAgICAgICAgICAgIC8qICAgMC4uMTUxICovXG4gICAgICAgICAgICAgICAgICAgICAgICBpZiAoaiA+IDE0Mykge1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIGogPSBqICsgMTM2O1xuICAgICAgICAgICAgICAgICAgICAgICAgICAgIC8qIDI4MC4uMjg3IDw8ICovXG4gICAgICAgICAgICAgICAgICAgICAgICAgICAgLyogICAwLi4xNDMgPDwgKi9cbiAgICAgICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7ICAgICAgICAgICAgICAgICAgICAgIC8qICAgMC4uMjMgKi9cbiAgICAgICAgICAgICAgICAgICAgaiArPSAyNTY7XG4gICAgICAgICAgICAgICAgICAgIC8qIDI1Ni4uMjc5IDw8ICovXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmIChqIDwgMjU2KSB7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVmZmVyKGopO1xuICAgICAgICAgICAgICAgIH0gZWxzZSBpZiAoaiA9PT0gMjU2KSB7XG4gICAgICAgICAgICAgICAgICAgIC8qIEVPRiAqL1xuICAgICAgICAgICAgICAgICAgICBicmVhazsgLy8gRklYTUU6IG1ha2UgdGhpcyB0aGUgbG9vcC1jb25kaXRpb25cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICB2YXIgbGVuLCBkaXN0O1xuXG4gICAgICAgICAgICAgICAgICAgIGogLT0gMjU2ICsgMTtcbiAgICAgICAgICAgICAgICAgICAgLyogYnl0ZXMgKyBFT0YgKi9cbiAgICAgICAgICAgICAgICAgICAgbGVuID0gdGhpcy5yZWFkQml0cyhHWmlwLmNwbGV4dFtqXSkgKyBHWmlwLmNwbGVuc1tqXTtcblxuICAgICAgICAgICAgICAgICAgICBqID0gR1ppcC5iaXRSZXZlcnNlW3RoaXMucmVhZEJpdHMoNSldID4+IDM7XG4gICAgICAgICAgICAgICAgICAgIGlmIChHWmlwLmNwZGV4dFtqXSA+IDgpIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3QgPSB0aGlzLnJlYWRCaXRzKDgpO1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdCB8PSAodGhpcy5yZWFkQml0cyhHWmlwLmNwZGV4dFtqXSAtIDgpIDw8IDgpO1xuICAgICAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICAgICAgZGlzdCA9IHRoaXMucmVhZEJpdHMoR1ppcC5jcGRleHRbal0pO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGRpc3QgKz0gR1ppcC5jcGRpc3Rbal07XG5cbiAgICAgICAgICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IGxlbjsgaisrKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB2YXIgYyA9IHRoaXMuYnVmMzJrWyh0aGlzLmJJZHggLSBkaXN0KSAmIDB4N2ZmZl07XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmFkZEJ1ZmZlcihjKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8gd2hpbGVcblxuICAgICAgICB9IGVsc2UgaWYgKHR5cGUgPT09IDIpIHtcbiAgICAgICAgICAgIHZhciBqLCBuLCBsaXRlcmFsQ29kZXMsIGRpc3RDb2RlcywgbGVuQ29kZXM7XG4gICAgICAgICAgICB2YXIgbGwgPSBuZXcgQXJyYXkoMjg4ICsgMzIpOyAgICAvLyBcInN0YXRpY1wiIGp1c3QgdG8gcHJlc2VydmUgc3RhY2tcblxuICAgICAgICAgICAgLy8gRHluYW1pYyBIdWZmbWFuIHRhYmxlc1xuXG4gICAgICAgICAgICBsaXRlcmFsQ29kZXMgPSAyNTcgKyB0aGlzLnJlYWRCaXRzKDUpO1xuICAgICAgICAgICAgZGlzdENvZGVzID0gMSArIHRoaXMucmVhZEJpdHMoNSk7XG4gICAgICAgICAgICBsZW5Db2RlcyA9IDQgKyB0aGlzLnJlYWRCaXRzKDQpO1xuICAgICAgICAgICAgZm9yIChqID0gMDsgaiA8IDE5OyBqKyspIHtcbiAgICAgICAgICAgICAgICBsbFtqXSA9IDA7XG4gICAgICAgICAgICB9XG5cbiAgICAgICAgICAgIC8vIEdldCB0aGUgZGVjb2RlIHRyZWUgY29kZSBsZW5ndGhzXG5cbiAgICAgICAgICAgIGZvciAoaiA9IDA7IGogPCBsZW5Db2RlczsgaisrKSB7XG4gICAgICAgICAgICAgICAgbGxbR1ppcC5ib3JkZXJbal1dID0gdGhpcy5yZWFkQml0cygzKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGxlbiA9IHRoaXMuZGlzdGFuY2VUcmVlLmxlbmd0aDtcbiAgICAgICAgICAgIGZvciAoaSA9IDA7IGkgPCBsZW47IGkrKykgdGhpcy5kaXN0YW5jZVRyZWVbaV0gPSBuZXcgR1ppcC5IdWZOb2RlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5DcmVhdGVUcmVlKHRoaXMuZGlzdGFuY2VUcmVlLCAxOSwgbGwsIDApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbHVzaEJ1ZmZlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIHtcbiAgICAgICAgICAgIC8vICAgZG9jdW1lbnQud3JpdGUoXCI8YnI+ZGlzdGFuY2VUcmVlXCIpO1xuICAgICAgICAgICAgLy8gICBmb3IodmFyIGE9MDthPHRoaXMuZGlzdGFuY2VUcmVlLmxlbmd0aDthKyspe1xuICAgICAgICAgICAgLy8gICAgIGRvY3VtZW50LndyaXRlKFwiPGJyPlwiK3RoaXMuZGlzdGFuY2VUcmVlW2FdLmIwK1wiIFwiK3RoaXMuZGlzdGFuY2VUcmVlW2FdLmIxK1wiIFwiK3RoaXMuZGlzdGFuY2VUcmVlW2FdLmp1bXArXCIgXCIrdGhpcy5kaXN0YW5jZVRyZWVbYV0uanVtcHBvcyk7XG4gICAgICAgICAgICAvLyAgIH1cbiAgICAgICAgICAgIC8vIH1cblxuICAgICAgICAgICAgLy9yZWFkIGluIGxpdGVyYWwgYW5kIGRpc3RhbmNlIGNvZGUgbGVuZ3Roc1xuICAgICAgICAgICAgbiA9IGxpdGVyYWxDb2RlcyArIGRpc3RDb2RlcztcbiAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgdmFyIHogPSAtMTtcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmRlYnVnKSBkb2N1bWVudC53cml0ZShcIjxicj5uPVwiK24rXCIgYml0czogXCIrdGhpcy5iaXRzK1wiPGJyPlwiKTtcbiAgICAgICAgICAgIHdoaWxlIChpIDwgbikge1xuICAgICAgICAgICAgICAgIHorKztcbiAgICAgICAgICAgICAgICBqID0gdGhpcy5EZWNvZGVWYWx1ZSh0aGlzLmRpc3RhbmNlVHJlZSk7XG4gICAgICAgICAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGRvY3VtZW50LndyaXRlKFwiPGJyPlwiK3orXCIgaTpcIitpK1wiIGRlY29kZTogXCIraitcIiAgICBiaXRzIFwiK3RoaXMuYml0cytcIjxicj5cIik7XG4gICAgICAgICAgICAgICAgaWYgKGogPCAxNikgeyAgICAvLyBsZW5ndGggb2YgY29kZSBpbiBiaXRzICgwLi4xNSlcbiAgICAgICAgICAgICAgICAgICAgbGxbaSsrXSA9IGo7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChqID09PSAxNikgeyAgICAvLyByZXBlYXQgbGFzdCBsZW5ndGggMyB0byA2IHRpbWVzXG4gICAgICAgICAgICAgICAgICAgIHZhciBsO1xuICAgICAgICAgICAgICAgICAgICBqID0gMyArIHRoaXMucmVhZEJpdHMoMik7XG4gICAgICAgICAgICAgICAgICAgIGlmIChpICsgaiA+IG4pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuZmx1c2hCdWZmZXIoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIGwgPSBpID8gbGxbaSAtIDFdIDogMDtcbiAgICAgICAgICAgICAgICAgICAgd2hpbGUgKGotLSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgbGxbaSsrXSA9IGw7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMTcpIHsgICAgICAgIC8vIDMgdG8gMTAgemVybyBsZW5ndGggY29kZXNcbiAgICAgICAgICAgICAgICAgICAgICAgIGogPSAzICsgdGhpcy5yZWFkQml0cygzKTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHsgICAgICAgIC8vIGogPT0gMTg6IDExIHRvIDEzOCB6ZXJvIGxlbmd0aCBjb2Rlc1xuICAgICAgICAgICAgICAgICAgICAgICAgaiA9IDExICsgdGhpcy5yZWFkQml0cyg3KTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBpZiAoaSArIGogPiBuKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICB0aGlzLmZsdXNoQnVmZmVyKCk7XG4gICAgICAgICAgICAgICAgICAgICAgICByZXR1cm4gMTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICB3aGlsZSAoai0tKSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBsbFtpKytdID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gLy8gd2hpbGVcblxuICAgICAgICAgICAgLy8gQ2FuIG92ZXJ3cml0ZSB0cmVlIGRlY29kZSB0cmVlIGFzIGl0IGlzIG5vdCB1c2VkIGFueW1vcmVcbiAgICAgICAgICAgIGxlbiA9IHRoaXMubGl0ZXJhbFRyZWUubGVuZ3RoO1xuICAgICAgICAgICAgZm9yIChpID0gMDsgaSA8IGxlbjsgaSsrKVxuICAgICAgICAgICAgICAgIHRoaXMubGl0ZXJhbFRyZWVbaV0gPSBuZXcgR1ppcC5IdWZOb2RlKCk7XG4gICAgICAgICAgICBpZiAodGhpcy5DcmVhdGVUcmVlKHRoaXMubGl0ZXJhbFRyZWUsIGxpdGVyYWxDb2RlcywgbGwsIDApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbHVzaEJ1ZmZlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgbGVuID0gdGhpcy5saXRlcmFsVHJlZS5sZW5ndGg7XG4gICAgICAgICAgICBmb3IgKGkgPSAwOyBpIDwgbGVuOyBpKyspIHRoaXMuZGlzdGFuY2VUcmVlW2ldID0gbmV3IEdaaXAuSHVmTm9kZSgpO1xuICAgICAgICAgICAgdmFyIGxsMiA9IG5ldyBBcnJheSgpO1xuICAgICAgICAgICAgZm9yIChpID0gbGl0ZXJhbENvZGVzOyBpIDwgbGwubGVuZ3RoOyBpKyspIGxsMltpIC0gbGl0ZXJhbENvZGVzXSA9IGxsW2ldO1xuICAgICAgICAgICAgaWYgKHRoaXMuQ3JlYXRlVHJlZSh0aGlzLmRpc3RhbmNlVHJlZSwgZGlzdENvZGVzLCBsbDIsIDApKSB7XG4gICAgICAgICAgICAgICAgdGhpcy5mbHVzaEJ1ZmZlcigpO1xuICAgICAgICAgICAgICAgIHJldHVybiAxO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGRvY3VtZW50LndyaXRlKFwiPGJyPmxpdGVyYWxUcmVlXCIpO1xuICAgICAgICAgICAgd2hpbGUgKDEpIHtcbiAgICAgICAgICAgICAgICBqID0gdGhpcy5EZWNvZGVWYWx1ZSh0aGlzLmxpdGVyYWxUcmVlKTtcbiAgICAgICAgICAgICAgICBpZiAoaiA+PSAyNTYpIHsgICAgICAgIC8vIEluIEM2NDogaWYgY2Fycnkgc2V0XG4gICAgICAgICAgICAgICAgICAgIHZhciBsZW4sIGRpc3Q7XG4gICAgICAgICAgICAgICAgICAgIGogLT0gMjU2O1xuICAgICAgICAgICAgICAgICAgICBpZiAoaiA9PT0gMCkge1xuICAgICAgICAgICAgICAgICAgICAgICAgLy8gRU9GXG4gICAgICAgICAgICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBqLS07XG4gICAgICAgICAgICAgICAgICAgIGxlbiA9IHRoaXMucmVhZEJpdHMoR1ppcC5jcGxleHRbal0pICsgR1ppcC5jcGxlbnNbal07XG5cbiAgICAgICAgICAgICAgICAgICAgaiA9IHRoaXMuRGVjb2RlVmFsdWUodGhpcy5kaXN0YW5jZVRyZWUpO1xuICAgICAgICAgICAgICAgICAgICBpZiAoR1ppcC5jcGRleHRbal0gPiA4KSB7XG4gICAgICAgICAgICAgICAgICAgICAgICBkaXN0ID0gdGhpcy5yZWFkQml0cyg4KTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3QgfD0gKHRoaXMucmVhZEJpdHMoR1ppcC5jcGRleHRbal0gLSA4KSA8PCA4KTtcbiAgICAgICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIGRpc3QgPSB0aGlzLnJlYWRCaXRzKEdaaXAuY3BkZXh0W2pdKTtcbiAgICAgICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgICAgICBkaXN0ICs9IEdaaXAuY3BkaXN0W2pdO1xuICAgICAgICAgICAgICAgICAgICB3aGlsZSAobGVuLS0pIHtcbiAgICAgICAgICAgICAgICAgICAgICAgIHZhciBjID0gdGhpcy5idWYzMmtbKHRoaXMuYklkeCAtIGRpc3QpICYgMHg3ZmZmXTtcbiAgICAgICAgICAgICAgICAgICAgICAgIHRoaXMuYWRkQnVmZmVyKGMpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpcy5hZGRCdWZmZXIoaik7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfSAvLyB3aGlsZVxuICAgICAgICB9XG4gICAgfSB3aGlsZSAoIWxhc3QpO1xuICAgIHRoaXMuZmx1c2hCdWZmZXIoKTtcblxuICAgIHRoaXMuYnl0ZUFsaWduKCk7XG4gICAgcmV0dXJuIDA7XG59O1xuXG5HWmlwLnByb3RvdHlwZS51bnppcEZpbGUgPSBmdW5jdGlvbiAobmFtZSkge1xuICAgIHZhciBpO1xuICAgIHRoaXMuZ3VuemlwKCk7XG4gICAgZm9yIChpID0gMDsgaSA8IHRoaXMudW56aXBwZWQubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgaWYgKHRoaXMudW56aXBwZWRbaV1bMV0gPT09IG5hbWUpIHtcbiAgICAgICAgICAgIHJldHVybiB0aGlzLnVuemlwcGVkW2ldWzBdO1xuICAgICAgICB9XG4gICAgfVxufTtcblxuR1ppcC5wcm90b3R5cGUubmV4dEZpbGUgPSBmdW5jdGlvbiAoKSB7XG4gICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwiTkVYVEZJTEVcIik7XG5cbiAgICB0aGlzLm91dHB1dEFyciA9IFtdO1xuICAgIHRoaXMubW9kZVpJUCA9IGZhbHNlO1xuXG4gICAgdmFyIHRtcCA9IFtdO1xuICAgIHRtcFswXSA9IHRoaXMucmVhZEJ5dGUoKTtcbiAgICB0bXBbMV0gPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwidHlwZTogXCIrdG1wWzBdK1wiIFwiK3RtcFsxXSk7XG5cbiAgICBpZiAodG1wWzBdID09PSAweDc4ICYmIHRtcFsxXSA9PT0gMHhkYSkgeyAvL0daSVBcbiAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwiR0VPTkV4VC1HWklQXCIpO1xuICAgICAgICB0aGlzLkRlZmxhdGVMb29wKCk7XG4gICAgICAgIC8vIGlmICh0aGlzLmRlYnVnKSBhbGVydCh0aGlzLm91dHB1dEFyci5qb2luKCcnKSk7XG4gICAgICAgIHRoaXMudW56aXBwZWRbdGhpcy5maWxlc10gPSBbdGhpcy5vdXRwdXRBcnIuam9pbignJyksIFwiZ2VvbmV4dC5neHRcIl07XG4gICAgICAgIHRoaXMuZmlsZXMrKztcbiAgICB9XG4gICAgaWYgKHRtcFswXSA9PT0gMHgxZiAmJiB0bXBbMV0gPT09IDB4OGIpIHsgLy9HWklQXG4gICAgICAgIC8vIGlmICh0aGlzLmRlYnVnKSBhbGVydChcIkdaSVBcIik7XG4gICAgICAgIHRoaXMuc2tpcGRpcigpO1xuICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQodGhpcy5vdXRwdXRBcnIuam9pbignJykpO1xuICAgICAgICB0aGlzLnVuemlwcGVkW3RoaXMuZmlsZXNdID0gW3RoaXMub3V0cHV0QXJyLmpvaW4oJycpLCBcImZpbGVcIl07XG4gICAgICAgIHRoaXMuZmlsZXMrKztcbiAgICB9XG4gICAgaWYgKHRtcFswXSA9PT0gMHg1MCAmJiB0bXBbMV0gPT09IDB4NGIpIHsgLy9aSVBcbiAgICAgICAgdGhpcy5tb2RlWklQID0gdHJ1ZTtcbiAgICAgICAgdG1wWzJdID0gdGhpcy5yZWFkQnl0ZSgpO1xuICAgICAgICB0bXBbM10gPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgICAgIGlmICh0bXBbMl0gPT09IDB4MDMgJiYgdG1wWzNdID09PSAweDA0KSB7XG4gICAgICAgICAgICAvL01PREVfWklQXG4gICAgICAgICAgICB0bXBbMF0gPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgICAgICAgICB0bXBbMV0gPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQoXCJaSVAtVmVyc2lvbjogXCIrdG1wWzFdK1wiIFwiK3RtcFswXS8xMCtcIi5cIit0bXBbMF0lMTApO1xuXG4gICAgICAgICAgICB0aGlzLmdwZmxhZ3MgPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgICAgICAgICB0aGlzLmdwZmxhZ3MgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmRlYnVnKSBhbGVydChcImdwZmxhZ3M6IFwiK3RoaXMuZ3BmbGFncyk7XG5cbiAgICAgICAgICAgIHZhciBtZXRob2QgPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgICAgICAgICBtZXRob2QgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcbiAgICAgICAgICAgIC8vIGlmICh0aGlzLmRlYnVnKSBhbGVydChcIm1ldGhvZDogXCIrbWV0aG9kKTtcblxuICAgICAgICAgICAgdGhpcy5yZWFkQnl0ZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWFkQnl0ZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWFkQnl0ZSgpO1xuICAgICAgICAgICAgdGhpcy5yZWFkQnl0ZSgpO1xuXG4vLyAgICAgICB2YXIgY3JjID0gdGhpcy5yZWFkQnl0ZSgpO1xuLy8gICAgICAgY3JjIHw9ICh0aGlzLnJlYWRCeXRlKCk8PDgpO1xuLy8gICAgICAgY3JjIHw9ICh0aGlzLnJlYWRCeXRlKCk8PDE2KTtcbi8vICAgICAgIGNyYyB8PSAodGhpcy5yZWFkQnl0ZSgpPDwyNCk7XG5cbiAgICAgICAgICAgIHZhciBjb21wU2l6ZSA9IHRoaXMucmVhZEJ5dGUoKTtcbiAgICAgICAgICAgIGNvbXBTaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgOCk7XG4gICAgICAgICAgICBjb21wU2l6ZSB8PSAodGhpcy5yZWFkQnl0ZSgpIDw8IDE2KTtcbiAgICAgICAgICAgIGNvbXBTaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgMjQpO1xuXG4gICAgICAgICAgICB2YXIgc2l6ZSA9IHRoaXMucmVhZEJ5dGUoKTtcbiAgICAgICAgICAgIHNpemUgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcbiAgICAgICAgICAgIHNpemUgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCAxNik7XG4gICAgICAgICAgICBzaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgMjQpO1xuXG4gICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQoXCJsb2NhbCBDUkM6IFwiK2NyYytcIlxcbmxvY2FsIFNpemU6IFwiK3NpemUrXCJcXG5sb2NhbCBDb21wU2l6ZTogXCIrY29tcFNpemUpO1xuXG4gICAgICAgICAgICB2YXIgZmlsZWxlbiA9IHRoaXMucmVhZEJ5dGUoKTtcbiAgICAgICAgICAgIGZpbGVsZW4gfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcblxuICAgICAgICAgICAgdmFyIGV4dHJhbGVuID0gdGhpcy5yZWFkQnl0ZSgpO1xuICAgICAgICAgICAgZXh0cmFsZW4gfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCA4KTtcblxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwiZmlsZWxlbiBcIitmaWxlbGVuKTtcbiAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgdGhpcy5uYW1lQnVmID0gW107XG4gICAgICAgICAgICB3aGlsZSAoZmlsZWxlbi0tKSB7XG4gICAgICAgICAgICAgICAgdmFyIGMgPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgICAgICAgICAgICAgaWYgKGMgPT09IFwiL1wiIHwgYyA9PT0gXCI6XCIpIHtcbiAgICAgICAgICAgICAgICAgICAgaSA9IDA7XG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpIDwgR1ppcC5OQU1FTUFYIC0gMSkge1xuICAgICAgICAgICAgICAgICAgICB0aGlzLm5hbWVCdWZbaSsrXSA9IFN0cmluZy5mcm9tQ2hhckNvZGUoYyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwibmFtZUJ1ZjogXCIrdGhpcy5uYW1lQnVmKTtcblxuICAgICAgICAgICAgaWYgKCF0aGlzLmZpbGVvdXQpIHRoaXMuZmlsZW91dCA9IHRoaXMubmFtZUJ1ZjtcblxuICAgICAgICAgICAgdmFyIGkgPSAwO1xuICAgICAgICAgICAgd2hpbGUgKGkgPCBleHRyYWxlbikge1xuICAgICAgICAgICAgICAgIGMgPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgICAgICAgICAgICAgaSsrO1xuICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAvLyBpZiAoc2l6ZSA9IDAgJiYgdGhpcy5maWxlT3V0LmNoYXJBdCh0aGlzLmZpbGVvdXQubGVuZ3RoLTEpPT1cIi9cIil7XG4gICAgICAgICAgICAvLyAgIC8vc2tpcGRpclxuICAgICAgICAgICAgLy8gICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQoXCJza2lwZGlyXCIpO1xuICAgICAgICAgICAgLy8gfVxuICAgICAgICAgICAgaWYgKG1ldGhvZCA9PT0gOCkge1xuICAgICAgICAgICAgICAgIHRoaXMuRGVmbGF0ZUxvb3AoKTtcbiAgICAgICAgICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQodGhpcy5vdXRwdXRBcnIuam9pbignJykpO1xuICAgICAgICAgICAgICAgIHRoaXMudW56aXBwZWRbdGhpcy5maWxlc10gPSBbdGhpcy5vdXRwdXRBcnIuam9pbignJyksIHRoaXMubmFtZUJ1Zi5qb2luKCcnKV07XG4gICAgICAgICAgICAgICAgdGhpcy5maWxlcysrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgdGhpcy5za2lwZGlyKCk7XG4gICAgICAgIH1cbiAgICB9XG59O1xuXG5HWmlwLnByb3RvdHlwZS5za2lwZGlyID0gZnVuY3Rpb24gKCkge1xuICAgIHZhciB0bXAgPSBbXTtcbiAgICB2YXIgY29tcFNpemUsIHNpemUsIG9zLCBpLCBjO1xuXG4gICAgaWYgKCh0aGlzLmdwZmxhZ3MgJiA4KSkge1xuICAgICAgICB0bXBbMF0gPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgICAgIHRtcFsxXSA9IHRoaXMucmVhZEJ5dGUoKTtcbiAgICAgICAgdG1wWzJdID0gdGhpcy5yZWFkQnl0ZSgpO1xuICAgICAgICB0bXBbM10gPSB0aGlzLnJlYWRCeXRlKCk7XG5cbi8vICAgICBpZiAodG1wWzBdID09IDB4NTAgJiYgdG1wWzFdID09IDB4NGIgJiYgdG1wWzJdID09IDB4MDcgJiYgdG1wWzNdID09IDB4MDgpIHtcbi8vICAgICAgIGNyYyA9IHRoaXMucmVhZEJ5dGUoKTtcbi8vICAgICAgIGNyYyB8PSAodGhpcy5yZWFkQnl0ZSgpPDw4KTtcbi8vICAgICAgIGNyYyB8PSAodGhpcy5yZWFkQnl0ZSgpPDwxNik7XG4vLyAgICAgICBjcmMgfD0gKHRoaXMucmVhZEJ5dGUoKTw8MjQpO1xuLy8gICAgIH0gZWxzZSB7XG4vLyAgICAgICBjcmMgPSB0bXBbMF0gfCAodG1wWzFdPDw4KSB8ICh0bXBbMl08PDE2KSB8ICh0bXBbM108PDI0KTtcbi8vICAgICB9XG5cbiAgICAgICAgY29tcFNpemUgPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgICAgIGNvbXBTaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgOCk7XG4gICAgICAgIGNvbXBTaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgMTYpO1xuICAgICAgICBjb21wU2l6ZSB8PSAodGhpcy5yZWFkQnl0ZSgpIDw8IDI0KTtcblxuICAgICAgICBzaXplID0gdGhpcy5yZWFkQnl0ZSgpO1xuICAgICAgICBzaXplIHw9ICh0aGlzLnJlYWRCeXRlKCkgPDwgOCk7XG4gICAgICAgIHNpemUgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCAxNik7XG4gICAgICAgIHNpemUgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCAyNCk7XG4gICAgfVxuXG4gICAgaWYgKHRoaXMubW9kZVpJUCkgdGhpcy5uZXh0RmlsZSgpO1xuXG4gICAgdG1wWzBdID0gdGhpcy5yZWFkQnl0ZSgpO1xuICAgIGlmICh0bXBbMF0gIT09IDgpIHtcbiAgICAgICAgLy8gaWYgKHRoaXMuZGVidWcpIGFsZXJ0KFwiVW5rbm93biBjb21wcmVzc2lvbiBtZXRob2QhXCIpO1xuICAgICAgICByZXR1cm4gMDtcbiAgICB9XG5cbiAgICB0aGlzLmdwZmxhZ3MgPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgLy8gaWYgKHRoaXMuZGVidWcgJiYgKHRoaXMuZ3BmbGFncyAmIH4oMHgxZikpKSBhbGVydChcIlVua25vd24gZmxhZ3Mgc2V0IVwiKTtcblxuICAgIHRoaXMucmVhZEJ5dGUoKTtcbiAgICB0aGlzLnJlYWRCeXRlKCk7XG4gICAgdGhpcy5yZWFkQnl0ZSgpO1xuICAgIHRoaXMucmVhZEJ5dGUoKTtcblxuICAgIHRoaXMucmVhZEJ5dGUoKTtcbiAgICBvcyA9IHRoaXMucmVhZEJ5dGUoKTtcblxuICAgIGlmICgodGhpcy5ncGZsYWdzICYgNCkpIHtcbiAgICAgICAgdG1wWzBdID0gdGhpcy5yZWFkQnl0ZSgpO1xuICAgICAgICB0bXBbMl0gPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgICAgIHRoaXMubGVuID0gdG1wWzBdICsgMjU2ICogdG1wWzFdO1xuICAgICAgICAvLyBpZiAodGhpcy5kZWJ1ZykgYWxlcnQoXCJFeHRyYSBmaWVsZCBzaXplOiBcIit0aGlzLmxlbik7XG4gICAgICAgIGZvciAoaSA9IDA7IGkgPCB0aGlzLmxlbjsgaSsrKVxuICAgICAgICAgICAgdGhpcy5yZWFkQnl0ZSgpO1xuICAgIH1cblxuICAgIGlmICgodGhpcy5ncGZsYWdzICYgOCkpIHtcbiAgICAgICAgaSA9IDA7XG4gICAgICAgIHRoaXMubmFtZUJ1ZiA9IFtdO1xuICAgICAgICB3aGlsZSAoYyA9IHRoaXMucmVhZEJ5dGUoKSkge1xuICAgICAgICAgICAgaWYgKGMgPT09IFwiN1wiIHx8IGMgPT09IFwiOlwiKVxuICAgICAgICAgICAgICAgIGkgPSAwO1xuICAgICAgICAgICAgaWYgKGkgPCBHWmlwLk5BTUVNQVggLSAxKVxuICAgICAgICAgICAgICAgIHRoaXMubmFtZUJ1ZltpKytdID0gYztcbiAgICAgICAgfVxuICAgICAgICAvL3RoaXMubmFtZUJ1ZltpXSA9IFwiXFwwXCI7XG4gICAgICAgIC8vIGlmICh0aGlzLmRlYnVnKSBhbGVydChcIm9yaWdpbmFsIGZpbGUgbmFtZTogXCIrdGhpcy5uYW1lQnVmKTtcbiAgICB9XG5cbiAgICBpZiAoKHRoaXMuZ3BmbGFncyAmIDE2KSkge1xuICAgICAgICB3aGlsZSAoYyA9IHRoaXMucmVhZEJ5dGUoKSkgeyAvLyBGSVhNRTogbG9va3MgbGlrZSB0aGV5IHJlYWQgdG8gdGhlIGVuZCBvZiB0aGUgc3RyZWFtLCBzaG91bGQgYmUgZG9hYmxlIG1vcmUgZWZmaWNpZW50bHlcbiAgICAgICAgICAgIC8vRklMRSBDT01NRU5UXG4gICAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoKHRoaXMuZ3BmbGFncyAmIDIpKSB7XG4gICAgICAgIHRoaXMucmVhZEJ5dGUoKTtcbiAgICAgICAgdGhpcy5yZWFkQnl0ZSgpO1xuICAgIH1cblxuICAgIHRoaXMuRGVmbGF0ZUxvb3AoKTtcblxuLy8gICBjcmMgPSB0aGlzLnJlYWRCeXRlKCk7XG4vLyAgIGNyYyB8PSAodGhpcy5yZWFkQnl0ZSgpPDw4KTtcbi8vICAgY3JjIHw9ICh0aGlzLnJlYWRCeXRlKCk8PDE2KTtcbi8vICAgY3JjIHw9ICh0aGlzLnJlYWRCeXRlKCk8PDI0KTtcblxuICAgIHNpemUgPSB0aGlzLnJlYWRCeXRlKCk7XG4gICAgc2l6ZSB8PSAodGhpcy5yZWFkQnl0ZSgpIDw8IDgpO1xuICAgIHNpemUgfD0gKHRoaXMucmVhZEJ5dGUoKSA8PCAxNik7XG4gICAgc2l6ZSB8PSAodGhpcy5yZWFkQnl0ZSgpIDw8IDI0KTtcblxuICAgIGlmICh0aGlzLm1vZGVaSVApIHRoaXMubmV4dEZpbGUoKTtcbn07XG5cbm1vZHVsZS5leHBvcnRzID0gR1ppcDtcbiJdLCJzb3VyY2VSb290IjoiLyJ9