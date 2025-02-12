const User = require('../models/user')
const findUsers = async (req, res) => {
    try{
       const allUsers = await User.find({})
        res.render('cars/community.ejs', {
            title: 'Community',
            allUsers: allUsers, 
        })

    } catch(err) {
        console.log(err)
        res.redirect('/')
    }
    
}

const publicCars = async (req, res) =>{

    try{
        const user = await User.findById(req.params.userId)
        
        //render
         res.render('cars/public.ejs', {
             title: 'Public Cars',
             user: user,
             cars: user.cars, 
             
         })
 
     } catch(err) {
         console.log(err)
         res.redirect('/')
     }

}




module.exports = {
    findUsers,
    publicCars,
}