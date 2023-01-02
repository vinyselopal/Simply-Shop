const { getAddressesQuery } = require('./addressesModel.js')

const getUserAddresses = async (req, res) => {
  const userID = req.userID
  const response = await getAddressesQuery(userID)
  if (!response?.rows.length) res.sendStatus(404)
  else {
    console.log('about to swnd response')
    res.json(response.rows)
  }
}

module.exports = {
  getUserAddresses
}
