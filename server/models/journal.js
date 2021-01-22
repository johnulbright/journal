module.exports=function (sequelize,Datatypes){

    const Journal=sequelize.define('journal',{
        title:{
            type: Datatypes.STRING,
            allowNull: false,
        },
        date:{
            type: Datatypes.STRING,
            allowNull:false
        },
        entry:{
            type: Datatypes.STRING,
            allowNull:false
        },
        owner:{
            type:Datatypes.INTEGER
        }
    })
    return Journal;
};