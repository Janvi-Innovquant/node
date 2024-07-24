const pagination = (model) => {
    return async (req, res, next) => {
      try {
        const { page = 1, limit = 10 } = req.query;
        
        const totalData = await model.countDocuments();
        const totalPages = Math.ceil(totalData / limit);
        const currentPage = parseInt(page, 10);
        
        const Limit = limit * 1;
        console.log("Limit",Limit)
        const skip = (page - 1)*limit
        console.log("Skip",skip)
         
        const results = await model.find()
          .limit(Limit)
          .skip(skip)
          .exec();
        
          console.log("Result",results)

        res.pagination = {
          totalData,
          totalPages,
          currentPage,
          data: results,
        };
        
        next();
      } catch (err) {
        console.error(err.message);
        res.status(500).send('Something went wrong');
      }
    };
  };
  
  module.exports = pagination;



  
