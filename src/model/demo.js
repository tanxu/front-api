import User from './test'

// 增
const user = {name:'brain', age: 30, email: 'brain@qq.com'}
const insertMethod = async ()=>{
  const data = await new User(user)
  const result = await data.save()
  console.log(result)
}
// 查
const findMethod = async ()=>{
  const result = await User.find({})
  console.log(result)
}
// 改
const updateMethod = async ()=>{
  const result = await User.updateOne({name: 'imoocTest'}, {name: 'imooc'})
  console.log(result)
}

// 删
const deleteMethod = async ()=>{
  const result = await User.deleteOne({name: 'imoocTest'})
  console.log(result)
}


deleteMethod();
