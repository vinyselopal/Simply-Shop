const { getAddressesQuery } = require('./addressesModel.js')

const getUserAddresses = async (req, res) => {
  const userID = req.userID

  try {
    const addresses = await getAddressesQuery(userID)
    res.json({ addresses })
  } catch (err) {
    res.sendStatus(404)
  }
}

module.exports = {
  getUserAddresses
}
