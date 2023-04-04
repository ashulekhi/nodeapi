exports.createResponseObject = (data,message,error)=>{
return {
    errorMessage:error || null,
    message:message || null,
    data:data||null
}
}