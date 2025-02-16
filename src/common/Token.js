const Token=()=>{
  let userName="";
  let userLogin=false;
  let userEmail="";
  let profilePic="";
  const getProfilePic=()=>profilePic
  const getUserLogin=()=>userLogin;
  const getUserName=()=>userName;
  const getUserEmail=()=>userEmail;
  const setUserName=(token)=>{
    userName=token
    return true
  }
  const setUserLogin=(token)=>{
    userLogin=token
    return true
  }
  const setUserEmail=(token)=>{
    userEmail=token
    return true
  }
  const setProfilePic=(token)=>{
    profilePic=token
    return true
  }
  return{
    getUserName,
    setUserName,
    setUserEmail,
    getUserEmail,
    getUserLogin,
    setUserLogin,
    getProfilePic,
    setProfilePic
  }
}
export default Token()