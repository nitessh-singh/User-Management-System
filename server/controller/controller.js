var UserDB = require('../model/model');

//create a new user
exports.create = (req, res)=>{

  //validate a request
  if(!req.body) {
    res.status(400).send({message: "Content can not be empty!"});
    return;
  }

  //new user info
  const user = new UserDB({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status
  })

  //save user
  user
    .save(user)
    .then(data => {
      // res.send(data)

      res.redirect('/add-user')
    })
    .catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while saving a user"
      })
    });

}

//retrieve users
exports.find = (req, res)=> {

  if(req.query.id) {
    const id = req.query.id;
    UserDB.findById(id)
      .then(data=>{
        if(!data) {
          res.status(404).send({message: "Not found user with id "+ id})
        }else {
          res.send(data)
        }
      })
      .catch(err=> {
        res.status(500).send({message: "Error fetching a user that has id "+ id})
      })

  }else {
    UserDB.find()
    .then(user =>{
      res.send(user);
    })
    .catch(err => {
      res.status(500).send({message: err.message||"Error occurred while fetching user data"});
    })
  }
  

}

//update a new user
exports.update = (req, res)=> {

  if(!req.body){
    return res
      .status(400)
      .send({message:"Data to update cannot be empty"})
  }

  const id = req.params.id;
  UserDB.findByIdAndUpdate(id, req.body)
    .then(data=> {
      if(!data){
        res.status(404).send({message: "Cannot update, maybe user not found"})
      }else {
        res.send(data);
      }
    })
    .catch(err=>{
      res.status(500).send({message: "Error in updating user info"})
    })

}

//delete a user
exports.delete = (req, res)=> {
  const id = req.params.id;
  UserDB.findByIdAndDelete(id)
    .then(data=> {
      if(!data){
        res.status(404).send({message: "Cannot delete the data"})
      }else {
        res.send({
          message: "User was deleted"
        })
      }
    })
    .catch(err=> {
      res.status(500).send({
        message: "Could not delete the user"
      });
    });
}