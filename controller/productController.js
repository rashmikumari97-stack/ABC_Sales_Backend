const { connectDB, sql } = require("../config/db");

const getProduct= async (req, res) => {
  try {
    await connectDB();
    console.log("DB connected");
    const result = await sql.query("SELECT * FROM PRODUCT");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("error occured", error.message);
    res
      .status(500)
      .json({ message: "failed to fetch products" + " " + error.message });
  }
};

const createProduct = async (req, res) => {
  try {
   
    const { ProductName,ManufacturingDate, ShelfLifeInMonths, Rate, Quantity } = req.body;
    if (!ProductName || !ManufacturingDate || !ShelfLifeInMonths || !Rate ||!Quantity) {
      return res.status(400).json({ massage: "Required fields missing" });
    }

    const pool = await connectDB();
   
    await sql.query(`INSERT INTO PRODUCT (ProductName, ManufacturingDate, ShelfLifeInMonths, Rate, Quantity)
VALUES 
('${ProductName}','${ManufacturingDate}','${ShelfLifeInMonths}','${Rate}', '${Quantity}')`);

    res.status(201).json({ message: " Product created Successfully" });
  } catch (error) {
    console.error("Create  Product Error:", error.message);
    res
      .status(500)
      .json({ message: " Product Creation Failed", error: error.message });
  }
};


const updateProduct=async(req,res)=>{

  try{
    const{id}=req.params;
    const{ ProductName,ManufacturingDate,ShelfLifeInMonths,Rate,Quantity}= req.body;

    if(!id){
      return 
      res.status(400).json({message:"Product ID is required"})
    }
    const pool = await connectDB();
    await sql.query(`UPDATE PRODUCT SET ProductName ='${ProductName}', ManufacturingDate='${ManufacturingDate}', ShelfLifeInMonths='${ShelfLifeInMonths}', Rate='${Rate}', Quantity='${Quantity}' WHERE ProductID='${id}'`)
    res.json({message:"Product updated successfully"})
  }

  catch(error){
    console.error("update Product error:",error);
    res.status(500).json({error:"update Product failed"})
  }
}
const deleteProduct=async(req,res)=>{

  try{
    const{id}=req.params;
    

    if(!id){
      return 
      res.status(400).json({message:"Product ID is required"})
    }
    const pool = await connectDB();
    await sql.query(`DELETE FROM PRODUCT WHERE ProductID='${id}'`)
    res.json({message:"Product deleted successfully"})
  }

  catch(error){
    console.error("Delete Product error:",error);
    res.status(500).json({error:"Delete failed"})
  }
}



module.exports = { getProduct, createProduct, updateProduct ,deleteProduct};
