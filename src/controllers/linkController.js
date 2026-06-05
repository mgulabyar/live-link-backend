const Link = require("../models/Link");

const saveLink = async (req, res) => {
  try {
    const { linkId, excelFileId, excelFileName, sheetName, rangeAddress, type, dataSnapshot } = req.body;

    if (!linkId || !excelFileId || !sheetName || !rangeAddress || !type || !dataSnapshot) {
      return res.status(400).json({ success: false, message: "Missing required fields." });
    }

    const link = await Link.findOneAndUpdate(
      { linkId },
      { 
        excelFileId, 
        excelFileName, 
        sheetName, 
        rangeAddress, 
        type, 
        dataSnapshot, 
        updatedAt: Date.now() 
      },
      { returnDocument: 'after', upsert: true }
    );

    res.status(200).json({
      success: true,
      message: "Link data saved successfully.",
      data: link
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to save link data.",
      error: error.message
    });
  }
};

const getLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const link = await Link.findOne({ linkId });

    if (!link) {
      return res.status(404).json({ success: false, message: "Link reference not found." });
    }

    res.status(200).json({
      success: true,
      data: link
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve link data.",
      error: error.message
    });
  }
};
const getBulkLinks = async (req, res) => {
  try {
    const { linkIds } = req.body; 

    if (!linkIds || !Array.isArray(linkIds)) {
      return res.status(400).json({ success: false, message: "Invalid or missing linkIds array." });
    }

    const links = await Link.find({ linkId: { $in: linkIds } });

    res.status(200).json({
      success: true,
      data: links
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to retrieve bulk link data.",
      error: error.message
    });
  }
};

const updateLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const { dataSnapshot } = req.body;

    if (!dataSnapshot) {
      return res.status(400).json({ success: false, message: "Missing dataSnapshot for update." });
    }

    const link = await Link.findOneAndUpdate(
      { linkId },
      { dataSnapshot, updatedAt: Date.now() },
      { returnDocument: 'after' }
    );

    if (!link) {
      return res.status(404).json({ success: false, message: "Link reference not found." });
    }

    res.status(200).json({
      success: true,
      message: "Link data updated successfully.",
      data: link
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update link data.",
      error: error.message
    });
  }
};

const deleteLink = async (req, res) => {
  try {
    const { linkId } = req.params;
    const link = await Link.findOneAndDelete({ linkId });

    if (!link) {
      return res.status(404).json({ success: false, message: "Link reference not found." });
    }

    res.status(200).json({
      success: true,
      message: "Link reference deleted successfully.",
      data: link
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete link reference.",
      error: error.message
    });
  }
};


const getDistinctWorkbooks = async (req, res) => {
  try {
    const workbooks = await Link.aggregate([
      {
        $group: {
          _id: "$excelFileName" 
        }
      }
    ]);
    res.status(200).json({ success: true, data: workbooks });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch workbooks.", error: error.message });
  }
};


const getLinksByWorkbook = async (req, res) => {
  try {
    const { excelFileId } = req.params;
    const links = await Link.find({ excelFileName: excelFileId }).sort({ updatedAt: -1 });
    res.status(200).json({ success: true, data: links });
  } catch (error) {
    res.status(500).json({ success: false, message: "Failed to fetch workbook components.", error: error.message });
  }
};

module.exports = {
  saveLink,
  getLink,
  getBulkLinks,
  updateLink,
  deleteLink,
  getDistinctWorkbooks,
  getLinksByWorkbook
};