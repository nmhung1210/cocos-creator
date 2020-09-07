"use strict";

/****************************************************************************
 LICENSING AGREEMENT
 
 Xiamen Yaji Software Co., Ltd., (the “Licensor”) grants the user (the “Licensee”) non-exclusive and non-transferable rights to use the software according to the following conditions:
 a.  The Licensee shall pay royalties to the Licensor, and the amount of those royalties and the payment method are subject to separate negotiations between the parties.
 b.  The software is licensed for use rather than sold, and the Licensor reserves all rights over the software that are not expressly granted (whether by implication, reservation or prohibition).
 c.  The open source codes contained in the software are subject to the MIT Open Source Licensing Agreement (see the attached for the details);
 d.  The Licensee acknowledges and consents to the possibility that errors may occur during the operation of the software for one or more technical reasons, and the Licensee shall take precautions and prepare remedies for such events. In such circumstance, the Licensor shall provide software patches or updates according to the agreement between the two parties. The Licensor will not assume any liability beyond the explicit wording of this Licensing Agreement.
 e.  Where the Licensor must assume liability for the software according to relevant laws, the Licensor’s entire liability is limited to the annual royalty payable by the Licensee.
 f.  The Licensor owns the portions listed in the root directory and subdirectory (if any) in the software and enjoys the intellectual property rights over those portions. As for the portions owned by the Licensor, the Licensee shall not:
 - i. Bypass or avoid any relevant technical protection measures in the products or services;
 - ii. Release the source codes to any other parties;
 - iii. Disassemble, decompile, decipher, attack, emulate, exploit or reverse-engineer these portion of code;
 - iv. Apply it to any third-party products or services without Licensor’s permission;
 - v. Publish, copy, rent, lease, sell, export, import, distribute or lend any products containing these portions of code;
 - vi. Allow others to use any services relevant to the technology of these codes;
 - vii. Conduct any other act beyond the scope of this Licensing Agreement.
 g.  This Licensing Agreement terminates immediately if the Licensee breaches this Agreement. The Licensor may claim compensation from the Licensee where the Licensee’s breach causes any damage to the Licensor.
 h.  The laws of the People's Republic of China apply to this Licensing Agreement.
 i.  This Agreement is made in both Chinese and English, and the Chinese version shall prevail the event of conflict.
 ****************************************************************************/
var temp = [{
  x: 0,
  y: 0
}, {
  x: 0,
  y: 0
}, {
  x: 0,
  y: 0
}, {
  x: 0,
  y: 0
}];
cc.Sprite._assembler.sliced = {
  useModel: false,
  createData: function createData(sprite) {
    var renderHandle = sprite._renderHandle;

    if (renderHandle.meshCount === 0) {
      var vertices = new Float32Array(80);
      var indices = new Uint16Array(54);
      var indexOffset = 0;

      for (var r = 0; r < 3; ++r) {
        for (var c = 0; c < 3; ++c) {
          var start = r * 4 + c;
          indices[indexOffset++] = start;
          indices[indexOffset++] = start + 1;
          indices[indexOffset++] = start + 4;
          indices[indexOffset++] = start + 1;
          indices[indexOffset++] = start + 5;
          indices[indexOffset++] = start + 4;
        }
      }

      renderHandle.updateMesh(0, vertices, indices);
    }

    return renderHandle;
  },
  updateRenderData: function updateRenderData(sprite) {
    var frame = sprite.spriteFrame; // TODO: Material API design and export from editor could affect the material activation process
    // need to update the logic here

    if (frame) {
      if (sprite._material._texture !== frame._texture) {
        sprite._activateMaterial();
      }

      sprite._renderHandle.updateMaterial(0, sprite._material);
    }

    if (frame && sprite._vertsDirty) {
      this.updateVerts(sprite);
      sprite._vertsDirty = false;
    }
  },
  updateColor: function updateColor(sprite, color) {
    var uintVerts = sprite._renderHandle.uintVDatas[0];

    if (uintVerts) {
      color = ((uintVerts[4] & 0xff000000) >>> 0 | color & 0x00ffffff) >>> 0;
      var length = uintVerts.length;

      for (var offset = 4; offset < length; offset += 5) {
        uintVerts[offset] = color;
      }
    }
  },
  updateVerts: function updateVerts(sprite) {
    var renderHandle = sprite._renderHandle,
        verts = renderHandle.vDatas[0],
        uintVerts = renderHandle.uintVDatas[0],
        node = sprite.node,
        color = node._color._val,
        width = node.width,
        height = node.height,
        appx = node.anchorX * width,
        appy = node.anchorY * height;
    var frame = sprite.spriteFrame;
    var leftWidth = frame.insetLeft;
    var rightWidth = frame.insetRight;
    var topHeight = frame.insetTop;
    var bottomHeight = frame.insetBottom;
    var sizableWidth = width - leftWidth - rightWidth;
    var sizableHeight = height - topHeight - bottomHeight;
    var xScale = width / (leftWidth + rightWidth);
    var yScale = height / (topHeight + bottomHeight);
    xScale = isNaN(xScale) || xScale > 1 ? 1 : xScale;
    yScale = isNaN(yScale) || yScale > 1 ? 1 : yScale;
    sizableWidth = sizableWidth < 0 ? 0 : sizableWidth;
    sizableHeight = sizableHeight < 0 ? 0 : sizableHeight;
    temp[0].x = -appx;
    temp[0].y = -appy;
    temp[1].x = leftWidth * xScale - appx;
    temp[1].y = bottomHeight * yScale - appy;
    temp[2].x = temp[1].x + sizableWidth;
    temp[2].y = temp[1].y + sizableHeight;
    temp[3].x = width - appx;
    temp[3].y = height - appy;
    color = (uintVerts[4] & 0xff000000 | (color & 0x00ffffff) >>> 0) >>> 0;
    var uvSliced = sprite.spriteFrame.uvSliced;

    for (var row = 0; row < 4; ++row) {
      var rowD = temp[row];

      for (var col = 0; col < 4; ++col) {
        var vid = row * 4 + col;
        var uv = uvSliced[vid];
        var colD = temp[col];
        var voffset = vid * 5;
        verts[voffset] = colD.x;
        verts[voffset + 1] = rowD.y;
        verts[voffset + 2] = uv.u;
        verts[voffset + 3] = uv.v;
        uintVerts[voffset + 4] = color;
      }
    }
  }
};