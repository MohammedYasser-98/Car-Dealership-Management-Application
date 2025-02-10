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
        title: car.make,
        car: car
    })
    
}


const edit = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const car = currentUser.cars.id(req.params.carId)
        res.render('cars/edit.ejs', {
            title: 'Edit page',
            car,
        })
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
    
}

const update = async (req, res) => {
    try {
        const currentUser = await User.findById(req.params.userId)
        const car = currentUser.cars.id(req.params.carId)

        car.set(req.body)
        await currentUser.save()

        res.redirect(`/users/${currentUser._id}/cars/${req.params.carId}`)

    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}

const deleteList = async (req, res) => {
    try {
        const currentUser = await User.findById(req.session.user._id)
        currentUser.cars.id(req.params.carId).deleteOne()
        await currentUser.save();
        res.redirect(`/users/cars`)
    } catch (err) {
        console.log(err)
        res.redirect('/')
    }
}



module.exports = {
    index,
    newList,
    makeList,
    show,
    edit,
    update,
    deleteList,
}