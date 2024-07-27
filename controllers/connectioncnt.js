const pagination = require("../middleware/pagination");
let Connection = require("../models/connectionmodel");
const path = require("path")
const xlsx = require("xlsx")

module.exports = {
  saveconnection: async (req, res) => {
    try {
      let connection = new Connection(req.body)
      let data = await connection.save();
      res.send({ success: true, message: "Connected Successfully", data })
    } catch (error) {
      res.send({ success: false, message: "Something wrong", error })
    }
  },

  getConnection: async (req, res) => {
    try {
      const { page = 1, limit = 10, search, status } = req.query;
      const total = await Connection.countDocuments();
      const totalPages = Math.ceil(total / limit);
      const currentPage = parseInt(page, 10);
      const limitInt = parseInt(limit, 10);

      let matchStage = {};
      if (search) {
        matchStage = {
          $or: [
            { 'requestedByDetails.name': { $regex: search, $options: 'i' } },
            { 'requestedToDetails.name': { $regex: search, $options: 'i' } },
            { 'status': { $regex: search } },

          ]
        }
      }

      const pipeline = [
        {
          $lookup: {
            from: 'User', // the collection name for the User model
            localField: 'requestedBy',
            foreignField: '_id',
            as: 'requestedByDetails'
          }

        },

        {
          $lookup: {
            from: 'User', // the collection name for the User model
            localField: 'requestedTo',
            foreignField: '_id',
            as: 'requestedToDetails'
          }
        },

        {
          $lookup: {
            from: 'User',
            localField: 'approvedBy',
            foreignField: '_id',
            as: 'ApprovedBy'
          }
        },

        {
          $unwind: {
            path: '$requestedByDetails',
            preserveNullAndEmptyArrays: true
          }
        },
        {
          $unwind: {
             path: '$requestedToDetails',
             preserveNullAndEmptyArrays: true
            }
        },
        {
          $unwind: {
            path: '$ApprovedBy',
            preserveNullAndEmptyArrays: true
          }
        },

        {
          $match: matchStage
        },

        {
          $group: {
            _id: '$_id',
            requestedBy: { $first: '$requestedByDetails' },
            requestedTo: { $push: '$requestedToDetails' },
            approvedBy: {$push: '$ApprovedBy'},
            amount: { $first: '$amount' },
            status: { $first: '$status' },
            created_at: { $first: '$created_at' }
          }
        },

        {
          $facet: {
            metadata: [
              { $count: 'totalData' },
              { $addFields: { totalPages: { $ceil: { $divide: ['$totalData', limitInt] } } } }
            ],
            data: [
              { $skip: (currentPage - 1) * limitInt },
              { $limit: limitInt }
            ]
          }
        },
        {
          $unwind: '$metadata'
        },
        {
          $project: {
            data: 1,
            totalData: '$metadata.totalData',
            totalPages: '$metadata.totalPages',
            currentPage: { $literal: currentPage }
          }
        }
     ]

      if (status) {
        pipeline.push(
          {
            $match: {
              status: status
            }
          },
          
        )
      }
      let data = await Connection.aggregate(pipeline);
      res.send({ success: true, message: "done", limit: limitInt, data })
    } catch (error) {
      console.log(error)
      res.send({ success: false, message: "Something went wrong", error })
    }
  },


  // matchdata : async(req,res)=>{
  //      const filePath =  path.join(__dirname,'uploads',req.file.filename);
  //      const XlsxData = xlsx.readFile(filePath)
  //      const sheetName = XlsxData.SheetNames[0];
  //      const Sheet = xlsx.utils.sheet_to_json(XlsxData.Sheets[sheetName])

  //      const excelData = worksheet.map(row => ({
  //       key: row.key,
  //       value: row.value,
  //     }));

  //     const Data = await Connection.find({},(err,mongoData) => {
  //       if (err) 
  //         return res.status(500).send(err);

  //       const matchData = excelData.map(row => {
  //         const mongoRow = mongoData.find(mongoRow => mongoRow.key === row.key)
  //         return {
  //           key: excelRow.key,
  //           excelValue: excelRow.value,
  //           mongoValue: mongoRow ? mongoRow.value : null,
  //         };
  //       })
  //       res.json({matchData,Data})
  //     })
  // }

  

}





