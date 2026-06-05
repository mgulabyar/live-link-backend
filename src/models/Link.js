const mongoose = require("mongoose");

const LinkSchema = new mongoose.Schema({
  linkId: { 
    type: String, 
    required: true, 
    unique: true 
  },
  excelFileId: { 
    type: String, 
    required: true 
  },
  excelFileName: { 
    type: String, 
    required: true 
  },
  sheetName: { 
    type: String, 
    required: true 
  },
  rangeAddress: { 
    type: String, 
    required: true 
  },
  type: { 
    type: String, 
    enum: ["Table", "Chart"], 
    required: true 
  },
  dataSnapshot: { 
    type: mongoose.Schema.Types.Mixed, 
    required: true 
  },
  updatedAt: { 
    type: Date, 
    default: Date.now 
  }
});

module.exports = mongoose.model("Link", LinkSchema);