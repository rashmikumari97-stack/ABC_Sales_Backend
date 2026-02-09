const { connectDB, sql } = require("../config/db");

const getCustomer = async (req, res) => {
  try {
    await connectDB();
    console.log("DB connected");
    const result = await sql.query("SELECT * FROM CUSTOMER");
    res.status(200).json(result.recordset);
  } catch (error) {
    console.error("error occured", error.message);
    res
      .status(500)
      .json({ message: "failed to fetch customers" + " " + error.message });
  }
};

const createCustomer = async (req, res) => {
  try {
    console.log("create body", req.body);
    const { CustomerName, City, State, Country } = req.body;
    if (!CustomerName || !City || !State || !Country) {
      return res.status(400).json({ massage: "Required fields missing" });
    }

    const pool = await connectDB();
    console.log(pool, "connection");
    await sql.query(`INSERT INTO Customer (CustomerName, City, State, Country)
VALUES 
('${CustomerName}', '${City}', '${State}', '${Country}')`);

    res.status(201).json({ message: "Customer created Successfully" });
  } catch (error) {
    console.error("Create customer Error:", error.message);
    res
      .status(500)
      .json({ message: "Customer Creation Failed", error: error.message });
  }
};


const updateCustomer=async(req,res)=>{

  try{
    const{id}=req.params;
    const{ CustomerName,City,State,Country}= req.body;

    if(!id){
      return 
      res.status(400).json({message:"Customer ID is required"})
    }
    const pool = await connectDB();
    await sql.query(`UPDATE Customer SET CustomerName ='${CustomerName}', City='${City}', State='${State}', Country='${Country}' WHERE CustomerID='${id}'`)
    res.json({message:"Customer updated successfully"})
  }

  catch(error){
    console.error("update Customer error:",error);
    res.status(500).json({error:"update customer failed"})
  }
}
const deleteCustomer=async(req,res)=>{

  try{
    const{id}=req.params;
    

    if(!id){
      return 
      res.status(400).json({message:"Customer ID is required"})
    }
    const pool = await connectDB();
    await sql.query(`DELETE FROM Customer WHERE CustomerID='${id}'`)
    res.json({message:"Customer deleted successfully"})
  }

  catch(error){
    console.error("Delete Customer error:",error);
    res.status(500).json({error:"Delete failed"})
  }
}



module.exports = { getCustomer, createCustomer, updateCustomer ,deleteCustomer};
