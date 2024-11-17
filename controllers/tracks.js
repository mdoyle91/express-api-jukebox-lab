const Track = require(`../models/track.js`);
const express = require(`express`);
const router = express.Router();

router.post(`/`, async (req, res) => {
  try {
    const createdTrack = Track.create(req.body);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  res.json({ message: `Create route` });
});

router.get(`/`, async (req, res) => {
  try {
    const foundTracks = await Track.find();
    res.status(200).json(foundTracks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get(`/:trackId`, async (req, res) => {
  try {
    const foundTrack = await Track.findById(req.params.trackId);

    if (!foundTrack) {
      res.status(404);
      throw new Error(`Pet not found.`);
    }

    res.status(200).json(foundTrack);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message });
    }
  }
});

router.delete(`/:trackId`, async (req, res) => {
  try {
    const deletedTrack = await Track.findByIdAndDelete(req.params.trackId);
    res.status(200).json(`${deletedTrack.name} has been deleted.`);

    if (!deletedTrack) {
      res.status(404);
      throw new Error(`Track not found.`);
    }

    res.status(200).json(`${deletedTrack.name} has been deleted.`);
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    } else {
      res.status(500).json({ error: error.message }); //I altered this per Austin's commentary with an else statement, but it's still causing the server to crash each time I use the delete route despite deleting the track. I also tried adding an esle statement inside of the try block, and that caused the entire server to crash and did not delete the route.
    }
  }
});

router.put(`/:trackId`, async (req, res) => {
  try {
    const updatedPet = await Track.findByIdAndUpdate(
      req.params.trackId,
      req.body
    );
    res.json({ message: `Update route` }); //Added this line to get a message when updating per Austin's comments. After testing the route, I'm not getting the message, so I believe this has been remedied.
  } catch (error) {
    if (res.statusCode === 404) {
      res.json({ error: error.message });
    }
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
