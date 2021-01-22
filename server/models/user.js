// email store string null=false
// password store string null=false

module.exports=function (sequelize,Datatypes){

    const User=sequelize.define('user',{
        email:{
            type: Datatypes.STRING,
            allowNull: false,
            unique: true
        },
        password:{
            type: Datatypes.STRING,
            allowNull:false
        },
    })
    return User;
};