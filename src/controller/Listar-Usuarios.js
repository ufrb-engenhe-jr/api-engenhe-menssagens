async userList(req, res){
    const user = await UserSchema.find({},{_id:1, name:1,email:1,types:1, created_at:1});
    return res.status(200).json(user);
};