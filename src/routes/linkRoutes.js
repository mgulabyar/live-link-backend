const express = require("express");
const router = express.Router();
const { 
  saveLink, 
  getLink, 
  getBulkLinks,
  updateLink, 
  deleteLink, 
  getDistinctWorkbooks, 
  getLinksByWorkbook 
} = require("../controllers/linkController");

router.post("/register", saveLink);

router.get("/workbooks", getDistinctWorkbooks);

router.get("/workbook/:excelFileId", getLinksByWorkbook);

router.post("/bulk", getBulkLinks);

router.get("/:linkId", getLink);

router.put("/:linkId", updateLink);

router.delete("/:linkId", deleteLink);

module.exports = router;