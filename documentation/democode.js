//----------------------------------------------------------------------------
//OBTAINING tokens via login 
//{"email":"dev@brocku.ca","nickname":"tester", "password":"TheBockMan123"}
getToken = async () => { 
    const request = { 
        method: "POST",
        headers: { "Content-Type": "application/json"},
        body: JSON.stringify({
            email: "dev@brocku.ca", 
            password: "TheBockMan123", //these will have to be updated to whatever your users look like 
        }),
    }; 
    await fetch("/api/token/obtain/", request)
        .then((response) => {
            return response.json()
        }).then((data) =>{
            localStorage.setItem("refreshToken", data.refresh);
            localStorage.setItem("accessToken", data.access);
        })
}