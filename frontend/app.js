async function generate(){

    const data = {
    
    name:document.getElementById("name").value,
    
    designation:document.getElementById("designation").value,
    
    email:document.getElementById("email").value,
    
    ctc:document.getElementById("ctc").value
    
    }
    
    const res = await fetch("http://localhost:3000/generate-offer",{
    
    method:"POST",
    
    headers:{
    "Content-Type":"application/json"
    },
    
    body:JSON.stringify(data)
    
    })
    
    const result = await res.json()
    
    alert(result.message)
    
    }