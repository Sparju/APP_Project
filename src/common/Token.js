const Token=()=>{
  let userName="";
  let userLogin=false;
  const getUserLogin=()=>userLogin;
  const getUserName=()=>userName;
  const setUserName=(token)=>{
    userName=token
    return true
  }
  const setUserLogin=(token)=>{
    userLogin=token
    return true
  }
  return{
    getUserName,
    setUserName,
    getUserLogin,
    setUserLogin
  }
}
export default Token()