var expressJwt = require('express-jwt');
var jwt = require('jsonwebtoken');

function createToken(auth) {
  return jwt.sign({
    id: auth.id
  }, process.env.APP_SECRET,
  {
    expiresIn: 60 * 120
  });
};

module.exports = {
	authenticate: expressJwt({
		secret: process.env.APP_SECRET,
		requestProperty: 'auth',
		getToken: function(req) {
			if (req.headers['x-auth-token']) {
				return req.headers['x-auth-token'];
			}
			return null;
		}
	}),

	loginUser: function(req, res) {
		if (!req.user) {
			return res.status(401).json('Prisijungti nepavyko. Prašome pamėginti vėliau');
		} else if (!req.user.isActive) {
			return res.status(401).json('Paskyra suspenduota');
		}
		req.auth = {
			id: req.user.id
		};
		req.token = createToken(req.auth);
		res.setHeader('x-auth-token', req.token);
		res.status(200).send(req.auth);
	},
}