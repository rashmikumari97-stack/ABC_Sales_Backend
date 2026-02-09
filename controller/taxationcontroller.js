const { connectDB, sql } = require("../config/db");

const getTaxation= async (req, res) => {
  try {
    await connectDB();
    console.log("DB connected");
    const result = await sql.query("SELECT * FROM TAXATION");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("error occured", error.message);
    res
      .status(500)
      .json({ message: "failed to fetch Tax" + " " + error.message });
  }
};

const createTaxation = async (req, res) => {
  try {
   
    const { TaxName,TaxTypeApplicable, TaxAmount, ApplicableYorN } = req.body;
  

    const pool = await connectDB();
   
    await sql.query(`INSERT INTO Taxation ( TaxName,TaxTypeApplicable, TaxAmount, ApplicableYorN )
VALUES 
('${TaxName}','${TaxTypeApplicable}','${TaxAmount}','${ApplicableYorN}')`);

    res.status(201).json({ message: " Taxation created Successfully" });
  } catch (error) {
    console.error("Create  Taxation Error:", error.message);
    res
      .status(500)
      .json({ message: " Taxation Creation Failed", error: error.message });
  }
};


const updateTaxation=async(req,res)=>{

  try{
    const{id}=req.params;
 const { TaxName,TaxTypeApplicable, TaxAmount, ApplicableYorN } = req.body;
    if(!id){
      return 
      res.status(400).json({message:"Tax ID is required"})
    }
    const pool = await connectDB();
    await sql.query(`UPDATE Taxation SET TaxName ='${TaxName}', TaxTypeApplicable='${TaxTypeApplicable}', TaxAmount='${TaxAmount}', ApplicableYorN='${ApplicableYorN}' WHERE TaxID='${id}'`)
    res.json({message:"Tax updated successfully"})
  }

  catch(error){
    console.error(" Tax error:",error);
    res.status(500).json({error:"update Tax failed"})
  }
}
const deleteTaxation=async(req,res)=>{

  try{
    const{id}=req.params;
    

    if(!id){
      return 
      res.status(400).json({message:"tax ID is required"})
    }
    const pool = await connectDB();
    await sql.query(`DELETE FROM TAXATION WHERE TaxID='${id}'`)
    res.json({message:"Tax deleted successfully"})
  }

  catch(error){
    console.error("Delete Tax error:",error);
    res.status(500).json({error:"Delete failed"})
  }
}



module.exports = { getTaxation, createTaxation, updateTaxation ,deleteTaxation};
