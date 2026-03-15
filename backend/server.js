require("dotenv").config({
    path: require("path").resolve(__dirname, "../.env")
    })

const fs = require("fs")

const express = require("express")
const cors = require("cors")
const path = require("path")

const calculatePayroll = require("./payrollEngine")
const generatePDF = require("./pdfService")
const sendEmail = require("./emailService")

const app = express()

app.use(cors())
app.use(express.json())

/* Serve frontend */

app.use(express.static(path.join(__dirname, "../frontend")))

/* Health check */

app.get("/health", (req,res)=>{
res.json({status:"Server Running"})
})

/* Generate Offer API */

app.post("/generate-offer", async (req,res)=>{

try{

const {name,email,designation,ctc} = req.body

console.log("Incoming request:",req.body)

/* Load Company Stamp */

const fs = require("fs")

const stamp = fs.readFileSync(path.join(__dirname,"assets/stamp.jpg"))
const stampBase64 = stamp.toString("base64")

const hrSignature = fs.readFileSync(path.join(__dirname,"assets/hr.png"))
const hrSignatureBase64 = hrSignature.toString("base64")

/* Payroll Calculation */

const payroll = calculatePayroll(ctc)

console.log("Payroll calculated")

/* Offer HTML */

const html = `

<style>

body{
font-family:Arial;
padding:40px;
}

.header{
text-align:center;
margin-bottom:30px;
}

.company{
font-size:26px;
font-weight:bold;
}

.address{
font-size:12px;
color:#555;
}

h2{
border-bottom:2px solid #000;
padding-bottom:5px;
}

table{
width:100%;
border-collapse:collapse;
margin-top:20px;
}

th,td{
border:1px solid #ccc;
padding:10px;
text-align:left;
}

th{
background:#f4f4f4;
}

.footer{
margin-top:40px;
font-size:12px;
}

</style>

<div class="header">

<div class="company">ABC Technologies Pvt Ltd</div>

<div class="address">
Bangalore | Mumbai | Delhi  
Email: hr@abctech.com
</div>

</div>

<h2>Offer Letter Annexure</h2>

<p>
We are pleased to offer employment to <strong>${name}</strong> for the position of 
<strong>${designation}</strong>.
</p>

<p>
Below is the detailed salary structure of your compensation package.
</p>

<h3>Compensation Structure</h3>

<table>

<tr>
<th>Component</th>
<th>Annual Amount (₹)</th>
</tr>

<tr>
<td>Basic Salary</td>
<td>${Math.round(payroll.basic)}</td>
</tr>

<tr>
<td>House Rent Allowance</td>
<td>${Math.round(payroll.hra)}</td>
</tr>

<tr>
<td>Conveyance Allowance</td>
<td>${Math.round(payroll.conveyance)}</td>
</tr>

<tr>
<td>Special Allowance</td>
<td>${Math.round(payroll.special)}</td>
</tr>

<tr>
<td><strong>Gross Salary</strong></td>
<td><strong>${Math.round(payroll.gross)}</strong></td>
</tr>

<tr>
<td>Provident Fund</td>
<td>${Math.round(payroll.pf)}</td>
</tr>

<tr>
<td>ESI Contribution</td>
<td>${Math.round(payroll.esi)}</td>
</tr>

<tr>
<td>Professional Tax</td>
<td>${Math.round(payroll.pt)}</td>
</tr>

<tr>
<td><strong>Net Take Home</strong></td>
<td><strong>${Math.round(payroll.net)}</strong></td>
</tr>

</table>

<h3>Terms & Conditions</h3>

<ul>
<li>The employee must comply with company policies.</li>
<li>This offer is subject to successful background verification.</li>
<li>Confidentiality of company data must be maintained.</li>
<li>Employment may be terminated according to company policy.</li>
</ul>

<div class="footer">

<!-- Company Stamp -->
<div style="text-align:left; margin-bottom:20px;">
    <img 
        src="data:image/png;base64,${stampBase64}" 
        style="width:120px;"
    />
</div>

<!-- HR Section -->
<div style="margin-top:30px; text-align:right;">

<p style="font-size:18px; font-weight:bold; margin-bottom:15px;">
We look forward to having you as a part of our team.
</p>

<img 
src="data:image/jpeg;base64,${hrSignatureBase64}" 
style="width:150px;"
/>

<p style="margin-top:5px;"><strong>HR Department</strong></p>
<p>ABC Technologies Pvt Ltd</p>

</div>

</div>

`

/* Generate PDF */

const pdf = await generatePDF(html)

console.log("PDF generated")

/* Send Email */

await sendEmail(email,pdf)

console.log("Email sent to",email)

res.json({
message:"Offer annexure generated and emailed successfully"
})

}
catch(err){

console.error("SERVER ERROR:",err)

res.status(500).json({
error:"Internal Server Error"
})

}

})

/* Start Server */

const PORT = process.env.PORT || 3000

app.listen(PORT,()=>{

console.log(`Server running on port ${PORT}`)

})