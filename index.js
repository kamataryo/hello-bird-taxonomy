/*
* HTTP Cloud Function.
*
* @param {Object} req Cloud Function request context.
* @param {Object} res Cloud Function response context.
*/

const URL_BASE = 'http://bird-api.biwako.io/v1/birds'

exports.birdGenus = function birdGenus(req, res) {
  const { name } = req.body.result.parameters

  fetch(`${URL_BASE}/${name}`)
    .then(res => res.json())
    .then(data => {
      const family = data.taxonomies.filter(tax => tax.rank === 'family')[0].ja
      const response = name + 'の属名は' + family + 'です。'

      res.setHeader('Content-Type', 'application/json')
      res.send(
        JSON.stringify({
          speech: response,
          displayText: response
        })
      )
    })
    .catch(err => {
      const response = '何かのエラーです。'
      res.send(
        JSON.stringify({
          speech: response,
          displayText: response
        })
      )
    })
}
