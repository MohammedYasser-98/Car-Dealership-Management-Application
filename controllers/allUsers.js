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
        //Search feature
        let findCars;
        let filteredCars = user.cars;
        const minPr = parseInt(req.query.minPr);
        const maxPr = parseInt(req.query.maxPr);
        const make1 = req.query.make1;
        const model1 = req.query.model1;
        const year1 = req.query.year1;
        const engine1 = req.query.engine1;
        

        filteredCars = filteredCars.filter((car)=>{return car.price >= minPr})
            

        filteredCars = filteredCars.filter((car)=>{return car.price <= maxPr})
       
        
        if(req.query.make1){
            findCars.find((car)=>{car.make === req.query.make1}) 
        } 
   
        if(req.query.model1){
            findCars.find((car)=>{car.model === req.query.model1}) 
        }     
        if(req.query.year1){
            findCars.find((car)=>{car.year === req.query.year1}) 
        }
        if(req.query.engine1){
            findCars.find((car)=>{car.engine === req.query.engine1}) 
        }

        const search = [findCars, filteredCars, minPr, maxPr]
        //render
         res.render('cars/public.ejs', {
             title: 'Public Cars',
             user: user,
             cars: user.cars, 
             search: search, //Search feature

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