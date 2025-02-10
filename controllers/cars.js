const User = require('../models/user')

const index = async (req, res) =>{
    // console.log(req.params.userId)
    // console.log('here')
    // const currentUser = await User.findById(req.params.userId)
    const currentUser = await User.findById(req.session.user._id)

    // console.log(currentUser)
    res.render('cars/index.ejs', {
        title: 'My Index',
        cars: currentUser.cars
    })
}

const newList = (req, res) =>{
    res.render('cars/new.ejs', {
    
        title: 'Add to my list'
    })
    }


const makeList = async (req, res)=> {
    const currentUser = await User.findById(req.session.user._id)
    currentUser.cars.push(req.body)
    await currentUser.save()
    res.redirect('/users/cars')
    
}

const show = async (req, res)=> {
    const currentUser = await User.findById(req.params.userId)
    const car = currentUser.cars.id(req.params.carId)

    res.render('cars/show.ejs', {
        title: 'car',
        car: car
    })
    
}




module.exports = {
    index,
    newList,
    makeList,
    show,
}