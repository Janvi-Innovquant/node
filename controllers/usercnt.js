let User = require("../models/usermodel")
const path = require("path")
const xlsx = require("xlsx")
const createCsvWriter = require('csv-writer').createObjectCsvWriter;


module.exports = {
    saveuser: async (req, res) => {
        try {
            let user = new User(req.body)
            let data = await user.save();
            res.send({ success: true, message: "User Saved Successfully", data })
        } catch (error) {
            res.send({ success: false, message: "Something wrong", error })
        }
    },

    matchdata: async (req, res) => {
        console.log("Hii")
        if (!req.file || !req.file.filename) {
                return res.status(400).send("File not uploaded");
              }
        const filePath = req.file.path;
        console.log("FilePath", filePath)
        const XlsxData = xlsx.readFile(filePath)
        console.log("XLData", XlsxData)
        const sheetName = XlsxData.SheetNames[0];
        console.log("SN", sheetName)
        const Sheet = xlsx.utils.sheet_to_json(XlsxData.Sheets[sheetName])
        console.log("Sheet", Sheet)

        //     const excelData = Sheet.map(row => ({
        //      key: row.name,
        //      value: row.janvi,
        //    }));

        //    const Data = await User.find({},(err,mongoData) => {
        //      if (err) 
        //        return res.status(500).send(err);

        //      const matchData = excelData.map(row => {
        //        const mongoRow = mongoData.find(mongoRow => mongoRow.key === row.key)
        //        return {
        //          key: excelRow.key,
        //          excelValue: excelRow.value,
        //          mongoValue: mongoRow ? mongoRow.value : null,
        //        };
        //      })
        //      res.json({matchData,Data})
        //    })

        const excelValues = Sheet.flatMap(row => [row.name, row.email]);
        console.log("E Values", excelValues);

        const Data = await User.find({});
        const mongoValues = Data.flatMap(row => [row.name, row.email]);
        console.log("Mongo values", mongoValues);

        const matchData = excelValues.map(value => ({
            value,
            matched: mongoValues.includes(value)
        }));

        console.log("Match Data", matchData);
        return res.send(matchData);
    }
}

