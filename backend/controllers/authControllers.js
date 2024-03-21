export const signup=async(req,res)=>{
    const { fullName, username, password, confirmPassword, gender } = req.body;
}

export const login=(req,res)=>{
    res.send('login route')
    console.log('loginRoute');
}


export const logout=(req,res)=>{
    res.send('logout route')
    console.log('logout route');
}