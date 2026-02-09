const { connectDB, sql } = require("../config/db");

const getDiscount = async (req, res) => {
  try {
    await connectDB();
    console.log("DB connected");
    const result = await sql.query("SELECT * FROM DISCOUNT");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("error occured", error.message);
    res
      .status(500)
      .json({ message: "failed to fetch discount" + " " + error.message });
  }
};

const createDiscount = async (req, res) => {
  try {
    console.log("create body", req.body);
    const { ProductID, DiscountAmount, DiscountPercentage, Status } = req.body;
    if (!ProductID) {
      return res.status(400).json({ massage: "Required fields missing" });
    }

    const pool = await connectDB();
    console.log(pool, "connection");
    const product=await sql.query(`select ProductId from Product where ProductID ='${ProductID}'`)

    if(product.recordset.length === 0){
      return res.status(400).json({message: "invalid product"})
    }
    await sql.query(`INSERT INTO Discount (ProductID, DiscountAmount, DiscountPercentage, Status)
VALUES 
('${ProductID}', '${DiscountAmount}', '${DiscountPercentage}', '${Status}')`);

    res.status(201).json({ message: "Discount created Successfully" });
  } catch (error) {
    console.error("Create Discount Error:", error.message);
    res
      .status(500)
      .json({ message: "Discount Creation Failed", error: error.message });
  }
};


const updateDiscount=async(req,res)=>{

  try{
    const{id}=req.params;
    const{ ProductID, DiscountAmount, DiscountPercentage, Status}= req.body;

    if(!id){
      return 
      res.status(400).json({message:"Discount ID is required"})
    }
    const pool = await connectDB();
    await sql.query(`UPDATE Discount SET ProductID ='${ProductID}', DiscountAmount='${DiscountAmount}', DiscountPercentage='${DiscountPercentage}', Status='${Status}' WHERE DiscountID='${id}'`)
    res.json({message:"Discount updated successfully"})
  }

  catch(error){
    console.error("update Discount error:",error);
    res.status(500).json({error:"update Discount failed"})
  }
}
const deleteDiscount=async(req,res)=>{

  try{
    const{id}=req.params;
    

    if(!id){
      return 
      res.status(400).json({message:"Discount ID is required"})
    }
    const pool = await connectDB();
    await sql.query(`DELETE FROM Discount WHERE DiscountID='${id}'`)
    res.json({message:"Discount deleted successfully"})
  }

  catch(error){
    console.error("Delete Discount error:",error);
    res.status(500).json({error:"Delete failed"})
  }
}



module.exports = { getDiscount, createDiscount, updateDiscount ,deleteDiscount};
