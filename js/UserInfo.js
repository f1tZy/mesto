class UserInfo {
  constructor(){
    this.name=userName;
    this.job=userJob;
  }
  
  setUserInfo(user){
    user.description.value=this.name.textContent;
    user.info.value=this.job.textContent;
  }

  updateUserInfo(user){
    this.name.textContent=user.description.value;
    this.job.textContent=user.info.value;
  }
}