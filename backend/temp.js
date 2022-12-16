const bcrypt = require('bcrypt')

async function hashPassword () {
  const password = 'ninetytwo'
  const saltedPass = await bcrypt.genSalt(10)
  return await bcrypt.hash(password, saltedPass)
}
(async () => {
  const ans = await hashPassword()
  console.log(ans)
})()
