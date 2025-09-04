import express from 'express';
import passport from 'passport';

const router = express.Router();

router.get('/current', passport.authenticate('jwt', { session: false }), (req, res) => {
  res.json({
    user: {
      id: req.user._id,
      email: req.user.email,
      role: req.user.role,
      first_name: req.user.first_name,
      last_name: req.user.last_name
    }
  });
});

export default router;